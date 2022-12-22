<?php

use function PHPSTORM_META\type;

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header('Accept: application/json, text/plain, */*');
header('Content-Type: application/json');
define('MSG', 'Scandiweb backend');
//echo MSG;


include('DbConnect.php');
//$objDb = new DbConnect;
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        // THE IF FETCHES THE ID-ed DOC
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        // THE ELSE FETCHES ALL DOCS
        else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        };
        echo json_encode($products);
        break;

    case 'POST':
        $product = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO products (id, sku, name, price, size, weight, length, width, height) VALUES(null, :sku, :name, :price, :size, :weight, :length, :width, :height)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':IDS', $product->ids);
        
        $stmt->bindParam(':sku', $product->sku);
        $stmt->bindParam(':name', $product->name);
        $stmt->bindParam(':price', $product->price);
        $stmt->bindParam(':size', $product->size);
        $stmt->bindParam(':weight', $product->weight);
        $stmt->bindParam(':length', $product->length);
        $stmt->bindParam(':width', $product->width);
        $stmt->bindParam(':height', $product->height);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Product added successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to add product'];
        }
        echo json_encode($response);
        break;

    case 'PUT':
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE products SET name = :name, email = :email, mobile = :mobile, created_at = :updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record'];
        }
        echo json_encode($response);
        break;

    case 'PUT':
        $product = json_decode(file_get_contents('php://input'));
        $idToDelete = 2;

        if (is_object($product)) {
            print_r($product);
            $arr = (array)$product;
            print_r($arr);

            foreach ($arr as $ids) {
                $sql = "DELETE FROM products WHERE id in ($ids) ";
                $stmt = $conn->prepare($sql);
                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record'];
                }
                echo json_encode($response);
            }
        } else {
            echo 'this is not an object';
        }
        break;
}

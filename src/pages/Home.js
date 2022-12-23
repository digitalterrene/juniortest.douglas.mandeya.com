
import React, { useEffect, useState } from 'react'
import { NavLink, } from 'react-router-dom'





export const Home = () => {
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [prods, setProds] = useState(null)
    const [inputs, setInputs] = useState({})
    const [products, setProducts] = useState(null)
    const [productID, setProductID] = useState({
        deleteID: [],
        response: [],
    });
    const PATH = 'https://juniortest-douglas-mandeya-com.herokuapp.com/scandiweb'

    const onSubmitt = () => {
        const IDS = document.getElementById('textarea').value
        //console.log({IDS})
        if (IDS === '') {
            setError('Please selected at least 1 product to delete!')
        }
        else {
            let options = {
                method: 'POST',
                body: JSON.stringify(IDS),
                mode:'cors'
            }
            fetch(`${PATH}/products/delete`,
                options)
                .then(res =>
                    res.json()).then(d => {
                        //setSuccessMsg(d.message)
                        //document.location.reload()
                    }).catch((err) => {
                        setSuccessMsg('Product(s) deleted successfully!')
                            document.location.reload()
                    })

            setError(null)
        }
    }

    const handleChange1 = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { deleteID } = productID;
        //console.log(`${value} is ${checked}`);


        // Case 1 : The user checks the box
        if (checked) {
            setProductID({
                deleteID: [...deleteID, value],
                response: [...deleteID, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setProductID({
                deleteID: deleteID.filter((e) => e !== value),
                response: deleteID.filter((e) => e !== value),
            });
        }
    };



    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = () => {
        let options = {
            method: 'GET',
            mode:'cors'
        }
        fetch(`${PATH}/products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                //console.log(data)
            });

    }

    const Header = () => {

        return (
            <div className='flex justify-between px-20 my-8 border-b pb-4'>
                <NavLink to={'/'}>
                    <h1 className='text-2xl'>
                        Product List
                    </h1>
                </NavLink>
                <div>
                    <NavLink to={'addproduct'}>
                        <button className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>Add</button>
                    </NavLink>
                    <NavLink>
                        <button id='delete-product-btn' onClick={onSubmitt} className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>Mass Delete</button>
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
            <div className='flex justify-between px-20 my-8 border-b pb-4'>
                <NavLink to={'/'}>
                    <h1 className='text-2xl'>
                        Product List
                    </h1>
                </NavLink>
                <div>
                    <NavLink to={'addproduct'} className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>
                        <button >ADD</button>
                    </NavLink>
                    <NavLink className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>
                        <button id='delete-product-btn' onClick={onSubmitt} >MASS DELETE</button>
                    </NavLink>
                </div>
            </div>
            </div>
            {error && <p className='text-center text-2xl text-red-500'>{error}</p>}
            {successMsg && <p className='text-center text-2xl text-green-500'>{successMsg}</p>}
            {!successMsg && <div className='px-20 flex flex-wrap justify-center'>
                {products && products.map((p, i) => (
                    <div
                        key={i}
                        className='border m-8 h-44 w-64 p-4'
                    >

                        <div className='text-center'>
                            <div className='relative flex justify-between -top-2 left-4'>
                                <input
                                    type="checkbox"
                                    class='delete-checkbox'
                                    value={`${p.id}`}
                                    onChange={handleChange1}
                                />
                            </div>
                            <p>{p.sku}</p>
                            <p>{p.name}</p>
                            <p>${p.price}</p>
                            {p.size > 0 && <p>Size: {p.size} MB</p>}
                            {p.weight > 0 && <p>Weight: {p.weight}KG</p>}
                            {p.height > 0 && <p>Dimensions: {p.length}x{p.width}x{p.height}</p>}
                        </div>

                    </div>
                ))}
            </div>}
            <textarea
                hidden={true}
                value={productID.response}
                id="textarea"
                style={{ height: "150px" }}
                onChange={handleChange1}
            ></textarea>

        </div>
    )
}


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddProduct } from './pages/AddProduct';
import { Home } from './pages/Home';

const Footer = () =>{
  return(
    <div className='absolute bottom-4 w-full text-lg text-center'>
      <p>Scandiweb Test assignment</p>
    </div>
  )
}
function App() {
  
  return (
    <div className="">
      <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
        </Routes>
      </div>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

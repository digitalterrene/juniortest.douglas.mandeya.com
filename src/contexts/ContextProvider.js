import React, { createContext, useContext,useEffect, useState } from 'react'
import axios from 'axios';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
    const [takenSKU, setTakenSKU] = useState([])

    useEffect(() =>{
        getProducts()
    },[takenSKU])
    const getProducts = () => {
        axios.get('https://stenotropic-falls.000webhostapp.com/products')
            .then((res) => {
                //console.log(res.data)
                const products = res.data
                let pros = []
                products.forEach(p => {
                    pros.push(p.sku)
                    setTakenSKU(pros)
                    //console.log(takenSKU)
                });

            })
    }
    return (
        <StateContext.Provider
            value={{
                takenSKU, 
                setTakenSKU
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
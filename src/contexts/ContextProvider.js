import React, { createContext, useContext,useEffect, useState } from 'react'
import axios from 'axios';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
    const [takenSKU, setTakenSKU] = useState([])

    const PATH = 'https://junior-test-douglas-mandeya-com.000webhostapp.com/scandiweb'
    useEffect(() =>{
        getProducts()
    },[takenSKU])
    const getProducts = () => {
        axios.get(`${PATH}/products`)
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
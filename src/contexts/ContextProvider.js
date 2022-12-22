import React, { createContext, useContext,useEffect, useState } from 'react'


const StateContext = createContext();


export const ContextProvider = ({ children }) => {
    const [takenSKU, setTakenSKU] = useState([])
    let options = {
        method: 'GET',
        mode:'cors'
    }
    const PATH = 'https://juniortest-douglas-mandeya-com.herokuapp.com/scandiweb'
    useEffect(() =>{
        getProducts()
    },[takenSKU])
    const getProducts = () => {
        fetch(`${PATH}/products`,options)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                const products = data
                let pros = []
                products.forEach(p => {
                    pros.push(p.sku)
                    setTakenSKU(pros)
                    //console.log(takenSKU)
                });

            });
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

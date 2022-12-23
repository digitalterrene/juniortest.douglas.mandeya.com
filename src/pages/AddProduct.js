
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, } from 'react-router-dom'
import Select from 'react-select'
import { useStateContext } from '../contexts/ContextProvider'

const options = [
    { value: 'dvd', label: 'DVD' },
    { value: 'book', label: 'Book' },
    { value: 'furniture', label: 'Furniture' }
]


export const AddProduct = () => {
    const { takenSKU } = useStateContext()
    const [inputs, setInputs] = useState({})
    const [typeSwitcher, setTypeSwitcher] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [error, setError] = useState({ n: null })
    const navigate = useNavigate()
    const PATH = 'https://juniortest-douglas-mandeya-com.herokuapp.com/scandiweb'

    //UPDATING STATE CHANGES FOR THE INPUTS
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    //MONITORING AND UPDATING THE SELECT TAG (REACT-SELECT)
    function getValue(productType) {
        setTypeSwitcher(productType.value)
    }

    //FORMTTING THE INPUT FIELDS ON CANCEL
    function clearSelect() {
        document.location.reload()
    }


    const handleCancel = () => {
        setInputs(values => ({ ...values, [inputs]: null }))
        clearSelect()
    }

    //HANDLING THE EMPTY SWITCHER FIELDS ON SUBMIT WHICH HAPPENS BECAUSE THE RESPECTIVE WONT BE IN THE SELECTED TYPE
    useEffect(() => {
        if (!inputs.weight) {
            setInputs(values => ({ ...values, weight: 0 }))
        }
        if (!inputs.size) {
            setInputs(values => ({ ...values, size: 0 }))
        }
        if (!inputs.height) {
            setInputs(values => ({ ...values, height: 0 }))
        }
        if (!inputs.length) {
            setInputs(values => ({ ...values, length: 0 }))
        }
        if (!inputs.width) {
            setInputs(values => ({ ...values, width: 0 }))
        }
    }, [inputs.weight, inputs.size, inputs.height, inputs.length, inputs.width])

    //CHECKING AND UPDATING ERROS
    const checkErrors = () => {
        if (!inputs.name && !typeSwitcher && !inputs.sku && !inputs.price) {
            setError({ n: 'SKU, Name, Price and Type missing!' })
            return

        }
        if (takenSKU.includes(inputs.sku)) {
            setError({ n: `${inputs.sku} already taken` })
        }
        else if (!typeSwitcher) {
            setError({ n: 'Product type unselected!' })
            return
        }
        else if (!inputs.sku) {
            setError({ n: 'SKU missing!' })
            return
        }
        else if (!inputs.price) {
            setError({ n: 'Price missing!' })
            return
        }
        else if (!inputs.name) {
            setError({ n: 'Name missing!' })
            return
        }
        else if (typeSwitcher === 'dvd' && !inputs.size) {
            setError({ n: 'DVD-Disc size missing!' })
            return

        }
        else if (typeSwitcher === 'book' && !inputs.weight) {
            setError({ n: 'Book weight missing!' })
            return

        }
        else if (typeSwitcher === 'furniture' && !inputs.height) {
            setError({ n: 'Furniture height missing!' })
            return
        }
        else if (typeSwitcher === 'furniture' && !inputs.width) {
            setError({ n: 'Furniture width missing!' })
            return
        }
        else if (typeSwitcher === 'furniture' && !inputs.length) {
            setError({ n: 'Furniture length missing!' })
            return
        }
        else {
            setError({ n: null })
            //console.log(inputs)
            let options = {
                method: 'POST',
                body: JSON.stringify(inputs)
            }
            fetch(`${PATH}/product/add`,
                options)
                .then(res =>
                    res.json()).then(d => {
                        console.log(d)
                        setSuccessMsg(d.message)
                        setTimeout(() => {
                            navigate('/')
                        }, 500)
                    })
        }


    }


    //SUBMITING THE POST METHOD AFTER CHECKING FOR ERRORS
    const handleSubmit = (e) => {
        e.preventDefault()
        checkErrors()
    }



    const Header = () => {
        return (
            <div className='flex justify-between px-20 my-8 border-b pb-4'>
                <NavLink to={'/'}>
                    <h1 className='text-2xl'>
                        Product Add
                    </h1>
                </NavLink>
                <div>
                    <NavLink to={'addproduct'}>
                        <button
                            onClick={handleSubmit}
                            type='submit'
                            className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>
                            Save
                        </button>
                    </NavLink>
                    <NavLink>
                        <button
                            onClick={handleCancel}
                            className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>Cancel</button>
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
                        Product Add
                    </h1>
                </NavLink>
                <div>
                    <NavLink to={'addproduct'} className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>
                        <button onClick={handleSubmit} type='submit' >
                            Save
                        </button>
                    </NavLink>
                    <NavLink className='uppercase mx-4 bg-gray-300 px-4 py-1 hover:bg-blue-600 hover:text-white hover:font-bold'>
                        <button onClick={handleCancel} >
                            Cancel
                        </button>
                    </NavLink>
                </div>
            </div>
                {successMsg && <p className='text-center text-2xl text-green-500'>{successMsg}</p>}
            </div>
            {!successMsg && <div className='px-20'>
                {error && <p className='text-lg text-red-500'>{error.n}</p>}
                <form className='flex flex-col w-72 ' id='product_form' name='addProduct'>
                    <span className='my-4 flex justify-between'>
                        <label>SKU</label>
                        <input className='bg-gray-200' name='sku' type='text' id='sku' onChange={handleChange} />
                    </span>
                    <span className='my-4 flex justify-between'>
                        <label>Name</label>
                        <input className='bg-gray-200' type='text' name='name' id='name' onChange={handleChange} />
                    </span>
                    <span className='my-4 flex justify-between'>
                        <label>Price ($)</label>
                        <input className='bg-gray-200' type='number' name='price' id='price' onChange={handleChange} />
                    </span>
                    <span className='my-4 flex justify-between'>
                        <label>Type Switcher</label>
                        <Select id='productType' onChange={getValue} options={options} name='productType' />
                    </span>
                    <div id='optional'>
                        {typeSwitcher === 'dvd' &&
                            <div>
                                <span className='flex justify-between'>
                                    <label>Size (MB)</label>
                                    <input className='bg-gray-200' type='number' name='size' id='size' onChange={handleChange} />

                                </span>
                                <p className='mt-16 font-bold'>Please provide size in MBs</p>
                            </div>
                        }
                        {typeSwitcher === 'book' &&
                            <div>
                                <span className='flex justify-between'>
                                    <label>Weight (KG)</label>
                                    <input className='bg-gray-200' type='number' name='weight' id='weight' onChange={handleChange} />

                                </span>
                                <p className='mt-16 font-bold'>Please provide weight in KG</p>
                            </div>
                        }
                        {typeSwitcher === 'furniture' &&
                            <div>
                                <span className='flex my-4 justify-between'>
                                    <label>Height (CM)</label>
                                    <input className='bg-gray-200' type='number' name='height' id='height' onChange={handleChange} />

                                </span>
                                <span className='flex my-4 justify-between'>
                                    <label>Width (CM)</label>
                                    <input className='bg-gray-200' type='number' name='width' id='width' onChange={handleChange} />

                                </span>
                                <span className='flex my-4 justify-between'>
                                    <label>Length (CM)</label>
                                    <input className='bg-gray-200' type='number' name='length' id='length' onChange={handleChange} />

                                </span>
                                <p className='mt-16 font-bold'>Please provide dimensions in CM</p>
                            </div>
                        }
                    </div>
                </form>
            </div>}

        </div>
    )
}

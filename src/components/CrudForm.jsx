import React from 'react'
import { useState,useEffect } from 'react'
import {IconUserPlus,IconX} from '@tabler/icons-react'

const initialForm = {
    nombre:'',
    tipo:'',
    id:null
}

const CrudForm = ({createData,updateData,dataToEdit,setDataToEdit}) => {

    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        if(dataToEdit){
            setForm(dataToEdit)
        }else{
            setForm(initialForm)
        }
    }, [dataToEdit])


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name && !form.tipo){
            alert('Datos Incompletos')
            return
        }

        if(form.id === null){
            createData(form)
        }else{
            updateData(form);
        }
        handleReset()
    }

    const handleReset = () => {
        setForm(initialForm);
        setDataToEdit(null);
    }

    return (
        <div className='divCrudForm'>
            <h3>{dataToEdit ? "Editar" : "Agregar" }</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={form.nombre} type="text" name="nombre" placeholder='Nombre'/>
                <input onChange={handleChange} value={form.tipo} type="text" name="tipo" placeholder='Tipo'/>
                <button className='inputSendReset' ><IconUserPlus/></button>
                <button className='inputSendReset' onClick={handleReset}><IconX/></button>
            </form>
        </div>
    )
}

export default CrudForm
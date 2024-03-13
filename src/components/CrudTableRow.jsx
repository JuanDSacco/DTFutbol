import React from 'react'
import '../styles/style.scss'

const CrudTableRow = ({el,setDataToEdit,deleteData}) => {

    let {nombre,tipo,id} = el

    return (
        <>
            <tr className='trCrudTableRou'>
                <td>{nombre}</td>
                <td>{tipo}</td>
                <td>
                    <button onClick={() => {setDataToEdit(el)}}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => deleteData(id)} ><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        </>
    )
}

export default CrudTableRow
import React from "react";
import '../styles/style.scss'
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {

    return (
        <div className="divCrudTable">
        <h3>Tabla de Datos</h3>
        <table>
            <thead>
            <tr className="trCrudTable">
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody className="tbodyCrudTable">
            {data.length > 0 ? (
                data.map((el) => (
                    <CrudTableRow
                        key={el.id}
                        el={el}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                    />
                    ))
            ) : (
                <tr>
                <td>Sin datos</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export default CrudTable;
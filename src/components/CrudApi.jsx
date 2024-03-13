import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
import { IconPokeball } from "@tabler/icons-react";

const CrudApi = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/pokemon";

    useEffect(() => {
        setLoading(true);

        api.get(url).then((res) => {
        if (!res.err) {
            setDb(res);
            setError(null);
        } else {
            setDb(null);
            setError(res);
        }

        setLoading(false);
        });
    }, []);

    const createData = (data) => {
        data.id = Date.now();

        let options = {
            body:data,
            headers:{'content-type':'application/json'} 
        }

        api.post(url, options).then((res) => {
        if(!res.err){
            setDb([...db, res]);
        }else(
            setError(res)
        )
        });
    };

    const updateData = (data) => {

        let endpoint = `${url}/${data.id}`

        api.put(endpoint)

        let options = {
            body:data,
            headers:{'content-type':'application/json'} 
        }

        api.put(endpoint, options).then((res) => {
        if(!res.err){
            let newData = db.map((el) => (el.id === data.id ? data : el));
            setDb(newData);
        }else(
            setError(res)
        )
        });
    };

    const deleteData = (id) => {

        let endpoint = `${url}/${id}`

        let options = {
            headers:{'content-type':'application/json'} 
        }

        let isDelete = window.confirm(
            `¿Estas seguro que quieres eliminar el registro con el id '${id}'?`
            );

            if (isDelete) {

        api.del(endpoint,options).then(res => {
            if(!res.err){
                let newData = db.filter((el) => el.id !== id);
                setDb(newData);
        }else(
            setError(res)
        )
        })
        } else {
            return;
        }
    };

    return (
        <div className="divCrudApp">
        <h1>CRUD Pókemon</h1>
        <div className="divIconPokeball">
            <IconPokeball size={48} />
        </div>
        <CrudForm
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
        />

        {loading && <Loader />}
        {error && (
            <Message
            msg={`Error ${error.status} : ${error.statusText}`}
            bgColor="#dc3545"
            />
        )}

        {db && (
            <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            />
        )}
        </div>
    );
    };

export default CrudApi;

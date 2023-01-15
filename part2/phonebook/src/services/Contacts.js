import axios from "axios";

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    const req = axios.get(baseURL);
    return req.then( res => res.data );
}

const create = newContact => {
    const req = axios.post(baseURL, newContact);
    return req.then( res => res.data );
}

const update = (id, newContact) => {
    const req = axios.put(`${baseURL}/${id}`, newContact);
    return req.then( res => res.data );
}

const deleteContact = (id) => {
    const req = axios.delete(`${baseURL}/${id}`);
    return req.then( res => res.data);
}

export default { getAll, create, update, deleteContact };

import { createContext, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../api/contant";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const AdminContext = createContext()

function AdminContextProvider({children}){

    const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : false )
    const navigate = useNavigate()
    const currency = '$'
    const [books, setBooks] = useState([])

    async function getAllBooks(){
        try{
            const response = await api.get('/api/create-list-book/')
            if(response.status === 200){
                setBooks(response.data)
            }
            
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        if(token){
            getAllBooks()
        }
    },[token])

    const value = {
        token,setToken,
        navigate,currency,getAllBooks,
        books,setBooks
    }

    return(
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider
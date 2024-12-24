import { useEffect, useState } from "react"
import { Navigate, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFERESH_TOKEN } from "../api/contant"
import api from "../api/api"
import { jwtDecode } from 'jwt-decode'
import Sidebar from "./Sidebar"
import { ToastContainer } from "react-toastify"

function ProtectedRoute({children}){

    const [isAuthorized, setIsAuthorized] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        let intervel = setInterval(()=>{
            auth().catch(()=>setIsAuthorized(false))
        },1000)

        return ()=> clearInterval(intervel)
    },[])

    async function refreshToken(){
        try{

            const refreshToken = localStorage.getItem(REFERESH_TOKEN)
            const response = await api.post('/api/token/refresh/', {refresh:refreshToken})
            if(response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFERESH_TOKEN, response.data.refresh)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }

        }catch(error){
            console.error(error)
            setIsAuthorized(false)
        }
    }

    async function auth(){
        try{

            const token = localStorage.getItem(ACCESS_TOKEN)
            if(!token){
                setIsAuthorized(false)
                return
            }

            const decode = jwtDecode(token)
            const token_exp = decode.exp
            const time_now = Date.now() / 1000

            if(token_exp <= time_now){
                await refreshToken()
            }else{
                setIsAuthorized(true)
            }


        }catch(error){
            console.error(error)
            setIsAuthorized(false)
        }
    }

    if (isAuthorized === null) return(
        <div className="max-padd-container pt-28 bg-white h-screen flex items-center justify-center">
            <div
                className="inline-block h-8 w-8 text-secondary animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    )

    return(
        <>
        <div className="bg-primary text-[#404040]">
            <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row">
            <Sidebar/>
                {
                    isAuthorized ? children : <Navigate to="/login" />
                }
            </div>
        </div>
        </>
    
    )
}
export default ProtectedRoute
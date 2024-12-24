import { useContext, useEffect, useState } from 'react'
import loginImg from '../assets/login.png'
import api from '../api/api'
import { ACCESS_TOKEN, REFERESH_TOKEN } from '../api/contant'
import { toast } from 'react-toastify'
import { AdminContext } from '../context/AdminContext'

function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { token,setToken,navigate } = useContext(AdminContext)

    async function handleSubmit(event){
        event.preventDefault()
        try{
            console.log('submitted')
            const response = await api.post('/api/admin/token/', {username,password})
            if(response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFERESH_TOKEN, response.data.refresh)
                setToken(response.data.access)
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])

    return(
        <section className='absolute top-0 left-0 w-full h-full z-50 bg-white'>
            {/* container */}
            <div className='flex h-full w-full'> 
                {/* image right side */}
                <div className='w-1/2 hidden sm:block'>
                    <img src={loginImg} alt="" className='w-full h-full object-cover' />
                </div>

                {/* Left side */}
                <div className='flexCenter w-full sm:w-1/2'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
                        <div className='w-full mb-4'>
                            <h5 className='bold-32'>Admin Login</h5>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="username" className='medium-15'>Username</label>
                            <input type="text" placeholder='Username' value={username} onChange={(event)=>setUsername(event.target.value)} className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className='medium-15'>Password</label>
                            <input type="password" placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)} className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1' />
                        </div>
                        <button type='submit' className='btn-dark w-full mt-5 !py-[7px] !rounded'>Login</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Login
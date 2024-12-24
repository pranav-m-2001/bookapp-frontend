import upload_icon from '../assets/upload_icon.png'
import { TbTrash } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import api from '../api/api'
import { toast } from 'react-toastify'

function Add(){

    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Fiction')
    const [price, setPrice] = useState('')
    const [popular, setPopular] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event){
        event.preventDefault()
        try{

            if(loading){
                return
            }

            setLoading(true)
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('price', price)
            formData.append('popular', popular)
            formData.append('image', image)

            const response = await api.post('/api/create-list-book/', formData)
            if(response.status === 201){
                setName('')
                setDescription('')
                setCategory('')
                setPrice('')
                setImage(null)
                setPopular(false)
                toast.success('Book Added')
                setLoading(false)
            }else{
                setLoading(false)
            }

        }catch(error){
            console.error(error)
            setLoading(false)
        }
    }

    return(
        <div className='px-2 sm:px-8 sm:mt-14 pb-16'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-3 medium-14 lg:w-[777px]'>
                <div className='w-full'>
                    <h5 className='h5'>Product Name</h5>
                    <input type="text" value={name} onChange={(event)=>setName(event.target.value)}  placeholder="Write here..." className="px-3 py-1.5 ring-1 ring-slat-900/10 rounded bg-white mt-1 w-full max-w-lg" required />
                </div>
                <div className='w-full'>
                    <h5 className='h5'>Product description</h5>
                    <textarea value={description} onChange={(event)=>setDescription(event.target.value)} placeholder='Write here...' rows={5}  className="px-3 py-1.5 ring-1 ring-slat-900/10 rounded bg-white mt-1 w-full max-w-lg" required></textarea>
                </div>
                <div className='flex items-end gap-x-6'>
                    {/* categories */}
                    <div className=''>
                        <h5 className='h5'>Category</h5>
                        <select value={category} onChange={(event)=>setCategory(event.target.value)} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-30'>
                            <option value="Fiction">Fiction</option>
                            <option value="Children">Children</option>
                            <option value="Health">Health</option>
                            <option value="Academic">Academic</option>
                            <option value="Business">Business</option>
                            <option value="Religious">Religious</option>
                        </select>
                    </div>
                    <div className='flex gap-x-2 pt-2'>
                        <label htmlFor="image" className='cursor-pointer'>
                            <img src={image ? URL.createObjectURL(image) : upload_icon} alt="" className='w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-white rounded-lg' />
                            <input type="file" id='image' onChange={(event)=>setImage(event.target.files[0])} hidden required />
                        </label>
                    </div>
                </div>
                <div>
                    <h5 className='h5'>Price</h5>
                    <input type="number" value={price} onChange={(event)=>setPrice(event.target.value)} placeholder='Price' min={0} className='px-3 py-1.5 ring-1 ring-slat-900/10 rounded bg-white w-20' required />
                </div>
                <div className='flexStart gap-2 my-2 '>
                    <input type="checkbox" checked={popular} id='popular' onChange={(event)=>setPopular((prev)=> !prev)}  />
                    <label htmlFor="popular" className='cursor-pointer'>Add to popular</label>
                </div>
                <button type='submit' className='btn-dark mt-3 max-w-44 sm:w-full'>{ loading ? 'Adding...' : 'Add Product' }</button>
            </form>
        </div>
    )
}
export default Add
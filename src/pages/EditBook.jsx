import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AdminContext } from "../context/AdminContext"
import upload_icon from '../assets/upload_icon.png'
import api from "../api/api"
import { toast } from "react-toastify"

function EditBook(){

    const { bookSlug } = useParams()
    const [bookData, setBookData] = useState('')
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const { navigate, books,getAllBooks } = useContext(AdminContext)

    function getBook(){
        let data = structuredClone(books.find((book)=> book.slug === bookSlug))
        if(data){
            setBookData(data)
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{

            const formData = new FormData()
            formData.append('bookId', bookData.id)
            formData.append('name', bookData.name)
            image && formData.append('image', image)
            formData.append('description', bookData.description)
            formData.append('category', bookData.category)
            formData.append('price', bookData.price)
            formData.append('popular', bookData.popular)

            const response = await api.post('/api/update-book/', formData)
            if(response.status === 200){
                getAllBooks()
                toast.success(response.data.message)
                navigate('/list')
            }

        }catch(error){
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getBook()
    },[])

    return(
        <div className='px-2 sm:px-8 sm:mt-14 pb-16'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-3 medium-14 lg:w-[777px]'>
                <div className='w-full'>
                    <h5 className='h5'>Product Name</h5>
                    <input type="text" value={bookData.name} onChange={(event)=>setBookData((prev)=>({...prev, name:event.target.value}))}  placeholder="Write here..." className="px-3 py-1.5 ring-1 ring-slat-900/10 rounded bg-white mt-1 w-full max-w-lg" required />
                </div>
                <div className='w-full'>
                    <h5 className='h5'>Product description</h5>
                    <textarea value={bookData.description} onChange={(event)=>setBookData((prev)=>({...prev, description:event.target.value}))} placeholder='Write here...' rows={5}  className="px-3 py-1.5 ring-1 ring-slat-900/10 rounded bg-white mt-1 w-full max-w-lg" required></textarea>
                </div>
                <div className='flex items-end gap-x-6'>
                    {/* categories */}
                    <div className=''>
                        <h5 className='h5'>Category</h5>
                        <select value={bookData.category} onChange={(event)=>setBookData((prev)=>({...prev, category:event.target.value }))} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-30'>
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
                            <img src={image ? URL.createObjectURL(image) : bookData.image ? bookData.image : upload_icon} alt="" className='w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-white rounded-lg' />
                            <input type="file" id='image' onChange={(event)=>setImage(event.target.files[0])} hidden  />
                        </label>
                    </div>
                </div>
                <div>
                    <h5 className='h5'>Price</h5>
                    <input type="number" value={bookData.price} onChange={(event)=>setBookData((prev)=>({...prev, price:event.target.value }))} placeholder='Price' min={0} className='px-3 py-1.5 ring-1 ring-slat-900/10 rounded bg-white w-20' required />
                </div>
                <div className='flexStart gap-2 my-2 '>
                    <input type="checkbox" checked={bookData.popular} id='popular' onChange={(event)=>setBookData((prev)=>({...prev, popular:!prev.popular}))}  />
                    <label htmlFor="popular" className='cursor-pointer'>Add to popular</label>
                </div>
                <button type='submit' className='btn-dark mt-3 max-w-44 sm:w-full'>{ loading ? 'Saving...' : 'Save Changes' }</button>
            </form>
        </div>
    )
}
export default EditBook
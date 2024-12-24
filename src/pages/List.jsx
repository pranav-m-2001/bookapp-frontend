import { useContext, useEffect, useState } from "react"
import api from "../api/api"
import { TbTrash } from "react-icons/tb"
import { AdminContext } from "../context/AdminContext"
import { toast } from "react-toastify"

function List(){

    const { currency,books,setBooks,getAllBooks,navigate } = useContext(AdminContext)

    async function removeBook(bookId){
        try{
            const response = await api.post('/api/get-update-delete-book/', {bookId})
            if(response.status === 204){
                toast.success('Book Removed')
                getAllBooks()
            }

        }catch(error){
            console.error(error)
            toast.error(error.message)
        }
    }


    return(
        <div className="px-2 sm:px-8 mt-4  sm:mt-14 sm:mb-14"> 
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_1fr] items-center py-1 px-2 bg-white bold-14 sm:bold-15 mb-1 rounded">
                    <h5>Image</h5>
                    <h5>Name</h5>
                    <h5>Category</h5>
                    <h5>Price</h5>
                    <h5>Edit</h5>
                    <h5>Remove</h5>
                </div>
                {/* Book List */}
                
                {
                    books.map((book,index)=>(
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl">
                            <img src={book.image} alt="" className="w-12 rounded-lg" />
                            <h5 className="text-sm font-semibold">{book.name}</h5>
                            <p className="font-semibold">{book.category}</p>
                            <div className="text-sm font-semibold">{currency} {book.price}</div>
                            <div onClick={()=>navigate(`/edit-book/${book.slug}`)} className="text-sm font-semibold text-green-600 cursor-pointer">Edit</div>
                            <div><TbTrash onClick={()=>removeBook(book.id)} className="text-right md:text-center cursor-pointer text-lg text-red-600"/></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default List
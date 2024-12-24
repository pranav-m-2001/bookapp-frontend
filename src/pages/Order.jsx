import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import api from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { TfiPackage } from 'react-icons/tfi'

function Order(){

    const { token,currency } = useContext(AdminContext)
    const [orderData, setOrderData] = useState([])

    async function getAllOrders(){
        try{

            if(!token){
                return
            }

            const response = await api.get('/api/all-orders/')
            if(response.status === 200){
                setOrderData(response.data.reverse())
            }

        }catch(error){
            console.error(error);
            toast.error(error.message)
        }
    }

    async function handleStatusChange(event, orderId){
       try{

            const response = await api.post('/api/change-order-status/', {orderId, status:event.target.value})
            if(response.status === 200){
                getAllOrders()
                toast.success(response.data.message)
            }

       }catch(error){
            console.error(error)
            toast.error(error.message)
       }
    }

    useEffect(()=>{
        getAllOrders()
    },[token])

    return(
        <div className="px-2 sm:px-8 mt-4 sm:mt-14">
            <div className="flex flex-col gap-4">
                {
                    orderData && orderData.map((order,index)=>(
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-3 text-gray-700 bg-white rounded-lg">
                            <div className="hidden xl:block ring-1 ring-slate-900/5 rounded p-7 bg-primary">
                                <TfiPackage className="text-3xl text-secondary" />
                            </div>
                            <div>
                                <div className="flex items-start gap-1">
                                    <div className="medium-14">Items:</div>
                                    <div className="flex flex-col relative top-0.5">
                                        {
                                            order.items.map((item,index)=>{
                                                if(index === order.items.length - 1){
                                                    return(
                                                        <p key={index}>
                                                            {item.name} x {item.quantity}
                                                        </p>
                                                    )
                                                }else{
                                                    return(
                                                        <p key={index}>
                                                            {item.name} x {item.quantity},
                                                        </p>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <p><span className="text-tertiary medium-14">Name: </span>{`${order.address.firstName} ${order.address.lastName}`}</p>
                                <p><span className="text-tertiary medium-14">Address: </span>
                                <span>{order.address.street},</span>
                                <span>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</span>
                                </p>
                                <p><span className="text-tertiary medium-14">Phone: </span>{order.address.phone}</p>
                            </div>
                            <div>
                                <p><span className="text-tertiary medium-14">Total: </span>{order.items.length} {order.items.length > 1 ? 'Items' : 'Item'}</p>
                                <p><span className="text-tertiary medium-14">Method: </span>{order.paymentMethod}</p>
                                <p><span className="text-tertiary medium-14">Payment: </span>{order.payment ? 'Done' : 'Pending'}</p>
                                <p><span className="text-tertiary medium-14">Ordered At: </span>{new Date(order.ordered_at).toLocaleDateString()}</p>
                            </div>
                            <p><span className="text-tertiary medium-14">Price: </span>{currency} {order.amount}</p>
                                <select className="p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary text-xs font-semibold" value={order.status} onChange={(event)=>handleStatusChange(event, order.id)}>
                                    <option value="Order placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out For Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Order
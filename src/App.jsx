import Sidebar from "./components/Sidebar"
import { Routes, Route } from 'react-router-dom'
import List from "./pages/List"
import Order from "./pages/Order"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Add from "./pages/Add"
import Login from "./components/Login"
import { useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import EditBook from "./pages/EditBook"

function App() {

    const [token, setToken] = useState('')

  return (
    <>
      <ToastContainer/>
      <main>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={ <ProtectedRoute><Add/></ProtectedRoute> } />
            <Route path="/list" element={ <ProtectedRoute><List/></ProtectedRoute> } />
            <Route path="/orders" element={<ProtectedRoute><Order/></ProtectedRoute>} />
            <Route path="/edit-book/:bookSlug" element={<ProtectedRoute><EditBook/></ProtectedRoute>} />
          </Routes>
      </main>
    </>
  )
}

export default App

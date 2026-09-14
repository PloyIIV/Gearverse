import { Outlet } from 'react-router-dom'
import NavbarAdmin from './NavbarAdmin'
import { Toaster } from "@/components/ui/sonner";

const LayoutAdmin = () => {
  return (
    <div className='min-h-screen bg-gbg-3'>
        <NavbarAdmin />
        <Outlet />
        <Toaster />
    </div>
  )
}

export default LayoutAdmin
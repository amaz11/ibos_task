import { Outlet  } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Auth from "../pages/Auth"
import { useContext } from "react"
import { ContextApi } from "../ContextApi/ContextApi"



const Layout = () => {
    const { user} = useContext(ContextApi)



  return (
    <>{user?<>
    <div className="fixed bg-white border-r top-0 left-0 w-[250px] h-full">
    <Sidebar/> 
    </div>
    <div className="ml-[250px]">
    <Navbar/>
    <div className="px-4 pt-4">
    <Outlet/>
    </div>
    </div> 
    </>: <Auth/> } </>
  )
}

export default Layout
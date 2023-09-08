import { Outlet  } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Auth from "../pages/Auth"
import { useContext, useState } from "react"
import { ContextApi } from "../ContextApi/ContextApi"



const Layout = () => {
    const { user} = useContext(ContextApi)
    const [sideBarTogle, setsideBarTogle] = useState(false);
  return (
    <>{user?<>
    <div className={`fixed bg-white border-r top-0 left-0 w-[250px] h-full z-10 ${sideBarTogle?"ml-[-250px]":""}`}>
    <Sidebar sideBarTogle={sideBarTogle} setsideBarTogle={setsideBarTogle}/> 
    </div>
    <div className={`${sideBarTogle?"ml-[0px]": "ml-[0px] md:ml-[250px]"}`}>
    <Navbar sideBarTogle={sideBarTogle} setsideBarTogle={setsideBarTogle}/>
    <div className="px-4 pt-4">
    <Outlet/>
    </div>
    {
      sideBarTogle?null:<div
      className="bg-black opacity-40 fixed w-full h-full top-0 left-0 block md:hidden "
      onClick={()=>setsideBarTogle(!sideBarTogle)}
    ></div>
    }
    
    </div> 
    </>: <Auth/> } </>
  )
}

export default Layout
import {BsPerson} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ContextApi } from '../ContextApi/ContextApi'
import { useContext } from 'react'
 
const Navbar = () => {
    const {setUser  } = useContext(ContextApi)
    const logout=()=>{
        localStorage.removeItem('user')
        setUser(null)
    }
  return (
    <div className='flex justify-between items-center px-4 py-3 shadow-sm'>
        <span>Hide</span>
        <div className='group'>
        <div className="p-2 bg-gray-100 rounded-full">
            <BsPerson size={24} />
          </div>
            <div className='flex flex-col absolute bg-white rounded-md shadow  -top-96 right-5 group-hover:top-[53px]'>
                <Link className='px-6 py-2 border-b' to={'/profile'}>Profile</Link>
                <span className='px-6 py-2 cursor-pointer' onClick={logout}>Log-out</span>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
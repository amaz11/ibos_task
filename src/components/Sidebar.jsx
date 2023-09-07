import { Link } from "react-router-dom"
import {AiOutlineDashboard,AiOutlineTeam} from 'react-icons/ai'
import {BsListTask} from 'react-icons/bs'
import {GoTasklist} from 'react-icons/go'

const Sidebar = () => {
  return (
    <div className="p-4">
        <div className="mx-auto w-32">
            <img className="w-full" src="https://collaborate-project.eu/uploads/collaborate-logo-text.png?6bfec1&6bfec1" alt="logo" />
        </div>
        <div className="pt-4">
            <ul className="flex flex-col gap-4">
                <li>
                    <Link className="flex items-center gap-3" to='/'><AiOutlineDashboard size={22}/>Dashboard</Link>
                </li>
                <li>
                    <Link className="flex items-center gap-3" to='/teams'><AiOutlineTeam size={22}/>Team</Link>
                </li>
                <li>
                    <Link className="flex items-center gap-3" to='/tasks'><BsListTask size={22}/>Tasks</Link>
                </li>
                <li>
                    <Link className="flex items-center gap-3" to='/assign/task'><GoTasklist size={22}/>Assign task</Link>
                </li>
                
            </ul>
        </div>
    </div>
  )
}

export default Sidebar
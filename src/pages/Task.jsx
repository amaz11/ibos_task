import { useState } from "react";
import TaskTable from "../components/Table/TaskTable";
import Modal from "../components/Modal/Modal";
import TaskForm from "../components/Form/TaskForm";
import { Link } from "react-router-dom";
import {AiOutlineArrowRight} from 'react-icons/ai'
const Task = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const [randerToggle,setRanderToggle] = useState(false)
  return (
    <div>
        <div className="flex justify-end gap-4">
            <button className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded" onClick={()=>setModalToggle(!modalToggle)}>Create Task +</button>
            <Link className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded flex items-center gap-2" to='/assign/task'>Assign task <AiOutlineArrowRight size={14}/></Link>
        </div>
        <div>
            <TaskTable randerToggle={randerToggle}/>
        </div>
        <div>
            {
                modalToggle?<><div className="bg-black opacity-40 fixed w-full h-full top-0 left-0 " onClick={()=>setModalToggle(!modalToggle)}></div>
                <Modal modalToggle={modalToggle} setModalToggle={setModalToggle} title={'Create Task'}>
                    <TaskForm randerToggle={randerToggle} setRanderToggle={setRanderToggle}/>
                    </Modal></>:null
            }
            
        </div>
    </div>
  )
}

export default Task
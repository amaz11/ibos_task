import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { Link } from "react-router-dom";
import {AiOutlineArrowRight} from 'react-icons/ai'
import AssignTaskForm from "../components/Form/AssignTaskForm";
import AssignTaskTable from "../components/Table/AssignTaskTable";
const AssignTask = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const [randerToggle,setRanderToggle] = useState(false)
  return (
    <div>
        <div className="flex gap-4 justify-end">
            <button className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded" onClick={()=>setModalToggle(!modalToggle)}>Assign task +</button>
            <Link className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded flex items-center gap-2" to='/tasks'>Create Task <AiOutlineArrowRight size={14}/></Link>
        </div>
        <div>
            <AssignTaskTable randerToggle={randerToggle} />
        </div>
        <div>
            {
                modalToggle?<><div className="bg-black opacity-40 fixed w-full h-full top-0 left-0 " onClick={()=>setModalToggle(!modalToggle)}></div>
                <Modal modalToggle={modalToggle} setModalToggle={setModalToggle} title={'Assign Task'}>
                    <AssignTaskForm randerToggle={randerToggle} setRanderToggle={setRanderToggle}/>
                    </Modal></>:null
            }
            
        </div>
    </div>
  )
}

export default AssignTask
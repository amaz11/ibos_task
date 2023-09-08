import { useState } from "react"
import Modal from "../components/Modal/Modal"
import TeamTable from "../components/Table/TeamTable";
import TeamForm from "../components/Form/TeamForm";
import InviteModal from "../components/Modal/InviteModal";

const Team = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const [randerToggle,setRanderToggle] = useState(false)

  return (
    <div>
        <div className="flex justify-end gap-4">
            <InviteModal />
            <button className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded" onClick={()=>setModalToggle(!modalToggle)}>Create Team +</button>
        </div>
        <div>
            <TeamTable randerToggle={randerToggle}/>
        </div>
        <div>
            {
                modalToggle?<><div className="bg-black opacity-40 fixed w-full h-full top-0 left-0 " onClick={()=>setModalToggle(!modalToggle)}></div>
                <Modal modalToggle={modalToggle} setModalToggle={setModalToggle} title={'Create Team'}>
                    <TeamForm randerToggle={randerToggle} setRanderToggle={setRanderToggle}/>
                    </Modal></>:null
            }
            
        </div>
    </div>
  )
}

export default Team
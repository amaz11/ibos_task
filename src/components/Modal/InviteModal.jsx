import { useState } from "react";
import Modal from "./Modal";
import InviteTeamForm from "../Form/InviteTeamForm";

const InviteModal = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [randerToggle, setRanderToggle] = useState(false);

  return (
    <div>
<button className="px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded" onClick={()=>setModalToggle(!modalToggle)}>Invite Member +</button>

      {modalToggle ? (
        <>
          <div
            className="bg-black opacity-40 fixed w-full h-full top-0 left-0 "
            onClick={() => setModalToggle(!modalToggle)}
          ></div>
          <Modal
            modalToggle={modalToggle}
            setModalToggle={setModalToggle}
            title={"Invite Member"}
          >
            <InviteTeamForm
              randerToggle={randerToggle}
              setRanderToggle={setRanderToggle}
            />
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default InviteModal;

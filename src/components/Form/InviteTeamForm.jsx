import { useEffect, useState } from "react";
import { uqId } from "../../utils/utils";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const InviteTeamForm = () => {

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [input,setInput] = useState({
    id:'',
    teamID:'',
    inviteID: "",
    fromID:'',
    accept:false,
  })

  const handelInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
 
  const inviteMember = (e) => {
    e.preventDefault();
    const ID = uqId()
    const getUser = localStorage.getItem('user')
    let user = window.atob(getUser)
    user = JSON.parse(user)
    const newInput = {...input,id:ID, fromID:user.id}
    const findUserIndex = users.findIndex((item) => item.id === input.inviteID);
    if (findUserIndex !== -1) {
        let newUsers = [...users]
        if(!newUsers[findUserIndex].message.some(item => item.teamID ===input.teamID)){
          newUsers[findUserIndex].message = [...newUsers[findUserIndex].message,newInput]
          localStorage.setItem('users',JSON.stringify(newUsers))
        }
      }
      toast.success("Invite Send")
  };

  useEffect(() => {
    let getTeams = localStorage.getItem("teams");
    let getUsers = localStorage.getItem("users");

    if (getTeams) {
      getTeams = JSON.parse(getTeams);
      getUsers = JSON.parse(getUsers);
      setTeams(getTeams);
      setUsers(getUsers);
    }
  }, []);
  return (
    <>
      <form className="w-full" action="" onSubmit={inviteMember}>
        <div>
          <label htmlFor="name" className="">
            Team Name
          </label>
          <br />
          <select
            className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
            name="teamID"
            value={input.teamID}
            onChange={handelInput}
            defaultValue='1'
            required
          >
            <option value="">Please choose&hellip;</option>
            {
              teams?.map(item=><option key={item.id} value={item.id}>{item.name}</option>)
            }
          </select>
        </div>
        <div>
          <label htmlFor="name" className="">
            Team:
          </label>
          <br />
          <select
            className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
            name="inviteID"
            value={input.inviteID}
            onChange={handelInput}
            defaultValue='1'
            required
          >
            <option value="">Please choose&hellip;</option>
            {
              users?.map(item=><option key={item.id} value={item.id}>{item.Fname}</option>)
            }
          </select>
        </div>
        <div className="mt-3">
          <button className="bg-blue-400 hover:bg-blue-500 py-1 px-4 rounded font-semibold  text-white">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default InviteTeamForm;

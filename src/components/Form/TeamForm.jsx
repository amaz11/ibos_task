import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import {toast} from 'react-toastify'
import { RxCross2 } from "react-icons/rx";
import { uqId } from "../../utils/utils";


// eslint-disable-next-line react/prop-types
const TeamForm = ({randerToggle,setRanderToggle}) => {
    const [toggle, setToggle] = useState(false);
    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState([]);
    const [teamName, setTeamName] = useState("");

    const toggleHandle = () => {
      setToggle(!toggle);
      let getUser = localStorage.getItem("users");
      getUser = JSON.parse(getUser);
      if (!getUser || getUser.length === 0) {
        setUsers([]);
      } else {
        setUsers(getUser);
      }
    };
    const memberSelect = (member) => {
        if (!team.includes(member)) {
          let newMember = [...team, member];
          setTeam(newMember);
        }
      };
      const memberRemove = (email) => {
        const newTeam = team.filter((member) => member.email !== email);
        setTeam(newTeam);
      };
      const createTeam = (e)=>{
        e.preventDefault();
        const ID  = uqId() 
        const input = {name:teamName, team, id:ID} 
        let currTeam = localStorage.getItem('teams')
        if(!currTeam){
            let arr = []
            arr.push(input)
            localStorage.setItem('teams',JSON.stringify(arr))
            setRanderToggle(!randerToggle)
            toast.success("Team create Successful")
        }else{
            currTeam = JSON.parse(currTeam)
            const findTeam = currTeam.find(item => item.name === input.name)
            if(findTeam){
                toast.warning('This Team Alrady Exist')
            }else{
                currTeam.push(input)
                localStorage.setItem("teams",JSON.stringify(currTeam));
            setRanderToggle(!randerToggle)
                toast.success("Team create Successful")
    
            }
        }
    
      }
  return (
    <>
<form className="w-full" action="" onSubmit={createTeam}>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
           Team Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="teamName"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="">
            Team:
          </label>
          <br />
          <div className="relative">
            <div className={`border py-4 rounded grid grid-cols-4 gap-4 px-3 ${team.length>8? "h-28 overflow-y-scroll":""}`}>
              {team.map((member) => (
                <div
                  className="flex items-center justify-between p-1 bg-gray-200 rounded"
                  key={member.email}
                >
                  <span className="text-xs">{member.Fname}</span>
                  <RxCross2
                    size={14}
                    className="cursor-pointer"
                    onClick={() => memberRemove(member.email)}
                  />
                </div>
              ))}
            </div>
            <BiChevronDown
              size={28}
              className="absolute right-0 top-[2px] cursor-pointer"
              onClick={toggleHandle}
            />
          </div>
          {toggle ? (
            <div
              className={`${
                users.length > 3 ? "h-32" : "h-auto"
              } border border-t-0 pt-4 overflow-y-scroll scroll-p-0`}
            >
              {users.map((item) => (
                <div
                  className="mb-2 px-4 py-2 flex gap-4 items-center hover:bg-slate-100 cursor-pointer"
                  onClick={() => memberSelect(item)}
                  key={item.email}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      className="w-full rounded-full"
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                      alt=""
                    />
                  </div>
                  <span>{item?.Fname}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-3">
            <button className="bg-blue-400 hover:bg-blue-500 py-1 px-4 rounded font-semibold  text-white">Submit</button>
        </div>
      </form>
    </>
  )
}

export default TeamForm
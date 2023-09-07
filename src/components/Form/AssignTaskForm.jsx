import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {toast} from 'react-toastify'
import { uqId } from "../../utils/utils";

// eslint-disable-next-line react/prop-types
const AssignTaskForm = ({randerToggle,setRanderToggle}) => {
  const [toggle, setToggle] = useState(false);
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const [teamID, setTeamID] = useState([])

    const [input,setInput] = useState({
      id:'',
      task_id: "",
      process:''
    })

    const handelInput = (e) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    };
   

    const teamSelect = (id) => {
      if (!teamID.includes(id)) {
        let newteam = [...teamID, id];
        setTeamID(newteam);
      }
    };
    const teamRemove = (id) => {
      const newTeamID = teamID.filter((item) => item !== id);
      setTeamID(newTeamID);
    };
    const createAssignTesk = (e)=>{
      e.preventDefault();
      const ID = uqId()
      const newInput = {...input, id:ID ,teamID}
      let assignTasks = localStorage.getItem('assignTasks')
      if(teamID.length ===0 ){
        toast.error("Please select atleast one Team");
      }
      else{
        if(!assignTasks){
        let arr = []
            arr.push(newInput)
            localStorage.setItem('assignTasks',JSON.stringify(arr))
            setRanderToggle(!randerToggle)
            toast.success("Task assign Successful")
      }else{
        assignTasks = JSON.parse(assignTasks)
        assignTasks.push(newInput)
        localStorage.setItem('assignTasks',JSON.stringify(assignTasks))
        setRanderToggle(!randerToggle)
        toast.success("Task assign Successful")
      }
    }
  }
    useEffect(() => {
        let getTeams = localStorage.getItem("teams");
        let getTasks = localStorage.getItem("tasks");
        if (getTeams && getTasks) {
          getTeams = JSON.parse(getTeams);
          getTasks=JSON.parse(getTasks);
          setTeams(getTeams);
          setTasks(getTasks)
        }
      }, []);
      return (
    <div>
        <form onSubmit={createAssignTesk}>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Tasks Name
          </label>
          <select
            className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
            name="task_id"
            value={input.task_id}
            onChange={handelInput}
            defaultValue='1'
            required
          >
            <option value="">Please choose&hellip;</option>
            {
              tasks?.map(item=><option key={item.id} value={item.id}>{item.title}</option>)
            }
          </select>
        </div>
        <div>
          <label htmlFor="name" className="">
            Assign Team
          </label>
          <br />
          <div className="relative">
            <div className={`border py-4 rounded grid grid-cols-4 gap-4 px-3 ${teams.length>8? "h-28 overflow-y-scroll":""}`}>
              {
                teams.filter(item => teamID.includes(item.id)).map(item=><div
                  className="flex items-center justify-between p-1 bg-gray-200 rounded"
                  key={item.id}
                >
                  <span className="text-xs">{item.name}</span>
                  <RxCross2
                    size={14}
                    className="cursor-pointer"
                    onClick={() => teamRemove(item.id)}
                  />
                </div>)
              }
            </div>
            {
              toggle?<BiChevronUp
              size={28}
              className="absolute right-0 top-[2px] cursor-pointer"
              onClick={()=>setToggle(!toggle)}
            />:<BiChevronDown
            size={28}
            className="absolute right-0 top-[2px] cursor-pointer"
            onClick={()=>setToggle(!toggle)}
          />
            }
            
          </div>
          {toggle ? (
            <div
              className={`${
                teams.length > 3 ? "h-32" : "h-auto"
              } border border-t-0 pt-4 overflow-y-scroll scroll-p-0`}
            >
              {teams.map((item) => (
                <div
                  className="mb-2 px-4 py-2 flex gap-4 items-center hover:bg-slate-100 cursor-pointer"
                  onClick={() => teamSelect(item.id)}
                  key={item.id}
                >
                  <span>{item?.name}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Process
          </label>
          <select
            className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
            name="process"
            value={input.process}
            onChange={handelInput}
            defaultValue='1'
            required
          >
            <option value="">Please choose&hellip;</option>
            <option value="1">Wating</option>
            <option value="2">In Proccess</option>
            <option value="3">Complete</option>
          </select>
        </div>
        <div className="mt-3">
            <button className="bg-blue-400 hover:bg-blue-500 py-1 px-4 rounded font-semibold  text-white">Submit</button>
        </div>
        </form>
    </div>
  )
}

export default AssignTaskForm;
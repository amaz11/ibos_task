import { useState } from "react";
import {toast} from 'react-toastify'
import { uqId } from "../../utils/utils";


// eslint-disable-next-line react/prop-types
const TaskForm = ({randerToggle,setRanderToggle}) => {
  const [input, setInput] = useState({
    id: '',
    title: "",
    description: "",
    due: "",
    priority: "",
  });

  const handelInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const createTask = (e)=>{
    e.preventDefault();
        let currTasks = localStorage.getItem('tasks')
        const ID  = uqId() 
        const newInput  = {...input, id:ID}
        if(!currTasks){
            let arr = []
            arr.push(newInput)
            localStorage.setItem('tasks',JSON.stringify(arr))
            setRanderToggle(!randerToggle)
            toast.success("Task create Successful")
        }else{
            currTasks = JSON.parse(currTasks)
            const findTeam = currTasks.find(item => item.title === input.title)
            if(findTeam){
                toast.warning('This Task Alrady Exist')
            }else{
                currTasks.push(newInput)
                localStorage.setItem("tasks",JSON.stringify(currTasks));
            setRanderToggle(!randerToggle)
                toast.success("Task create Successful")
            }
        }
        
  }
  return (
    <>
      <form onSubmit={createTask}>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Title
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="title"
            type="text"
            value={input.title}
            onChange={handelInput}
            placeholder="Name of the task "
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Description
          </label>
          <textarea
            className=" border rounded w-full py-2 px-3 text-grey-darker"
            name="description"
            type="text"
            value={input.description}
            onChange={handelInput}
            placeholder="Description of the Task"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Due Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="due"
            type="date"
            value={input.due}
            onChange={handelInput}
            placeholder="Your email address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Priority level
          </label>
          <select
            className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
            name="priority"
            // id="frm-whatever"
            value={input.priority}
            onChange={handelInput}
            defaultValue='1'
            required
          >
            <option value="">Please choose&hellip;</option>
            <option value="1">Normal</option>
            <option value="2">Important</option>
            <option value="3">Urgent</option>
          </select>
        </div>
        
        <div className="mt-3">
            <button className="bg-blue-400 hover:bg-blue-500 py-1 px-4 rounded font-semibold  text-white">Submit</button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;

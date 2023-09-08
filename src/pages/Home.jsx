import { useEffect, useState } from "react"


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [assignTasks, setAssignTasks] = useState([]);



  useEffect(()=>{
    let getTasks = localStorage.getItem("tasks");
    let getTeams = localStorage.getItem("teams");
    let getassignTasks = localStorage.getItem("assignTasks");

    if (getTasks || getTeams || getassignTasks) {
      getTasks = JSON.parse(getTasks);
      getTeams = JSON.parse(getTeams);
      getassignTasks = JSON.parse(getassignTasks);

      setTeams(getTeams);
      setAssignTasks(getassignTasks);
      setTasks(getTasks);
    }
  },[])
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="rounded shadow flex items-center justify-between p-4">
          <h3 className="font-bold">Total Task</h3>
          <p className="font-semibold text-lg">{tasks?.length === 0?"0":tasks?.length}</p>
        </div>
        <div className="rounded shadow flex items-center justify-between p-4">
          <h3 className="font-bold">Total Teams</h3>
          <p className="font-semibold text-lg">{teams?.length === 0?"0":teams?.length}</p>
        </div>
        <div className="rounded shadow flex items-center justify-between p-4">
          <h3 className="font-bold">Assign Task</h3>
          <p className="font-semibold text-lg">{assignTasks?.length === 0? "0" :assignTasks?.length}</p>
        </div>
        <div className="rounded shadow flex items-center justify-between p-4">
          <h3 className="font-bold">Complete Task</h3>
          <p className="font-semibold text-lg">{assignTasks?.filter(item=>item.process.includes('3'))?.length}</p>
        </div>
      </div>
    </>
  )
}

export default Home
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const AssignTaskTable = ({ randerToggle }) => {
  const [assignTasks, setAssignTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [input, setInput] = useState({
    priority: "",
    process: "",
  });
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortColumn, setSortColumn] = useState(null);
  const handelInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const dataSort = (column) => {
    let newSortOrder = 'asc';
    if (column === sortColumn) {
        // If the same column is clicked again, toggle the sorting order
        newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    let sorted = [...data];

  if (column === 'due') {
    sorted.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.newTask.due.localeCompare(b.newTask.due);
      } else {
        return b.newTask.due.localeCompare(a.newTask.due);
      }
    });
  } else if (column === 'priority') {
    // Sort by priority logic here
  } else if (column === 'process') {
    // Sort by process logic here
  }

  setSortColumn(column);
  setSortOrder(newSortOrder);
  setData(sorted);
    // if (col === "due") {
    //   const newData = data.sort(
    //     (fd, pd) =>{
    //         console.log(Date.parse(fd.newTask.due),Date.parse(pd.newTask.due)) 
    //        return Date.parse(fd.newTask.due) - Date.parse(pd.newTask.due)}
    //   );
    //   setData(newData);
    //   console.log('I am from Due')
    // }
  };
  
  useEffect(() => {
    let getTeams = localStorage.getItem("teams");
  let getTasks = localStorage.getItem("tasks");
  let getassignTasks = localStorage.getItem("assignTasks");
    if (getTasks && getassignTasks && getTeams) {
      getTasks = JSON.parse(getTasks);
      getTeams = JSON.parse(getTeams);
      getassignTasks = JSON.parse(getassignTasks);

      setTeams(getTeams);
      setTasks(getTasks);
      setAssignTasks(getassignTasks);
    }
  }, [randerToggle]);

  useEffect(() => {
    // filterData();
    const newAssignTasks = assignTasks.map((item) => {
        const newTeams = item.teamID.map((teamIDItem) =>
          teams.find((teamItem) => teamItem.id === teamIDItem)
        );
        const newTask = tasks.find((taskItem) => taskItem.id === item.task_id);
        return { id: item.id, newTask, newTeams, process: item.process };
      });
       setData(newAssignTasks);
  }, [assignTasks,tasks,teams]);
  return (
    <div>
      <div className="mx-auto px-4 ">
        <div className="py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold leading-tight">
              All Assign Task and Processes
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label
                  htmlFor=""
                  className="block text-grey-darker text-sm font-semibold"
                >
                  Priority:
                </label>
                <select
                  className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
                  name="priority"
                  value={input.priority}
                  onChange={handelInput}
                  defaultValue="1"
                  required
                >
                  <option value="">Please choose&hellip;</option>
                  <option value="1">Normal</option>
                  <option value="2">Important</option>
                  <option value="3">Urgent</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label
                  className="block text-grey-darker text-sm font-semibold"
                  htmlFor="email"
                >
                  Process
                </label>
                <select
                  className=" w-full py-1 px-2 bg-white border focus:outline-none rounded"
                  name="process"
                  value={input.process}
                  onChange={handelInput}
                  defaultValue="1"
                  required
                >
                  <option value="">Please choose&hellip;</option>
                  <option value="1">Wating</option>
                  <option value="2">In Proccess</option>
                  <option value="3">Complete</option>
                </select>
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th
                      onClick={() => dataSort("due")}
                      className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Due
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Process
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Team Member
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                  </tr>
                </thead>
                <tbody>
                { data
                  .filter((item) => item.process.includes(input.process))
                  .filter((item) =>
                    item.newTask.priority.includes(input.priority)
                  )
                  .map((item) => (
                      <tr  key={item.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.newTask.title}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.newTask.due}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p
                            className={`${
                              item.newTask.priority === "1"
                                ? "bg-green-500"
                                : item.newTask.priority === "2"
                                ? "bg-blue-500"
                                : "bg-red-500"
                            } px-3 font-semibold p-1 rounded-full whitespace-no-wrap text-center text-white`}
                          >
                            {item.newTask.priority === "1"
                              ? "Normal"
                              : item.newTask.priority === "2"
                              ? "Important"
                              : "Urgent"}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p
                            className={`${
                              item.process === "3"
                                ? "bg-green-500"
                                : item.process === "2"
                                ? "bg-blue-500"
                                : "bg-red-500"
                            } px-3 font-semibold p-1 rounded-full whitespace-no-wrap text-center text-white`}
                          >
                            {item.process === "1"
                              ? "Wating"
                              : item.process === "2"
                              ? "In Proccess"
                              : "Complete"}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.newTeams.map((nTItem) => nTItem.name)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap grid grid-cols-4 gap-4">
                            {item.newTeams.map((nTItem) =>
                              nTItem.team.map((nTTItem) => (
                                <div
                                  className="flex items-center justify-between p-1 bg-gray-200 rounded"
                                  key={nTTItem.email}
                                >
                                  <span className="text-xs">
                                    {nTTItem.Fname}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskTable;

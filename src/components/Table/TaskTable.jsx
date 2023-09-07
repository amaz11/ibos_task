import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const TaskTable = ({randerToggle}) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    let getTasks = localStorage.getItem("tasks");
    if (getTasks) {
      getTasks = JSON.parse(getTasks);

      setTasks(getTasks);
    }
  }, [randerToggle]);
  return (
    <div>
      <div className="mx-auto px-4 ">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">All Task</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                     Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                     Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                     Due
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Priority
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                  </tr>
                </thead>
                {tasks.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.title}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                          {item.due}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className={`${item.priority=== '1'? 'bg-green-500':item.priority=== '2'?'bg-blue-500':'bg-red-500'} px-3 font-semibold p-1 rounded-full whitespace-no-wrap text-center text-white`}>
                          {item.priority=== '1'? 'Normal':item.priority=== '2'?'Important':'Urgent' }
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;

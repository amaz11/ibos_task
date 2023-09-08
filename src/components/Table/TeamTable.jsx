import { useContext, useEffect, useState } from "react";
import { ContextApi } from "../../ContextApi/ContextApi";

// eslint-disable-next-line react/prop-types
const TeamTable = ({randerToggle}) => {
  const [teams, setTeams] = useState([]);
  const {user} = useContext(ContextApi)
  useEffect(() => {
    let getTeams = localStorage.getItem("teams");
    if (getTeams) {
      getTeams = JSON.parse(getTeams);

      setTeams(getTeams);
    }
  }, [randerToggle,user]);
  return (
    <div>
      <div className="mx-auto px-4">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">All Team</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Memeber
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                  </tr>
                </thead>
                {teams.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                       <div className="grid grid-cols-4 gap-4">
                       {item.team.map((member) => (
                <div
                  className="flex items-center justify-between p-1 bg-gray-200 rounded"
                  key={member.email}
                >
                  <span className="text-xs">{member.Fname}</span>
                 
                </div>
              ))}
                       </div>
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

export default TeamTable;

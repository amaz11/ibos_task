// const getTable = ()=>{
//     const getTeams = localStorage.getItem('team')
//     if(getTeams){
//         setTeams(getTeams)
//     }
// }
import uniqid from "uniqid";

export const uqId = () => {
  return uniqid();
};

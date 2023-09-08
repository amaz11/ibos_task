import {BsPerson} from 'react-icons/bs'
import {AiOutlineBell} from 'react-icons/ai'
import { ContextApi } from '../ContextApi/ContextApi'
import { useContext, useEffect, useState } from 'react'
import Modal from './Modal/Modal'
import ProfileModel from './Modal/Profile'
import {FaBars} from 'react-icons/fa'
import {RiBarChartHorizontalFill} from 'react-icons/ri'
// eslint-disable-next-line react/prop-types
const Navbar = ({sideBarTogle, setsideBarTogle}) => {
    const {setUser, user  } = useContext(ContextApi)
    const [userMessage,setUserMessage] = useState([])
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [updateMessage, setUpdateMessage] = useState([]);
    const [dami, setdami] = useState(false)
    const [modalToggle, setModalToggle] = useState(false);

    const logout=()=>{
      localStorage.removeItem('user')
      setUser(null)
    }
    const acceptInvatation = (accept)=>{
      let userCopy = [...users]
      let teamsCopy = [...teams]
       let updateUser =  userCopy.map(item =>{
        let updateMessages 
        if(item.id === accept.inviteID){
           updateMessages =  item.message.map(mItem=> {
            if (mItem.id === accept.id) {
              return { ...mItem, accept: true };
            }
            return mItem;
           })
        }
       
  
         return {...item, message: updateMessages}
        })
        let findUpMessage = updateUser.find(item=>item.id === accept.inviteID)
     const updateTeams = teamsCopy.map(item=>{
        if(item.id === accept.teamID.id){
          return {
            ...item,
            team: [...item.team, findUpMessage]
          }
        }
        return item
     })

      localStorage.setItem('users',JSON.stringify(updateUser))
      localStorage.setItem('teams', JSON.stringify(updateTeams));
      setUsers([...updateUser])
      findUpMessage = JSON.stringify(findUpMessage)
      findUpMessage = btoa(findUpMessage)
      localStorage.setItem('user',findUpMessage)
      setUser(findUpMessage)
      setdami(!dami)
    }


    useEffect(() => {
      let userDecode = atob(user)
      userDecode = JSON.parse(userDecode)
      setUserMessage(userDecode.message)
      let getTeams = localStorage.getItem("teams");
      let getUsers = localStorage.getItem("users");

      if (getUsers && getTeams && getTeams) {
        getUsers = JSON.parse(getUsers);
        getTeams = JSON.parse(getTeams);

  
        setTeams(getTeams);
        setUsers(getUsers);

      }
    }, [user,dami]);



    useEffect(() => {
      let userMessageCopy = [...userMessage]
      let teamCopy = [...teams]
      let SendUser = [...users]
        const filterMessage = userMessageCopy.map(item=>{
          const findTeam = teamCopy.find(tItem => tItem.id === item.teamID)
          const findSendUser = SendUser.find(UItem => UItem.id === item.fromID)
          return {...item, fromID:findSendUser, teamID:findTeam }
        })
     setUpdateMessage(filterMessage)
    }, [teams,userMessage,users,dami]);

  return (
    <div className='flex justify-between items-center px-4 py-3 shadow-sm'>
        <span>{sideBarTogle?<RiBarChartHorizontalFill size={18} onClick={()=>setsideBarTogle(!sideBarTogle)}/> :<FaBars size={18} onClick={()=>setsideBarTogle(!sideBarTogle)} />}</span>
        <div className='flex items-center gap-3'>
        <div className='group relative'>
        <div className="p-2 bg-gray-100 rounded-full">
            <AiOutlineBell size={24} />
          </div>
            <div className='flex flex-col absolute bg-white rounded-md shadow  -top-96 right-1 group-hover:top-[42px] w-72'>
                {
                  updateMessage.map(item=><div className='border-b' key={item.id}>
                    <div>
                      {item.accept? null : <><div key={item.id} className='flex items-center justify-between hover:bg-slate-200'>
                        <p className='px-6 py-2  '>{item.fromID.Fname.toUpperCase()} Send You <br/> invatation to Join {  item.teamID.name}</p>
                    <button className='bg-blue-400 hover:bg-blue-500 p-2 mr-2 rounded font-semibold text-white' onClick={()=>acceptInvatation(item)} >Accept</button>
                        </div></>}
                    </div>
                    
                  </div>)
                }
            </div>
        </div>
        
        <div className='group relative'>
        <div className="p-2 bg-gray-100 rounded-full">
            <BsPerson size={24} />
          </div>
            <div className='flex flex-col absolute bg-white rounded-md shadow  -top-96 right-1 group-hover:top-[42px] w-32'>
                <span className='px-6 py-2 border-b hover:bg-slate-200 cursor-pointer'onClick={()=>setModalToggle(!modalToggle)}>Profile</span>
                <span className='px-6 py-2 cursor-pointer hover:bg-slate-200 ' onClick={logout}>Log-out</span>
            </div>
        </div>
        
        </div>
        {modalToggle ? (
        <>
          <div
            className="bg-black opacity-40 fixed w-full h-full top-0 left-0 "
            onClick={() => setModalToggle(!modalToggle)}
          ></div>
          <Modal
            modalToggle={modalToggle}
            setModalToggle={setModalToggle}
            title={"Profile"}
          >
             <ProfileModel user={user} />
          </Modal>
        </>
      ) : null}
    </div>
  )
}

export default Navbar
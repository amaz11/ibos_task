import { useContext, useState } from "react";
import {toast} from 'react-toastify'
import { ContextApi } from "../ContextApi/ContextApi";
import uniqid from 'uniqid'
const Auth = () => {
    const [login,setLogin] = useState(true)
    const [input,setInput] = useState({
        id: uniqid(),
        Fname:'',
        Lname:'',
        email:'',
        password:'',
        bio:""
    })
    const {setUser} = useContext(ContextApi)

        const handelInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
      };
      const submitHandler = async (e) => {
        e.preventDefault();
        let users = localStorage.getItem('users')
        if(login){

           users = JSON.parse(users)
           const findEmail = users.find(item => item.email === input.email)
           if(findEmail.password === input.password){
                const user =  btoa(findEmail)
                localStorage.setItem('user',user)
                setUser(user)
           }else{
               toast.error('Invalid Email/Password')
           }
        }
        else{
            
            if(!users){
                const arr = []
                arr.push(input)
                localStorage.setItem('users',JSON.stringify(arr))
            } 
            else{
                users = JSON.parse(users)
                const findEmail = users.find(item => item.email === input.email)
                if(findEmail){
                    toast.warning('This Email Alrady Exist')
                }else{
                    if(input.password.length<6){
                        toast.error("Password Must Be 6 Characters")
                    }else{
                        users.push(input)
                        localStorage.setItem("users",JSON.stringify(users));
                        toast.success("Registration Successful")
                        // setLogin(!login)
                    }
                }
            }
        }
    }
  return (
    <div>
      <div className="font-sans antialiased bg-grey-lightest">
        <div className="flex justify-center items-center">
         
          <form
            className="w-full bg-grey-lightest"
            style={{ paddingTop: "4rem" }}
            onSubmit={submitHandler}
          >
            <div className="container mx-auto py-8">
              <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                 {login? "Sign-In": 'Register for a free account'}
                </div>
                <div className="py-4 px-8">
                    {
                        login ? null :<>
                        <div className="mb-4">
                        <div className="border relative w-32 h-32 rounded-full " style={{ backgroundImage:'url(https://png.pngtree.com/element_our/20190601/ourmid/pngtree-file-upload-icon-image_1344393.jpg)', backgroundRepeat:"no-repeat",backgroundSize:'cover',backgroundPosition: "" }}>
                            <div className="overflow-hidden">
                            <input
                          className="absolute w-full h-full appearance-none border rounded py-2 px-3 text-grey-darker opacity-0"
                          type="file"
                          
                        />
                        </div>
                          
                        </div>
                       
                      </div>
                      <div className="flex mb-4">
                        <div className="w-1/2 mr-1">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        name="Fname"
                        type="text"
                        placeholder="Your first name"
                        value={input.Fname}
                        onChange={handelInput}
                        required
                      />
                    </div>
                    <div className="w-1/2 ml-1">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        name="Lname"
                        type="text"
                        placeholder="Your last name"
                        value={input.Lname}
                        onChange={handelInput}
                        required
                      />
                    </div>
                      </div>
                      <div className="mb-4">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Add Bio
                    </label>
                    <textarea
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      name="bio"
                      type=""
                      value={input.bio}
                    onChange={handelInput}
                      placeholder="Add Your Bio"
                      required
                    />
                  </div>
                      </>
                    }
                 
                  
                  <div className="mb-4">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      name="email"
                      type="email"
                      value={input.email}
                        onChange={handelInput}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      name="password"
                      type="password"
                      placeholder="Your secure password"
                      value={input.password}
                        onChange={handelInput}
                        required
                    />
                    {
                        login? null : <p className="text-grey text-xs mt-1">
                      {  input.password.length < 6 ?'At least 6 characters':''}
                      </p>
                    }
                    
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <button
                      className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full"
                      type="submit"
                    >
                        {login?'Sign in':'Sign Up'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center my-4">
                <p
                  onClick={()=>setLogin(!login)}
                  className="text-grey-dark text-sm no-underline hover:text-grey-darker cursor-pointer"
                >
                  {login?`I don't have a account! Creat New Account`  :'I already have an account'}
                </p>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Auth;

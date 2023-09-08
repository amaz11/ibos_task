import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Team from "../pages/Team";
import Task from "../pages/Task";
import AssignTask from "../pages/AssignTask";

export const router =  createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        errorElement:<>Error</>,
        children:[{
            index:true,
            element:<Home/>
        },
        {
            path:'/teams',
            element:<Team/>
        },
        {
            path:'tasks',
            element:<Task/>
        },
        {
            path:'assign/task', 
            element:<AssignTask/>
        }
    ]
    }
])
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import EmplyeePage from "../pages/EmplyeePage";

const router = createBrowserRouter([{
    children:[
        {
            path:'/',
            element:<LoginPage />
        },
        {
            path:'/register',
            element:<RegisterPage />
        },
        {
            path:'/employee',
            element:<EmplyeePage />
        }
    ]
}])

export default router;
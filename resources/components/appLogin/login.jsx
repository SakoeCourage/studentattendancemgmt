import LoginForm from "./LoginForm"
// import Info from "./info"
import { useAuth } from "@/js/auth/Authcontext"
import { Navigate } from 'react-router-dom'


function Login() {
  const { user } = useAuth()
  {
    if (!user) {
      return <div className="relative h-screen w-screen loginscreen overflow-hidden isolate p-1  
      ">
        <div className="lg:flex flex items-center justify-center w-full container mx-auto   lg:flex-row h-full ">
          {/* <Info /> */}
          <LoginForm />
        </div>
      </div>
    } else {
      return <Navigate to={'/admin/dashboard'} />;
    }
  }

}

export default Login
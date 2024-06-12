import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase-config"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const Auth = ({setIsAuth}) => {

  const signInWithGoogle = async () =>{
    try{
      const result = await signInWithPopup(auth,provider);
      cookies.set("auth-token", result.user.refreshToken)
      console.log(result);
      setIsAuth(true);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center my-auto h-screen space-y-20 mx-auto border-2 rounded-xl border-black w-[600px]"> 
        <p className="font-bold text-3xl">
            Sign in with Google to continue
        </p>
        <button onClick={signInWithGoogle} className="font-medium text-xl border-4 rounded-full p-5 hover:bg-slate-400">
            Sign in
        </button>
    </div>
  )
}

export default Auth
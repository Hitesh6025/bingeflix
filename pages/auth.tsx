import { useCallback, useState } from "react";
import Input from "@/components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
// import {useRouter} from 'next/router'
import { AiFillGoogleCircle } from "react-icons/ai"
import { FaGithub } from "react-icons/fa"

const Auth = () => {
  // const [data, setData] = useState({username: '', email:'', password: ''})
  // const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [varient, setVarient] = useState('login')

  const toggleVarient = useCallback(() => {
    setVarient((currentStatus) => currentStatus === 'login'? 'register' : 'login')
  })

  const login = useCallback(async () => {
    try{
      await signIn('credentials', {
        email,
        password,
        // redirect: false,
        callbackUrl:'/profiles'
      })
      // router.push('/')
    }
    catch(error){
      console.log(error)
    }
  }, [email, password])


  const register = useCallback(async () => {
    try {
      await axios.post('./api/register', {
        email,
        name,
        password,
      })
    login()
    }
      catch(error){
        console.log(error)
      }
  }, [email, name, password, login])

  

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black/70 w-full h-full min-h-screen">
        <nav className="px-4 sm:px-8 md:px-12 py-5">
          <img src="/images/logo.svg" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          {/* <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"> */}
          <div className="bg-black/60 px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-14 lg:py-16 self-center mt-4 sm:mt-6 lg:mt-2 w-full max-w-full sm:max-w-md lg:w-2/5 lg:max-w-md rounded-md">

            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient === 'login'? 'Sign in' : 'Create an account'}
            </h2>
            <div className="flex flex-col gap-4">
              {varient === 'register' &&<Input label="Username" onChange={(e) => {setUsername(e.target.value)}} id="name" type="text" value={username} />}
              <Input label="Email" onChange={(e) => {setEmail(e.target.value)}} id="email" type="email" value={email} />
              <Input label="Password" onChange={(e) => {setPassword(e.target.value)}} id="password" type="password" value={password} />
            </div>
            <button onClick={varient === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 cursor-pointer transition">
              {varient === 'login'? 'Login' : 'Signup'}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <AiFillGoogleCircle size={30}/>
              </div>
              <div onClick={() => signIn('github', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <FaGithub size={26}/>
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {varient === 'login'? 'New to Netflix?' : 'Already a user'}
              <span onClick={toggleVarient} className="text-white ml-1 hover:underline cursor-pointer">
                {varient === 'login'? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

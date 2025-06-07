import {getSession, signOut} from 'next-auth/react'
import {NextPageContext} from 'next'
import useCurrentUser from '@/hooks/useCurrentUser'

export const getServerSideProps = async (context : NextPageContext) => {
  const session = await getSession(context)
  if(!session){
    return {
      redirect : {
        destination : '/auth',
        permanent : false
      }
    }
    
  }

  return {
    props : {}
  }

}
export default function Home() {
  const {data : user} = useCurrentUser()
  return (<div>
    <h1 className="text-2xl text-blue-300">bingeflix</h1>
    <p className='text-white'>Logged in as {user?.email}</p>
    <button className="h-10 w-full bg-white text-black pointer-cursor" onClick={() => signOut()}>Log Out</button>
    </div>
  
  );
}

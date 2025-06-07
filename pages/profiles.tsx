import { NextPageContext } from "next"
import {getSession} from 'next-auth/react'

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

const profiles = () => {
    return (
        <div>
            <p className="text-white text-4xl">Profile</p>
        </div>
    )
}
export default profiles
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../shareholder';
import { data } from 'autoprefixer';

// import { getUserById } from '../utils/database';

// Define the UserProfile component
export default function UserProfile() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(null)
  const [showLayout,setShowLayout]=useState(false)
  useEffect(() => {
    async function fetchUser() {
      const user= JSON.parse(sessionStorage.getItem("user"));
      if(user){
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      // if(user && user.roll===0){
        const response = await fetch('http://localhost:8000/api/user/info',config)
        const data = await response.json()
        if(response.ok){
          setUser(data)
          console.log(data)
          // console.log(response)
        }
        else{
          setError(data)
          console.log(data.message)
        }
      }
      else{
        console.log("not authoried")
        router.push("/login");
      }
    }
 fetchUser()
  }, [])
  return (
    user &&
   <Layout>   
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>'s Profile</title>
      </Head>
      <div className="max-w-5xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-medium text-blue-400 mb-8">{user.firstname}'s Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
            <h2 className="text-lg font-medium text-red-400 mb-4">Personal Information</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">First Name:<span className='pl-2 text-green-600'>{user.firstname}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Middle Name:<span className='pl-2 text-green-600'>{user.middlename}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Last name:<span className='pl-2 text-green-600'>{user.lastname}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Email:<span className='pl-2 text-green-600'>{user.email}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Phone:<span className='pl-2 text-green-600'>{user.phoneNo}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">City:<span className='pl-2 text-green-600'>{user.city}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Subcity:<span className='pl-2 text-green-600'>{user.subcity}</span></span> 
            </p>
           
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">wereda:<span className='pl-2 text-green-600'>{user.wereda}</span></span> 
            </p>
            
          
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 shadow">
          <h2 className="text-lg font-medium mt-8 mb-4 text-red-400 ">Shareholder Information</h2>
            
            <p className="text-gray-600 mb-2">
              <span className="font-semibold ">Shares Amount:<span className='pl-2 text-green-600'>{user.shareamount}</span></span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className=" font-semibold">Paid brr:<span className='pl-2 text-green-600'>{user.paidbirr}</span></span> 
            </p>
          </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
            <h2 className="text-lg font-medium text-red-400 mb-4">Profile Picture</h2>
            {/* <img src={`http://localhost:5000/${item.img}`}/><br></br> */}
            <img
        src={`http://localhost:8000/${user.image}`}
       alt="Profile" 
             className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    </Layout>
 
  );
}

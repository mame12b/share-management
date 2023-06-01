import React ,{useState,useEffect} from "react";
import {useRouter} from "next/router"
import { handleClientScriptLoad } from "next/script";
import Layout from '../admin1'
// import next from "next/types";
function edit_shareholder() {
const [email, setemail] = useState('');
const [paidbirr, setPaidBirr] = useState('');
const [shareamount, setShareAmount] = useState('');
const [error, setError] = useState('');
const [person, setPerson] = useState(null);
const rou =useRouter();
const id=rou.query.id
// console.log(rou.query.id)
const handleUpdate = async (Email) => {
    const update={paidbirr,shareamount}
    const user= JSON.parse(sessionStorage.getItem("user"));
        const response=await fetch(`http://localhost:8000/api/share/${Email}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(update),
      });
    const data=await response.json();
    if (response.ok) {
      setemail('');
      setShareAmount('');
      setPaidBirr('');
      setError('');
      console.log(data);
    } else {
      setError(data.message);
      console.log("error")
    }  
}
useEffect(()=>{
    const fetchShareholders=async ()=>{
     const user= JSON.parse(sessionStorage.getItem("user"));
      if(user){
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      const response=await fetch(`http://localhost:8000/api/addshareamount/edit_shareholder/${id}`,config)
      const data=await response.json()
      if(response.ok){
        setPerson(data)
        setemail(data.email),
        setPaidBirr(data.paidbirr),
        setShareAmount(data.shareamount)
        console.log(data)
      }
      else{
        // setError(data.message);
        console.log("error")
      }
    }
    else{
      rou.push('/login');
    }
    }
    fetchShareholders()
  },[])
  return (
  <Layout>
  <>
    {person && <div className="h-screen mt-6">
      <div className="font-bold text-gray-700 text-center mb-6 text-2xl">Edit Shareholder Information</div>
      <div className="">
        <form action="" className="max-w-md mx-auto">
          <div className="mb-4">
            <label className=" block mb-2 font-bold text-gray-700" htmlFor="">
              First Name 
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              
              placeholder={email}
              // onChange={(event) => setemail(event.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className=" block mb-2 font-bold text-gray-700 " htmlFor="">
              shareAmount
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              required
              placeholder={shareamount}
              // onChange={(event) => setShareAmount(event.target.value)}
              value={shareamount}  
                  />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="">
              paidBirr
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              required
              placeholder={paidbirr}
              // onChange={(event) => setPaidBirr(event.target.value)}
              value={paidbirr}          
                />
          </div>
          
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={(e)=>{
                e.preventDefault()
                handleUpdate(person.email)}}
           >
                Update
            </button>
          
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
    </div>
 }
  </></Layout>
  )
  ;
  };
export default edit_shareholder;

import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from '../admin1'
import { useRouter } from "next/router";

export default function shareholder_registration() {
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [wereda, setWereda] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [houseNo, setHouseNo] = useState("");
  // const [roll, setRoll] = useState('');
  const [paidbirr, setPaidBirr] = useState("");
  const [shareamount, setShareAmount] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [person, setPerson] = useState(null);
const rou =useRouter();
const id=rou.query.id;
let user;
useEffect(()=>{
  const fetchShareholders=async ()=>{
    user= JSON.parse(sessionStorage.getItem("user"));
    if(user){
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    const response=await fetch(`http://localhost:8000/api/buyer/shareholder_registration/${id}`,config)
    const data=await response.json()
    if(response.ok){
      setPerson(data)
      setFirstName(data.firstname),
      setMiddleName(data.middlename),
      setLastName(data.lastname),
      setCountry(data.country),
      setCity(data.city),
      setPassword(data.password),
      setSubcity(data.subcity),
      setHouseNo(data.houseNo),
      setPaidBirr(data.paidbirr),
      setPhoneNo(data.phoneNo),
      setWereda(data.wereda),
      setEmail(data.email),
      setImage(data.image),
      setShareAmount(data.shareamount)
      console.log(data)
    }
    else{
      setError(data)
      console.log(data.message)
    }
  }
  else{
    console.log("not authoried")
    rou.push("/login");
  }
  }
  fetchShareholders()
},[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const users=JSON.parse(sessionStorage.getItem("user"));
    const registration = {
      firstname,
      middlename,
      lastname,
      country,
      city,
      subcity,
      wereda,
      email,
      phoneNo,
      password,
      houseNo,
      paidbirr,
      shareamount,
      image,
    };
    // const formData = new FormData();
    // formData.append('firstname', firstname);
    // formData.append('middlename', middlename);
    // formData.append('phoneNo', phoneNo);
    // formData.append('shareamount', shareamount);
    // formData.append('paidbirr', paidbirr);
    // formData.append('password', password);
    // formData.append('subcity', subcity);
    // formData.append('wereda', wereda);
    // formData.append('city', city);
    // formData.append('email', email);
    // formData.append('country', country);
    // formData.append('houseNo', houseNo);
    // formData.append('lastname', lastname);
    // if (image) {
    //   formData.append('image', image,image.name);
    // }
  
    const response = await fetch("http://localhost:8000/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${users.token}`,
      },
      body: JSON.stringify(registration)
    });
    const data = await response.json();
    if (response.ok) {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setCity("");
      setCountry("");
      setEmail("");
      setHouseNo("");
      setPassword("");
      setPhoneNo("");
      setShareAmount("");
      setPaidBirr("");
      setWereda("");
      setSubcity("");
      setError("");
      console.log(data);
    } else {
      setError(data.message);
    }
      const deleteresponse = await fetch(`http://localhost:8000/api/buyer/${id}`, {
        method: "DELETE",
      });
      const deleteddata = await deleteresponse.json();
      if (response.ok) {
        console.log(deleteddata);
      }
    
  };
  return (
    <Layout>
{person && 
    <div className="max-w-md mx-auto mt-8">
      <Head>
        <title className="">Shareholder Registration Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="font-bold text-gray-700 text-center mb-8 text-2xl">
          Shareholder Registration
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-x-4 ">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block mb-2 font-bold text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              required
              placeholder={firstname}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstname}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="middleName"
              className="block mb-2 font-bold text-gray-700"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              required
              placeholder={middlename}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setMiddleName(event.target.value)}
              value={middlename}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 font-bold text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              required
              placeholder={lastname}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setLastName(event.target.value)}
              value={lastname}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            placeholder={email}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="phoneNo"
            className="block mb-2 font-bold text-gray-700"
          >
            Phone No
          </label>
          <input
            type="tel"
            id="phoneNo"
            required
            placeholder={phoneNo}
            autoComplete="tel"
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setPhoneNo(event.target.value)}
            value={phoneNo}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-4">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 font-bold text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              required
              placeholder={city}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setCity(event.target.value)}
              value={city}
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block mb-2 font-bold text-gray-700"
            >
              Subcity
            </label>
            <input
              type="text"
              id="subcity"
              required
              placeholder={subcity}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setSubcity(event.target.value)}
              value={subcity}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="state"
              className="block mb-2 font-bold text-gray-700"
            >
              Wereda
            </label>
            <input
              type="text"
              id="wereda"
              required
              placeholder={wereda}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setWereda(event.target.value)}
              value={wereda}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 mt-4">
          <div>
            <label
              htmlFor="houseNo"
              className="block mb-2 font-bold text-gray-700"
            >
              houseNo
            </label>
            <input
              type="text"
              id="houseNo"
              required
              placeholder={houseNo}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setHouseNo(event.target.value)}
              value={houseNo}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 font-bold text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              required
              placeholder={country}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setCountry(event.target.value)}
              value={country}
            />
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label
            htmlFor="paidBirr"
            className="block mb-2 font-bold text-gray-700"
          >
            Paid Birr
          </label>
          <input
            type="number"
            id="paidBirr"
            required
            placeholder={paidbirr}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setPaidBirr(event.target.value)}
            value={paidbirr}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="shareAmount"
            className="block mb-2 font-bold text-gray-700"
          >
            Share Amount
          </label>
          <input
            type="number"
            id="shareAmount"
            required
            placeholder={shareamount}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setShareAmount(event.target.value)}
            value={shareamount}
          />
        </div>
        <div className="mb-8">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mb-16"
          >
            Register
          </button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
      </form>
    </div>
}
    </Layout>
  );
}

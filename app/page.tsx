"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Parent } from "./Components/Parent";

export default function Home() {


  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const [name, setName] = useState("");
  const [users,setUsers] = useState([
    {id:1, name:'semih', exam1: 20, exam2: 30},
    {id:2, name:'zeynep',  exam1: 40, exam2: 50},
    {id:3, name:'nida',  exam1: 100, exam2: 100}
  ])


  const goToLoginPage = () => {
    router.push("/Login");
  }

  useEffect(()=>{
    console.log("Companenet Mounted");
  },[])

  useEffect(()=>{
    console.log("when changed count trigger this", count);
  },[count])

  function Sum(text: String,a:number,b:number) {
    return text + ": " + (a + b);
  }

  const multiple = (a:number,b:number) => {
    return a*b;
  }
  
  const bolme = (a:number, b:number) =>
  {
    return a/b;
  }

  function ort(text: String, exam1:number, exam2:number){
    return text + ":" + (exam1 + exam2)/2;
  }


  return (
       <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    
      <Parent></Parent>
      
      <button onClick={()=>setCount((x)=>x-1)}> decrement</button>

      <button onClick={goToLoginPage}> Login page</button>

      <button onClick={()=> router.push("/Products/33")}>Go Details</button>


      {
        !isLoggedIn && <div style={{color:'green'}}> Welcome User! </div>
      }

      { isLoggedIn ? <div style={{color:'blue'}}> You are logged in </div> : <div style={{color:'red'}}> Please log in </div>}

     <input onChange={(e) => setName(e.target.value)} ></input>
     <h5>your name is: {name} </h5>


<ul>
      {
          users.map((user) => (
          <li key = {user.id} >{user.name} {ort("ortalaması: ", user.exam1,user.exam2)}</li>
        ))
      }
</ul>
      
       


      <h1 ref={inputRef} style={{color:'red'}}> {count} </h1>

      <button onClick={()=>setCount((x)=>x+1)}> Increment</button>

      <button onClick={()=>{
        if(inputRef.current){
          inputRef.current.style.color = 'orange';
        }
      }}> change color </button>

      <div className="mt-10" style={{color:'red'}}>
        <h2> {Sum("Sum of 5 and 10 is: ",5,10)} </h2>
        <h2> Multiple of 5 and 10 is: {multiple(5,10)}</h2>
        <h3> bolme işlemi: {bolme(5,10)}</h3>

      </div>

       </div>
  );
}

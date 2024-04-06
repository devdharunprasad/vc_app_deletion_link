"use client"
import { useEffect, useState } from "react";
import supabase from "@/supabase";
import {  toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Delete = () => {
    const router = useRouter()
  const [email, setEmail] = useState("")
  console.log({email})

  useEffect(() => {
    const getUserData = async() => {
      const { data: { user } } = await supabase.auth.getUser()
      const userEmail = user?.email
      setEmail(userEmail)

      if(!user){
        router.push("/")
      }
    }
getUserData()
  },[])

  const handleClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.id) {
      // console.log({user : user.id})
      const { error, data } = await supabase
        .from("Users")
        .delete()
        .eq("id", user?.id)
        .select();
      // console.log("User deleted successfully")
      // console.log({error,})

      
      const datalength = data?.length;
      if (datalength <= 0) {
        toast("User data already deleted")
      }
      else {
        toast("User Data deleted successfully");
      }

      if (error) {
        toast("Oops something went wrong, Try again later");
      }
    }
  };
  return (
    <section className="flex justify-center items-center h-screen">
              
    <div className="flex flex-col gap-3">
      <p>Logged in as <u>{email}</u> </p>
      <p>Are you sure you want to delete your data ?</p>
      <button onClick={handleClick}>Delete</button>
    </div>
    </section>
  );
};

export default Delete;

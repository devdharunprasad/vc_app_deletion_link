"use client"
import { useEffect } from "react";
import supabase from "@/supabase"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    const getUserData = async() => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log({user})
        if(user){
        }
    }
getUserData()
  },[])
  const handleClick = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo : `${location.origin}/delete`
      }
    });
    if (res.data) {
      router.push("/delete");
    }
    if(res.error){
      toast("Oops something went wrong")
    }
  };
  // console.log(localStorage.getItem("user"));
  return (
    <section className="flex justify-center items-center h-screen">
    <div className=" w-fit p-10">
      <p className="text-xl font-semibold text-center">Login to remove your data</p>
      <button onClick={handleClick} className="mt-5">Google Login</button>
    </div>
    </section>
  );
};

export default Home;

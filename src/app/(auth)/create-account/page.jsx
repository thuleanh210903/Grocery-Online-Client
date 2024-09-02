"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const CreateAccount = () => {
  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()
  const onCreateAccount=() => {
    GlobalApi.register(username,email,password).then(response=> {
      console.log(response.data.user)
      console.log(response.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(response.data.user))
      sessionStorage.setItem('jwt', response.data.jwt)
      toast("Account created successfully")
      router.push('/')
    },(e)=>{
      toast(e?.response?.data?.error?.message)

    })
  }
  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-200 border border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt='logo'/>
        <h2 className="font-bold text-3xl">Create an account</h2>
        <p className="text-gray-500">
          Enter your email and password to create account
        </p>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input placeholder="Username" onChange={(e)=>setUserName(e.target.value)}/>
          <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
          <Button onClick={()=>onCreateAccount()} disabled={!(username||email||password)}>Create an account</Button>
          <p>
            Already have an account
            <Link href={"/sign-in"} className="text-blue-500">
              Click here to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

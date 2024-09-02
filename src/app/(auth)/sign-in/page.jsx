"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { toast } from "sonner";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
function SignIn() {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const router = useRouter()
  const [loader, setLoader] = useState()

  useEffect(()=> {
    const jwt = sessionStorage.getItem('jwt')
    if(jwt) {
      router.push('/')
    }

  },[])
  const onSignIn= () => {
    setLoader(true)
    GlobalApi.signIn(email,password).then(response=> {
      console.log(response.data.user)
      console.log(response.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(response.data.user))
      sessionStorage.setItem('jwt', response.data.jwt)
      toast("Login successfully")
      router.push('/')
      setLoader(false)
    },(e)=>{
      console.log(e)
      toast(e?.response?.data?.error?.message)
      setLoader(false)
    })
  }

  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-200 border border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt='logo' />
        <h2 className="font-bold text-3xl">Sign int</h2>
        <p className="text-gray-500">
          Enter your email and password to sign in
        </p>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
          <Button onClick={()=>onSignIn()} disabled={!(email||password)}>Sign in</Button>
          <p>
            Don't have an account ?
            <Link href={"/create-account"} className="text-blue-500">
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
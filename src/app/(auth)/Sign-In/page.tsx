'use client'
import React, { useState } from 'react'
import { Form, FormControl,FormField, FormItem, FormLabel,} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import {signIn, useSession} from 'next-auth/react'
import { SignInSchema } from '@/schemas/SignInSchema';
import { toast } from '@/components/ui/use-toast';
import { Loader } from 'lucide-react';
const page = () => {
    const [signingIn,setSigningIn]=useState(false);
    // const {data:session }=useSession();
    const form=useForm<z.infer<typeof SignInSchema>>();
    const onSubmit=async(data:z.infer<typeof SignInSchema>)=>{
        setSigningIn(true)
        try {
            const result=SignInSchema.safeParse(data);
            if(!result.success){
              const Issues=result.error!.issues || [];
              let errorString="";
              Issues.map((ele)=>(
                  errorString+=ele.message +" "
              ));
                toast({
                title:"Error",
                description:errorString,
                variant:'destructive'
              });   
              setSigningIn(false);
              return;
            }
          } catch (error:any) {
              toast({
                title:"Form validation failure",
                description:error.message
              })
              setSigningIn(false);
              return;
          }
        const res=await signIn("credentials",{
            redirect:false,
            email:data.email,
            password:data.password
        })
        // console.log(res);
        if(res?.error){
            if(res.error==="wrong credentials"){
                toast({
                    title: 'Login Failed',
                    description: 'Incorrect username or password',
                    variant: 'destructive',
                  });
            }else{
                toast({
                    title: 'Error',
                    description: res.error,
                    variant: 'destructive',
                  });
            }
            setSigningIn(false);
        }
        if(res?.url){
            toast({
                title:"Success",
                description:"Signed in successfully"
            })
            // console.log(session?.user);
            setSigningIn(false);
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-900">
    <div className="w-full max-w-md p-8 space-y-8 shadow-md bg-white rounded-xl">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join Now
        </h1>
        <p className="mb-4">Sign up to connect with good minds</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email"  {...field} onChange={(e)=>{
                field.onChange(e)
              }} />
            </FormControl>
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
             <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Password" {...field} type='password' onChange={(e)=>{
                field.onChange(e)
              }} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit" className="bg-black text-white">
       {signingIn?<Loader/>:"Sign In"}
      </Button>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default page

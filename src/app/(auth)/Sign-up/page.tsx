'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { RegisterSchema } from '@/schemas/RegisterSchema';
import ApiResponse from '@/utils/ApiResponse';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
const page = () => {
    const form=useForm<z.infer<typeof RegisterSchema>>();
    const [signingup,setSigningup]=useState(false);
    const [image,setimage]=useState<File>();
    const { toast } = useToast();
    const onChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setimage(e.target.files[0]);
      }
    };
    const onSubmit=async(data:z.infer<typeof RegisterSchema>)=>{
      setSigningup(true);
        console.log("till here 1")
        try {
        const result=RegisterSchema.safeParse(data);
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
          setSigningup(false);
          return;
        }
      } catch (error:any) {
          toast({
            title:"Form validation failure",
            description:error.message
          })
          setSigningup(false);
          return;
      }
      try{
        console.log("till here 2");
        const from_data=new FormData();
        from_data.append("username",data.username)
        from_data.append("email",data.email)
        from_data.append("password",data.password)
        from_data.append("img",image!)
          console.log("till here 3");
        const res=await axios.post('http://localhost:3000/api/sign-up',from_data);
        toast({
          title:"Success",
          variant:'default'
        })
        }
        catch(error){
          const axiosError = error as AxiosError<ApiResponse>;
          toast({
            title: "Network Error",
            description: axiosError.response?.data.message,
            variant: "destructive",
          });
        }
    setSigningup(false);
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-900">
      <div className="w-full max-w-md space-y-8 bg-white shadow-md text-black rounded-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join with the world
          </h1>
          <p className="mb-4">Sign up to start your adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input placeholder="Password" {...field} type='password' />
              </FormControl>
            </FormItem>
          )}
        />
        <label htmlFor="image">Profile picture</label>
            <Input
              id="image"
              type="file"
              onChange={onChangeHandeler}
              placeholder="Upload your image"
            />
        <Button type="submit" className="bg-black text-white">
          {signingup?<Loader/>:"Sign Up"}
        </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page

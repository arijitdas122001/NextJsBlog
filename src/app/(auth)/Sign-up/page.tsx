'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { RegisterSchema } from '@/schemas/RegisterSchema';
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
const page = () => {
    const form=useForm<z.infer<typeof RegisterSchema>>();
    const { toast } = useToast();
    const onSubmit=(data:z.infer<typeof RegisterSchema>)=>{
        const result=RegisterSchema.safeParse(data);
        const issues=result.error!.issues;
        let errorString="";
        issues.map((ele)=>(
            errorString+=ele.message +" "
        ));
        if(!result.success){
            toast({
            title:"Error",
            description:errorString,
            variant:'destructive'
          });   
          console.log(errorString)
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
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
          <FormField
          control={form.control}
          name="ph_no"
          render={({ field }) => (
            <FormItem>
               <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} type='number' />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          Sign-Up
        </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page

'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl,FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BlogSchema } from '@/schemas/BlogWriteSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RTE from './Editor'
import { Label } from '@radix-ui/react-label'
const Post_Form = () => {
    const form=useForm<z.infer<typeof BlogSchema>>({
        resolver:zodResolver(BlogSchema),
        defaultValues:{
            username:"",
            title:"",
            sub_title:"",
            description:""
        }
    });
    const [image,setimage]=useState<File | null>(null);
    const onChangeHandeler=(e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.files){
        setimage(e.target.files[0])
      }
    }
    const onSubmit=(data:z.infer<typeof BlogSchema>)=>{
      console.log({...data,image});
    }
  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your blog title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />  
        <FormField
          control={form.control}
          name="sub_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Subtitle(It will show on the preview)" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <RTE control={form.control} name="description"/>
        <Input id="image" type='file' placeholder='Upload here' onChange={onChangeHandeler}/>
       <Label htmlFor='image'>Upload your image here</Label>
        <Button type="submit">Submit</Button>
      </form> 
    </Form>
    </div>
  )
}

export default Post_Form

'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl,FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BlogSchema } from '@/schemas/BlogWriteSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RTE from './Editor'
const Post_Form = () => {
    const form=useForm<z.infer<typeof BlogSchema>>({
        resolver:zodResolver(BlogSchema),
        defaultValues:{
            username:"",
            title:"",
            sub_title:"",
            description:"",
            img:"",
            tags:[]
        }
    });
    const onSubmit=()=>{}
  return (
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>    
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input placeholder="Sub-Title" {...field} />
              </FormControl>
              <FormLabel>Write your blog</FormLabel>
              <RTE/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Post_Form

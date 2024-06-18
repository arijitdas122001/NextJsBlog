"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BlogSchema } from "@/schemas/BlogWriteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent,useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RTE from "./Editor";
import axios from "axios";
import tags from "@/data/Tagsarray";
import { useToast } from "./ui/use-toast";
import { Loader } from "lucide-react";
const Post_Form = ({post}:any) => {
  const [image, setimage] = useState<File>();
  const [tempTagArray, settempTagArray] = useState<string[]>(tags);
  const [Tags, setTags] = useState<string[]>([]);
  const [submitting,setSubmitting]=useState(false);
  const {toast}=useToast();
  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      username: post.username || "",
      title: "",
      sub_title: "",  
      description: "",
    },
  });
  const onChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setimage(e.target.files[0]);
    }
  };
  const handelTagClick = (value: string) => {
    const indexForTempTags = tempTagArray.indexOf(value);
    if (indexForTempTags > -1) {
      setTags([...Tags, value]);
      let removeTag = tempTagArray.splice(indexForTempTags, 1);
      removeTag = tempTagArray;
      settempTagArray(removeTag);
    }
  };
  const slugTransfrom=()=>{
    let string="";
    Tags.map((ele)=>(
      string+=ele
    ));
    if(string!==""){
      return string
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
    }else return "";
  }
  const onSubmit = async (data: z.infer<typeof BlogSchema>) => {
    // console.log(imgdata);
    setSubmitting(true);
    try {
      const from_data=new FormData();
        from_data.append("username",data.username)
        from_data.append("title",data.title)
        from_data.append("sub_title",data.sub_title)
        from_data.append("description",data.description)
        from_data.append("img",image!)
    // from_data.append("tags",[])
    console.log(image);
    const value=slugTransfrom();
    const res = await axios.post(
      `http://localhost:3000/api/Blog-Upload/${value}`,
      from_data
    );
    toast({
      title:"Success",
      description:res.data.message,
      variant:"default"
    })
    setSubmitting(false);
    }
    catch (error) {
      toast({
        title:"Failure",
        description:"Error while posting",
        variant:"destructive"
      })
      setSubmitting(false);
    }

  };
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
                  <Input placeholder="username" 
                  {...field} />
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
                  <Input
                    placeholder="Enter Subtitle(It will show on the preview)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 flex-col align-middle">
            <label>Write Your blog here</label>
            <RTE control={form.control} name="description" />
            <label htmlFor="image">Upload your image here</label>
            <Input
              id="image"
              type="file"
              onChange={onChangeHandeler}
              placeholder="Blog cover image"
            />
            <div className="flex flex-col gap-4">
              <div className="border-2 border-indigo-300 rounded-xl p-2 flex gap-2">
                {Tags.length === 0 ? (
                  <label>choose your tags below</label>
                ) : (
                  Tags.map((ele,i) => (
                    <div className="bg-gray-400 rounded-lg p-1 font-serif" key={i}>
                      {ele}
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-5">
                {tempTagArray.map((ele,i) => (
                  <div
                    className="bg-gray-400 rounded-lg p-1 font-serif hover:cursor-pointer  "
                    onClick={() => handelTagClick(ele)}
                    key={i}
                  >
                    {ele}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit">
            {submitting?<Loader/>:"Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Post_Form;

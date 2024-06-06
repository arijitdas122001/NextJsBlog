import Post_Form from "@/components/Post-Form"

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400">
        <h1 className="text-3xl">Upload your thoughts from here</h1>
  <div className="bg-gray-100 p-20 rounded-xl">
    <Post_Form/>
  </div>
</div>
  )
}

export default page

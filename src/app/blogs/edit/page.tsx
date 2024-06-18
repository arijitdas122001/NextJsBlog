import Post_Form from "@/components/Post-Form";

const page = () => {
    const user={};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400">
      <div className="bg-gray-100 p-20 rounded-xl">
        <div className="text-center text-4xl">Upload your thoughts from here</div>
        <Post_Form post={user} />
      </div>
    </div>
  );
};

export default page;

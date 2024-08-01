import React from 'react'

const Loadingblog = () => {
  return (
    <div>
    <div className="flex flex-col min-h-screen items-center justify-center h-full relative">
    <div className="w-full max-w-screen-lg space-y-8 bg-white p-6  flex-2">
      <div className="text-4xl font-bold bg-slate-300 text-transparent animate-pulse rounded-lg">title</div>
      <div>
        <div className="w-40 text-xl bg-slate-300 animate-pulse text-transparent rounded-lg">username</div>
        <div className="flex gap-3 mt-4">
          <span className="bg-slate-300 animate-pulse text-transparent rounded-lg">2 min read</span>
          <span>.</span>
          <span className="bg-slate-300 animate-pulse text-transparent rounded-lg">data</span>
        </div>
      </div>
      <div className="flex flex-col gap-2"> 
        <hr className="bg-black" />
        <div className="flex gap-7 font-bold">
          <div className="hover:cursor-pointer flex gap-2">
          </div>
          <div className="hover:cursor-pointer">
          </div>
        </div>
        <hr />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-slate-300 animate-pulse text-transparent rounded-lg w-80 h-20">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, aut totam deleniti eum dolorum beatae necessitatibus, error odio quas magni illo delectus? Consequuntur, ullam? Suscipit provident ullam dolorum beatae itaque.</div>
      </div>  
      {/* <div dangerouslySetInnerHTML={{ __html: data?.description!}}></div> */}
      <div className="bg-slate-300 animate-pulse text-transparent rounded-lg h-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quod voluptatem veritatis excepturi dolore. Repudiandae quam ea inventore molestias doloribus impedit quibusdam mollitia delectus vero deleniti, perferendis libero repellat illum?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, repellat repudiandae reiciendis modi, aliquam id ducimus alias et, corrupti inventore odio voluptate tempore enim eius facilis perferendis! Placeat, odit repudiandae!lorem
      </div>
      <div className="flex flex-col gap-2">
        <hr className="bg-black" />
        <div>
          <div className="flex gap-3 font-bold">
          <div className="hover:cursor-pointer flex gap-2">
          <span></span>
          </div>
          <div className="hover:cursor-pointer">
          </div>
          </div>
        </div>
        <hr className="bg-black" />
      </div>
    </div>
  </div>
  </div>
  )
}

export default Loadingblog

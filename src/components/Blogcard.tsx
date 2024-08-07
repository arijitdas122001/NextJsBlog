import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
const Blogcard = ({blog}:any) => {
  const{title,sub_title,img}=blog;
  return (
    <div>
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-green-200 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-black"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-black"
        >
          {sub_title}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {img &&<Image
            src={img}
            height="200"  
            width="300"
            alt="thumbnail"
          />}
        </CardItem>
        <div className="flex justify-between items-center mt-20"> 
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Open
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </div>
  )
}

export default Blogcard

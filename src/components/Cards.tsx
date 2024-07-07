import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ExternalLink, Heart} from "lucide-react";
import Link from "next/link";
const Cards = ({ ele }: any) => {
  return (
    <div>
      <Card className="h-[400px] w-[350px] flex flex-col gap-5">
        <CardHeader>
          <CardTitle>{ele.title!}</CardTitle>
          <CardDescription>{ele.sub_title}</CardDescription>
        </CardHeader>
        <div className="flex justify-center h-25">
          <Image
            src={ele.img}
            alt="no-image"
            height={ele.img ? 100 : 200}
            width={300}
            className="object-fill"
          />
        </div>
        <div className="flex justify-evenly align-middle cursor-pointer">
          <div className="flex justify-center align-middle gap-2">
            <Heart color="black"/>
            <span>{ele.likecnt.length}</span>
          </div>
          <div>
          </div>
          <div className="flex gap-2">
            <Link href={`/blog/${ele._id}`}>
              <ExternalLink />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cards;

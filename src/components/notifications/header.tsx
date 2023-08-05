import React from "react";
import { Button } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import {dark} from "@mantine/prism/lib/Prism/prism-theme";
import {useNavigate} from "react-router-dom";


export function  NotificationHeader(){
  const navigation = useNavigate();

  return (
    <>
      <div className="py-3.5 px-8 flex justify-between shadow-y-sm items-center shadow-sm">
        <div className="gap-x-4 flex items-center"><span className="text-lg leading-5 font-semibold text-unique-600">All</span>
        </div>
        <div className="flex flex-row gap-x-4 items-center">
          <div className="flex gap-x-4">
            <Button onClick={()=>{navigation("/add")}} className="text-small leading-5 rounded inline-flex items-center bg-primary-1000 hover:shadow text-white px-4 h-8 cursor-pointer">
              Create Note</Button>
          </div>
        </div>
      </div>
    </>
  )
}
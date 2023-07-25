import React from "react";
import {NavLinks} from "./nav-links";
import {NotificationHeader} from "./header";

export function Notifications(){
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full">
        <div className="block w-[220px] h-full bg-secondary-unique-1000 pb-[14px] border-r border-secondary-100">
          <h1 className="text-lg px-6 py-[15px] mb-3 font-medium border-b border-secondary-100 text-secondary-unique-600">Notifications</h1>
          <NavLinks/>
        </div>
        <div className="h-full flex flex-col w-[calc(100%-220px)]">
          {/*header*/}
          <NotificationHeader/>
          <div className="w-full h-full flex flex-col overflow-auto">
            {/*mainContent*/}
          </div>
        </div>
      </div>
    </div>
  )
}
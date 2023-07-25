import React from 'react';
import './App.css';
import {NavbarMinimal} from "./side-nav/side-nav";
import {Notifications} from "./components/notifications";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className='basis-full flex'>
      <div className="w-[80px] flex transition duration-500 relative ">
        <NavbarMinimal/>
      </div>
      <div className="h-screen overflow-hidden basis-[calc(100%-60px)]">
          <Outlet/>
      </div>
    </div>
  );
}

export default App;

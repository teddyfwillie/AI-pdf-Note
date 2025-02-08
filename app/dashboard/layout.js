import React from "react";
import Header from "../dashboard/_components/Header";
import SideBar from "../dashboard/_components/SideBar";

function layout({ children }) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default layout;

import React,{ ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import SimpleSidebar from "./Sidebar/Sidebar";

interface LayoutProps {
    children: ReactNode;
  }
const Layout:React.FC<LayoutProps> = ({children}) => {
    return (
        <>
        <Navbar/>
        <SimpleSidebar children={undefined}/>
        <main>{children}</main>

        </>
    );
};
export default Layout;
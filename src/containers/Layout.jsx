import React from 'react';
import Header from "@components/Header";
import Menu from "@components/Menu";
import {useAuth} from "../hooks/useAuth";


const Layout=({children})=>{
    const auth=useAuth()
    const user=auth.user
    return(
       <div className="Layaout">
           {!!user &&(
               <Header/>
           )}
           {!!user &&(
               <Menu/>
           )}
          <div
         className="main-root">
              {children}
          </div>

       </div>
    )
}

export default Layout;
import React from "react";
import { css } from "@emotion/css";
import { color } from "styled-system";
import NavBox from "../styles/Box";
import { auth } from "../auth/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signOut as userSignOut } from "firebase/auth";
function NavBar() {

   const navigate = useNavigate() 
  const signOut = async()=>{
    try{
      await userSignOut(auth);
      toast.success("Signed Out");
      navigate("/AccountCreation");
    }catch(e:any){
      toast.error(e.message);
    }
  }
  return (
    // <div>
    //   <section
    //     className={css`
    //       padding: 32px;
    //       background-color: hotpink;
    //       font-size: 24px;
    //       border-radius: 4px;
    //     `}
    //   >
    //     <h1>hello</h1>
    //   </section>
    // </div>
    <>
      <NavBox bg="primary" color="white">
        Explore Options !
        <button onClick={signOut} className="
        bg-red-500
        hover:bg-red-700
        text-white
        font-bold
        py-2
        px-4
        rounded-md
        ">{auth.currentUser?'signOut':''}</button>
      </NavBox>
    </>
  );
}

export default NavBar;

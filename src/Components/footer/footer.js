import React, { Component } from "react";
import s from "./footer.module.css";
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { AiFillInstagram } from "react-icons/ai";

class Footer extends Component {
  render() {
    return (
        <div style={{position: "relative"}}>
           <div className={s.footer}>
             <p>It is a long established fact that a reader will be distracted by the readable content of a<br></br>
               page when looking at its layout. </p>
           </div>
           <div className={s.underFooter}>
               <div style={{marginRight: "30px"}}>
               <p>Online Shop, 2020.</p>
               <span>
               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookSquare/></a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitterSquare/></a>
               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram/></a>
               </span>
               </div>
           </div>
        </div>
      
    );
  }
}

export default Footer;
import React, { Component } from "react";
import Slideshow from "./slideshow"
import Categories from "../Categories/Categories15";
import s from "./home.module.css";
import watch from "./watch.jpg";
import hadphone from "./hadphone.jpg"

class Home extends Component {
  render() {
    return (
      <div style={{minHeight: "100vh"}}> 
        <div>
        <Slideshow />
           <div className={s.container1}>
             <img src={watch} alt="Avatar" className={s.image}/>
                <div className={s.overlay}>
                   <div className={s.text}>Watch</div>
               </div>
           </div>
           <div className={s.container2}>
             <img src={hadphone} alt="Avatar" className={s.image}/>
                <div className={s.overlay}>
                   <div className={s.text}>Hadphone</div>
               </div>
           </div>
        </div>
        <Categories />            
      </div>
    );
  }
}

export default Home;
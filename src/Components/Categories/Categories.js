import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import s from "./categoriSplit.module.css";
import Search from "../SearchAndCard/Search";


export default class Categories extends React.Component {
  state = {
    categori1: [],
    categori2: [],
    categori3: []
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/categories`).then(res => {
      const categori = res.data;
      const catLenght = categori.length;
      const categori1 = categori.slice(0, Math.trunc(catLenght/3))
      const categori2 = categori.slice(Math.trunc(catLenght/3),2*Math.trunc(catLenght/3))
      const categori3 = categori.slice(2*Math.trunc(catLenght/3), catLenght)
      this.setState({
         categori1,
         categori2,
         categori3
         });
    });
  }


  render() {
    return (
      <div style={{minHeight: "100vh"}}>
          {/* <Search/> */}
          <div style={{display:"flex", flexWrap:"wrap", width: "100%"}}>

            <div className={s.splitleft}>
              <ul>
               {this.state.categori1.map((categor, index) => (
                <Link style={{textDecoration: 'none', width: "300px"}} key={index} index={categor.id} to={`/categories-product/${categor.id}`}>
                  <p className={s.accordion}>{categor.categoryName}</p>
                </Link>
                  ))}
              </ul>
             </div>

            <div className={s.centered}>
              <ul>
               {this.state.categori2.map((categor, index) => (
                <Link style={{textDecoration: 'none', width: "300px"}} key={index} index={categor.id} to={`/categories-product/${categor.id}`}>
                  <p className={s.accordion}>{categor.categoryName}</p>
                </Link>
                  ))}
              </ul>
             </div>

            <div className={s.splitright}>
              <ul>
               {this.state.categori3.map((categor, index) => (
                <Link style={{textDecoration: 'none', width: "300px"}} key={index} index={categor.id} to={`/categories-product/${categor.id}`}>
                  <p className={s.accordion}>{categor.categoryName}</p>
                </Link>
                  ))}
              </ul>
             </div>

           </div>
       
        </div>      
    );
  }
}

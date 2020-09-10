import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import s from "./Categories.module.css";


export default class Categories extends React.Component {
  state = {
    categori: []
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/categories`).then(res => {
      const allcategori = res.data;
      const categori = allcategori.slice(0,15)
      this.setState({ categori });
    });
  }


  render() {
    return (
      <div>
        {this.state.categori.length !== 0 ?
          <div>
        <div style={{height: "80px"}}></div>
        <ul style={{width: "300px"}}>
          {this.state.categori.map((categor, index) => (
            <Link style={{textDecoration: 'none', width: "300px"}} key={index} index={categor.id} to={`/categories-product/${categor.id}`}>
              <p className={s.accordion}>{categor.categoryName}</p>
            </Link>
          ))}
        </ul>
          <div style={{ marginLeft: "40px"}}>
             <Link style={{ textDecoration: 'none' }} to={`/categories`}>
               <button className={s.butt}>All Categories</button>
             </Link>
          </div>
        </div>
        :null}
      </div>
    );
  }
}

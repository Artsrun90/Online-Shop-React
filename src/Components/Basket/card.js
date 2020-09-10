import React, { Component } from "react";
import s from "./card.module.css";
import icon from './card.jpg';
import pizza from '../Categories/Pizza.jpg';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import {ContextForCard} from "../../App"
import axios from "axios";


class Card extends Component {
  state = {
    products: [],
    count: 1
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/cart`)
                .then(response =>{
                  const products = response.data.shopping_carts;
                  this.setState({ products });
                  console.log("quantity", this.state.quantity)
                })
  }

  plus(){
    this.setState({
      count: this.state.count +1
    })
  }

  minus(){
    if(this.state.count !== 0)
    this.setState({
      count: this.state.count -1
    })
  }
    
    render() {
      return (
        <div style={{minHeight: "100vh"}}>
            {this.state.products.length !==0 ?
          <div>
            <div style={{height: "40px"}}></div>
          {this.state.products.map((product,index) => (
           <div className={s.productlist}>
                <div>              
                  <img src={pizza} alt="Pizza"/> 
                </div>
                 <div className={s.conteiner}>       
                  <h2>{product.productName}</h2>
                  <h3>Unit: {product.unit}</h3>
                  <h3>Price: {product.price}</h3>
                 </div> 
                  <div key={index} className={s.add}>
                      <span className={s.spanmn} onClick={this.minus.bind(this)}><FiMinus/></span>
                      <input type="text" value={this.state.count}/>
                      <span className={s.spanpl} onClick={this.plus.bind(this)}><FiPlus/></span>
                  </div>          
            </div>))
            }
            <div style={{marginLeft: "500px", marginTop: "40px"}}><button className={s.butt}>Buy</button></div>
            </div>
            : <div style={{marginLeft: "400px"}}>
              <div style={{height: "60px"}}></div>
              <img src={icon} alt="card"/>
             </div>
            }  
        </div>
    );
  }
}


export default Card;
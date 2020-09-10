import React, { Component } from "react";
import axios from "axios";
import s from "./Product.module.css";
import icon from '../Categories/404.png';
import pizza from '../Categories/Pizza.jpg';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import {MyContext} from '../../App'


class ProductList extends Component {
  state = {
    product: {},
    productid: this.props.match.params.productid,
    quantity: 0,
    err: ""
  }; 
  

  componentDidMount() {
    console.log("didMount")
    axios.get(`http://localhost:3001/products/${this.state.productid}`)
    .then(res => {
      const product = res.data;
      this.setState({ product });
    })
    .catch(error =>{
      if(error.response.status === 404) this.setState({ notFound: <img src={icon} alt="Icon404" /> })
    })
    }

  getProduct(id) {
    console.log("getproduct")
    axios.get(`http://localhost:3001/products/${id}`)
    .then(res => {
      const product = res.data;
      this.setState({ product });
    })
    .catch(error =>{
      if(error.response.status === 404) this.setState({ notFound: <img src={icon} alt="Icon404" /> })
    })
    }
    

componentDidUpdate(prevProps){
  console.log("didapdtae")
  if(prevProps.match.params.productid !== this.props.match.params.productid){
    this.getProduct(this.props.match.params.productid)
  } else{
    console.log("prod", this.props.match.params)
  }
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
            <div className={s.productlist}>
                <div>              
                  <img src={pizza} alt="Pizza"/> 
                </div>
                 <div className={s.conteiner}>       
                  <h1>{this.state.product.productName}</h1>
                  <h2>Price: {this.state.product.price}</h2>
                  <h3>Unit: {this.state.product.unit}</h3>
                  <div className={s.add}>
                      <span className={s.spanmn} onClick={this.minus.bind(this)}><FiMinus/></span>
                      <input type="text" value={this.state.count}/>
                      <span className={s.spanpl} onClick={this.plus.bind(this)}><FiPlus/></span>
                  </div>
                  <MyContext.Consumer>
                {dispatch => {
                  return(
                  <button onClick={() => dispatch(this.state.product)}>Add to Cart</button>  
                  )
                 }}
                  </MyContext.Consumer>
                  </div>           
            </div>       
        </div>
    );
  }
}


export default ProductList;
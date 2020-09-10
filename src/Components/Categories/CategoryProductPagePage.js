import React, { Component } from "react";
import axios from "axios";
import s from "./Categories.module.css";
import icon from './404.png';
import pizza from './Pizza.jpg';
import { Link } from "react-router-dom";
import {MyContext} from '../../App'



class CatigorProd extends Component {
  constructor(props){
    super(props);
    this.state = {
    product: [],
    notFound: "",
    count: 0,
    cardProducts: [1,"hngn"]   
  }}

  componentDidMount() {     
    axios.post(`http://localhost:3001/CategoryProd`,{categoryId: this.props.match.params.index})
    .then(res => {
      const product = res.data;
      // console.log("product", product)
      this.setState({ product });
    })
    .catch(error =>{
      if(error.response.status === 404) this.setState({ notFound: <img src={icon} alt="Icon404" /> })
    })
    }

    

    // addToCard(product){
    //   let products = [];
    //   products.push(product)
    //   this.setState({
    //     cardProducts: this.state.cardProducts.concat(products)
    //   })
    // }
    
    // componentWillUnmount(){
    //   window.location.reload(false)
    // }
    
    
    render() {
      return (
        <div style={{minHeight: "100vh"}}>
        <div style={{display:"flex", flexWrap:"wrap", width: "100%"}}>
              {/* {console.log("stateproducts:", this.state.cardProducts)} */}
          {this.state.product.map((product, index) => (
            <div key={index} className={s.card}>
            <div>
              <Link to={`/products_list/${product.product_id}`}>
              <img src={pizza} alt="Pizza" style={{width:"70%"}}/> 
              </Link>
            </div>        
              <h2>{product.productName}</h2>
              <p>Price: {product.price}</p>
              <p>Unit: {product.unit}</p>
              <MyContext.Consumer>
                {dispatch => {
                  return(
                  <button onClick={() => dispatch(product)}>Add to Cart</button>
                  )}}
              </MyContext.Consumer>
            </div>
          ))}
        </div>
          <div className={s.img}>{this.state.notFound}</div>         
        </div>
    );
  }
}


export default CatigorProd;

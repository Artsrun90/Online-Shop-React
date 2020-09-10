import React, { Component } from "react";
import { Link } from "react-router-dom";
import s from "./search.module.css";
import Card from "./card.png";
import axios from "axios";

class Search extends Component {
  state = {
        search: "",
        products: [],
        notFound: "",
        productsForCard: []
      }
  
  
  searchProduct(){
    this.setState({
      products: [],
      notFound: ""
    })    
    axios.get(`http://localhost:3001/searchProduct/${this.state.search}`)
    .then(res => {
      const products = res.data;
      // console.log("product", products)
      this.setState({ products });
    })
    .catch(error =>{
      if(error.response.status === 404) this.setState({ notFound: "Not found!" })
    })
  }

  updateSearch(event){
    this.setState({
      search: event.target.value
    })
    // console.log("search", this.state.search)
  }

  reloadState(){
    this.setState({
      search: "",
      products: []
    })
  }


  render() {
    return (
        <div style={{marginTop: "100px"}}>                 
           <div className={s.searchcontainer}>
                 <form>
                      <input
                      type="text"
                      placeholder="Search product..."
                      value={this.state.search}
                      onChange={this.updateSearch.bind(this)}
                      onKeyUp={this.searchProduct.bind(this)}
                      name="search"
                      autoComplete="off"
                      />
                 </form>
                      { this.state.products.length !== 0 ?
                        <ul className={s.accordion}>
                        {this.state.products.map((product, index) => (
                         <li key={index}><Link onClick={this.reloadState.bind(this)} to={`/products_list/${product.id}`} className={s.liLink}>{product.productName}</Link></li>                
                        ))}
                        </ul>
                        : null
                      }
           </div>
           
           <div className={s.card}>
                 <Link to="/basket/card">
                   <img src={Card} />
                    <span className={s.spann}><b>{this.props.addProducts}</b></span>
                 </Link>
          </div>         
           
        </div>
    );
  }
}

export default Search;
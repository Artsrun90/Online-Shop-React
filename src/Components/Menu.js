import React, { Component } from "react";
import { Link } from "react-router-dom";
import s from "./Menu.module.css";
import Logo from './logo.png'
import Search from "./SearchAndCard/Search";
import axios from "axios";
// import {MyContext} from "../App"

class Menu extends Component {


  componentDidMount(){
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`http://localhost:3001/current`, {headers: {'Authorization': token }})
    .then(response =>{ 
        if(response.data === null){
          localStorage.removeItem('jwt'); 
        }
        })               
}


  render() {
    return (
      <div>
      <nav className={s.nav}>
        <Link to="/" style={{textDecoration:"none", marginLeft:"40px"}}>
        <img src={Logo} alt="Logo"/>
        </Link>
        <ul className={s.Menu}>
          
          <Link to="/home" style={{textDecoration:"none"}}>
            <li>Home</li>
          </Link>

          <Link to="/categories" style={{textDecoration:"none"}}>
            <li>Categories</li>
          </Link>

          <Link to="/about" style={{textDecoration:"none"}}>
            <li>About</li>
          </Link>

          {/* <Link to="/employees" style={{textDecoration:"none"}}>
            <li>Employees</li>
          </Link>
          <Link to="/product" style={{textDecoration:"none"}}>
            <li>Product</li>
          </Link>
          <Link to="/suppliers" style={{textDecoration:"none"}}>
            <li>Suppliers</li>
          </Link> */}
          </ul>
          {                                                                                                
          localStorage.getItem("jwt") ?
          <ul className={s.Menu1} style={{marginRight:"20px", width: "170px"}}>
          <Link to="/account" style={{textDecoration:"none"}}>
            <li>account</li>
          </Link>
          <Link to="/log_out" style={{textDecoration:"none"}}>
            <li>Log out</li>
          </Link>
          </ul>
          :         
          <ul className={s.Menu1}>
          <Link to="/registration" style={{textDecoration:"none"}}>
            <li>Sign Up</li>
          </Link>
          <Link to="/authorization" style={{textDecoration:"none"}}>
            <li>Sign In</li>
          </Link>
          </ul>
          }
      </nav>
      {/* <MyContext.Consumer> */}
        {/* {value => console.log("value:", value)} */}
      {/* </MyContext.Consumer> */}
      
        <Search addProducts={this.props.addProducts}/>
               
               {/* {console.log("search props:", this.props.productsForCard)} */}
      </div>
    );
  }
}

export default Menu;

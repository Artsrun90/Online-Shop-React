import React from "react";
import { Route, BrowserRouter, Switch} from "react-router-dom";
import "./App.css";
import axios from "axios";
// import Customers from "./Components/Customers/Customers";
// import Employees from "./Components/Employees/Employees";
// import Product from "./Components/Product/Product";
// import Shippers from "./Components/Shippers/Shippers";
// import Suppliers from "./Components/Suppliers/Suppliers";
// import Home from "./Components/";
import Categories from "./Components/Categories/Categories";
import Header from "./Components/Menu";
import Registration from "./Components/Registration/Registration";
import Authorization from "./Components/Authorization/Authorization";
import CatigorProd from "./Components/Categories/CategoryProductPagePage";
import Home from "./Components/Home/home";
import Footer from "./Components/footer/footer";
import About from "./Components/About/about";
import Logout from "./Components/logOut/logOut";
import Account from "./Components/account/account";
import Update from "./Components/account/update";
import ProductList from "./Components/Product/productList";
import Card from "./Components/Basket/card";

export const MyContext = React.createContext()
export const ContextForCard = React.createContext()


class App extends React.Component {

  state = {
    quantity: 0,
    dispatch: item => {
        this.addToCart(item)
      }
      // let quantity = item;
      // this.setState({quantity})
    
    }
    
    
    addToCart(item){
      let token = "Bearer " + localStorage.getItem("jwt");
        axios.get(`http://localhost:3001/current`, {headers: {'Authorization': token }})
        .then(response =>{ 
            console.log("response",response.status) 
            if(response.status === 200){               
              console.log("quantity", this.state.quantity)
              console.log("item", item.id)
              const productId = {"product_id": item.id, "quantity": 1}
              axios.post(`http://localhost:3001/new_cart`, productId)
            .then(response =>{ 
              console.log('state quantity', response)
              if (response.status === 200) {
                axios.get(`http://localhost:3001/cart`)
                .then(response =>{
                  const quantity = response.data.quantity;
                  this.setState({ quantity });
                  console.log("quantity", this.state.quantity)
                })
              }
            }).
            catch(this.setState({err:"Not added"}))
                        }
            })      
    }

  render(){
    // console.log("quantity123",this.state.quantity)
  return (
    <BrowserRouter>
        
        <Header addProducts={this.state.quantity}/>
        
        <Switch>
          <MyContext.Provider value={this.state.dispatch}>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <ContextForCard.Provider value={this.state.products}>
          <Route path="/basket/card" component={Card} />
          </ContextForCard.Provider>
          <Route path="/products_list/:productid" component={ProductList} />
          <Route path="/categories" component={Categories} />          
          <Route path="/categories-product/:index" component={CatigorProd}/>          
          <Route path="/about" component={About}/>
          {/* <Route path="/customers" component={Customers} />
          <Route path="/employees" component={Employees} />
          <Route path="/product" component={Product} />
          <Route path="/shippers" component={Shippers} />
          <Route path="/suppliers" component={Suppliers} /> */}
          <Route path="/authorization" component={Authorization} />
          <Route path="/registration" component={Registration} />
          <Route path="/account" component={Account} />
          <Route path="/update" component={Update} />
          <Route path="/log_out" component={Logout} />
          </MyContext.Provider>
        </Switch>
         <Footer/>
    </BrowserRouter>
  )};
}

export default App;

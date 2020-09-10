import React, { Component } from "react";
import axios from "axios";
import s from "./Valid.module.css";

class Registration extends Component {

  state = {
    email: "name",
    password: "password",
    customerName: "",
    contactName: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  ,
    errorForm: "",
    count: 0,
    error: "",
    err: ""
  };

  validate = () => {
    let errorForm = "";
    let err = "";
    
    if (
      this.state.email === "name" ||
      this.state.email.length < 10 ||
      this.state.email.match(/[0-9]/g) === null ||
      !this.state.email.includes("@") ||
      this.state.password === "password" ||
      this.state.password.length < 6 ||
      this.state.password.match(/[0-9]/g) === null      
    ) {
      errorForm = "You have a some ERROR";
    } else if (this.state.count === 3) {
      err = "Cannot login at this time. Contact the System Administrator";
    }

    if (errorForm) {
      this.setState({ errorForm });
      return false;
    } else if (err) {
      this.setState({ err });
      return false;
    }
    return true;
  };

  handleChange = event => {
    console.log("event:", event);
    console.log("event.target.name:", event.target.name);
    console.log("event.target.value:", event.target.value);
    console.log(this.state.count);
    console.log(this.state.email)

    this.setState({
      errorForm: this.state.error,
      [event.target.name]: event.target.value
    });
  };

  incrementCount() {
    this.setState({
      count: this.state.count + 1
    });
  }

  hanleSubmit = event => {
    event.preventDefault();
    const valid = this.validate();
    if (valid) {
         
      const form = event.target;
        const customer = {
          email:this.state.email,
          password: this.state.password,
          customerName: this.state.customerName,
          contactName: this.state.contactName, 
          address: this.state.address, 
          city: this.state.city, 
          postalCode: this.state.postalCode, 
          country: this.state.country
        }

        axios.post(`http://localhost:3001/customers`, {customer})
        .then(response =>{ 
            console.log(response)
            if(response.status === 201){ 
            this.setState({chek:true})
            console.log(this.state.chek)  
            } else{
              this.setState({chek:false})
            } 
            })    
          .then(() => {if(this.state.chek){
            this.setState({err:"Created"})            
          } else {
            this.setState({err:"Not created"})
          }})
          .catch(this.setState({err:"Not created"}))

        form.reset();  

      console.log(this.state);
    }
  };

  render() {
    return (
        <div>
          <div style={{height: "60px"}}></div>
        <form className={s.myform} onSubmit={this.hanleSubmit.bind(this)}>
        <h1>Sign Up</h1>
        <p>{this.state.errorForm}</p>
        <p>{this.state.err}</p>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            // pattern="^[ 0-9]+$"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            name="customerName"
            placeholder="Enter your Name"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            name="contactName"
            placeholder="Enter your contact Name"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            name="postalCode"
            placeholder="Enter your postalCode"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            name="country"
            placeholder="Enter your country"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Sign Up"
            onClick={this.incrementCount.bind(this)}
          />
        </div>
      </form>
        </div>
    );
  }
}

export default Registration;

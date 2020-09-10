import React, { Component } from "react";
import axios from "axios";
import s from "./account.module.css";

class Update extends Component {

  state = {
    email: "",
    password: "",
    customerName: "",
    contactName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    customerID: ""
  ,

    count: 0,
    error: "",
  };

  componentDidMount(){
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`http://localhost:3001/current`, {headers: {'Authorization': token }})
    .then(response =>{ 
        console.log("response",response.data)  
        this.setState({
            customerID: response.data.id,
            customerName: response.data.customerName,
            contactName: response.data.contactName,
            address: response.data.address,
            city: response.data.city,
            country: response.data.country,
            postalCode: response.data.postalCode,
            email: response.data.email,
        })
        })               
}

  validate = () => {
    let errorForm = "";
    let err = "";
    
    if (
      this.state.email.length === 0 ||
      this.state.email.length < 10 ||
      this.state.email.match(/[0-9]/g) === null ||
      !this.state.email.includes("@") ||
      this.state.password.length === 0 ||
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
    // const valid = this.validate();
    // if (valid) {
         
      const form = event.target;
        const updatecustomer = {
          customerName: this.state.customerName,
          contactName: this.state.contactName, 
          address: this.state.address, 
          city: this.state.city, 
          postalCode: this.state.postalCode, 
          country: this.state.country
        }

        let token = "Bearer " + localStorage.getItem("jwt")
        axios({ method: 'patch', url: `http://localhost:3001/customers/${this.state.customerID}`, headers: {'Authorization': token }, data: { customer: updatecustomer }})
        .then(response =>{ 
          console.log(response)
          if(response.status === 200) this.setState({ err: "Updated" });
          })    
      .catch(error => {
              if(error.response.status === 422){
                this.setState({error: "You have a some error!"})
              } 
      }); 

        form.reset();  

      console.log(this.state);
    
  };

  render() {
    return (
      <div>
        <div style={{height: "100px"}}></div>
        <form className={s.myform} onSubmit={this.hanleSubmit.bind(this)}>
        <h1>Update</h1>
        <p>{this.state.errorForm}</p>
        <p>{this.state.err}</p>
        {/* <div>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            defaultValue = {this.state.email}
            placeholder="Enter your Email"            
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            defaultValue = {this.state.password}
            placeholder="Enter your new Password"
            onChange={this.handleChange.bind(this)}
          />
        </div> */}
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="customerName"
            defaultValue = {this.state.customerName}
            placeholder="Enter your Name"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label>Contact name: </label>
          <input
            type="text"
            name="contactName"
            defaultValue = {this.state.contactName}
            placeholder="Enter your contact Name"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            defaultValue = {this.state.address}
            placeholder="Enter your address"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label>City: </label>
          <input
            type="text"
            name="city"
            defaultValue = {this.state.city}
            placeholder="Enter your city"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label>Postal code: </label>
          <input
            type="text"
            name="postalCode"
            defaultValue = {this.state.postalCode}
            placeholder="Enter your postalCode"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label>Country: </label>
          <input
            type="text"
            name="country"
            defaultValue = {this.state.country}
            placeholder="Enter your country"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Update"
            onClick={this.incrementCount.bind(this)}
          />
        </div>
      </form>
         </div>
    );
  }
}

export default Update;
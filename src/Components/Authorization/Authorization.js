import React, { Component } from "react";
import axios from "axios";
import s from "./Valid.module.css";

class Authorization extends Component {
  state = {
    email: "name",
    password: "password",

    count: 0,
    error: "",
  };

  

  handleChange = event => {
    this.setState({
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
    const auth = {"email": this.state.email, "password": this.state.password}
    // , "userName": this.state.userName
    axios.post(`http://localhost:3001/customer_token`, {auth})
    .then(response =>{ 
      localStorage.setItem("jwt", response.data.jwt);
      this.props.history.push("/");
      console.log("jwt",response.data.jwt)
    })
      .catch(error => {error.response.status === 404 ? this.setState({error: "You have some error"}): this.setState({err: ""})})
  };

  componentWillUnmount(){
    window.location.reload(false);
  }

  render() {
    return (
         <div>
           <div style={{height: "100px"}}></div>
         <form className={s.myform} onSubmit={this.hanleSubmit.bind(this)}>
        <h1>Sign In</h1>
        <p style={{color: "red"}}>{this.state.error}</p>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
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
            type="submit"
            value="Sign In"
            onClick={this.incrementCount.bind(this)}
          />
        </div>
      </form>
         </div>
    );
  }
}

export default Authorization;

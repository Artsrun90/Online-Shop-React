import React, { Component } from "react";
import axios from "axios";
import s from "./account.module.css";
import {Link} from 'react-router-dom';

class Account extends Component {
    state = {
        customerName: "",
        contactName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        email: "",

        error: ""
    }

    componentDidMount(){
        let token = "Bearer " + localStorage.getItem("jwt");
        axios.get(`http://localhost:3001/current`, {headers: {'Authorization': token }})
        .then(response =>{ 
            console.log("response",response.data) 
            if(response.data === null){
                this.setState({
                    error: "You are not logged!"
                })
            } else{
                this.setState({
                    customerName: response.data.customerName,
                    contactName: response.data.contactName,
                    address: response.data.address,
                    city: response.data.city,
                    country: response.data.country,
                    postalCode: response.data.postalCode,
                    email: response.data.email,
                })
                        }
            })               
    }

    render(){
        return(
            <div style={{minHeight: "62vh"}}>
                <div style={{height: "100px"}}></div>
                {this.state.error ?
                <div className={s.notLogin}><p>{this.state.error}</p></div>
                :
            <div className={s.acc}>
                <div>
                <label>Name: </label>
                <h3>{this.state.customerName}</h3>
                </div>
                
                <div>
                <label>Contacts: </label>
                <h3>{this.state.contactName}</h3>
                </div>

                <div>
                <label>Address: </label>
                <h3>{this.state.address}</h3>
                </div>

                <div>
                <label>City: </label>
                <h3>{this.state.city}</h3>
                </div>

                <div>
                <label>Postal code: </label>
                <h3>{this.state.postalCode}</h3>
                </div>

                <div>
                <label>Country: </label>
                <h3>{this.state.country}</h3>
                </div>

                <div>
                <label>Email: </label>
                <h3>{this.state.email}</h3>
                </div>
                <Link to='/update' style={{textDecoration:"none"}}>
                <button className={s.updateButton}>Update</button>
                </Link>
            </div>
    }
            </div>
        )
    }

}

export default Account;
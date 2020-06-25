import React, { Component } from 'react'
// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    signup(res) {
        const googleresponse = {
            Name: res.profileObj.name,
            email: res.profileObj.email,
            token: res.googleId,
            Image: res.profileObj.imageUrl,
            ProviderId: 'Google'
        };
        debugger;
        axios.post('http://localhost:5000/Login/SocialmediaData', googleresponse)
            .then((result) => {
                // let responseJson = result;
                sessionStorage.setItem("userData", JSON.stringify(result));
                this.props.history.push('/home')
            });
    };
    render() {
        const responseGoogle = (response) => {
            console.log(response);
            var res = response.profileObj;
            console.log(res);
            debugger;
            this.signup(response);
        }
        return (
            <div className="App">
                <div className="row">

                </div>
                <div className="row">
                    <div style={{ 'paddingTop': "20px" }} className="col-sm-12">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <GoogleLogin
                                clientId="329161322392-t41738mvn37n8tb0skeloknsb1sop6se.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} ></GoogleLogin>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login
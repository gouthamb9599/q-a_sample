import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
// var jwtDecode = require('jwt-decode');
import Button from '@material-ui/core/Button';
import Question from '../components/question';
export class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            questionmodel: false
        };
    }
    componentDidMount() {

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // const userdetails = jwtDecode(userData.data.token);
        console.log(userData.data.Name);
        this.setState({ name: userData.data.Name })
    }
    open = () => {
        this.setState({
            questionmodel: !this.state.questionmodel
        })
    }
    render() {
        return (
            <div className="container">

                <div className="col-sm-12 btn btn-info">
                    Welcome to Quora
                         </div>
                <div className="col-sm-3"> Welcome  :{this.state.name} </div>
                <Button onClick={e => this.open()} color="primary" autoFocus>
                    Add Question
          </Button>
                {this.state.questionmodel ? <Question /> : <></>}
            </div>
        )
    }

}
export default withRouter(Homepage)
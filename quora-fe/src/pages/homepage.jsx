import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
// var jwtDecode = require('jwt-decode');
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Question from '../components/question';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Axios from 'axios';
export class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tagsearch: '',
            Taglist: [],
            search: false,
            question: [],
            questionmodel: false
        };
    }

    componentDidMount() {

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // const userdetails = jwtDecode(userData.data.token);
        console.log(userData.data.Name);
        this.setState({ name: userData.data.Name })
        Axios.get(`http://localhost:5000/getquestions`).then(res => {
            var questionset = [];
            questionset = res.data.data
            this.setState({
                question: questionset
            })
            console.log(this.state.question)

        })
    }
    tags = () => {
        Axios.get(`http://localhost:5000/gettag?tagsearch=${this.state.tagsearch}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    Taglist: res.data.data,
                    search: true
                })
                console.log(this.state.Taglist);
            })
    }
    open = () => {
        this.setState({
            questionmodel: !this.state.questionmodel
        })
    }
    handleListItemClick = (event, data) => {
        Axios.get(`http://localhost:5000/getquestionstag?tagid=${data}`)
            .then(res => {
                console.log(res);
            })
        this.setState({
            search: false
        })
    };
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <div className="container">

                <div className="col-sm-12 headbar">
                    Welcome to Quora
                         </div>
                <div className="col-sm-12" style={{ paddingBottom: "15px" }}>
                    <div className="col-sm-3 paddiv"> Welcome  :{this.state.name} </div>

                    <Button variant="contained" onClick={e => this.open()} color="primary" autoFocus>
                        Add Question
          </Button >

                </div>
                {this.state.questionmodel ? <Question /> : <></>}
                <div className="col-sm-12">
                    <TextField id="outlined-basic" label="Search with Tags" name="tagsearch" variant="outlined" placeholder="Search with Tags" value={this.state.tagsearch} onChange={e => this.handleChange(e)} ></TextField>
                    <Button className="setbuttonsize" variant="contained"
                        onClick={e => this.tags()} style={{ height: "54px" }} color="primary" >
                        <SearchTwoToneIcon />
                    </Button >
                    <div className="which">
                        {this.state.question.map((data) => (
                            <div>
                                <div className="questionset">
                                    <label> Question:</label>
                                    <textarea style={{ height: "31px", width: "555px" }} name="questionhead" selectTextOnFocus={false} editable={false} cols="50" rows="5" value={data.question_heading}></textarea>
                                </div>
                                <Divider variant="middle" />
                                <div>
                                    <div className="questionset" >
                                        <label>Description:</label> <textarea style={{ height: "84px", width: "555px" }} name="questiondesc" selectTextOnFocus={false} editable={false} cols="50" rows="5" value={data.question_desc}></textarea>
                                    </div>
                                    <Divider variant="middle" />
                                    <div>
                                        <Button className="upvotesize" variant="contained" color="primary"><ExpandLessIcon></ExpandLessIcon></Button>
                                        <Button className="upvotesize" variant="contained" color="primary"><CommentIcon /></Button>
                                        <Button className="upvotesize" variant="contained" color="primary"><QuestionAnswerIcon /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="set">
                        {this.state.search ?
                            <div className="tagdisplay">
                                {this.state.Taglist.map((data) => (
                                    <ListItem
                                        button
                                        onClick={(event) => this.handleListItemClick(event, data.id)}>
                                        <ListItemText primary={data.name} />
                                    </ListItem>
                                ))}
                            </div> : <></>}
                    </div>

                </div>

            </div >
        )
    }

}
export default withRouter(Homepage)
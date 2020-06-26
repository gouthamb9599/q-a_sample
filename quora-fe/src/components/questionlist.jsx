import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
// var jwtDecode = require('jwt-decode');
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Axios from 'axios';
import '../pages/overall.css'

export default function Questionlist(props) {
    const [Ans, setAns] = React.useState(false);
    const [Com, setCom] = React.useState(false);
    const [Comans, setComans] = React.useState(false);
    const upvote1 = props.upvote;
    var upvote2 = 0;
    const [Upvoteques, setUpvoteques] = React.useState(false);
    const [Upvoteans, setUpvoteans] = React.useState(false);
    const [Commentarray, setCommentarray] = React.useState([]);
    const [Commentanswerarray, setCommentanswerarray] = React.useState([]);
    const [Answerarray, setAnswerarray] = React.useState([]);
    const [Comment, setComment] = React.useState('');
    const [Anscomment, setAnscomment] = React.useState('');
    const [Answer, setAnswer] = React.useState('');
    useEffect(() => {
        Axios.get(`http://localhost:5000/getcomment?id=${props.id}`)
            .then(res => {
                console.log(res.data.data);
                setCommentarray(res.data.data);
                // console.log(Commentarray);
            })
        Axios.get(`http://localhost:5000/getanswer?id=${props.id}`)
            .then(res => {
                console.log(res.data.data);
                setAnswerarray(res.data.data);
                // console.log(Answerarray);
            })

    }, [])
    // const [Answer, setAnswer] = React.useState([]);
    // const [Comment, setComment] = React.useState([]);
    // const [Upvote, setUpvote] = React.useState([]);
    // countcall = (props) => {

    //     data.forEach(element => {
    //         answer.push(element.answer_count);
    //         comment.push(element.comment_count);
    //         upvote.push(element.upvote)
    //     });
    //     console.log(answer[0], comment[0], upvote[0]);
    // }
    // const upvote = (question_id, upvote, index) => {
    //     Axios.post(`http://localhost:5000/upvote`, { id: question_id, vote: upvote + 1, })
    //         .then(res => {
    //             console.log(res);
    //             props.upvotearray[index] = res.data;
    //         })
    // }
    // upvotearray={this.state.upvote} commentarray={this.state.comment} answerarray={this.state.answer}
    const commentdis = () => {
        setCom(!Com);
        console.log(Commentarray)
    }
    const answerdis = () => {
        setAns(!Ans);
        console.log(Answerarray)
    }
    const commentans = (id) => {
        Axios.get(`http://localhost:5000/getcommentanswer?id=${id}`)
            .then(res => {
                console.log(res.data.data);
                setCommentanswerarray(res.data.data);
                // console.log(Commentarray);
            })
        setComans(!Comans);
    }
    const handleAchange = (event) => {
        setAnswer(event.target.value);
    }
    const handleCchange = (event) => {
        setComment(event.target.value);
    }
    const handleACchange = (event) => {
        setAnscomment(event.target.value);
    }
    const commentstore = (id) => {
        setCom(!Com);
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // const userdetails = jwtDecode(userData.data.token);
        console.log(userData.data.id);
        // this.setState({ name: userData.data.id })
        Axios.post(`http://localhost:5000/addcommentforQ`, { questionid: id, comment: Comment, userid: userData.data.id })
            .then(res => {
                console.log(res);
            })
        Axios.get(`http://localhost:5000/getcomment?id=${props.id}`)
            .then(res => {
                console.log(res.data.data);
                setCommentarray(res.data.data);
                // console.log(Commentarray);
            })

    }
    const answerstore = (id) => {
        setAns(!Ans);
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // const userdetails = jwtDecode(userData.data.token);
        console.log(userData.data.id)
        Axios.post(`http://localhost:5000/addanswer`, { questionid: id, answer: Answer, userid: userData.data.id })
            .then(res => {
                console.log(res);
            })
        Axios.get(`http://localhost:5000/getanswer?id=${props.id}`)
            .then(res => {
                console.log(res.data.data);
                setAnswerarray(res.data.data);
                // console.log(Answerarray);
            })
    }
    const upvoteques = (data) => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // const userdetails = jwtDecode(userData.data.token);
        console.log(userData.data.id);
        setUpvoteques(true);
        Axios.post('http://localhost:5000/upvote', { upvote: data + 1, id: userData.data.id })
            .then(res => {
                console.log(res);
            })
    }

    const commentstoreans = (id, answerid) => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        // const userdetails = jwtDecode(userData.data.token);
        console.log(userData.data.id, Anscomment, answerid);
        Axios.post(`http://localhost:5000/storeanscomment`, { userid: userData.data.id, comment: Anscomment, answerid: answerid })
            .then(res => {
                console.log(res)
            })
        Axios.get(`http://localhost:5000/getcommentanswer?id=${id}`)
            .then(res => {
                console.log(res.data.data);
                setCommentanswerarray(res.data.data);
                // console.log(Commentarray);
            })


    }
    const upvoteans = (data, id) => {
        upvote2 = data + 1;
        Axios.post('http://localhost:5000/upvoteans', { upvote: data + 1, id: id })
            .then(res => {
                console.log(res);
            })
        setUpvoteans(true);
    }
    return (
        <div>
            <div>
                <div className="questionset">
                    <label> Question:</label>
                    <textarea style={{ height: "31px", width: "630px", border: "none" }} name="questionhead" selectTextOnFocus={false} editable={false} cols="50" rows="5" value={props.head}></textarea>
                </div>
                <Divider variant="middle" />
                <div>
                    <div className="questionset" >
                        <label>Description:</label> <textarea style={{ height: "84px", width: "630px", border: "none", overflow: "auto" }} name="questiondesc" selectTextOnFocus={false} editable={false} cols="50" rows="5" value={props.desc} ></textarea>
                    </div>
                    <div >
                        {/* disabled={this.state.disabledup} */}
                        <Button onClick={e => upvoteques(upvote1)} className="upvotesize" disabled={Upvoteques} variant="contained" color="primary">{Upvoteques ? upvote1 + 1 : upvote1}<ExpandLessIcon></ExpandLessIcon></Button>
                        <Button onClick={e => commentdis()} className="upvotesize" variant="contained" color="primary">{props.comment}<CommentIcon /></Button>
                        <Button onClick={e => answerdis()} className="upvotesize" variant="contained" color="primary">{props.answer}<QuestionAnswerIcon /></Button>
                    </div>
                </div>
            </div>
            {Com ? <div>
                <div className="questionset">
                    <label> Comments:</label>
                    <div>
                        {Commentarray.map((data) => (
                            <div className="answerdisplay">
                                <label>id:{data.user_id}</label>
                                <textarea style={{ height: "31px", width: "630px", border: "none" }} name="commenthead" selectTextOnFocus={false} editable={false} cols="50" rows="5" value={data.comment}></textarea>
                            </div>
                        ))}
                    </div>
                    <Divider variant="middle" />
                </div>
                <div className="questionset">
                    <label> Question Comment:</label>
                    <textarea style={{ height: "31px", width: "630px", border: "none" }} name="questionhead" placeholder="Enter your Comment" cols="50" rows="5" value={Comment} onChange={e => handleCchange(e)}></textarea>
                </div>

                <Button onClick={e => commentstore(props.id)} className="upvotesize" variant="contained" color="secondary">submit</Button>
                <Button onClick={e => commentdis()} className="upvotesize" variant="contained" color="secondary">close</Button>
            </div> : <></>}
            {Ans ?
                <div>
                    <div className="questionset">

                        <div>
                            {Answerarray.map((data) => (
                                <div>
                                    <div className="questionset">
                                        <label> Answers:</label>
                                        <label>id:{data.user_id}</label>
                                        <textarea style={{ height: "31px", width: "630px", border: "none" }} name="commenthead" selectTextOnFocus={false} editable={false} cols="20" rows="5" value={data.answer}></textarea>
                                    </div>
                                    <Divider variant="middle" />
                                    <div>
                                        {upvoteans ?
                                            <div>
                                                < Button onClick={e => upvoteans(data.answer_id, data.upvote)} className="upvotesize" disabled={Upvoteans} variant="contained" color="primary">{data.upvote}
                                                    <ExpandLessIcon></ExpandLessIcon></Button>
                                                <Button onClick={e => commentans(data.answer_id)} className="upvotesize" variant="contained" color="primary"><CommentIcon /></Button></div>
                                            :
                                            <div>
                                                <Button className="upvotesize" disabled={Upvoteans} variant="contained" color="primary">{upvote2}< ExpandLessIcon ></ExpandLessIcon></Button>
                                                <Button onClick={e => commentans(data.answer_id)} className="upvotesize" variant="contained" color="primary"><CommentIcon /></Button>
                                            </div>}
                                    </div>
                                    {Comans ? <div>
                                        <div className="questionset">
                                            <label> Comments:</label>
                                            <div>
                                                {Commentanswerarray.map((data) => (
                                                    <div className="answerdisplay">
                                                        <label>id:{data.userid}</label>
                                                        <textarea style={{ height: "31px", width: "630px", border: "none" }} name="commenthead" selectTextOnFocus={false} editable={false} cols="50" rows="5" value={data.comment}></textarea>
                                                    </div>
                                                ))}
                                            </div>
                                            <Divider variant="middle" />
                                        </div>
                                        <div className="questionset">
                                            <label> Answer Comment:</label>
                                            <textarea style={{ height: "31px", width: "630px", border: "none" }} name="questionhead" placeholder="Enter your Comment" cols="50" rows="5" value={Anscomment} onChange={e => handleACchange(e)}></textarea>
                                        </div>

                                        <Button onClick={e => commentstoreans(data.userid, data.answer_id)} className="upvotesize" variant="contained" color="secondary">submit</Button>
                                        <Button onClick={e => commentdis()} className="upvotesize" variant="contained" color="secondary">close</Button>
                                    </div> : <></>}

                                </div>
                            ))}
                        </div >
                    </div >
                    <Divider variant="middle" />
                    <div className="questionset">
                        <label> Answer:</label>
                        <textarea style={{ height: "31px", width: "630px", border: "none" }} name="questionhead" placeholder="Enter your Answer" cols="50" rows="5" value={Answer} onChange={e => handleAchange(e)}></textarea>
                    </div>

                    <Button onClick={e => answerstore(props.id)} className="upvotesize" variant="contained" color="secondary">submit</Button>
                    <Button onClick={e => answerdis()} className="upvotesize" variant="contained" color="secondary">close</Button>

                </div > : <></>
            }
        </div >)
}
const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const AnswerController = () => { };

AnswerController.newans = (params, res) => {
    client.query(`insert into answers(answer,user_id,question_id) values($1,$2,$3) RETURNING *`, [params.answer, params.userid, params.questionid],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                    client.query(`select count(*) from answers where question_id=${params.questionid} `,
                        (err, result) => {
                            if (err) console.log(err);
                            else {
                                console.log(result.rows[0].count)
                                client.query(`update questions set answer_count=${result.rows[0].count} where question_id=${params.questionid}`)
                            }
                        })
                }
            }
        })
}
AnswerController.getcomm = (params, res) => {
    client.query(`select * from answer_comments where answer_id=${params}`, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        }
    }
    )
}
AnswerController.getans = (params, res) => {
    client.query(`select * from answers where question_id=${params} order by upvote desc`, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        }
    })
}
AnswerController.storec = (params, res) => {
    client.query(`insert into  answer_comments(comment,answer_id,userid) values($1,$2,$3) RETURNING *`, [params.comment, params.answerid, params.userid],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                    client.query(`select count(*) from answers_comments where answer_id=${params.answerid} `,
                        (err, result) => {
                            if (err) console.log(err);
                            else {
                                console.log(result.rows[0].count)
                                client.query(`update answer set answercommentcount=${result.rows[0].count} where answer_id=${params.answerid}`)
                            }
                        })
                }
            }
        })
}
AnswerController.upvote = (params, res) => {
    client.query(`update answers set upvote=$1 where answer_id=$2  RETURNING upvote`, [params.upvote, params.id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                res.send({ success: true, data: results.rows[0] })
            }
        }
    })
}

module.exports = AnswerController;
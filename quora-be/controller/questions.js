const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const QuestionController = () => { };
QuestionController.addques = (params, res) => {
    client.query(`insert into questions(question_heading,question_desc,user_id,tag_id) values($1,$2,$3,$4)`,
        [params.questionheading, params.questiondesc, params.userid, params.tag],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                }
            }
        })
}
QuestionController.getall = (res) => {
    client.query(`select * from questions order by upvote desc`, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                res.send({ success: true, data: results.rows })
            }
        }
    })
}
QuestionController.gettag = (params, res) => {
    client.query(`select * from questions where tag_id=$1`, [params], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                res.send({ success: true, data: results.rows })
            }
        }
    })
}
QuestionController.upvote = (params, res) => {
    client.query(`update questions set upvote=$1 where question_id=$2  RETURNING upvote`, [params.upvote, params.id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                res.send({ success: true, data: results.rows[0] })
            }
        }
    })
}
QuestionController.quesc = (params, res) => {
    client.query(`insert into question_comments(comment,question_id,user_id) values($1,$2,$3) RETURNING *`, [params.comment, params.questionid, params.userid],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                    client.query(`select count(*) from question_comments where question_id=${params.questionid} `,
                        (err, result) => {
                            if (err) console.log(err);
                            else {
                                console.log(result.rows[0].count)
                                client.query(`update questions set comment_count=${result.rows[0].count} where question_id=${params.questionid}`)
                            }
                        })
                }
            }

        })
}
QuestionController.quesgc = (params, res) => {
    client.query(`select * from question_comments where question_id=${params}`, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        }
    })
}

module.exports = QuestionController;
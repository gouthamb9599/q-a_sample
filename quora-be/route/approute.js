const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post("/logingoogle", (req, res) => {
        console.log(req.body)
        const google = req.body;
        const password = "";
        client.query('select * from details where email=$1 and token=$2', [google.email, google.token],
            (err, results) => {
                if (err) console.log(err);
                else {
                    // console.log(results);
                    if (results.rowCount === 1) {
                        let token = jwt.sign({ data: google, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                            "secret"
                        );
                        // console.log(token)
                        res.send({ success: true, token, Name: google.Name, id: results.rows[0].id });
                    }
                    else {
                        client.query(`insert into details(name,email,providername,image,token,password) values($1,$2,$3,$4,$5,$6) RETURNING id`,
                            [google.Name, google.email, google.ProviderId, google.Image, google.token, password],
                            (err, results) => {
                                if (err) console.log(err);
                                else {
                                    console.log("user data entered successfully through google ID");
                                    // console.log(results)
                                    let token = jwt.sign({ data: google, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                                        "secret"
                                    );
                                    // console.log(token)
                                    res.send({ success: true, token, Name: google.Name, id: results.rows[0].id });
                                }

                            });
                    }
                }
            })
    })
    app.post('/login', (req, res) => {
        console.log(req.body);
        const data = req.body;
        client.query(`select * from details where email=$1 and password=$2`, [data.email, data.password],
            (err, results) => {
                if (err) console.log(err);
                else {
                    console.log('access successful')
                    // console.log(results.rows[0])
                    let token = jwt.sign({ data: results.rows[0], exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret")
                    // console.log(token);
                    res.send({ success: true, token, Name: results.rows[0].name, id: results.rows[0].id })
                }

            })
    })
    app.post("/signup", (req, res) => {
        const data = req.body;
        client.query(`insert into details(name,email,providername,password) values($1,$2,$3,$4) RETURNING *`,
            [data.name, data.email, data.ProviderId, data.password], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log("user data entered successfully");
                    res.send({ success: true })
                }
            })

    })
    app.get("/gettags", (req, res) => {
        client.query('select * from tags', (err, results) => {
            if (err) console.log(err);
            else {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        })
    })
    app.get("/gettag", (req, res) => {
        const data = req.query.tagsearch;
        client.query(`select * from tags where name like '%${data}%'`, (err, results) => {
            if (err) console.log(err);
            else {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        })
    })
    app.post('/addquestion', (req, res) => {
        console.log(req.body);
        const questiondata = req.body;
        client.query(`insert into questions(question_heading,question_desc,user_id,tag_id) values($1,$2,$3,$4)`,
            [questiondata.questionheading, questiondata.questiondesc, questiondata.userid, questiondata.tag],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true })
                    }
                }
            })
    })
    app.get('/getquestions', (req, res) => {
        client.query(`select * from questions order by upvote desc`, (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.get('/getquestionstag', (req, res) => {
        const tag = req.query.tagid;
        console.log('114', tag);
        client.query(`select * from questions where tag_id=$1`, [tag], (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.post('/upvote', (req, res) => {
        const id = req.body.id;
        const upvote = req.body.vote;
        client.query(`update questions set upvote=$1 where question_id=$2  RETURNING upvote`, [upvote, id], (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows[0] })
                }
            }
        })
    })
    app.post('/addcommentforQ', (req, res) => {
        const data = req.body;
        client.query(`insert into question_comments(comment,question_id,user_id) values($1,$2,$3) RETURNING *`, [data.comment, data.questionid, data.userid],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true })
                        client.query(`select count(*) from question_comments where question_id=${data.questionid} `,
                            (err, result) => {
                                if (err) console.log(err);
                                else {
                                    console.log(result.rows[0].count)
                                    client.query(`update questions set comment_count=${result.rows[0].count} where question_id=${data.questionid}`)
                                }
                            })
                    }
                }

            })

    })
    app.post('/addanswer', (req, res) => {
        const data = req.body;
        client.query(`insert into answers(answer,user_id,question_id) values($1,$2,$3) RETURNING *`, [data.answer, data.userid, data.questionid],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true })
                        client.query(`select count(*) from answers where question_id=${data.questionid} `,
                            (err, result) => {
                                if (err) console.log(err);
                                else {
                                    console.log(result.rows[0].count)
                                    client.query(`update questions set answer_count=${result.rows[0].count} where question_id=${data.questionid}`)
                                }
                            })
                    }
                }
            })
    })
    app.get('/getcomment', (req, res) => {
        const id = req.query.id;
        client.query(`select * from question_comments where question_id=${id}`, (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows);
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.get('/getanswer', (req, res) => {
        const id = req.query.id;
        client.query(`select * from answers where question_id=${id} order by upvote desc`, (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows);
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.post('/upvoteans', (req, res) => {
        const upvote = req.body.upvote;
        const id = req.body.id
        client.query(`update answers set upvote=$1 where answer_id=$2  RETURNING upvote`, [upvote, id], (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows[0] })
                }
            }
        })
    })
};
module.exports = route;
const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post("/logingoogle", (req, res) => {
        console.log(req.body)
        const params = req.body;
        const controller = require('../controller/details.js');
        controller.googlelogin(params, res);

    })
    app.post('/login', (req, res) => {
        // console.log(req.body);
        const params = req.body;
        const controller = require('../controller/details.js');
        controller.login(params, res);

    })
    app.post("/signup", (req, res) => {
        const params = req.body;
        const controller = require('../controller/details.js');
        controller.signup(params, res);
    })
    app.get("/gettags", (req, res) => {
        const controller = require('../controller/tags.js');
        controller.getall(res);
    })
    app.get("/gettag", (req, res) => {
        const params = req.query.tagsearch;
        const controller = require('../controller/tags.js');
        controller.search(params, res);

    })
    app.post('/addquestion', (req, res) => {
        console.log(req.body);
        const params = req.body;
        const controller = require('../controller/questions.js');
        controller.addques(params, res);
    })
    app.get('/getquestions', (req, res) => {
        const controller = require('../controller/questions.js');
        controller.getall(res);

    })
    app.get('/getquestionstag', (req, res) => {
        const params = req.query.tagid;
        const controller = require('../controller/questions.js');
        controller.gettag(params, res);

    })
    app.post('/upvote', (req, res) => {
        const params = req.body;
        const controller = require('../controller/questions.js');
        controller.upvote(params, res);

    })
    app.post('/addcommentforQ', (req, res) => {
        const params = req.body;
        const controller = require('../controller/questions.js');
        controller.quesc(params, res);


    })
    app.post('/addanswer', (req, res) => {
        const params = req.body;
        const controller = require('../controller/answer.js');
        controller.newans(params, res);

    })
    app.get('/getcomment', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/questions.js');
        controller.quesgc(params, res);

    })
    app.get('/getanswer', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/answer.js');
        controller.getans(params, res);

    })
    app.get('/getcommentanswer', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/answer.js');
        controller.getcomm(params, res);

    })
    app.post('/storeanscomment', (req, res) => {
        const params = req.body;
        const controller = require('../controller/answer.js');
        controller.storec(params, res);

    })
    app.post('/upvoteans', (req, res) => {
        const params = req.body;
        const controller = require('../controller/answer.js');
        controller.upvote(params, res);

    })
};
module.exports = route;
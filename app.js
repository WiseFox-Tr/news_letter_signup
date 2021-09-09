const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/signup.html")
})

app.post("/", function(req, res){
    console.log("request on '/' url")
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    console.log("user first name : " + firstName + "\nuser last name : " + lastName +"\nuser mail : " + email)
})

const port = process.env.PORT
app.listen(port, function(){
    console.log("Server started on port " + port)
})

const API_KEY = process.env.API_KEY
const AUDIENCE_LIST_ID = process.env.AUDIENCE_LIST_ID
console.log("API KEY = " + API_KEY + "\nAUDIENCE ID = " + AUDIENCE_LIST_ID)
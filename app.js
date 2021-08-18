const express = require("express")

const app = express()
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
const port = 3000

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

app.listen(port, function(){
    console.log("Server started on port " + port)
})

const express = require("express")

const app = express()
app.use(express.static('public'));


const port = 3000

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/signup.html")
})

app.listen(port, function(){
    console.log("Server started on port " + port)
})

const express = require("express")
const dotenv = require("dotenv")
const mailchimp = require("@mailchimp/mailchimp_marketing")

dotenv.config()
mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER_PREFIX
  });

const app = express()
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/signup.html")
})

app.post("/", function(req, res) {
    console.log("request on '/' url")
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const listId = process.env.AUDIENCE_LIST_ID;

    async function subscribeUser() {
        const response = await mailchimp.lists.addListMember(
            listId,
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ).catch((error) => {
            //fail case 
            console.error(error) 
            res.sendFile(__dirname + "/public/html/failure.html")
        })
        //success case
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`)
        res.sendFile(__dirname + "/public/html/success.html")
    }

    subscribeUser()
})

const port = process.env.PORT
app.listen(port, function(){
    console.log("Server started on port " + port)
})

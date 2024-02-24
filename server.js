const express = require("express")
const fs = require("fs")
const app = express()
let users = require("./MOCK_DATA.json")
const bodyParser = require("body-parser")


app.use(express.urlencoded({extended:false}))

app.get("/users", (req,res) => {
    res.json(users)
})
app.route("/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    res.json(user)
}).patch((req,res) => {
    const id = Number(req.params.id);
    const updatedUser = req.body;
    console.log(updatedUser)
    users = users.map((user) => {
        if(user.id === id) {
            return {...user,...updatedUser }
        }
        return user
    })
    fs.writeFile("./MOCK_DATA.JSON", JSON.stringify(users), (err,result) => {
        return res.json(users)
    })

}).delete((req,res) => {
    const id = Number(req.params.id);
    const user = users.filter((user) => user.id !== id)
    fs.writeFile("./MOCK_DATA.JSON", JSON.stringify(users), (err,result) => {
        return res.json(users)
    })
})

app.post("/users", (req,res) => {
    const body = req.body;
    console.log("body",body)
    users.push({...body,id:users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,result) => {
        if(err) {
            console.log(err)
        }
         return  res.json(users)
    })
    
})

app.listen(3000)
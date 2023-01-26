var express = require("express")
var app = express()
var path = require("path")
var bodyparser = require("body-parser")
var mongoose =  require("mongoose")
const { response } = require("express")
var port = process.env.port||3000


app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/gameEntries",{
    useNewURLParser:true 
}).then(function(){
    console.log("Connect to MongoDB Database")
}).catch(function(err){
    console.log(err)
})

require("./models/Game")
var Game = mongoose.model("game")

//example routes
app.get("/",  function(req,res){
    res.send("Hello There you niqupoop")
})

app.get("/poop",  function(req,res){
    res.send("Your Butt face")
})

app.use(express.static(__dirname+"/pages"))
app.post("/saveGame", function(req,res){
        console.log(req.body)
        new Game(req.body).save().then(function(){
            //res.send(req.body)
            res.redirect("index.html")

        })

})

app.get("/getGames",function(req,res){
    Game.find({}).then(function(game){
        console.log({game})
        res.json({game})
    })
})


app.listen(port, function(){
        console.log(`Running on port ${port}`)

})




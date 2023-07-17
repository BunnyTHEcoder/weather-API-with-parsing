const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html")
});
app.post("/" , function(req,res){
    const query = req.body.ctynm;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=294982b1d1c46a06b165d93010bd5819&units=metric";
    https.get(url , function(rsp){
        console.log(rsp);
        rsp.on("data" , function(data){
            const wdata = JSON.parse(data);
            const temp = wdata.main.temp;
            const mn = wdata.weather[0].main;
            const m = wdata.weather[0].icon;
            const urll = "http://openweathermap.org/img/wn/" + m + "@2x.png"
            res.write("<p> The Weather in "+query +" is surrounded with " + mn + "</p>" );
            res.write("<h1> Temperature is " + temp + " degrees <h1>");
            res.write("<img src = " + urll + ">");
            res.send();
        });
    });
});
app.listen(3000 , function(){
    console.log("Server Started")
})
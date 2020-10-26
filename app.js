const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "0435441e8a41970063e3d94e13a2b0a9";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + units + "#";

    https.get(url, function (resp) {
        console.log(resp.statusCode);

        resp.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log("Weather description: " + desc);
            console.log("Current Temperature: " + temp);


            res.write("<p>The weather is currently " + desc + ".</p>");
            res.write("<h1>The temperature in "+ query + " is " + temp + " Degrees Celsius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server started running on port 3000...");
})
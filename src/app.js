const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// setting paths for express config
const publicDirectory = path.join(__dirname, "../public");
const newViewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setting handle bars and view engine
app.set("view engine", "hbs");
app.set("views", newViewPath);

hbs.registerPartials(partialPath);
// setting static directory for server
app.use(express.static(publicDirectory));
console.log("hi there");
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shubham Karmalkar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Shubham Karmalkar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Shubham Karmalkar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "must provide address",
    });
  }
  const { address } = req.query;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) return res.send({ error });

      res.send({
        location,
        forecast: forecastdata,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "help request not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "page not found ",
  });
});

app.listen(port, () => {
  console.log("listening to port " + port);
});

//app.com
//app.com/help
//app.com/about

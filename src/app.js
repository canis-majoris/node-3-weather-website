const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths of express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to use
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("weather", {
    title: "Weather",
    name: "Gigi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Gigi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must provide a address",
    });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error)
        return res.send({
          error,
        });

      forecast([latitude, longitude], (error, forecastData) => {
        if (error)
          return res.send({
            error,
          });
        console.log(forecastData);
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "You must provide a search term",
    });

  res.send({
    products: {},
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Gigi",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Gigi",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Gigi",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

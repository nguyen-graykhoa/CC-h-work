const express = require("express");
const res = require("express/lib/response");
const app = express();

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser('SecretStringForCookies'));
app.use(session({ 
  secret: 'SecretStringtForSession',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
 }));
app.use(flash());

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

const logger = require("morgan");
const req = require("express/lib/request");
app.use(logger("dev"));

app.set("view engine", "ejs");

app.set("views", "views");

const cohortRouter = require("./routes/cohorts.js");
app.use("/cohorts", cohortRouter);

app.get("/", function (req, res) {
  res.render("home");
});


const PORT = 3000;
const DOMAIN = "localhost";

//serve the express server
app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on http://${DOMAIN}:${PORT}`);
});
const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const app = express();
const path = require('path');
const auth = require("./routers/googleAuthRouter");
const PORT = process.env.PORT || 5000;
require("./middlewares/authentications/googleAuthentication");
require("dotenv").config();

// view engine: hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

// cookie session
app.use(cookieSession({
    name: "google-auth-session",
    keys: [process.env.GOOGLE_KEY1, process.env.GOOGLE_KEY2]
}))

// passport initialization
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
app.use(auth);
app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
    console.log("Ready on http://localhost:" + PORT);
  });
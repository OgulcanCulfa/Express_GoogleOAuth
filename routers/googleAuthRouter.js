const router = require("express")();
const passport = require("passport");
const verifyAuth = require("../middlewares/authentications/verifyAuth");

router.get("/", (req, res) => {
  res.render("index.hbs", {
    name: "Ogulcan",
  });
});

router.get("/failed", (req, res) => {
  res.send("Failed");
});

router.get("/success", verifyAuth, (req, res) => {
    // req.user._json contains all information
  res.send(`Welcome ${req.user.displayName}`);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    res.redirect("/success");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;

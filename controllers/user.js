const User = require("../models/user");

module.exports.renderSignUpForm = (req, res, next) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash('success', `Welcome to TOP ~ Deal's ${registeredUser.username}`)
            res.redirect("/top-deal");
        })
        console.log(registeredUser);
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", `Welcome back to TOP~DEAL's, You are logged in!`);
    let redirectUrl = res.locals.redirectUrl || "/top-deal";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/top-deal");
    })
}
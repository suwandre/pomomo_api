module.exports = (app, passport) => {

    //home page
    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });

   
    // show the login form
    app.get('/login', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

   //if user is authenticated this function is fired up
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    //logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
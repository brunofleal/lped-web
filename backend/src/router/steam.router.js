const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth',
    passport.authenticate('steam'),
    function (req, res) {
        // The request will be redirected to Steam for authentication, so
        // this function will not be called.
    });

router.get('/auth/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect register page.
        res.redirect('/');
    });


module.exports = router;
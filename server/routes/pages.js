/*const express = require('express')
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./views');
const twing = new TwingEnvironment(loader);
const authController = require('../controllers/auth')
const pagesController = require('../controllers/pages')
const router = express.Router()

router.get('/', authController.ifLoggedin, (req, res, next) => {
    twing.render('index.twig', { 'title': 'Login' }).then((output) => {
        res.end(output);
    });
})

router.get('/register', authController.ifLoggedin, (req, res) => {
    twing.render('register.twig', { 'title': 'Database Setup' }).then((output) => {
        res.end(output);
    });
})

router.get('/dashboard', authController.ifNotLoggedin, pagesController.getUserData)

module.exports = router*/
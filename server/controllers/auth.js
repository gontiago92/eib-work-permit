const db = require('../lib/db.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./views');
const twing = new TwingEnvironment(loader);

exports.ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
},

exports.ifLoggedin = (req, res, next) => {

    if(req.session.isLoggedIn){
        return res.redirect('/dashboard');
    }

    next();
},

exports.logout = (req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
}

exports.login = async (req, res) => {
        const { username, password } = req.body

        if(!username || !password) {
            return twing.render('index.twig', { 'type': 'danger', 'message': 'Please provide an email and a password !' }).then((output) => {
                res.end(output);
            })
        }

        db.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, username], async (error, results) => {
            //console.log(await bcrypt.compare(password, results[0].password))
            if(results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {
                return twing.render('index.twig', { 'type': 'danger', 'message': 'Wrong credentials !' }).then((output) => {
                    res.status(401).end(output);
                })
            }else {

                req.session.isLoggedIn = true;
                req.session.userID = results[0].id;

                res.status(200).redirect('/dashboard');

            }
        })
}

exports.register = (req, res) => {
    console.log(req.body)

    const { username, email, password, passwordConfirm } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error)
        }
        console.log(result)
        if (result.length > 0) {
            return twing.render('register.twig', { 'type': 'danger', 'message': 'That email is already in use !' }).then((output) => {
                res.end(output);
            });
        } else if (password !== passwordConfirm) {
            return twing.render('register.twig', { 'type': 'danger', 'message': 'Passwords do not match !' }).then((output) => {
                res.end(output);
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8)
        console.log(hashedPassword)

        db.query('INSERT INTO users SET ?', { username: username, email: email, password: hashedPassword }, (error, results) => {
            if(error) {
                console.log(error)
            } else {
                console.log(results)
                return twing.render('index.twig', { 'type': 'success', 'message': 'User registered !' }).then((output) => {
                    res.end(output);
                });
            }
        })
    })

}
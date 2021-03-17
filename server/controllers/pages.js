const db = require('../lib/db.js');
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem('./views');
const twing = new TwingEnvironment(loader);

exports.getUserData = (req, res, next) => {

    try {
        db.query(`SELECT * FROM users WHERE id = ?`, [req.session.userID], (error, results) => {
            console.log(results);
            return twing.render('dashboard.twig', { 'title': 'Dashboard', 'user': results[0] }).then((output) => {
                res.end(output);
            });
        })
    } catch (error) {
        console.log(error)
    }

}


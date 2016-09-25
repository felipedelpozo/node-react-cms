var models = require('../models/index');
var express = require('express');
var router  = express.Router();
const handleError = require('../lib/handle_errors');

// // post to http://192.168.99.100/articles/create
// router.post('/create', function (req, res) {
//     models.Article.create({
//         title: req.body.title,
//         slug: req.body.slug,
//         body: req.body.body
//     }).then(function (articles) {
//         res.redirect('/admin');
//     });
// });

    // //and this is a bit easier too
    // app.get('/api/person/:id', function(req, res) {
    //     // get the data from the database
    //     res.json({firstname: 'John', lastname: 'Doe'}); 
    // });

    // app.post('/api/person', function(req, res) {
    //     //save to the database
    // });

    // app.delete('/api/person/:id', function(req, res) {
    //     //delete from the database
    // });

    // post to http://192.168.99.100/articles/create
    router.post('/create', function (req, res) {
        models.Article.create({
            title: req.body.title,
            slug: req.body.slug,
            body: req.body.body
        }).then(function (articles) {
            
            res.json(articles);

        }).catch(function (error) {

        //we must check the error this way because sequelize will handle errors differently
        //depending on what kind of error it is.
        let errorMessage = handleError(error);

        console.log('response errormessage-------------------------------: ', errorMessage);

        res.json({ error: errorMessage });

       });
    });

    //http://192.168.99.100/articles/delete
    router.post('/delete', function (req, res) {
        console.log('delete route request to delete: ', req.body.slug);
        models.Article.destroy({
            where: {
                slug: req.body.slug
            }
        }).then(function (articles) {

            res.json(articles);

        }).catch(function (error) {

        //we must check the error this way because sequelize will handle errors differently
        //depending on what kind of error it is.
        let errorMessage = handleError(error);
        res.json({ error: errorMessage });

       });
    });


    router.get('/', function (req, res) {

        models.Article.findAll().then(function (articles) {
            res.json(articles);
        });

    });



module.exports = router;
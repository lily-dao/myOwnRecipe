const express = require('express');
const mongoose = require('mongoose');
require('../views/connectMongoDB');
const {check, validationResult, checkSchema} = require('express-validator');
const router = express.Router();
const Registration = mongoose.model('Registration');
const Recipe = mongoose.model('Recipe');

// /* GET home page. */
router.get('/index', function (req, res, next) {
    res.render('index', {title: ''});

});
router.get('/get-data', function (req, res, next) {
    let recipe = Recipe.find({}, function (err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    });
});
router.delete('/deleteRecipe/:id',function (req,res,next){
    let deleteRecipe= Recipe.deleteOne({_id:req.params.id},function (err,deleteRecipe){
        if(err){
            console.log(err);
        }else{
            res.json(deleteRecipe);
        }

    })
})


// Get registration form
router.get('/Registration', (req, res) => {
    res.render('Registration', {title: ''});
});
router.post('/registration',
    [
        check('email')
            .isLength({min: 1})
            .withMessage('Please enter a email'),
        check('password')
            .isLength({min: 1})
            .withMessage('Please enter an password'),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => {
                    res.send('Thank you for your registration!');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong.');
                });
        }
    });

// Add recipe
router.get('/Recipe', (req, res) => {
    res.render('Recipe', {title: ''});
});
router.post('/submit-form',

    (req, res) => {
        const recipe = new Recipe(req.body);
        recipe.save().then(() => res.send('Thank you for adding your recipe'));
    });

//aboutme
router.get('/aboutme', (req, res) => {
    res.render('aboutme', {title: 'About Me'});
})
module.exports = router;
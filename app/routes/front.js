const express = require('express');
const Todo = require('./../models/Todo');
const User = require('./../models/User');
const router = express.Router();

// Home page route
router.get('/', async (req, res) => {

    const todos = await Todo.find()
    res.render("todos", {
        tasks: (Object.keys(todos).length > 0 ? todos : {})
    });
});

// POST - Submit Task
router.post('/', (req, res) => {
    const newTask = new Todo({
        task: req.body.task
    });

    newTask.save()
    .then(task => res.redirect('/'))
    .catch(err => console.log(err));
});

// POST - Destroy todo item
router.post('/todo/destroy', async (req, res) => {
    const taskKey = req.body._key;
    const err = await Todo.findOneAndRemove({_id: taskKey})
    res.redirect('/');
});

// User Registration route
router.get('/addUser', (req, res) => {
    res.render('addUser'); // Render the user registration form (create this EJS file)
});

// Handle User Registration form submission
router.post('/addUser', (req, res) => {
    const { username, email, password, fullName, dateOfBirth } = req.body;

    // Create a new User document
    const newUser = new User({
        username,
        email,
        password,
        fullName,
        dateOfBirth,
    });

    // Save the user to MongoDB
    newUser.save()
        .then(() => {
            console.log('User registered successfully');
            res.redirect('/'); // Redirect to the home page after successful registration
        })
        .catch(err => {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
        });
});

module.exports = router;









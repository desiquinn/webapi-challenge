
const express = require('express');

const router = express();
router.use(express.json());


// Project Shema
// {
//     *name: "string",
//     *description: "string",
//     completed: false
// }

// GET to /api/projects 
// 500 error
// 200 successfull (return array of projects)

// POST to /api/projects 
// 400 name or description missing
// 500 error
// 200 successfull (add to db and return object with 1 project)

// GET to /api/projects/:id
// 404 project with id not found
// 500 error
// 200 successfull (return object with 1 project)

// PUT to /api/projects/:id
// 404 project with id not found
// 400 name or description missing
// 500 error
// 200 successfull (edit and return object with 1 project)

// DELETE to /api/projects/:id
// 404 project with id not found
// 500 error
// 200 successfull (delete and return number of records deleted)


// MiddleWare

// Validate Project id

// validate name or description

module.exports = router;
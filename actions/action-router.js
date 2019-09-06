const express = require('express');

const router = express();
router.use(express.json());



// Actions Schema
// {
//     *project_id: 1, --> id of exsisting project only
//     *description: "String up to 128",
//     *notes: "String",
//     completed: false
// }

// GET to /api/projects/:project_id/actions
// 500 error
// 404 Project with id not found
// 200 successfull (return array of all actions for project_id)

// POST to /api/projects/:project_id/actions
// 500 error
// 404 Project with id not found
// 400 description missing or more than 128 characters
//      or notes missing
// 200 successfull (add and return object of one action)


// PUT to /api/projects/:project_id/actions/:action_id
// 500 error
// 404 Project with id not found
// 404 Actions with id not found
// 400 description missing or more than 128 characters
//      or notes missing
// 200 successfull (edit and return object of one action)

// DELETE to /api/projects/:project_id/actions/:action_id
// 500 error
// 404 Project with id not found
// 404 Actions with id not found
// 200 successfull (delete and return number of records deleted)


// Middleware

// validate project_id
// validate description and notes
// validate action_id

module.exports = router;
const express = require('express');
const helper = require('../data/helpers/actionModel.js');
const projectHelp = require('../data/helpers/projectModel.js');

const router = express();
router.use(express.json());



// Actions Schema
// {
//     *project_id: 1, --> id of exsisting project only
//     *description: "String up to 128",
//     *notes: "String",
//     completed: false
// }

// POST to /api/projects/:project_id/actions
// 500 error
// 404 Project with id not found
// 400 description missing or more than 128 characters
//      or notes missing
// 200 successfull (add and return object of one action)

router.post('/:project_id/actions', (req, res) => {
    const project_id = req.params.project_id;
    const newAction = req.body


    // if(!action.notes || !action.description || action.description.length > 128) {
    //     res.status(400).json({message: "Please include a description with max 128 characters and/or notes"})
    // } else {
        helper.insert(newAction)
            .then(action => {
                console.log(action)
                // projectHelp.getProjectActions(project_id)
                //     .then(actions => {
                //         if(actions) {
                //             res.status(200).json(action)
                //         } else {
                //             res.status(404).json({message: "Project with specified id not found"});
                //         };
                //     })
                //     .catch(err => {
                //         console.log("Get Project for Actions Error:", err)
                //         res.status(500).json({error: "Error with server while retreiving data"})
                //     });
            })
            .catch(err => {
                console.log("Add Action to Project Error:", err)
                res.status(500).json({error: "Error with server while adding data"})
            });
    // };

    // if(!action.notes || !action.description || action.description.length > 128) {
    //     res.status(400).json({message: "Please include a description with max 128 characters and/or notes"})
    // } else {
    // projectHelp.get(id)
    //     .then(project => {
    //         if(project) {
    //             helper.insert(action)
    //                 .then(action => {
    //                     res.status(200).json(action)
    //                 })
    //                 .catch(err => {
    //                     console.log("Add Action to Project Error:", err)
    //                     res.status(500).json({error: "Error with server while adding data"})
    //                 })
    //         } else {
    //             res.status(404).json({message: "Project with specified id not found"});
    //         };
    //     })
    //     .catch(err => {
    //         console.log("Get Project for Actions Error:", err)
    //         res.status(500).json({error: "Error with server while retreiving data"})
    //     });
    // };
});


// PUT to /api/projects/:project_id/actions/:action_id
// 500 error
// 404 Project with id not found
// 404 Actions with id not found
// 400 description missing or more than 128 characters
//      or notes missing
// 200 successfull (edit and return object of one action)
//Tested Sucessfully!


router.put('/:project_id/actions/:action_id', (req, res) => {
    const id = req.params.action_id
    const action = req.body


     if(!action.notes || !action.description || action.description.length > 128) {
        res.status(400).json({message: "Please include a description with max 128 characters and/or notes"})
    } else {
    helper.update(id, action)
        .then(action => {
            if(action) {
                res.status(200).json({action})
            } else{
                res.status(404).json({message: "Action with specified id not found"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Error with server while updating data"});
        })
    }
})

// DELETE to /api/projects/:project_id/actions/:action_id
// 500 error
// 404 Project with id not found
// 200 successfull (delete and return number of records deleted)
// Tested Successfully !

router.delete('/:project_id/actions/:action_id', (req, res) => {
    const id = req.params.action_id;

    helper.remove(id)
        .then(deleted => {
            if(deleted > 0) {
                res.status(200).end();
            } else{
                res.status(404).json({message: "action with specified id not found"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Error with server while deleting data"});
        })
})


// Middleware

// validate project_id
// validate description and notes
// validate action_id

module.exports = router;
const express = require('express');
const helper = require('../data/helpers/projectModel');

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
// Tested Successfully !

router.get('/', (req, res) => {
    helper.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log("Get Projects Error:", err);
            res.status(500).json({error: "Error with server while retrieving data"})
        })
});

// POST to /api/projects 
// 400 name or description missing
// 500 error
// 200 successfull (add to db and return object with 1 project)
// Tested Successfully!

router.post('/', (req, res) => {
    const project = req.body;
    // console.log(req.body)
    const name = req.body.name;
    const description = req.body.description;

    if(!name || !description || description.length > 128) {
        res.status(400).json({message: "Please include a name or a description with maximum 128 characters"})
    } else {
        helper.insert(project)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                console.log("Add Project Error:", err);
                res.status(500).json({error: "Error with server while adding data"})
            });
    }
});


// GET to /api/projects/:id
// 404 project with id not found
// 500 error
// 200 successfull (return object with 1 project)
// Tested Successfully !

router.get('/:id', (req, res) => {
    const id = req.params.id;
    helper.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({message: "Project with specified id not found"});
            }
        })
        .catch(err => {
            console.log("Get Project By Id Error", err)
            res.status(500).json({error: "Error with server while retreiving data"})
        })
});

// PUT to /api/projects/:id
// 404 project with id not found
// 400 name or description missing ??
// 500 error
// 200 successfull (edit and return object with 1 project)
// Tested Successfully!

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const edit = req.body;

    if(!edit.name || !edit.description || edit.description.length > 128){
        res.status(400).json({message: "Please include a name or a description with maximum 128 characters"})
    } else {
    helper.update(id, edit)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({message: "Project with specified id not found"});
            };
        })
        .catch(err => {
            console.log("Edit Project Error:", err)
            res.status(500).json({error: "Error with server while updating data"})
        });
    }
});

// DELETE to /api/projects/:id
// 404 project with id not found
// 500 error
// 200 successfull (delete and return number of records deleted)

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    helper.remove(id)
        .then(deleted => {
            if(deleted > 0){
                res.status(200).end();
            } else {
                res.status(404).json({ message: "The Project with the specified ID does not found" });
            }
        })
        .catch(err => {
            console.log("Delete Project Error:", err);
            res.status(500).json({ error: "Error with server while removing data" })
        });
});


// MiddleWare

// Validate Project id

// validate name or description

module.exports = router;
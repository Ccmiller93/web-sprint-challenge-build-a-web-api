// Write your "projects" router here!

const express = require('express')
const router = express.Router()
const Projects = require('./projects-model')

router.get('/', (req, res) => {
    Projects.get(req.query.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'project retrieval error' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error with ID' + id })
        })
})

router.post('/', [validateProject], (req, res) => {
    Projects.insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error adding the project',
            })
        })
})

router.put('/:id', [validateProject], (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({
                message: 'Error updating the project',
            })
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(data => {
            if (data) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    message: `Error deleting ID`
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error removing the projects',
            })
        })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
});

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'Please provide name and description'
        })
    } else {
        next()
    }
}

module.exports = router; 
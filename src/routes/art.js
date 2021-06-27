const express = require('express')
const Art = require('../models/Art')
const admin_auth = require('../middleware/admin_auth')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/art', auth, async (req, res) => {
    // get all arts in page
    const page_size = parseInt(req.query.page_size)
    const page_number = parseInt(req.query.page_number)

    try {
        const arts = await Art.getArtsPage(page_size, page_number)
        const num_docs = await Art.countDocuments()
        const pages = Math.ceil(num_docs / page_size)
        res.send({number_of_pages: pages, arts})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/art', admin_auth, async (req, res) => {
    // Create a new art
    try {
        const art = new Art(req.body)
        await art.save()
        const message = { message: "art created successfully" }
        res.status(201).send({ message, art})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/art', admin_auth, async(req, res) => {
    //Edit art
    try {
        const art = await Art.findOneAndUpdate({_id:req.body._id}, req.body)
        res.send({ art })
    } catch (error) {
        res.status(500).send(error)
    }

})

router.delete('/art', auth, async(req, res) => {
    // delete art
    try {
        const art = await Art.findOneAndDelete ({_id:req.body._id})
        res.send({message:'Art deleted successfully', art})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
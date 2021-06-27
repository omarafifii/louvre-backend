const express = require('express')
const User = require('../models/User')
const admin_auth = require('../middleware/admin_auth')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/user', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        // const token = await user.generateAuthToken()
        const message = { message: "User created successfully" }
        res.status(201).send({ message })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { username, password } = req.body
        const user = await User.findByCredentials(username, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users', admin_auth, async (req, res) => {
    // get all users in page
    const page_size = parseInt(req.query.page_size)
    const page_number = parseInt(req.query.page_number)

    try {
        const users = await User.getUsersPage(page_size, page_number)
        const num_docs = await User.countDocuments()
        const pages = Math.ceil(num_docs / page_size)
        res.send({number_of_pages: pages, users})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
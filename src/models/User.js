const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    role: {
        type: String,
        required: true,
        
    },
    phone: {
        type: String,
        required: true,
        
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign(
    {
        _id: user._id,
        username: user.username,
        role: user.role
    }, 
    process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ username} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials (Username does not exist)!' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials (Password does not match)!' })
    }
    return user
}

userSchema.statics.getUsersPage = async (page_size, page_number) => {
    // Get users in certain page.
    const skip = (page_number - 1) * page_size;
    // console.log('test')
    const users = await User.find({}).skip(skip).limit(page_size)
    // console.log('test2')
    return users
}

const User = mongoose.model('User', userSchema)

module.exports = User
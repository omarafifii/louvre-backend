const mongoose = require('mongoose')


const artSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        
    }    
})


artSchema.statics.findByImage = async (image) => {
    // Search for an art by image.
    const art = await User.findOne({ image } )
    if (!art) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    
    return art
}

artSchema.statics.getArtsPage = async (page_size, page_number) => {
    // Get users in certain page.
    const skip = (page_number - 1) * page_size;        
    const arts = await Art.find({}).skip(skip).limit(page_size)
    return arts
}

const Art = mongoose.model('Art', artSchema)

module.exports = Art
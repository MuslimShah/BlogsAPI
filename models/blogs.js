const { Schema, default: mongoose } = require('mongoose');

//creating user schema
const blogsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'provide the title']
    },
    content: {
        type: String,
        required: [true, 'provide the content']
    },
    comments: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
        }
    }],
    deleted: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model("Blogs", blogsSchema);
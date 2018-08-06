const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

function val(votedMovies) {
    console.log(votedMovies)
    return v.length < 3
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[A-Za-z0-9.%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}/, 'Email invalid format'],
        max: [254, 'Max number of characters is 254'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: true
    },
    votedMovies: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie',
        validate: [val, 'erger']
        //type: String,
        // validate: {
        //     validator: function (a) {
        //         console.log(a)
        //         //console.log(this)
        //     }
        // }
    }]
})

userSchema.methods.setPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}

userSchema.methods.isPasswordValid = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword)
}

// userSchema.pre('findOneAndUpdate', function(next) {
//     console.log(this)
//     this.options.runValidators = true;
//     next();
//   });

const User = mongoose.model('User', userSchema)

// userSchema.path('votedMovies').validate(function (a) {
//     console.log(this)
//     return false
//     //return listOfVotedMovies.length === 3
// }, 'You\'ve already voted three movies in this month')



// // User.schema.path('votedMovie').validate((listOfVotedMovies) => {
// //     return listOfVotedMovies.indexOf()
// // })

module.exports = User
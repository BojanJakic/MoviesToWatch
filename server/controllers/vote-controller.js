// const Movie = require('../models/movie')
// const Vote = require('../models/vote')

// // export class VoteCtrl {

//     voteMovie = (req, res) => {
//         console.log('vote : ' + req.body.vote.userId + '  ,  ' + req.body.vote.movieId)
//         const vote = new Vote()
//         Vote.find({ userId: vote.userId }, (error, result) => {
//             if (!error) {
//                 if (result.length === 3) {
//                     res.json({ success: false, message: 'You have already voted three movies in this month!' })
//                 } else {
//                     Vote.findOneAndUpdate({ 'usersVote.userId': req.body.vote.userId }, { $addToSet: { 'usersVote.moviesId': req.body.vote.movieId } }, { upsert: true })
//                         .then(data => {
//                             console.log('data : ' + data)
//                         }).catch(error => {
//                             console.log(error)
//                         })
//                 }
//             }
//         })

//     }
// }
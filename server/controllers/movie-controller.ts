import Movie from '../models/movie'

export class MovieCtrl {

    public saveMovie(req, res) {
        const movie = new Movie(req.body)
        movie.save((error, result) => {
            if(!error) {
                return res.json(result)
            }else {
                return res.json(error)
            }
        })
    }
}


    // export const saveMovie = (req, res) => {
    //     console.log('ctrl')
    //     const movie = new Movie(req.body)
    //     movie.save((error, result) => {
    //         if(error) {
    //             return res.json(error)
    //         }else{
    //             return res.json(result)
    //         }
    //     })
    // }


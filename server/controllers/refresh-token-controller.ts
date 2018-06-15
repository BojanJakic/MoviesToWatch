import Token from '../models/refresh-token'

export class RefreshTokenCtrl {

    findByToken = (token) => {
        console.log('token : ' + token)
    }
}
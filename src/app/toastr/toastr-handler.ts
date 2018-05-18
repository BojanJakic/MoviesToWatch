import { ToastsManager } from 'ng2-toastr/ng2-toastr'
import { Injectable } from '@angular/core'

@Injectable()
export class ToastrHandler {
    
    constructor(private toastr: ToastsManager) {}

    showMessage = (notification: { success: boolean, message: string }) => {
        notification.success ? this.success(notification.message) : this.error(notification.message)
    }

    success = (message: string) => {
        this.toastr.success(message, 'Success !')
    }

    error = (message: string) => {
        this.toastr.error(message, 'Ooops !')
    }
}
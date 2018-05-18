import { ToastOptions } from 'ng2-toastr'
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

export class ToastrCustomOptions extends ToastOptions {
    
    animate = 'flyLeft'
    showCloseButton = true
    positionClass = 'toast-top-center'
    
    
}
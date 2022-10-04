export default function errorHandler(error) {
    switch(error.status) {
        case 500:
            alert('Server encountered an error. Please refresh page')
            break
        default:
            alert(error.message)
            break
    }
}
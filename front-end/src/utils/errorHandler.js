export default function errorHandler({response}) {
    console.log(response)
    switch(response.status) {
        case 500,0:
            alert('Server encountered an error. Please refresh page')
            break
        default:
            alert(response.data)
            break
    }
}
import apisauce from 'apisauce'

const create = (type = '') => {

    let api
    const access_token = localStorage.getItem("access_token") || ""
    
    switch(type) {
        // auth
        case 'USERAUTH':
            api = apisauce.create({
                baseURL: 'https://cors-anywhere.herokuapp.com/http://api-kem.asmilahotel.space',
                timeout: 80000,
            })
            break

        case 'MAIN':
            api = apisauce.create({
                baseURL: 'https://cors-anywhere.herokuapp.com/http://api-kem.asmilahotel.space',
                timeout: 80000,
            })
            break
        default:
            break
    }

    const getAllPagingLatihan = body => api.post('/getLatihan', body)

    const getAllPagingBacaan = body => api.get('/getBacaan', body)

    const getAllPagingSiswa = body => api.get('/getSiswa', body)

    // auth
    const userAuth = body => api.post('/login', body)

    const getUserDetail = body => api.get('/employee/isLogin', {}, {
        headers: {
            'Authorization': 'Bearer ' + body
        }
    })

    return {
        getAllPagingLatihan,
        getAllPagingBacaan,
        getAllPagingSiswa,
        getUserDetail,
        userAuth,
    }



}

export default { create }
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
    const getFullBacaan = body => api.post('/getBacaan', body)

    // bacaan
    const getAllPagingBacaan = body => api.post('/getBacaans', body)
    const createBacaan = body => api.post('/createBacaan', body)
    const updateBacaan = body => api.post('/updateBacaan', body)
    const deleteBacaan = body => api.post('/deleteBacaan', body)

    // soal
    const getListSoalByBacaanId = body => api.post('/getListSoalByBacaanId', body)
    const createSoal = body => api.post('/createSoal', body)
    const updateSoal = body => api.post('/updateSoal', body)
    const deleteSoal = body => api.post('/deleteSoal', body)

    // siswa
    const getAllPagingSiswa = body => api.get('/getSiswa', body)
    const createSiswa = body => api.post('/createSiswa', body)
    const updateSiswa = body => api.post('/updateSiswa', body)
    const deleteSiswa = body => api.post('/deleteSiswa', body)

    // KEM
    const getAllPagingKem = body => api.get('/getAllKem', body)
    const getChartsKem = body => api.post('/getChartsKem', body)

    // auth
    const userAuth = body => api.post('/login', body)

    const getUserDetail = body => api.get('/employee/isLogin', {}, {
        headers: {
            'Authorization': 'Bearer ' + body
        }
    })

    return {
        // bacaan
        getAllPagingBacaan,
        createBacaan,
        updateBacaan,
        deleteBacaan,

        // soal
        getListSoalByBacaanId,
        createSoal,
        updateSoal,
        deleteSoal,

        // kem
        getChartsKem,
        getAllPagingKem,

        getAllPagingLatihan,
        getFullBacaan,

        // siswa
        getAllPagingSiswa,
        createSiswa,
        updateSiswa,
        deleteSiswa,

        getUserDetail,
        userAuth,
    }



}

export default { create }
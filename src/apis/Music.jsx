import axios from '../axios'

export const getMusic = (songId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params : {id : songId}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getDetailSong = (songId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params : {id : songId}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDeTailPlayList = (songId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/getdetailplaylist',
            method: 'get',
            params : {id : songId}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
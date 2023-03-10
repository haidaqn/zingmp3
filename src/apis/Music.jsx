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
            url: '/detailplaylist',
            method: 'get',
            params : {id : songId}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

/* 
export const apiSearch = (keyword) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/search',
            method: 'get',
            params : { keyword }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) */
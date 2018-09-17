import {commonParams} from './config'
import axios from 'axios'

// 获取歌手歌曲
export function getMusic(mid) {
  const url = 'api/music'
  // const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 4573398432,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLyric(mid) {
  const url = 'api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    categoryId: 10000000
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

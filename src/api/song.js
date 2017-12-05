import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
	const url = 'http://127.0.0.1:3000/api/getlyric'

	const data = Object.assign({}, commonParams, {
		callback: 'MusicJsonCallback_lrc',
		jsonpCallback: 'MusicJsonCallback_lrc',
		songmid: mid,
		pcachetime: +new Date(),
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		loginUin: 0
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
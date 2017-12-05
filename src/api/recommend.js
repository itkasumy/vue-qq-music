import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend () {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		unin: 0,
		needNewCode: 1
	})

	return jsonp(url, data, options)
}

export function getDiscList () {
	const url = 'http://127.0.0.1:3000/api/getDiscList'

	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		needNewCode: 0,
		categoryId: 10000000,
		rnd: Math.random(),
		format: 'json'
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getLyric(mid) {
	const url = 'http://127.0.0.1:3000/api/getLyric'

	const data = Object.assign({}, commonParams, {
		songmid: mid,
		pcachetime: +new Date(),
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		g_tk: 5381,
		format: 'json'
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getSongList(disstid) {
	const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

	const data = Object.assign({}, commonParams, {
		disstid,
		type: 1,
		json: 1,
		utf8: 1,
		onlysong: 0,
		platform: 'h5',
		hostUin: 0,
		needNewCode: 1,
		g_tk: 5381,
		uin: 0,
		format: 'json',
		new_format: 1,
		pic: 500,
		nosign: 1,
		song_begin: 0,
		song_num: 15,
		_: +new Date()
	})

	return jsonp(url, data, options)
}
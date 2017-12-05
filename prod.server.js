var express = require('express')
var config = require('./config/index')

const axios = require('axios')

const app = express()

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "X-Requested-With")
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8")
	next()
})

app.get('/api/getDiscList', (req, res) => {
	console.log('getList ok')
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
	axios.get(url, {
		headers: {
			referer: 'https://c.y.qq.com',
			host: 'c.y.qq.com'
		},
		params: req.query
	}).then((response) => {
		res.json(response.data)
	}).catch((err) => {
		console.log(err)
	})
})

app.listen(3000, '127.0.0.1', (err) => {
	if (err) {
		console.log(err)
	}
	console.log('listening at 3000 port...')
})
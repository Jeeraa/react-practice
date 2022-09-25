import express from 'express'
import data from './data.js'

const app = express()

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

// test
app.get('/api/products', (req, res) => {
	res.send(data.products)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`serve at http://localhost:${port}`)
})

import { Hono } from 'hono'
import { cors } from 'hono/cors'


import router from './routes'

const app = new Hono()

app.use('/api/v1/*', cors())

app.route('/api/v1',router)

export default app

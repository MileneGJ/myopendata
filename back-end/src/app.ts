import express from 'express';
import 'express-async-errors'
import cors from 'cors';
import './application/setup'
import router from './routers';

const app = express()

app.use(express.json())
app.use(cors())

app.use(router)

export default app
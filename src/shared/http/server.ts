import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import '@shared/typeorm'
import { errors } from 'celebrate'
import upload from '@config/upload'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/files', express.static(upload.directory))
app.use(routes)
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction)=>{
	const status = 'error'

	if(error instanceof AppError){
		return response.status(error.statusCode).json({
			status,
			message: error.message
		})
	}else{
		return response.status(500).json({
			status,
			message: 'Internal server error'
		})
	}
})

app.listen(port, ()=> console.log(`Server running on port: ${port}`))


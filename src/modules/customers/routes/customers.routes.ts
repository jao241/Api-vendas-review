import { Router } from 'express'
import CustomersController from '../Controllers/CustomersController'
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'

const customersRouter = Router()
const customersContoller = new CustomersController()

customersRouter.use(isAuthenticated)

customersRouter.get('/', customersContoller.index)

customersRouter.get('/:id',
	celebrate({
		[Segments.PARAMS]:{
			id: Joi.string().uuid().required()
		}
	}),
	customersContoller.show)

customersRouter.post('/',
	celebrate({
		[Segments.BODY]:{
			name: Joi.string().required(),
			email: Joi.string().email().required()
		}
	}),
	customersContoller.create)

customersRouter.put('/:id',
	celebrate({
		[Segments.PARAMS]:{
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]:{
			name: Joi.string().required(),
			email: Joi.string().email().required()
		}
	}),
	customersContoller.update)

customersRouter.delete('/:id',
	celebrate({
		[Segments.PARAMS]:{
			id: Joi.string().uuid().required()
		}
	}),
	customersContoller.delete)

export default customersRouter

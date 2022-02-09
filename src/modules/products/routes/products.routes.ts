import { Router } from 'express'
import ProductsController from '../Controllers/ProductsController'
import { celebrate, Joi, Segments } from 'celebrate'

const productsRouter = Router()
const productsContoller = new ProductsController()

productsRouter.get('/', productsContoller.index)

productsRouter.get('/:id',
	celebrate({
		[Segments.PARAMS]:{
			id: Joi.string().uuid().required()
		}
	}),
	productsContoller.show)

productsRouter.post('/',
	celebrate({
		[Segments.BODY]:{
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required()
		}
	}),
	productsContoller.create)

productsRouter.put('/:id',
	celebrate({
		[Segments.PARAMS]:{
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]:{
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required()
		}
	}),
	productsContoller.update)

productsRouter.delete('/:id',
	celebrate({
		[Segments.PARAMS]:{
			id: Joi.string().uuid().required()
		}
	}),
	productsContoller.delete)

export default productsRouter

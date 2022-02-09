import {Request, Response} from 'express'
import CreateProductService from '../services/CreateProductService'
import DeleteProductService from '../services/DeleteProductService'
import ListProductService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import UpdateProductService from '../services/UpdateProductService'

export default class ProductsController{

	public async index(request: Request, response: Response):Promise<Response>{
		const listProducts = new ListProductService()
		const products = await listProducts.execute()

		return response.status(200).json(products)
	}

	public async show(request: Request, response: Response):Promise<Response>{
		const { id } = request.params
		const showProducts = new ShowProductService()
		const product = await showProducts.execute(id)

		return response.status(200).json(product)
	}

	public async create(request: Request, response: Response):Promise<Response>{
		const { name, price, quantity } = request.body
		const createProduct = new CreateProductService()

		await createProduct.execute({name, price, quantity})

		return response.status(200).json({
			message: 'Data saved.'
		})
	}

	public async update(request: Request, response: Response):Promise<Response>{
		const { id } = request.params
		const { name, price, quantity } = request.body
		const updateProduct = new UpdateProductService()

		await updateProduct.execute({id, name, price, quantity})

		return response.status(204).json({
			message: 'Data updated.'
		})
	}

	public async delete(request: Request, response: Response):Promise<Response>{
		const { id } = request.params
		const deleteProduct = new DeleteProductService()

		await deleteProduct.execute(id)

		return response.status(200).json({
			message: 'Data removed.'
		})
	}


}

import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'

interface IRequest{
    id: string
    name: string
    price: number
    quantity: number
}

export default class UpdateProductService{
	public async execute({id, name, price, quantity}: IRequest):Promise<void>{
		const productsRepository = getCustomRepository(ProductsRepository)
		const product = await productsRepository.findOne(id)

		if(!product)
			throw new AppError('Product not found.')

		const productExists = await productsRepository.findByName(name)

		if(productExists && name !== product.name)
			throw new AppError('There is already one product with this name.')

		product.name = name
		product.price = price
		product.quantity = quantity

		await productsRepository.save(product)
	}
}

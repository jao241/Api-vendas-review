import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'

export default class ShowProductService{
	public async execute(id:string):Promise<Product | void>{
		const productsRepository = getCustomRepository(ProductsRepository)
		const product = productsRepository.findOne(id)

		if(!product)
			throw new AppError('Product not found.')

		return product
	}
}

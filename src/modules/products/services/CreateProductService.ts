import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'

interface IRequest{
    name: string
    price: number
    quantity: number
}

export default class CreateProductService{
	public async execute({name, price, quantity}: IRequest):Promise<void>{
		const productsRepository = getCustomRepository(ProductsRepository)
		const productExists = await productsRepository.findByName(name)

		if(productExists)
			throw new AppError('There is already one product with this name')

		const newProduct = productsRepository.create({
			name,
			price,
			quantity,
		})

		await productsRepository.save(newProduct)
	}
}

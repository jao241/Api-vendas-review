import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../typeorm/repositories/UsersRepository'
import { hash } from 'bcryptjs'

interface IRequest{
    name: string
    email: string
    password: string
}

export default class CreateUserService{
	public async execute({ name, email, password }: IRequest):Promise<void>{
		const userRepository = getCustomRepository(UsersRepository)
		const emailExists = await userRepository.findByEmail(email)

		if(emailExists)
			throw new AppError('Email address already used.')

		password = await hash(password, 8)

		const user = userRepository.create({
			name,
			email,
			password
		})

		await userRepository.save(user)

	}
}

import AppError from '@shared/errors/AppError'
import path from 'path'
import uploadConfig from '@config/upload'
import fs from 'fs'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../typeorm/repositories/UsersRepository'

interface IRequest{
    user_id: string
    avatarFilename: string
}

export default class UpdateUserAvatarService{
	public async execute({ user_id, avatarFilename }:IRequest):Promise<void>{
		const userRepository = getCustomRepository(UsersRepository)
		const user = await userRepository.findById(user_id)

		if(!user)
			throw new AppError('User not found.')

		if(user.avatar){
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

			if(userAvatarFileExists){
				await fs.promises.unlink(userAvatarFilePath)
			}
		}

		user.avatar = avatarFilename

		await userRepository.save(user)
	}
}

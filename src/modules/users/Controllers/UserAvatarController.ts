import { Request, Response } from 'express'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

export default class UserAvatarController{
	public async update(request: Request, response: Response):Promise<Response>{
		const updateUserAvatarService = new UpdateUserAvatarService()
		const user_id = request.user.id
		const avatarFilename = request.file?.filename as string

		await updateUserAvatarService.execute({user_id, avatarFilename})

		return response.json({
			message: 'Avatar updated.'
		})
	}
}

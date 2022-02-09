import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'

@Entity('products')
export default class Product{
@PrimaryGeneratedColumn('uuid')
	id: string

@Column()
	name: string

@Column()
	price: number

@Column()
	quantity: number

@CreateDateColumn()
	created_at: Date

@UpdateDateColumn()
	updated_at: Date
}

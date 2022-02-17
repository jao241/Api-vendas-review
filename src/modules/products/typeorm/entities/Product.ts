import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'

@Entity('products')
export default class Product{
@PrimaryGeneratedColumn('uuid')
	id: string

@OneToMany(() => OrdersProducts, orderProducts => orderProducts.product)
	order_products: OrdersProducts[]

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

import Product from '@modules/products/typeorm/entities/Product'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Order from './Order'

@Entity('orders_products')
export default class OrdersProducts{

@PrimaryGeneratedColumn('uuid')
	id: string


@ManyToOne(()=> Order,  order => order.order_products)
@JoinColumn({name: 'order_id'})
	order: Order

@ManyToOne(()=> Order,  product => product.order_products)
@JoinColumn({name: 'product_id'})
	product: Product


@Column()
	price: number

@Column()
	quantity: number

@CreateDateColumn()
	created_at: Date

@UpdateDateColumn()
	updated_at: Date
}

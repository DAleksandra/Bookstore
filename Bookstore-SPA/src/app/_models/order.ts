import { OrderBook } from './order-book';

export class Order {
    id: number;
    books: OrderBook[];
    status: string;
    paymentMethod: string;
    shippingDate?: Date;
    orderDate: Date;
    totalPrice: number;
    street: string;
    homeNumber: string;
    postNumber: string;
    city: string;
}

export class Book {
    id: number;
    title: string;
    author: string;
    description: string;
    photoUrl: string;
    stock: number;
    price: number;
    onSale: boolean;
    salePrice: number;
    publisher: string;
    language: string;
    publishingDate: Date;
    favourite: boolean;
    inCart: number = 0;
}

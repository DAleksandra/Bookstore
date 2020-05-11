export class Book {
    id: number;
    title: string;
    author: string;
    description: string;
    photoUrl: string;
    stock: number;
    price: number;
    onSale: boolean;
    saled: number;
    salePrice: number;
    publisher: string;
    genre: string;
    language: string;
    publishingDate: Date;
    favourite: boolean = false;;
    inCart: number = 0;
}

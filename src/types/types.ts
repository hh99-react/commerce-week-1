export interface IUser {
  id: string;
  email: string;
  isSeller: boolean;
  nickname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  id: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQunatity: number;
  productDescription: string;
  productCategory: string;
  productImage: string[] | FileList;
  createdAt: Date;
  updatedAt: Date;
}

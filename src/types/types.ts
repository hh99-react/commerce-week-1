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

export interface IInpiniteProduct {
  sortedProductsArray: IProduct[];
  nextPageParam: number | null;
}

export type objectType = {
  [key: string]: any;
};

export type IResolveParams = {
  provider: string;
  data?: objectType;
};

export interface IGoogleUser {
  email: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

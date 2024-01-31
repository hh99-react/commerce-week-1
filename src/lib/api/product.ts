import { IProduct } from "@/types/types";
import {
  getDatabase,
  ref,
  set,
  get,
  query,
  remove,
  update,
  child,
  orderByChild,
  limitToLast,
  startAt,
  endBefore,
} from "firebase/database";

export const getProductsBySeller = async (
  userId: string,
  pageParam: number
) => {
  const dbRef = ref(getDatabase());
  const queryRef = query(
    child(dbRef, "products"),
    orderByChild("user_createdAt"),
    startAt(userId),
    endBefore(`${userId}_${pageParam - 1}`),
    limitToLast(12)
  );
  try {
    const snapshot = await get(queryRef);
    if (snapshot.exists()) {
      const productsArray: IProduct[] = [];
      snapshot.forEach((childSnapshot) => {
        productsArray.push(childSnapshot.val());
      });
      const fetchedProducts = Object.keys(snapshot.val());
      const nextPageParam =
        fetchedProducts.length < 12 ? null : productsArray[0].createdAt;
      const sortedProductsArray = productsArray.reverse();

      return { sortedProductsArray, nextPageParam };
    } else {
      return { sortedProductsArray: [], nextPageParam: null };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSingleProduct = async (productId: string) => {
  const db = getDatabase();
  const userProductPath = `products/${productId}`;
  const q = query(ref(db, userProductPath));

  try {
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const productsObject = snapshot.val();
      return productsObject;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (
  newProduct: IProduct,
  imageDownloadURLs: string[]
) => {
  const { id: productId, sellerId, productCategory, productPrice } = newProduct;
  const timestampCreatedAt = newProduct.createdAt.getTime();
  const timestampUpdatedAt = newProduct.updatedAt.getTime();

  const productWithImagesAndTime = {
    ...newProduct,
    productImage: imageDownloadURLs,
    createdAt: timestampCreatedAt,
    updatedAt: timestampUpdatedAt,
    user_createdAt: `${sellerId}_${timestampCreatedAt}`,
    category_createdAt: `${productCategory}_${timestampCreatedAt}`,
    category_price: `${productCategory}_${productPrice}`,
  };
  try {
    const db = getDatabase();
    set(ref(db, `products/${productId}`), productWithImagesAndTime);
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (
  updateProduct: IProduct,
  imageDownloadURLs: string[]
) => {
  const { id: productId } = updateProduct;
  const timestampUpdatedAt =
    updateProduct.updatedAt instanceof Date
      ? updateProduct.updatedAt.getTime()
      : updateProduct.updatedAt;
  const productWithImagesAndTime = {
    ...updateProduct,
    productImage: imageDownloadURLs,
    updatedAt: timestampUpdatedAt,
  };
  const db = getDatabase();
  update(ref(db, `products/${productId}`), productWithImagesAndTime);
};

export const deleteProduct = async (productId: string) => {
  const db = getDatabase();
  remove(ref(db, `products/${productId}`));
};

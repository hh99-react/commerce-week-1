import { IProduct } from "@/types/types";
import { getDatabase, ref, set, get, query, remove } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

export const getProductsBySeller = async (userId: string) => {
  const db = getDatabase();
  const userProductsPath = `products/${userId}`;
  const q = query(ref(db, userProductsPath));

  try {
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const productsObject = snapshot.val();
      const productsArray = Object.keys(productsObject).map((key) => ({
        id: key,
        ...productsObject[key],
      }));
      return productsArray;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (newProduct: IProduct) => {
  const storage = getStorage();
  const childStorageRef = storageRef(storage, "product-images");
  const { productImage, id, productName, sellerId } = newProduct;

  const uploadImagePromises: Promise<string>[] = [];

  for (let i = 0; i < productImage.length; i++) {
    const image = productImage[i];
    if (image instanceof File) {
      const fileName = `${productName}-${i}`;
      const imageRef = storageRef(childStorageRef, `${id}/${fileName}`);
      const snapshot = await uploadBytes(imageRef, image);
      const imageDownloadURLPromise = getDownloadURL(snapshot.ref);
      uploadImagePromises.push(imageDownloadURLPromise);
    }
  }

  const imageDownloadURLs = await Promise.all(uploadImagePromises);
  const productWithImages = { ...newProduct, productImage: imageDownloadURLs };

  const db = getDatabase();
  set(ref(db, "products/" + `${sellerId}/` + id), productWithImages);
};

export const updateProduct = async () => {};

export const deleteProduct = async (productId: string, sellerId: string) => {
  const storage = getStorage();
  const productImagesRef = storageRef(storage, `product-images/${productId}`);
  try {
    const result = await listAll(productImagesRef);
    await Promise.all(result.items.map((item) => deleteObject(item)));
  } catch (error) {
    console.error("An error occurred while deleting the file:", error);
  }

  const db = getDatabase();
  remove(ref(db, `products/${sellerId}/${productId}`));
};

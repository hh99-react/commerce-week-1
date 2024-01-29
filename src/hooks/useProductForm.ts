import { productFormSchema } from "@/shared/form/formValidation";
import { IProduct } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import useProductMutations from "./queries/product/useProductMutations";
import { downloadProductImages } from "@/lib/api/storage";
import { getKoreaTimeDate } from "@/shared/form/common";

interface useProductFormProps {
  userId: string;
  updateProduct?: IProduct;
}

const useProductForm = ({ userId, updateProduct }: useProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dataTransfer = new DataTransfer();
  const [allImage, setAllImage] = useState({});
  const [showImages, setShowImages] = useState<string[]>([]);

  const { addProductMutation, updateProductMutation } = useProductMutations({
    sellerId: userId as string,
    productId: updateProduct?.id as string,
    setIsLoading,
  });

  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
  });

  useEffect(() => {
    setIsLoading(true);
    const setFormValues = async () => {
      if (updateProduct) {
        const imageURLs = updateProduct.productImage;
        setShowImages(imageURLs as string[]);
        const {
          productName,
          productCategory,
          productPrice,
          productQunatity,
          productDescription,
        } = updateProduct;
        try {
          const downloadedImages = await downloadProductImages(
            imageURLs as string[]
          );
          downloadedImages.forEach((image) => dataTransfer.items.add(image));
          setAllImage(dataTransfer.files);

          productForm.setValue("images", dataTransfer.files);
          productForm.setValue("title", productName);
          productForm.setValue("description", productDescription);
          productForm.setValue("category", productCategory);
          productForm.setValue(
            "price",
            String(productPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          productForm.setValue(
            "qunatity",
            String(productQunatity).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
        } catch (error) {
          console.error("Error downloading images:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    setFormValues();
  }, [updateProduct]);

  const onSubmitAddProduct = async (
    values: z.infer<typeof productFormSchema>
  ) => {
    setIsLoading(true);
    const { title, description, price, category, qunatity, images } = values;
    const newProduct: IProduct = {
      id: uuidv4(),
      sellerId: userId as string,
      productName: title,
      productPrice: Number(price.replace(/,/g, "")),
      productQunatity: Number(qunatity.replace(/,/g, "")),
      productCategory: category,
      productDescription: description,
      productImage: images,
      createdAt: getKoreaTimeDate(),
      updatedAt: getKoreaTimeDate(),
    };
    addProductMutation.mutate(newProduct);
  };

  const onSubmitUpdateProduct = async (
    values: z.infer<typeof productFormSchema>
  ) => {
    setIsLoading(true);
    const { title, description, price, category, qunatity, images } = values;
    const updateProductData: IProduct = {
      id: updateProduct!.id,
      sellerId: updateProduct!.sellerId,
      productName: title,
      productPrice: Number(price.replace(/,/g, "")),
      productQunatity: Number(qunatity.replace(/,/g, "")),
      productCategory: category,
      productDescription: description,
      productImage: images,
      createdAt: updateProduct!.createdAt,
      updatedAt: getKoreaTimeDate(),
    };
    updateProductMutation.mutate(updateProductData);
  };

  const formatNumberOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const inputValue = event.target.value;
    const exceptString = inputValue.replace(/[^\d,]/g, "");
    const formattedValue = exceptString
      .replace(/,/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    onChange(formattedValue);
  };

  const addImageOnChangeHandler = (
    images: FileList,
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: FileList) => void
  ) => {
    if (images) {
      Array.from(images).forEach((image) => dataTransfer.items.add(image));
    }
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const newFiles = dataTransfer.files;
    setAllImage(newFiles);
    onChange(newFiles);

    const newImageList = event.target.files;
    let imageUrlLists = [...showImages];
    if (newImageList)
      for (let i = 0; i < newImageList.length; i++) {
        const currentImageUrl = URL.createObjectURL(newImageList[i]);
        imageUrlLists.push(currentImageUrl);
      }
    setShowImages(imageUrlLists);
  };

  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));

    const newFiles = Object.values(allImage).filter((_, index) => index !== id);
    newFiles.forEach((file) => {
      dataTransfer.items.add(file as File);
    });
    productForm.setValue("images", dataTransfer.files);
    setAllImage(dataTransfer.files);
  };

  return {
    productForm,
    onSubmitAddProduct,
    onSubmitUpdateProduct,
    isLoading,
    formatNumberOnChangeHandler,
    allImage,
    showImages,
    addImageOnChangeHandler,
    handleDeleteImage,
  };
};

export default useProductForm;

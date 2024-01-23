import { productFormSchema } from "@/shared/form/formValidation";
import { IProduct } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useProductsQuries from "./useProductsQuries";
import { useUser } from "@/store/UserContext";
import { v4 as uuidv4 } from "uuid";

const useProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const userId = user ? user.id : localStorage.getItem("userId");
  const { addProductMutation } = useProductsQuries({
    sellerId: userId as string,
  });

  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      images: {} as FileList,
      category: "",
      price: 0,
      qunatity: 0,
    },
  });

  const onSubmitAddProduct = async (
    values: z.infer<typeof productFormSchema>
  ) => {
    const { title, description, price, category, qunatity, images } = values;
    const newProduct: IProduct = {
      id: uuidv4(),
      sellerId: userId as string,
      productName: title,
      productPrice: price,
      productQunatity: qunatity,
      productCategory: category,
      productDescription: description,
      productImage: images,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addProductMutation.mutate(newProduct);
  };

  return { productForm, onSubmitAddProduct, isLoading };
};

export default useProductForm;

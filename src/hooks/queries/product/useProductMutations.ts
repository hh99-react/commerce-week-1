import { queryClient } from "@/App";
import { addProduct, deleteProduct, updateProduct } from "@/lib/api/product";
import { deleteProductImages, uploadProductImages } from "@/lib/api/storage";
import { IProduct } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface useProductMutationsProps {
  sellerId: string;
  productId?: string;
  setIsLoading: (isLoading: boolean) => void;
}

const useProductMutations = ({
  sellerId,
  productId,
  setIsLoading,
}: useProductMutationsProps) => {
  const navigate = useNavigate();

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: IProduct) => {
      const imageDownloadURLs = await uploadProductImages(newProduct);
      await addProduct(newProduct, imageDownloadURLs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsBySellerId", sellerId],
      });
      setIsLoading(false);
      navigate("/products");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (updateProductData: IProduct) => {
      await deleteProductImages(updateProductData.id);
      const imageDownloadURLs = await uploadProductImages(updateProductData);
      await updateProduct(updateProductData, imageDownloadURLs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsBySellerId", sellerId],
      });
      queryClient.invalidateQueries({
        queryKey: ["singleProduct", productId],
      });
      setIsLoading(false);
      navigate("/products");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async ({
      productId,
      sellerId,
    }: {
      productId: string;
      sellerId: string;
    }) => {
      await deleteProductImages(productId);
      await deleteProduct(productId, sellerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsBySellerId", sellerId],
      });
      setIsLoading(false);
    },
  });

  return {
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,
  };
};

export default useProductMutations;

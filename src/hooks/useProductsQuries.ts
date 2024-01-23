import { queryClient } from "@/App";
import {
  addProduct,
  deleteProduct,
  getProductsBySeller,
} from "@/lib/api/product";
import { IProduct } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

interface useProductsQuriesProps {
  sellerId: string;
}

const useProductsQuries = ({ sellerId }: useProductsQuriesProps) => {
  const {
    data: productListBySeller,
    isError: isErrorProductListBySeller,
    isLoading: isLoadingProductListBySeller,
  } = useQuery({
    queryKey: ["productsBySellerId", sellerId],
    queryFn: async () => {
      try {
        const productData = await getProductsBySeller(sellerId);
        return productData;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    enabled: !!sellerId,
  });

  const addProductMutation = useMutation({
    mutationFn: (newProduct: IProduct) => addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsBySellerId", sellerId],
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: ({
      productId,
      sellerId,
    }: {
      productId: string;
      sellerId: string;
    }) => deleteProduct(productId, sellerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsBySellerId", sellerId],
      });
    },
  });

  return {
    productListBySeller,
    isErrorProductListBySeller,
    isLoadingProductListBySeller,
    addProductMutation,
    deleteProductMutation,
  };
};

export default useProductsQuries;

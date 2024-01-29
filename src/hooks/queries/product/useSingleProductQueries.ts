import { getSingleProduct } from "@/lib/api/product";
import { useQuery } from "@tanstack/react-query";

interface useSingleProductQueriesProps {
  userId: string;
  productId: string;
}

const useSingleProductQueries = ({
  userId,
  productId,
}: useSingleProductQueriesProps) => {
  const {
    data: singleProductData,
    isError: isErrorSingleProductData,
    isLoading: isLoadingSingleProductData,
  } = useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: async () => {
      try {
        const productData = await getSingleProduct(userId, productId);
        return productData;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    enabled: !!productId && !!userId,
  });
  return {
    singleProductData,
    isErrorSingleProductData,
    isLoadingSingleProductData,
  };
};

export default useSingleProductQueries;

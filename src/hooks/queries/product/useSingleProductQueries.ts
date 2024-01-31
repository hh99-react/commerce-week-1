import { getSingleProduct } from "@/lib/api/product";
import { useQuery } from "@tanstack/react-query";

interface useSingleProductQueriesProps {
  productId: string;
}

const useSingleProductQueries = ({
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
        const productData = await getSingleProduct(productId);
        return productData;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    enabled: !!productId,
  });
  return {
    singleProductData,
    isErrorSingleProductData,
    isLoadingSingleProductData,
  };
};

export default useSingleProductQueries;

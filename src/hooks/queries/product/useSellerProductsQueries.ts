import { getProductsBySeller } from "@/lib/api/product";
import { getKoreaTimeDate } from "@/shared/form/common";
import { IInpiniteProduct } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useSellerProductsQueriesProps {
  sellerId: string;
}

const useSellerProductsQueries = ({
  sellerId,
}: useSellerProductsQueriesProps) => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: productListBySeller,
    isError: isErrorProductListBySeller,
    isLoading: isLoadingProductListBySeller,
  } = useInfiniteQuery<IInpiniteProduct>({
    queryKey: ["productsBySellerId", sellerId],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getProductsBySeller(sellerId, pageParam as number);
      return result as IInpiniteProduct;
    },
    initialPageParam: getKoreaTimeDate().getTime(),
    enabled: !!sellerId,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageParam;
    },
  });

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    productListBySeller,
    isErrorProductListBySeller,
    isLoadingProductListBySeller,
  };
};

export default useSellerProductsQueries;

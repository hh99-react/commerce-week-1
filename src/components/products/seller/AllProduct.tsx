import useSellerProductsQueries from "@/hooks/queries/product/useSellerProductsQueries";
import { useUser } from "@/store/UserContext";
import { Button } from "../../ui/button";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useInView } from "react-intersection-observer";
import _debounce from "lodash/debounce";

const AllProduct = () => {
  const { user } = useUser();
  const userId = user ? user.id : localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    productListBySeller,
    isErrorProductListBySeller,
    isLoadingProductListBySeller,
  } = useSellerProductsQueries({ sellerId: userId as string });

  const { ref, inView } = useInView();
  const debouncedFetchNextPage = _debounce(fetchNextPage, 500); // 500ms 딜레이

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      debouncedFetchNextPage();
    }
  }, [inView]);

  if (isLoadingProductListBySeller || isLoading) {
    return <p>Loading...</p>;
  }
  if (isErrorProductListBySeller) {
    return <p>portfolios Error..</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between pt-2 pb-6">
        <p className="text-2xl font-semibold">전체 상품</p>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/product-registration")}
        >
          <IoMdAdd />
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {productListBySeller?.pages.map((group, idx) => (
          <React.Fragment key={idx}>
            {group.sortedProductsArray.length > 0 ? (
              group.sortedProductsArray.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  setIsLoading={setIsLoading}
                  isLoadingProductListBySeller={isLoadingProductListBySeller}
                />
              ))
            ) : (
              <p>등록된 상품이 없습니다.</p>
            )}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} className="h-10"></div>
    </>
  );
};

export default AllProduct;

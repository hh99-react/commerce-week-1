import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useProductMutations from "@/hooks/queries/product/useProductMutations";
import { useUser } from "@/store/UserContext";
import { IProduct } from "@/types/types";
import { useState } from "react";
import { RiPencilFill, RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: IProduct;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingProductListBySeller: boolean;
}

const ProductCard = ({
  product,
  setIsLoading,
  isLoadingProductListBySeller,
}: ProductCardProps) => {
  const { user } = useUser();
  const userId = user ? user.id : localStorage.getItem("userId");
  const navigate = useNavigate();
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const {
    id: productId,
    productName,
    productDescription,
    productImage,
  } = product;

  const { deleteProductMutation } = useProductMutations({
    sellerId: userId as string,
    setIsLoading,
  });

  const productDeleteButtonHandler = () => {
    setIsLoading(true);
    deleteProductMutation.mutate({ productId, sellerId: userId! });
  };

  const goToProductUpdate = () => {
    navigate(`/product-registration?productId=${productId}`);
  };

  return (
    <Card key={product.id}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{productName}</CardTitle>
        <div className="flex space-x-1">
          <RiPencilFill
            className="cursor-pointer"
            onClick={goToProductUpdate}
          />
          <RiDeleteBin2Line
            className="cursor-pointer"
            onClick={productDeleteButtonHandler}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          {imageIsLoading && (
            <div className="flex justify-center">
              <Skeleton className="w-40 h-40 rounded-sm" />
            </div>
          )}

          <img
            src={productImage[0] as string}
            alt={productName}
            onLoad={() => {
              setImageIsLoading(false);
            }}
            className={`${
              imageIsLoading ? "hidden" : "none"
            } w-3/4 h-3/4 rounded-sm mb-2`}
          />
        </div>
        <CardDescription>{productDescription}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

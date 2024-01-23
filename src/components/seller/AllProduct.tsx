import useProductsQuries from "@/hooks/useProductsQuries";
import { useUser } from "@/store/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/types/types";
import { RiPencilFill, RiDeleteBin2Line } from "react-icons/ri";

const AllProduct = () => {
  const { user } = useUser();
  const userId = user ? user.id : localStorage.getItem("userId");
  const {
    productListBySeller,
    isErrorProductListBySeller,
    isLoadingProductListBySeller,
    deleteProductMutation,
  } = useProductsQuries({ sellerId: userId as string });

  const productDeleteButtonHandler = (productId: string, sellerId: string) => {
    deleteProductMutation.mutate({ productId, sellerId });
  };

  if (isLoadingProductListBySeller) {
    return <p>Loading...</p>;
  }
  if (isErrorProductListBySeller) {
    return <p>portfolios Error..</p>;
  }

  return (
    <div className="flex gap-4">
      {productListBySeller?.map((product: IProduct) => {
        const { productName, productDescription, productImage } = product;
        return (
          <Card key={product.id} className="w-1/5">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>{productName}</CardTitle>
              <div className="flex space-x-1">
                <RiPencilFill className="cursor-pointer" />
                <RiDeleteBin2Line
                  className="cursor-pointer"
                  onClick={() =>
                    productDeleteButtonHandler(product.id, product.sellerId)
                  }
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img
                  src={productImage[0] as string}
                  alt={productName}
                  className="w-3/4 h-3/4 rounded-sm mb-2"
                />
              </div>
              <CardDescription>{productDescription}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AllProduct;

import AllProduct from "@/components/seller/AllProduct";
import ProductDialog from "@/components/seller/ProductDialog";

const Products = () => {
  return (
    <div className="mt-20 mx-auto px-[10%]">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">전체 상품</p>
        <ProductDialog />
      </div>
      <AllProduct />
    </div>
  );
};

export default Products;

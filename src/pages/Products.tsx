import AllProduct from "@/components/products/seller/AllProduct";

const Products = () => {
  const isSeller = localStorage.getItem("isSeller") === "true" ? true : false;

  return (
    <div className="mt-20 mx-auto px-[10%]">{isSeller && <AllProduct />}</div>
  );
};

export default Products;

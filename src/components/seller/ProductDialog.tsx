import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";
import { useState } from "react";

const ProductDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">상품 등록하기</Button>
      </DialogTrigger>
      <DialogContent className="h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
          <DialogDescription>
            등록할 상품의 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <ProductForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;

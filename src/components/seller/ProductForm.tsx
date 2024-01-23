import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProductForm from "@/hooks/useProductForm";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";

interface ProductFormProps {
  setOpen: (open: boolean) => void;
}

const ProductForm = ({ setOpen }: ProductFormProps) => {
  const { productForm, onSubmitAddProduct, isLoading } = useProductForm();
  const [showImages, setShowImages] = useState<string[]>([]);
  const dataTransfer = new DataTransfer();

  const handleAddImages = (event: ChangeEvent<HTMLInputElement>) => {
    const newImageList = event.target.files;
    let imageUrlLists = [...showImages];
    if (newImageList)
      for (let i = 0; i < newImageList.length; i++) {
        const currentImageUrl = URL.createObjectURL(newImageList[i]);
        imageUrlLists.push(currentImageUrl);
      }

    setShowImages(imageUrlLists);
  };

  // const handleDeleteImage = (id: number) => {
  //   console.log(id);
  //   setShowImages(showImages.filter((_, index) => index !== id));
  //   const newFiles = Array.from(dataTransfer.files);
  //   dataTransfer.items.clear();
  //   newFiles.splice(id, 1);
  //   newFiles.forEach((file) => {
  //     dataTransfer.items.add(file);
  //   });
  //   productForm.setValue("images", dataTransfer.files);
  // };

  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(async (values) => {
          await onSubmitAddProduct(values);
          setOpen(false);
        })}
        className="space-y-2"
      >
        <FormField
          control={productForm.control}
          name="title"
          render={({ field }) => (
            <>
              <FormItem className="">
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="상품 이름" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="flex justify-between">
          <FormField
            control={productForm.control}
            name="category"
            render={({ field }) => (
              <>
                <FormItem className="w-[30%]">
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={productForm.control}
            name="price"
            render={({ field }) => (
              <>
                <FormItem className="w-[30%]">
                  <FormLabel>가격</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={productForm.control}
            name="qunatity"
            render={({ field }) => (
              <>
                <FormItem className="w-[30%]">
                  <FormLabel>상품 수량</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </div>
        <FormField
          control={productForm.control}
          name="description"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>상품 설명</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-32 resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={productForm.control}
          name="images"
          render={({ field: { onChange }, ...field }) => {
            const images = productForm.watch("images");

            return (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple={true}
                    disabled={productForm.formState.isSubmitting}
                    {...field}
                    onChange={(event) => {
                      if (images) {
                        Array.from(images).forEach((image) =>
                          dataTransfer.items.add(image)
                        );
                      }

                      Array.from(event.target.files!).forEach((image) =>
                        dataTransfer.items.add(image)
                      );

                      const newFiles = dataTransfer.files;
                      onChange(newFiles);
                      console.log(newFiles);
                      handleAddImages(event);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className={showImages.length > 0 ? "" : "hidden"}>
          <FormLabel>선택한 이미지</FormLabel>
          <div className="flex space-x-4 border rounded-md p-4 mt-2">
            {showImages.map((image, id) => (
              <div className="" key={id}>
                <img src={image} alt={`${image}-${id}`} className="w-40 h-40" />
                {/* <button onClick={() => handleDeleteImage(id)}>x</button> */}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Button type="submit" disabled={isLoading}>
            상품 등록하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;

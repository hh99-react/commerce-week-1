import * as z from "zod";
import {
  noCommonPatterns,
  noConsecutiveCharsOrSpecial,
  noRepeatedCharsOrDigits,
  passwordRegex,
} from "./validationPatterns";

const createPasswordValidation = () => {
  return z
    .string()
    .min(8, { message: "비밀번호는 최소 8자리 이상이어야 합니다." })
    .regex(
      passwordRegex,
      "최소 8자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    )
    .regex(
      noConsecutiveCharsOrSpecial,
      "3자 이상 연속된 숫자, 영문자, 특수문자는 사용할 수 없습니다."
    )
    .regex(
      noRepeatedCharsOrDigits,
      "3자리 이상 동일한 숫자 및 문자를 사용할 수 없습니다."
    )
    .regex(
      noCommonPatterns,
      "쉬운 패턴(asdf, qwer, password 등)은 사용할 수 없습니다"
    );
};

export const loginFormSchema = z.object({
  email: z.string().email({ message: "올바른 이메일을 입력해주세요" }),
  password: createPasswordValidation(),
});

export const signUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  email: z.string().email({ message: "올바른 이메일을 입력해주세요" }),
  role: z.string({
    required_error: "역할을 필수 정보입니다.",
  }),
  password: createPasswordValidation(),
  confirmPassword: createPasswordValidation(),
});

export const productFormSchema = z.object({
  title: z.string().min(2, {
    message: "상품 이름은 2글자 이상이어야 합니다.",
  }),
  description: z.string().min(10, {
    message: "상품 설명은 10글자 이상이어야 합니다.",
  }),

  category: z.string({
    required_error: "카테고리는 필수 정보입니다.",
  }),
  price: z.coerce.number({
    required_error: "가격은 필수 정보입니다.",
  }),
  qunatity: z.coerce.number({
    required_error: "수량은 필수 정보입니다.",
  }),
  images: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `이미지는 필수 정보입니다.`),
});

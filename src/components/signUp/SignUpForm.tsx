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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useAuthForm from "@/hooks/useAuthForm";

export function SignUpForm() {
  const { isLoading, signUpForm, onSubmitSignUp, goToLoginOrSignUp } =
    useAuthForm();

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}
        className="relative"
      >
        <div className="p-2 flex justify-between space-x-2">
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem className="w-[40%]">
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem className="w-[40%]">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="hello@sparta.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-[20%]">
                <FormLabel>역할</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger name="role">
                      <SelectValue placeholder="선택해주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="seller">판매자</SelectItem>
                    <SelectItem value="buyer">구매자</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="p-2 flex justify-between space-x-4">
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem className="w-1/2">
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" name="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <>
                <FormItem className="w-1/2">
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </div>
        <div className="p-2 flex gap-2">
          <Button type="submit" disabled={isLoading}>
            계정 등록하기
          </Button>
          <Button type="button" onClick={() => goToLoginOrSignUp("login")}>
            로그인하기
          </Button>
        </div>
      </form>
    </Form>
  );
}

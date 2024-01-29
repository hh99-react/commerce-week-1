import { addUserToDatabase } from "@/lib/api/user";
import { IUser } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/App";
import { useUser } from "@/store/UserContext";

const useUserMutations = () => {
  const { setUser, setIsSeller } = useUser();

  const addUserMutation = useMutation({
    mutationFn: async (newUser: IUser) => {
      await addUserToDatabase(newUser, setUser, setIsSeller);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { addUserMutation };
};

export default useUserMutations;

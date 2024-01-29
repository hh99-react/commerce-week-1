import { getUserFromDatabase } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";

interface useUserQueriesProps {
  userId: string;
}
const useUserQueries = ({ userId }: useUserQueriesProps) => {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const userData = await getUserFromDatabase(userId);
        return userData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!userId,
  });
  return { userData };
};

export default useUserQueries;

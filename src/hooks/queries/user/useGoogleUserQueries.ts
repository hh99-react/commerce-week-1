import { getUserFromGoogle } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";

interface useGoogleUserQueriesProps {
  accessToken: string;
}
const useGoogleUserQueries = ({ accessToken }: useGoogleUserQueriesProps) => {
  const { data: googleUserData } = useQuery({
    queryKey: ["googleUser"],
    queryFn: async () => {
      try {
        const userData = await getUserFromGoogle(accessToken);
        return userData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!accessToken,
  });
  return { googleUserData };
};

export default useGoogleUserQueries;

import RoleDialog from "@/components/signUp/RoleDialog";
import { getUserFromDatabase, getUserFromGoogle } from "@/lib/api/user";
import { useUser } from "@/store/UserContext";
import { IGoogleUser } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [googleUser, setGoogleUser] = useState<IGoogleUser>();
  const { setUser, setIsSeller } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");
    const getUserData = async () => {
      try {
        const googleUserData = await getUserFromGoogle(accessToken as string);
        setGoogleUser(googleUserData);
        const userDataFromDatabase = await getUserFromDatabase(
          googleUserData.id
        );
        if (!userDataFromDatabase) {
          setOpen(true);
        } else {
          setUser(userDataFromDatabase);
          setIsSeller(userDataFromDatabase.isSeller);
          localStorage.setItem("userId", userDataFromDatabase.id);
          localStorage.setItem(
            "isSeller",
            String(userDataFromDatabase.isSeller)
          );
        }
      } catch (error) {
        throw error;
      } finally {
        navigate("/");
      }
    };
    accessToken && getUserData();
  }, []);

  return (
    <div className="mt-20 mx-auto px-[10%]">
      Home
      <RoleDialog
        open={open}
        setOpen={setOpen}
        googleUserData={googleUser as IGoogleUser}
      />
    </div>
  );
};

export default Home;

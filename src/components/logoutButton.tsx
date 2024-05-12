import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { pushToast } from "~/lib/utils";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/logout");

      if (response.status === 200) {
        router.refresh();
      }
    } catch (error) {
      pushToast("destructive", "Something went wrong during logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="h-9" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}

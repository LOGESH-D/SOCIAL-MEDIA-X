import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../constant/url.js";

const useAuthUser = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch(`${baseURL}/api/auth/me`, {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch auth user");
                }
                return data;
            } catch (error) {
                throw new Error(error?.message || String(error));
            }
        },
        retry: false,
    });
};

export default useAuthUser;
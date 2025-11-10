import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { baseURL } from "../constant/url.js";

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (formData) => {
        try {
          const res = await fetch(`${baseURL}/api/users/update`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            // include server message when available
            throw new Error(data.error || data.message || "Something went wrong");
          }
          return data;
        } catch (error) {
          // normalize thrown value
          throw new Error(error?.message || String(error));
        }
      },
      onSuccess: () => {
        toast.success("Profile updated successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        ]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;

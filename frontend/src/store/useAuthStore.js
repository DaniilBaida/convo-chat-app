import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: null,
    isRegistering: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/me");

            set({ authUser: res.data });
        } catch (error) {
            console.log(`[useAuthStore.checkAuth] error: ${error}`);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));

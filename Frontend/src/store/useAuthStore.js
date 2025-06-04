import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast"


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/users/checkuser")
            set({ authUser: response.data })

        } catch (error) {
            console.log("Error in CheckAuth store", error.message)
            set({ authUser: null })
        }

        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (formData) => {
        set({ isSigninUp: true })
        try {
            const res = await axiosInstance.post("/users/signup", formData)
            set({ authUser: res.data })
            toast.success("Account created successfully")

        } catch (error) {
            if (formData.email && formData.password) {
                toast.error(
                    error.response.data.message)
            }
            console.log("Error in SignUp store", error.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/users/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")
        }
        catch (error) {
            console.log("Error in Logout store", error.message)
            toast.error("Failed to log out")
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post("/users/login", formData)
            set({ authUser: response.data })
            toast.success("Logged in successfully!")
        } catch (error) {
            if (formData.email && formData.password) {
                toast.error(
                    error.response.data.message)
            }
            console.log("Error in Login store", error.message)
        }
        finally {
            set({ isLoggingIn: false })
        }
    }
}))
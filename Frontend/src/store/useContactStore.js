import { axiosInstance } from "../lib/axios";
import { create } from "zustand"
import { toast } from "react-hot-toast"

export const useContactStore = create((set) => ({
    contactsArray: [],
    isProcessing: false,

    getContacts: async () => {
        try {
            set({ isProcessing: true })
            const res = await axiosInstance.get("/contacts")
            set({
                contactsArray: res.data.contacts
            })
        }
        catch (error) {
            console.log("Error while fetching contacts,", error.message)
            toast.error(error.response?.data?.message)
        }
        finally {
            set({ isProcessing: false })
        }
    },

    createContact: async (data) => {
        try {
            set({ isProcessing: true })
            const res = await axiosInstance.post("/contacts", data)

            set((state) => ({
                contactsArray: [...state.contactsArray, res.data?.contacts]
            }))
            toast.success("Contact created successfully")

        } catch (error) {
            console.log("Error while fetching contacts,", error.message)
            toast.error(error.response.data.message)
        }
        finally {
            set({ isProcessing: false })
        }

    },

    editContact: async (id, data) => {
        try {
            set({ isProcessing: true })
            const res = await axiosInstance.put(`/contacts/${id}`, data)
            set((state) => ({
                contactsArray: state?.contactsArray.map((contact) => (contact._id === id ? res.data.updatedContact : contact))
            }))
            toast.success("Contact updated successfully")
        } catch (error) {
            console.log("Error while editing contact ", error.message)
            toast.error(error.response?.data?.message)
        }
        finally {
            set({ isProcessing: false })
        }
    },

    deleteContact: async (id) => {
        try {
            set({ isProcessing: true })
            await axiosInstance.delete(`/contacts/${id}`)
            set((state) => ({
                contactsArray: state.contactsArray.filter((contact) => (contact._id !== id))
            }))
            toast.success("Contact deleted successfully");
        } catch (error) {
            console.log("Error while deleting contact:", error.message);
            toast.error(error.response?.data?.message);
        } finally {
            set({ isProcessing: false });
        }
    }
}))
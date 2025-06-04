import Contact from "../models/contactsModel.js"

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user._id })
        if (!contacts.length) {
            return res.status(200).json({ message: "No contacts found , please create one " })
        }
        return res.status(200).json({ message: "Contact found", contacts })
    } catch (error) {
        console.log("Error while getContact controller:", error.message)
        return res.status(500).json({ message: "Internal server Error" })
    }

}

export const getContactById = async (req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findById(id)
        if (!contact) {
            return res.status(404).json({ message: "No contacts associated with this id " })
        }
        return res.status(200).json({ message: "Contact found", contact })
    } catch (error) {
        console.log("Error while getContactbyid controller:", error.message)
        return res.status(500).json({ message: "Internal server Error" })
    }
}

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params
        console.log("Params::", id)
        const { name, email, phone } = req.body
        const contact = await Contact.findById(id)
        if (!contact) {
            return res.status(403).json("No contact found")
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            id, { name, email, phone }, { new: true }
        )
        return res.status(200).json({ message: "Contact Updated", updatedContact })
    } catch (error) {
        console.log("Error while updateContact controller:", error.message)
        return res.status(500).json({ message: "Internal server Error" })
    }

}

export const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body
        if (!name || !email || !phone) {
            return res.status(404).json({ message: "All fields are required" })
        }
        const contact = await Contact.create({ name, email, phone, userId: req.user.id })
        return res.status(201).json({ message: "Contact created successfully", contact })
    } catch (error) {
        console.log("Error while createContact controller:", error.message)
        return res.status(500).json({ message: "Internal server Error" })
    }

}

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findById(id)

        if (!contact) {
            return res.status(404).json({ message: "Contact not found associated with ID" });
        }
        if (contact.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "User is unauthorized , cannot delete contact" })
        }
        await Contact.findByIdAndDelete(id)
        return res.status(200).json({ message: "Contact deleted successfully" })
    } catch (error) {
        console.log("Error while deleteContact controller:", error.message)
        return res.status(500).json({ message: "Internal server Error" })
    }

}



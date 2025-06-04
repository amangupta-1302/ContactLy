import { useEffect, useState } from "react";
import ContactModal from "../components/ContactModel";
import { useContactStore } from "../store/useContactStore";
import { toast } from "react-hot-toast";
import ContactSkeleton from "../components/skeleton/ContactSkeleton";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    getContacts,
    isProcessing,
    contactsArray,
    createContact,
    editContact,
    deleteContact,
  } = useContactStore();
  const [modalType, setModalType] = useState("");
  const [selectedContact, setSelectedContact] = useState({});
  const sanitizeContact =
    contactsArray?.filter(
      (contact) => contact && contact.name && contact.email && contact.phone
    ) || [];

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const handleSubmit = async (data) => {
    try {
      if (modalType === "create") {
        await createContact(data);
        await getContacts();
      } else if (modalType === "edit") {
        await editContact(data.id, data);
      } else if (modalType === "delete") {
        await deleteContact(data._id);
      }
    } catch (error) {
      console.log("Error in handleSubmit in Homepage : ", error.message);
      toast.error("Something went wrong!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Contacts</h1>
        {/* Create Button */}
        <div className="mb-4">
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedContact({ name: "", email: "", phone: "" });
              setModalType("create");
            }}
          >
            <span className="mr-1">➕</span>Add Contact
          </button>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {isProcessing ? (
                <ContactSkeleton />
              ) : sanitizeContact.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-8">
                    No contacts found.
                  </td>
                </tr>
              ) : (
                sanitizeContact.map((contact, index) => (
                  <tr className="hover:bg-gray-500" key={index}>
                    <td>{contact?.name}</td>
                    <td>{contact?.phone}</td>
                    <td>{contact?.email}</td>
                    <td>
                      {/* Action Buttons */}
                      <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => {
                          setModalType("edit");
                          setIsModalOpen(true);
                          setSelectedContact(contact);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error mr-2"
                        onClick={() => {
                          setModalType("delete");
                          setIsModalOpen(true);
                          setSelectedContact(contact);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* MODAL */}
      <ContactModal
        isOpen={isModalOpen}
        type={modalType}
        data={selectedContact}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;

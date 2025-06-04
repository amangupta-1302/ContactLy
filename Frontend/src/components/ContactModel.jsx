import { useEffect, useState } from "react";

const ContactModal = ({ isOpen, type, data, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        id: data._id || data.id || undefined,
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box w-96">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
        {/* HEADING  */}
        <h3 className="font-bold text-lg mb-4">
          {type === "create"
            ? "Create Contact"
            : type === "edit"
            ? "Edit Contact"
            : "DeleteContact"}
        </h3>

        {type === "delete" ? (
          <>
            <p className="py-2">
              Are you sure you want to delete this contact?
            </p>
            <div className="modal-action">
              <button className="btn btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => onSubmit(data)}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-sm" type="submit">
                {type === "create" ? "Create" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default ContactModal;

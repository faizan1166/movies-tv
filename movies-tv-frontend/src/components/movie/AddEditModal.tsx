import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Movie, MovieFormData } from "../../types";
import Button from "../globalButton/Button";
import GlobalInput from "../globalInput/GlobalInput";

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MovieFormData) => Promise<void>;
  editMovie?: Movie | null;
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editMovie,
}) => {
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearOrTime: "",
    description: "",
    posterUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editMovie) {
      setFormData(editMovie);
    } else {
      setFormData({
        title: "",
        type: "Movie",
        director: "",
        budget: "",
        location: "",
        duration: "",
        yearOrTime: "",
        description: "",
        posterUrl: "",
      });
    }
  }, [editMovie, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Enter title",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      required: true,
      options: [
        { label: "Movie", value: "Movie" },
        { label: "TV Show", value: "TV Show" },
      ],
    },
    {
      name: "director",
      label: "Director",
      type: "text",
      required: true,
      placeholder: "Director name",
    },
    {
      name: "budget",
      label: "Budget",
      type: "text",
      required: true,
      placeholder: "e.g., $160 million",
    },
    {
      name: "duration",
      label: "Duration",
      type: "text",
      required: true,
      placeholder: "e.g., 2h 28m",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      required: true,
      placeholder: "Filming location",
    },
    {
      name: "yearOrTime",
      label: "Year/Time",
      type: "text",
      required: true,
      placeholder: "e.g., 2010 or 2008–2013",
    },
    {
      name: "posterUrl",
      label: "Poster URL",
      type: "url",
      required: true,
      placeholder: "https://example.com/poster.jpg",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter description",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gray-900 rounded-2xl w-full max-w-3xl border overflow-hidden border-white/20 shadow-2xl animate-slideUp">
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 px-4 py-2 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white">
            {editMovie ? "Edit Movie" : "Add New Movie"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto">
          {fields.map((field) => (
            <GlobalInput
              key={field.name}
              {...(field as any)}
              value={formData[field.name as keyof MovieFormData] || ""}
              onChange={handleChange}
            />
          ))}

          <div className="flex gap-3 mt-6 pt-6 border-t border-white/10 justify-between">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 !max-w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : editMovie ? "Update" : "Add Movie"}
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1 !max-w-full"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;

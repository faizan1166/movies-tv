import React from "react";
import { AlertCircle } from "lucide-react";
import Button from "../globalButton/Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDeleting?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl animate-slideUp">
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-1">
              Are you sure you want to delete
            </p>
            <p className="text-purple-400 font-semibold">"{title}"?</p>
            <p className="text-sm text-gray-400 mt-3">
              This action cannot be undone.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onConfirm}
              variant="danger"
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

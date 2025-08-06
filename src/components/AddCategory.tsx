import { Modal, Input, ColorPicker, message } from "antd"
import { useCategories } from "../context/CategoryContext";
import { useState } from "react";

interface AddCategoryProps {
  isVisible: boolean;
  onClose: () => void;
  onCategoryAdded?: (categoryValue: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ isVisible, onClose, onCategoryAdded }) => {
    const { categories, setCategories } = useCategories();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryColor, setNewCategoryColor] = useState("#1890ff");
    const [error, setError] = useState("");
    
    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
          setError("Category name cannot be empty");
          return;
        }

        // Check for duplicate categories (case-insensitive)
        const normalizedNewName = newCategoryName.trim().toLowerCase();
        const isDuplicate = categories.some(category => 
          category.label.toLowerCase() === normalizedNewName ||
          category.value === normalizedNewName.replace(/\s+/g, '-')
        );

        if (isDuplicate) {
          setError("A category with this name already exists");
          return;
        }

        // Clear any previous errors
        setError("");

        const newCategory = {
          value: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
          label: newCategoryName.trim(),
          color: newCategoryColor
        };
        setCategories([...categories, newCategory]);
        setNewCategoryName("");
        setNewCategoryColor("#1890ff");
        message.success("Category added successfully!");
        
        // Call the callback with the new category value
        if (onCategoryAdded) {
          onCategoryAdded(newCategory.value);
        }
        
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value);
        // Clear error when user starts typing
        if (error) {
          setError("");
        }
    };

    const handleClose = () => {
        setNewCategoryName("");
        setNewCategoryColor("#1890ff");
        setError("");
        onClose();
    };
    
    return (
      <Modal
        title="Add New Category"
        open={isVisible}
        onOk={handleAddCategory}
        onCancel={handleClose}
        okText="Add"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-blue-500 hover:bg-blue-600"
        }}
      >
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={handleInputChange}
              status={error ? "error" : ""}
              onPressEnter={handleAddCategory}
            />
            {error && (
              <div className="text-red-500 text-sm mt-1">
                {error}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span>Color:</span>
            <ColorPicker
              value={newCategoryColor}
              onChange={(color) => setNewCategoryColor(color.toHexString())}
            />
          </div>
        </div>
      </Modal>
    );
}
 
export default AddCategory;
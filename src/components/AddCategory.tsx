import { Modal, Input, ColorPicker } from "antd"
import { useCategories } from "../context/CategoryContext";
import { useState } from "react";

interface AddCategoryProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ isVisible, onClose }) => {
    const { categories, setCategories } = useCategories();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryColor, setNewCategoryColor] = useState("#1890ff");
    
    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
          const newCategory = {
            value: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
            label: newCategoryName,
            color: newCategoryColor
          };
          setCategories([...categories, newCategory]);
          setNewCategoryName("");
          setNewCategoryColor("#1890ff");
          onClose();
        }
    };
    
    return (
      <Modal
        title="Add New Category"
        open={isVisible}
        onOk={handleAddCategory}
        onCancel={onClose}
        okText="Add"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <Input
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
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
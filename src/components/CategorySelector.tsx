import { Select, Popconfirm, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const CategorySelector = ({
  categories, // array of category objects
  value,      // currently selected category value
  onChange,   // function to handle category change
  onDelete,   // function to handle category deletion
  onAdd,      // function to handle adding a new category
}: {
  categories: { label: string; value: string; color?: string }[];
  value: string;
  onChange: (value: string) => void;
  onDelete: (value: string) => void;
  onAdd: () => void;
}) => (
  // main container with flex layout and gap
  <div className="flex gap-2">
    {/* select dropdown for categories */}
    <Select
      value={value}
      onChange={(value: string) => onChange(value)}
      style={{ flex: 1 }}
      options={categories}
      // custom rendering for each option in the dropdown
      optionRender={(option) => (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {/* colored circle for category color */}
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: option.data.color }}
            />
            {/* category label */}
            {option.data.label}
          </div>
          {/* show delete icon for all categories except "all" */}
          {option.data.value !== "all" && (
            <Popconfirm
              title="Delete this category?"
              description="this will also remove it from all existing todos."
              onConfirm={() => onDelete(option.data.value)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={e => e.stopPropagation()} // prevent select from closing when clicking delete
              />
            </Popconfirm>
          )}
        </div>
      )}
    />
    {/* button to add a new category */}
    <Button
      icon={<PlusOutlined />}
      onClick={onAdd}
      title="add new category"
      type="default"
    />
  </div>
);

export default CategorySelector;
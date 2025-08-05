import { Select, Popconfirm, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const CategorySelector = ({
  categories,
  value,
  onChange,
  onDelete,
  onAdd,
}: {
  categories: { label: string; value: string; color?: string }[];
  value: string;
  onChange: (value: string) => void;
  onDelete: (value: string) => void;
  onAdd: () => void;
}) => (
  <div className="flex gap-2">
    <Select
      value={value}
      onChange={(value: string) => onChange(value)}
      style={{ flex: 1 }}
      options={categories}
      optionRender={(option) => (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: option.data.color }}
            />
            {option.data.label}
          </div>
          {option.data.value !== "all" && (
            <Popconfirm
              title="Delete this category?"
              description="This will also remove it from all existing todos."
              onConfirm={() => onDelete(option.data.value)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={e => e.stopPropagation()}
              />
            </Popconfirm>
          )}
        </div>
      )}
    />
    <Button
      icon={<PlusOutlined />}
      onClick={onAdd}
      title="Add new category"
      type="default"
    />
  </div>
);

export default CategorySelector;
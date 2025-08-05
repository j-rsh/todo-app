import { Input, DatePicker } from "antd";
import CategorySelector from "./CategorySelector";

const { TextArea } = Input;

const TodoFormFields = ({ formik, categories, onDeleteCategory, onAddCategory }: {
  formik: any;
  categories: { label: string; value: string; color?: string }[];
  onDeleteCategory: (categoryValue: string) => void;
  onAddCategory: () => void;
}) => (
  <div className="space-y-3">
    <Input
      name="title"
      placeholder="Add a new todo..."
      value={formik.values.title}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      status={formik.touched.title && formik.errors.title ? 'error' : ''}
    />
    {formik.touched.title && formik.errors.title && (
      <div className="text-red-500 text-xs">{formik.errors.title}</div>
    )}
    <TextArea
      name="description"
      placeholder="Add description (optional)"
      value={formik.values.description}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      rows={3}
      className="hidden md:block"
      status={formik.touched.description && formik.errors.description ? 'error' : ''}
    />
    {formik.touched.description && formik.errors.description && (
      <div className="text-red-500 text-xs">{formik.errors.description}</div>
    )}
    <CategorySelector
      categories={categories}
      value={formik.values.category}
      onChange={(value: string) => formik.setFieldValue('category', value)}
      onDelete={onDeleteCategory}
      onAdd={onAddCategory}
    />
    {formik.touched.category && formik.errors.category && (
      <div className="text-red-500 text-xs">{formik.errors.category}</div>
    )}
    <DatePicker
      name="dueDate"
      placeholder="Select due date (optional)"
      value={formik.values.dueDate}
      onChange={date => formik.setFieldValue('dueDate', date)}
      onBlur={() => formik.setFieldTouched('dueDate', true)}
      style={{ width: '100%' }}
    />
  </div>
);

export default TodoFormFields; 
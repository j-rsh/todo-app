import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined} from "@ant-design/icons";
import AddTodo from "./AddTodo";

const AddTodoModalWrapper: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* desktop add todo button */}
      <div className="hidden md:block mb-6">
        <div className="flex justify-between items-center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Todo
          </Button>
        </div>
      </div>
      
      {/* mobile addtodo button */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] md:hidden shadow-lg"
        style={{
          width: '56px',
          height: '56px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#ff4d4f',
          borderColor: '#ff4d4f',
          position: 'fixed',
          zIndex: 9999
        }}
      />
      
      {/* addtodo form modal */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Add Todo"
        destroyOnHidden
        centered
        width={600}
      >
        <AddTodo onClose={() => setOpen(false)} />
        </Modal>
    </>
  );
};

export default AddTodoModalWrapper;

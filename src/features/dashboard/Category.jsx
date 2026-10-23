import { HiOutlinePlus } from "react-icons/hi2";
import Widget from "./Widget";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddWidgetForm from "./AddWidgetForm";

export default function Category({ category }) {
  return (
    <div className="flex flex-col gap-4 p-2 md:px-4 lg:px-6">
      <h2 className="text-lg font-medium">{category.name}</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.widgets.map((widget) => (
          <Widget widget={widget} category={category} key={widget.id} />
        ))}

        <div className="flex min-h-50 flex-col items-center justify-center gap-6 rounded-xl bg-slate-50 p-4 shadow-sm transition-all hover:bg-slate-100 hover:shadow-md">
          <Modal>
            <Modal.Open opens="addWidget">
              <Button>
                <Button.Text>Add Widget</Button.Text>
                <Button.Icon>
                  <HiOutlinePlus />
                </Button.Icon>
              </Button>
            </Modal.Open>
            <Modal.Window name="addWidget">
              <AddWidgetForm currentCategory={category} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

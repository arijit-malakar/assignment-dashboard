import { HiListBullet, HiOutlinePlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import SearchBtn from "./SearchBtn";
import Modal from "../../ui/Modal";
import AddWidgetForm from "../dashboard/AddWidgetForm";
import Search from "./Search";
import Drawer from "../../ui/Drawer";
import CategoriesMenu from "./CategoriesMenu";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-2 md:px-4 lg:px-6">
      <h1 className="text-2xl font-medium tracking-wide">Dashboard</h1>

      <Modal>
        <Drawer>
          <Modal.Open opens="search">
            <SearchBtn />
          </Modal.Open>
          <div className="flex gap-2 md:gap-4">
            <Modal.Open opens="addWidgetGlobal">
              <Button>
                <Button.Icon>
                  <HiOutlinePlus />
                </Button.Icon>
                <Button.Text>Add Widget</Button.Text>
              </Button>
            </Modal.Open>

            <Drawer.Open>
              <Button>
                <Button.Icon>
                  <HiListBullet />
                </Button.Icon>
                <Button.Text>Category</Button.Text>
              </Button>
            </Drawer.Open>
          </div>

          <Drawer.Content heading="Manage Categories">
            <CategoriesMenu />
          </Drawer.Content>

          <Modal.Window name="search">
            <Search />
          </Modal.Window>
          <Modal.Window name="addWidgetGlobal">
            <AddWidgetForm />
          </Modal.Window>
        </Drawer>
      </Modal>
    </header>
  );
}

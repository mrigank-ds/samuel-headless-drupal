import { PreviewAlert } from "components/preview-alert";
import BtHeader from "./BtHeader";
import BtFooter from "./BtFooter";
export function BtLayout({ children, menus, footerMenus }) {
  const footerMenu = footerMenus?.tree;
  const mainMenus = menus?.tree;
  return (
    <>
      <PreviewAlert />
      <div className="px-6 mx-auto">
        <BtHeader mainMenus={mainMenus} />
        <main className="container py-10 mx-auto">{children}</main>
        <BtFooter footerMenus={footerMenu} />
      </div>
    </>
  );
}

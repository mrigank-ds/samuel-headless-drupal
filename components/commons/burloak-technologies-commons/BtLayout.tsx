import { PreviewAlert } from "components/preview-alert";
import BtHeader from "./BtHeader";
export function BtLayout({ children, menus }) {
 
  const mainMenus = menus?.tree;
  return (
    <>
      <PreviewAlert />
      <div className="px-6 mx-auto">
        <BtHeader mainMenus={mainMenus} />
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  );
}

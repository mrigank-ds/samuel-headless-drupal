import { PreviewAlert } from "components/preview-alert";
import Header from "./header";
export function Layout({ children, menus }) {
 
  const mainMenus = menus?.tree;
  return (
    <>
      <PreviewAlert />
      <div className="px-6 mx-auto">
        <Header mainMenus={mainMenus} />
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  );
}

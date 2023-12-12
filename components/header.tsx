import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LocaleSwitcher } from "./locale-switcher";
import { useRouter } from "next/router";
const Header = ({ mainMenus }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  
  const router = useRouter();
  /**
   * Set index when you hover
   * @param index
   */
  const handleMouseEnter = (index) => {
    setActiveMenu(index);
  };

  /**
   * Set the index to null when you leave the menu
   */
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };
  const [products, setProducts] = useState([]);
  const handleClick = () => {
    fetchData(router.query.locale);
  };

  const fetchData = async (locale) => {
    try {
      const response = await fetch('/api/products', {
        method: "POST",
        body: JSON.stringify({
          locale: locale,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      setProducts(data.data); // Adjust based on the actual structure of the API response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    useEffect(() => {
      fetchData(router.query.locale);
    }, []);
    
  return (
    <header className="bg-white-800 py-4">
      <div className="container mx-auto items-center justify-between">
        <div>
          <Image
            src="http://localhost/Samuel-Project/install-dir/web/sites/default/files/samuelLogo.jpg"
            width={200}
            height={200}
            alt="Samuel-Logo"
          />
        </div>
        <div className="LocaleSwitcher">
          <LocaleSwitcher/>
        </div>
        <nav className="flex space-x-4 mt-5">
          {mainMenus &&
            mainMenus.map((value, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={value.url.replace(
                    "/New-Headless-Drupal-Website/d-9.5.11/install-dir/web",
                    ""
                  )}
                  className="hover:text-blue-600 text-black text-semibold"
                >
                  {value.title}
                </Link>
                {value.items && index === activeMenu && (
                  <ul className="absolute bg-white text-gray-800 p-2 space-y-2 border shadow-md">
                    {value.items.map((submenu, subIndex) => (
                      <li key={subIndex}>
                        <Link href={"#"}>
                          <p className="hover:text-blue-600">{submenu.title}</p>
                          {submenu.items &&
                            submenu.items.map((value: any, index: number) => (
                              <p  className="hover:text-blue-600" key={index}>{value.title}</p>
                            ))}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

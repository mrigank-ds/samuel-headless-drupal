import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import siteConfig from "../site.config";

export function LocaleSwitcher({ ...props }) {
  const router = useRouter();
  const locales = ["en", "fr"];
  if (!locales || locales.length < 2) {
    return null;
  }

  
  return (
    <>
      <p>Local Switcher</p>
      <nav {...props}>
        <ul className="flex space-x-4">
          {locales.map((locale) => {
            return (
              <li key={locale}>
                <Link
                  href={
                     "/products-services" + siteConfig.locales[locale.toString()].path
                  }
                  data-cy={`local-switcher-${locale}`}
                  className={classNames(
                    locale === siteConfig.defaultLocale
                      ? "font-bold"
                      : "font-normal"
                  )}
                >
                  {siteConfig.locales[locale.toString()].name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

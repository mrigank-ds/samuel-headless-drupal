import Link from "next/link";
import React from "react";

export default function BtFooter({ footerMenus }) {
  return (
    <footer>
      <div className="flex flex-row">
        {footerMenus &&
          footerMenus.map((value: any, index: number) => {
            return (
              <>
                {value.title != "Footer Lower Links" && (
                  <div key={index} className="m-12">
                    <h2 className="font-bold text-white text-xl mb-5">
                      {value.title}
                    </h2>
                    {value.items &&
                      value.items.map((value: any, index: number) => {
                        return (
                          <Link
                            key={index}
                            href={value.route.name && value.route.name}
                          >
                            <p className="text-white text-xs font-semibold">
                              {value.title}
                            </p>
                            <hr />
                          </Link>
                        );
                      })}
                  </div>
                )}
              </>
            );
          })}
      </div>
      <div className="flex flex-row ml-[300px] mb-[10px]">
        {footerMenus &&
          footerMenus.map((value: any, index: number) => {
            return (
              <>
                {value.title === "Footer Lower Links" &&
                  value.items &&
                  value.items.map((value: any, index: number) => {
                    return (
                      <div key={index} className="mr-[15px]">
                        <Link href={value.route.name && value.route.name}>
                          <p className="text-white text-xs font-semibold">
                            {value.title}
                          </p>
                        </Link>
                      </div>
                    );
                  })}
              </>
            );
          })}
      </div>
      <hr className="ml-[60px] mr-[60px] mt-[30px]" />
      <div className="footer-copyright h-[60px] mt-10">
        <span className="ml-[500px] text-white font-bold text-[20px]">
          © 2023 Samuel, Son & Co.
        </span>
      </div>
    </footer>
  );
}

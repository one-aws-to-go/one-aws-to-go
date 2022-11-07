import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Disclosure } from "@headlessui/react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import LogoutButton from "./LogOut";

const NavBar = () => {
  const [, , removeCookie] = useCookies<string>(["Authorization"]);

  const links = [
    { name: "Home", to: "/home", current: true },
    { name: "Logs", to: "/logs", current: true },
  ];

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    removeCookie("Authorization");
  };

  return (
    <Disclosure as="nav" className="bg-primaryContainer">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <span className="self-center text-xl font-bold whitespace-nowrap text-primary">
                    OA2G
                  </span>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {links.map((item) => (
                      <NavLink
                        to={item.to}
                        key={item.name}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? " text-white bg-surface/[.30]"
                              : "text-gray-300 hover:text-primary",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-0 sm:static sm:inset-auto">
                <LogoutButton />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {links.map((item) => (
                <NavLink
                  to={item.to}
                  key={item.name}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "text-white bg-surface/[.30]"
                        : "text-gray-300 hover:text-primary",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;

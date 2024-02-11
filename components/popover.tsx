"use client";

import { useState, forwardRef, MouseEventHandler } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import classNames from "classnames";

interface PopoverProps {
  target: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  target,
  className,
  children,
}) => {
  let [referenceElement, setReferenceElement] = useState<HTMLSpanElement>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement>();

  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              ref={setReferenceElement}
              className={className}
              as="span"
            >
              {target}
            </Menu.Button>
            {open && (
              <Menu.Items className="origin-top-right absolute right-2 top-8 mt-2 w-48 rounded-md shadow-lg">
                <div className="py-1 rounded-md bg-white shadow-xs">
                  {children}
                </div>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};
interface PopoverOptionProps {
  as?: "a" | "button";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
}

export const PopoverOption: React.FC<
  React.PropsWithChildren<PopoverOptionProps>
> = ({ as, className, children, onClick, href }) => {
  if (as === "a") {
    return (
      <Menu.Item>
        {({ active }) => (
          <MenuLink
            href={href}
            className={classNames(className, active && "bg-gray-100")}
          >
            {children}
          </MenuLink>
        )}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={classNames(className, active && "bg-gray-100")}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const MenuLink = forwardRef<HTMLAnchorElement, LinkProps>(function MenuLink(
  props,
  ref
) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href} ref={ref} {...rest}>
      {children}
    </Link>
  );
});

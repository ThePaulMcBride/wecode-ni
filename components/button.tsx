import { forwardRef } from "react";
import classname from "classnames";

type Icon = "message" | "link" | "down";

interface Props {
  children: React.ReactNode;
  className?: string;
  icon?: Icon;
  iconAfter?: Icon;
  color: "teal" | "white";
  as?: "button" | "a" | "span";
}

export const Button = forwardRef<HTMLElement, Props>(function Button(
  { children, className, icon, iconAfter, color = "teal", ...props },
  ref
) {
  const Element = props.as || "button";

  const colors = {
    teal: "text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-700",
    "primary-outline":
      "bg-transparent hover:bg-primary-500 text-primary-600 hover:text-white border-primary-500 hover:border-transparent focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-700",
    white:
      "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-700",
  };

  const classes = classname(
    "inline-flex items-center px-3 py-2 border border-transparent leading-4 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer",
    colors[color],
    className
  );

  return (
    <Element ref={ref as any} className={classes} {...props}>
      {icon && <SVG icon={icon} />}
      {children}
      {iconAfter && <SVG icon={iconAfter} position="after" />}
    </Element>
  );
});

interface IconProps {
  icon: Icon;
  position?: "after" | "before";
}

const SVG: React.FC<React.PropsWithChildren<IconProps>> = ({
  icon,
  position,
}) => {
  if (icon === "message") {
    return (
      <svg
        className={`${
          position === "after" ? "-mr-0.5 ml-2 h-4 w-4" : "-ml-0.5 mr-2 h-4 w-4"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  if (icon === "link") {
    return (
      <svg
        className={`${
          position === "after" ? "-mr-0.5 ml-2 h-4 w-4" : "-ml-0.5 mr-2 h-4 w-4"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        ></path>
      </svg>
    );
  }

  if (icon === "down") {
    return (
      <svg
        className={`${
          position === "after" ? "-mr-0.5 ml-2 h-4 w-4" : "-ml-0.5 mr-2 h-4 w-4"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    );
  }
};

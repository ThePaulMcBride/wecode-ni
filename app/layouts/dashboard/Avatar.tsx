import { Popover, PopoverOption } from "components/popover";
import { signOut } from "next-auth/react";
import Image from "next/legacy/image";

export function Avatar({ user }) {
  return (
    <Popover
      className="ml-3 rounded-full max-w-xs flex items-center text-sm focus:outline-none focus:ring relative h-8 w-8"
      target={
        <>
          <span className="h-8 w-8 rounded-full absolute inset-0 flex content-center justify-center items-center text-white bg-primary-500">
            {user.email.substring(0, 1)}
          </span>
          {user.image && (
            <Image
              className="h-8 w-8 rounded-full absolute inset-0"
              src={user.image}
              alt={user.name}
              layout="fill"
              unoptimized
            />
          )}
        </>
      }
    >
      <PopoverOption
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
      >
        Sign out
      </PopoverOption>
    </Popover>
  );
}

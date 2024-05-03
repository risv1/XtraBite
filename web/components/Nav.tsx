import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Nav = () => {
  return (
    <div className="w-screen h-[14vh] flex flex-row items-center justify-between pl-6 pt-3 pb-3">
      <Link href={"/"} className="text-2xl font-bold">
        XtraBite
      </Link>
      <div className="pr-10">
        <Link href={"/"} className="text-lg font-bold ml-5 mt-1">
          Home
        </Link>
        <Link href={"/restaurants"} className="text-lg font-bold ml-5 mt-1">
          Restaurants
        </Link>
        <Link href={"/food"} className="text-lg font-bold ml-5 mt-1">
          Food
        </Link>
        <Link href={"/customers"} className="text-lg font-bold ml-5 mt-1">
          Customers
        </Link>
        <Link href={"/orders"} className="text-lg font-bold ml-5 mt-1">
          Orders
        </Link>
        <Link
          href={"/delivery"}
          className="text-lg font-bold ml-5 mt-1"
        >
          Delivery
        </Link>
      </div>
      <div className="pr-8">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Nav;

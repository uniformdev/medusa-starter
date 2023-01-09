import Link from "next/link";

export interface NavigationProps {
  navLinks?: Array<NavLink>;
}

export interface NavLink {
  title: string;
  url: string;
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className="navigation">
      <span>
        <Link href={"/"}>Home</Link>
      </span>
      <span>
        <Link href={"/shop/laptops"}>Shop Laptops</Link>
      </span>
      <span>
        <Link href={"/shop/monitors"}>Shop Monitors</Link>
      </span>
      <span>
        <Link href={"/about"}>About Us</Link>
      </span>
    </div>
  );
};

export default Navigation;

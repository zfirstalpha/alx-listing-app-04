import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="font-bold text-2xl">Listing App</h1>
        <nav className="flex space-x-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <button className="bg-white text-blue-600 px-3 py-1 rounded">Sign In</button>
          <button className="bg-white text-blue-600 px-3 py-1 rounded">Sign Up</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

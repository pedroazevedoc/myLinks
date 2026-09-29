import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export function Header() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Mock dos links do menu
  const linksMock = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Links", path: "/admin" },
    { id: 3, name: "Redes Sociais", path: "/admin/networks" },
  ];

  return (
    <header className="w-full max-w-xl bg-mauve-500 text-mauve-200 py-2 mt-4 rounded-md">
      <nav className="flex items-center justify-between px-4">
        <div className="flex gap-4 font-medium">
          {linksMock.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="hover:text-mauve-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Button
          onClick={handleLogout}
          disabled={loading}
        >
          <BiLogOut size={24} className="mx-1" />
        </Button>
      </nav>
    </header>
  );
}
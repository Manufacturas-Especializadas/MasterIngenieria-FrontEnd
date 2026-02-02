import { Link } from "react-router-dom";
import Logo from "../../assets/logomesa.png";

export const Navbar = () => {
  return (
    <header className="bg-primary border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="MESA" className="h-8 w-auto" />
            <span className="text-sm font-semibold tracking-wide text-white">
              Master Ingeniería
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

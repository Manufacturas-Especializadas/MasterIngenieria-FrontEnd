import { NavLink } from "react-router-dom";
import Logo from "../../assets/logomesa.png";

const navItems = [
  { label: "N.P x Procesos", to: "/" },
  { label: "Procesos", to: "/procesos" },
  { label: "Procesos x Linea", to: "/procesos-linea" },
];

export const Navbar = () => {
  return (
    <header className="bg-primary border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14">
          <div className="flex items-center gap-3 min-w-fit">
            <img src={Logo} alt="MESA" className="h-8 w-auto" />
            <span className="text-sm font-semibold text-white whitespace-nowrap">
              Master Ingeniería
            </span>
          </div>

          <nav className="flex-1 flex justify-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition-colors pb-1",
                    isActive
                      ? "text-white border-b-2 border-white"
                      : "text-white/80 hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* DERECHA (RESERVADO) */}
          <div className="min-w-fit text-white/80 text-sm">
            {/* Usuario / acciones futuras */}
          </div>
        </div>
      </div>
    </header>
  );
};

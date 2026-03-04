import { Link } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const links = [
    { to: "/", label: "ܫܠܡܐ" },
    { to: "/alphabet", label: "Alphabet" },
    { to: "/lessons", label: "Leçons" },
    { to: "/vocabulary", label: "Vocabulaire" },
    { to: "/flashcards", label: "Flashcards" },
    { to: "/progress", label: "Progression" },
  ] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <nav className="flex gap-4 text-sm">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
              activeProps={{ className: "font-medium text-foreground" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}

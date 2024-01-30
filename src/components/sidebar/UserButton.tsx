import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { Button } from "../ui/Button";
import type { NavigateFunction } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
  toggleBar: boolean;
}

const UserButton = ({ navigate, toggleBar }: Props) => {
  const [open, setOpen] = useState(false);
  const { logOut: logOutAction, userData } = useAuth();

  return (
    <div className="relative mt-auto">
      <div
        onClick={() => setOpen(!open)}
        className={`${
          open ? "bg-accent-foreground" : "bg-foreground"
        } flex w-full justify-between items-center cursor-pointer hover:bg-accent-foreground px-2 py-1 rounded-md  `}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{userData?.vAliasUsuario}</span>
          <span className="text-xs text-muted">
            {userData?.vDescripcionPerfil}
          </span>
        </div>

        <div className="flex justify-center items-center bg-background h-9 w-9 rounded-full text-card-foreground">
          <User />
        </div>
      </div>
      <div
        className={`${
          !open && "hidden"
        } absolute bg-foreground shadow-md rounded-md border border-border -top-1/2 -translate-y-1/2 right-0 transition-all`}
      >
        <Button
          onClick={() => logOutAction(navigate)}
          className="flex gap-2"
          variant="ghost"
        >
          <>
            <LogOut className="h-5" />
            <span className={`${toggleBar ? "hidden" : ""} text-sm`}>
              Cerrar sesión
            </span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default UserButton;

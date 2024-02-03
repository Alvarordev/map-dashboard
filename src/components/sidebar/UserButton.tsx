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
    <div className="relative mt-auto ">
      <div
        onClick={() => setOpen(!open)}
        className={`${
          open ? "bg-accent-foreground" : "bg-foreground"
        } flex w-full justify-between items-center cursor-pointer hover:bg-accent-foreground px-2 py-1 rounded-md transition-all`}
      >
        <div className={`${toggleBar && "hidden"} flex flex-col gap-0.5`}>
          <span className="text-sm">{userData?.vAliasUsuario}</span>
          <span className="text-xs text-muted">
            {userData?.vDescripcionPerfil}
          </span>
        </div>

        <div
          className={`h-8 w-8 flex justify-center items-center bg-background rounded-full text-card-foreground`}
        >
          <User />
        </div>
      </div>
      <div
        className={`${!open && "hidden"} ${
          toggleBar ? "left-0" : "right-0"
        } absolute bg-foreground shadow-md rounded-md border border-border -top-1/2 -translate-y-1/2  transition-all `}
      >
        <Button
          onClick={() => logOutAction(navigate)}
          className="flex gap-2"
          variant="ghost"
        > 
          <>
            <LogOut className="h-5" />
            <span className={` text-sm`}>Cerrar sesión</span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default UserButton;

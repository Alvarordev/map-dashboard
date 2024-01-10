import { X } from "lucide-react";
import { Button } from "../ui/Button";

interface Props {
  title: string;
  children: JSX.Element;
  show: boolean;
  handleClose: () => void;
  className: string;
}

export function Modal({ children, show, handleClose, className }: Props) {
  return (
    <div
      className={`
      fixed inset-0 m-auto 
      flex items-end justify-center 
      z-[400]
      ${!show && "hidden"}
      ${className}
      md:items-center 
      `}
    >
      <section className="max-w-4xl bg-background shadow-xl flex-1 rounded-t-[1rem] absolute z-50 md:rounded-[1rem]">
        <Button
          variant="ghost"
          className="absolute right-2 top-2"
          onClick={handleClose}
        >
          <X />
        </Button>
        <div className="p-4">{children}</div>
      </section>
      <span
        className="backdrop-blur-sm w-full h-full bg-accent/50 cursor-pointer"
        onClick={handleClose}
      ></span>
    </div>
  );
}

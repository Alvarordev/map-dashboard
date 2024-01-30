import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { Label } from "../ui/Label";
import { useUser } from "../../hooks/useUser";
import { usePerfil } from "../../hooks/usePerfil";
import { useEffect } from "react";

const UsuarioForm = () => {
  const { userData } = useAuth();
  const { createUsuario } = useUser();
  const { closeModal } = useModal();
  const { perfiles, getAllPerfiles } = usePerfil();

  useEffect(() => {
    getAllPerfiles();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!userData) return;

    const usuario: any = {
      iCodEmpresa: +userData.iCodEmpresa,
      iCodPerfil: +data.iCodPerfil,
      vAliasUsuario: data.vAliasUsuario,
      vClaveUsuario: data.vClaveUsuario,
      dtFechaVencimiento: data.dtFechaVencimiento,
      iCodigoUsuarioCreacion: +userData.iCodUsuario,
    };

    const res = await createUsuario(usuario);

    if (res) {
      toast.success("Se creó correctamente");
      reset();
      closeModal();
    } else {
      toast.error("Hubo un error al crear el perfil, intente otra vez");
    }
  };

  return (
    <>
      <div className="text-lg font-semibold text-center pb-5">
        Crear Usuario
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap max-w-xs w-full justify-center gap-3"
      >
        <div className="flex flex-col max-w-[150px]">
          <Label>Usuario:</Label>
          <Input
            {...register("vAliasUsuario")}
            type="text"
            placeholder="Ej: Usuario1"
          />
        </div>

        <div className="flex flex-col max-w-[150px]">
          <Label>Contraseña:</Label>
          <Input
            {...register("vClaveUsuario")}
            type="text"
            placeholder="Ej: Clave1"
          />
        </div>

        <div className="flex flex-col max-w-[150px]">
          <Label>Rol:</Label>
          <select
            {...register("iCodPerfil")}
            className="flex w-[150px] h-9 rounded-sm border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
          >
            <option value="defaultValue" selected disabled>
              Elige uno
            </option>
            {perfiles.map((perfil) => (
              <option key={perfil.iCodPerfil} value={perfil.iCodPerfil}>
                {perfil.vDescripcionPerfil}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col max-w-[150px]">
          <Label>Vencimiento:</Label>
          <Input
            {...register("dtFechaVencimiento")}
            type="date"
            placeholder="Ej: Admin"
          />
        </div>

        <div className="flex w-full justify-center">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
};

export default UsuarioForm;

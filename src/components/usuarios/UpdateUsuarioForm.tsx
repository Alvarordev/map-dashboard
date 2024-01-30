import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { Label } from "../ui/Label";
import { useUser } from "../../hooks/useUser";
import { usePerfil } from "../../hooks/usePerfil";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const UpdateUsuarioForm = ({ dataUsuario }: { dataUsuario: Usuario }) => {
  const { updateUsuario } = useUser();
  const { closeModal } = useModal();
  const { perfiles, getAllPerfiles } = usePerfil();
  const { userData } = useAuth();

  useEffect(() => {
    getAllPerfiles();
  }, []);

  const initialValues = {
    vAliasUsuario: dataUsuario.vAliasUsuario,
    vClaveUsuario: "",
    iCodPerfil: dataUsuario.iCodPerfil,
    dtFechaVencimiento: dataUsuario.dtFechaVencimiento,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initialValues });

  const onSubmit = async (data: FieldValues) => {
    if (!userData) return;

    const usuario: any = {
      iCodUsuario: +dataUsuario.iCodUsuario,
      iCodEmpresa: +dataUsuario.iCodEmpresa,
      iCodPerfil: +data.iCodPerfil,
      vAliasUsuario: data.vAliasUsuario,
      vClaveUsuario: data.vClaveUsuario,
      dtFechaVencimiento: data.dtFechaVencimiento,
      bEstadoRegistro: true,
      iCodigoUsuarioModificacion: +userData.iCodUsuario,
    };

    const res = await updateUsuario(usuario);

    if (res) {
      toast.success("Se guardaron los cambios");
      reset();
      closeModal();
    } else {
      toast.error("Hubo un error al guardar los cambios, intente otra vez");
    }
  };

  return (
    <>
      <div className="text-lg font-semibold text-center pb-5">
        Editar Usuario
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
            defaultValue={dataUsuario.iCodPerfil}
            className="flex w-[150px] h-9 rounded-sm border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
          >
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
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateUsuarioForm;

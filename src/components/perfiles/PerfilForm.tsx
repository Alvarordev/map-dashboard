import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { usePerfil } from "../../hooks/usePerfil";
import { Label } from "../ui/Label";

const PerfilForm = () => {
  const { userData } = useAuth();
  const { createPerfil } = usePerfil();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!userData) return;

    const perfil: any = {
      iCodEmpresa: +userData.iCodEmpresa,
      vDescripcionPerfil: data.vDescripcionPerfil,
      iCodigoUsuarioCreacion: +userData.iCodUsuario
    };

    const res = await createPerfil(perfil);

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
        Crear Perfil
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap w-[250px] justify-center gap-3"
      >
        <div className="flex flex-col w-full">
          <Label>Descripción:</Label>
          <Input
            {...register("vDescripcionPerfil")}
            type="text"
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

export default PerfilForm;

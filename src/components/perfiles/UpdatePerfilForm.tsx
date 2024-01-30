import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { usePerfil } from "../../hooks/usePerfil";
import { Label } from "../ui/Label";

const UpdatePerfilForm = ({ dataPerfil }: { dataPerfil: Perfil }) => {
  const { updatePerfil, error } = usePerfil();
  const { closeModal } = useModal();

  const initialValues = {
    vDescripcionPerfil: dataPerfil.vDescripcionPerfil,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initialValues });

  const onSubmit = async (data: FieldValues) => {
    const perfil: any = {
      iCodEmpresa: dataPerfil.iCodPerfil,
      vDescripcionPerfil: data.vDescripcionPerfil,
      bEstadoRegistro: true,
      iCodigoUsuarioModificacion: dataPerfil.iCodigoUsuarioCreacion,
    };

    await updatePerfil(perfil);

    if (!error) {
      toast.success("Se guardaron los cambios");
      reset();
      closeModal();
    } else {
      toast.error("Hubo un error al guardar los cambios, intente otra vez");
    }
  };

  return (
    <>
      <div className="text-lg font-semibold text-center pb-5">Editar Cepo</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap w-[250px] justify-center gap-3"
      >
        <div className="flex flex-col w-full">
          <Label>Descripción</Label>
          <Input {...register("vDescripcionPerfil")} type="text" />
        </div>

        <div className="flex w-full justify-center">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Guardar
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdatePerfilForm;

import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { useCepo } from "../../hooks/useCepo";

const EditCepoForm = ({ dataCepo }: { dataCepo: Tipocepo }) => {
  const { userData } = useAuth();
  const { updateCepo, error } = useCepo();
  const { closeModal } = useModal();

  const initialValues = {
    vDescripcionCepo: dataCepo.vDescripcionCepo,
    vCostoCepo: dataCepo.vCostoCepo,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initialValues });

  const onSubmit = async (data: FieldValues) => {
    if (!userData) return;

    const cepo: any = {
      iCodTipoCepo: dataCepo.iCodTipoCepo,
      vDescripcionCepo: data.vDescripcionCepo,
      vCostoCepo: +data.vCostoCepo,
      dtFechaModificacion: new Date().toISOString(),
      iCodigoUsuarioModificacion: dataCepo.iCodigoUsuarioCreacion,
    };

    const res = await updateCepo(cepo);
    console.log(res)

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
          <label>Descripción</label>
          <Input
            {...register("vDescripcionCepo")}
            type="text"
            placeholder="Ej: Liviano"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Costo del cepo</label>
          <Input
            {...register("vCostoCepo")}
            type="text"
            placeholder="Ej: 99.00"
          />
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

export default EditCepoForm;

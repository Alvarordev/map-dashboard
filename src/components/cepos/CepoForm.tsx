import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { useCepo } from "../../hooks/useCepo";
import { Label } from "../ui/Label";
// import * as z from "zod";

// const schema = z.object({
//   tipoCepo: z.string().min(1).max(255),
//   direccion: z.string().min(1).max(255),
//   conceptoMulta: z.string().min(1).max(255),
//   costoMulta: z.string().min(1).max(255),
//   tarjetaPropiedad: z.string().min(1).max(255),
//   licenciaConducir: z.string().min(1).max(255),
//   placaAuto: z.string().min(1).max(255),
//   marcaAuto: z.string().min(1).max(255),
//   modeloAuto: z.string().min(1).max(255),
//   colorAuto: z.string().min(1).max(255),
//   numeroLlantas: z.string().min(1).max(255),
//   preliquidacion: z.string().min(1).max(255),
// });

const CepoForm = () => {
  const { userData } = useAuth();
  const { createCepo } = useCepo();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!userData) return;

    const cepo: any = {
      ...data,
      iCodEmpresa: +userData.iCodEmpresa,
      iCodigoUsuarioCreacion: +userData.iCodUsuario,
      vCostoCepo: +data.vCostoCepo,
    };

    const res = await createCepo(cepo);

    if (res) {
      toast.success("Se creó correctamente");
      reset();
      closeModal();
    } else {
      toast.error("Hubo un error al crear el cepo, intente otra vez");
    }
  };

  return (
    <>
      <div className="text-lg font-semibold text-center pb-5">
        Registrar Cepo
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap w-[250px] justify-center gap-3"
      >
        <div className="flex flex-col w-full">
          <Label>Descripción</Label>
          <Input
            {...register("vDescripcionCepo")}
            type="text"
            placeholder="Ej: Liviano"
          />
        </div>
        <div className="flex flex-col w-full">
          <Label>Costo del cepo</Label>
          <Input
            {...register("vCostoCepo")}
            type="text"
            placeholder="Ej: 99.00"
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

export default CepoForm;

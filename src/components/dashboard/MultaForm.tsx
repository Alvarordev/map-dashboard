import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useMulta } from "../../hooks/useMulta";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
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

const MultaForm = () => {
  const { userData } = useAuth();
  const { createMulta } = useMulta();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!userData) return;

    const multa: any = {
      ...data,
      iCodEmpresa: +userData.iCodEmpresa,
      iCodigoUsuarioCreacion: +userData.iCodUsuario,
      iCodUsuarioBloqueo: +userData.iCodUsuario,
      dtFechaBloqueo: new Date().toJSON(),
      gCoordenadasXMulta: -12.09,
      gCoordenadasYMulta: -77.0507,
      dpCostoMulta: 500.0,
      iCodTipoCepo: 1,
      iNumeroLlantas: +data.iNumeroLlantas,
      dFechaPago: new Date().toJSON(),
    };

    const res = await createMulta(multa);

    if (res) {
      toast.success("Se creó correctamente la incidencia");
      reset();
      closeModal();
    } else {
      toast.error("Hubo un error al crear la incidencia, intente otra vez");
    }
  };

  return (
    <>
      <div className="text-lg font-semibold text-center pb-5">
        Registrar Incidencia
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-3 w-[600px] px-2"
      >
        <div className="flex flex-col">
          <label>Tipo de cepo</label>
          <Input
            {...register("iCodTipoCepo")}
            type="text"
            placeholder="Liviano"
          />
        </div>
        <div className="flex flex-col">
          <label>Direccion</label>
          <Input
            {...register("vDireccionMulta")}
            type="text"
            placeholder="Direccion falsa 123"
          />
        </div>
        <div className="flex flex-col">
          <label>Concepto multa</label>
          <Input
            {...register("vConceptoMulta")}
            type="text"
            placeholder="Concepto 1"
          />
        </div>
        <div className="flex flex-col">
          <label>Tarjeta propiedad</label>
          <Input
            {...register("vTarjetaPropiedad")}
            type="text"
            placeholder="12345678"
          />
        </div>
        <div className="flex flex-col">
          <label>Licencia conducir</label>
          <Input
            {...register("vLicenciaConducir")}
            type="text"
            placeholder="Q12345678"
          />
        </div>
        <div className="flex flex-col">
          <label>Placa auto</label>
          <Input
            {...register("vPlacaAuto")}
            type="text"
            placeholder="ABC-123"
          />
        </div>
        <div className="flex flex-col">
          <label>Marca auto</label>
          <Input {...register("vMarcaAuto")} type="text" placeholder="Tesla" />
        </div>
        <div className="flex flex-col">
          <label>Modelo auto</label>
          <Input {...register("vModeloAuto")} type="text" placeholder="X" />
        </div>
        <div className="flex flex-col">
          <label>Color auto</label>
          <Input {...register("vColorAuto")} type="text" placeholder="Blanco" />
        </div>
        <div className="flex flex-col">
          <label>Numero llantas</label>
          <Input
            {...register("iNumeroLlantas")}
            type="number"
            placeholder="4"
          />
        </div>
        <div className="flex flex-col">
          <label>Preliquidacion</label>
          <Input
            {...register("vCodigoPreliquidacion")}
            type="text"
            placeholder="12345678"
          />
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
};

export default MultaForm;

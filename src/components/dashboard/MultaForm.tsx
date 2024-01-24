import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useMulta } from "../../hooks/useMulta";
import { useModal } from "../../context/ModalProvider";
import { toast } from "sonner";
import { useCepo } from "../../hooks/useCepo";
import { useEffect } from "react";

const MultaForm = () => {
  const { userData } = useAuth();
  const { createMulta } = useMulta();
  const { closeModal } = useModal();
  const { getAllCepos, cepos } = useCepo();

  useEffect(() => {
    getAllCepos();
  }, []);

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
      iCodTipoCepo: +data.iCodTipoCepo,
      dpCostoMulta: 99.00,
      iNumeroLlantas: +data.iNumeroLlantas,
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
        className="flex flex-wrap w-[650px] justify-center gap-3"
      >
        <div className="flex flex-col">
          <label>Tipo de cepo</label>
          <select
            {...register("iCodTipoCepo")}
            className="flex w-[206px] h-9 rounded-sm border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
          >
            <option value="defaultValue" selected disabled >
              Elige uno
            </option>
            {cepos.map((cepo) => (
              <option key={cepo.iCodTipoCepo} value={cepo.iCodTipoCepo}>{cepo.vDescripcionCepo}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Direccion</label>
          <Input
            {...register("vDireccionMulta")}
            type="text"
            placeholder="Ej: Direccion falsa 123"
          />
        </div>
        <div className="flex flex-col">
          <label>Concepto multa</label>
          <Input
            {...register("vConceptoMulta")}
            type="text"
            placeholder="Ej: Mal estacionado"
          />
        </div>
        <div className="flex flex-col">
          <label>Tarjeta propiedad</label>
          <Input
            {...register("vTarjetaPropiedad")}
            type="text"
            placeholder="Ej: 12345678"
          />
        </div>
        <div className="flex flex-col">
          <label>Licencia conducir</label>
          <Input
            {...register("vLicenciaConducir")}
            type="text"
            placeholder="Ej: Q12345678"
          />
        </div>
        <div className="flex flex-col">
          <label>Placa auto</label>
          <Input
            {...register("vPlacaAuto")}
            type="text"
            placeholder="Ej: ABC-123"
          />
        </div>
        <div className="flex flex-col">
          <label>Marca auto</label>
          <Input {...register("vMarcaAuto")} type="text" placeholder="Ej: Nissan" />
        </div>
        <div className="flex flex-col">
          <label>Modelo auto</label>
          <Input {...register("vModeloAuto")} type="text" placeholder="Ej: Centra" />
        </div>
        <div className="flex flex-col">
          <label>Color auto</label>
          <Input {...register("vColorAuto")} type="text" placeholder="Ej: Blanco" />
        </div>
        <div className="flex flex-col">
          <label>Numero llantas</label>
          <Input
            {...register("iNumeroLlantas")}
            type="number"
            placeholder="Ej: 4"
          />
        </div>
        <div className="flex flex-col">
          <label>Preliquidacion</label>
          <Input
            {...register("vCodigoPreliquidacion")}
            type="text"
            placeholder="EJ: 12345678"
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

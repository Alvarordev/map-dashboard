import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const MultaForm = () => {
  return (
    <>
      <div className="text-lg font-semibold text-center pb-5">Registrar Incidencia</div>
      <form className="flex flex-wrap gap-3 w-[600px] px-2">
        <div className="flex flex-col">
          <label>Tipo de cepo</label>
          <Input type="text" placeholder="Liviano" />
        </div>
        <div className="flex flex-col">
          <label>Direccion</label>
          <Input type="text" placeholder="Direccion falsa 123" />
        </div>
        <div className="flex flex-col">
          <label>Concepto multa</label>
          <Input type="text" placeholder="Concepto 1" />
        </div>
        <div className="flex flex-col">
          <label>Costo multa</label>
          <Input type="text" placeholder="100.00" />
        </div>
        <div className="flex flex-col">
          <label>Tarjeta propiedad</label>
          <Input type="text" placeholder="12345678" />
        </div>
        <div className="flex flex-col">
          <label>Licencia conducir</label>
          <Input type="text" placeholder="Q12345678" />
        </div>
        <div className="flex flex-col">
          <label>Placa auto</label>
          <Input type="text" placeholder="ABC-123" />
        </div>
        <div className="flex flex-col">
          <label>Marca auto</label>
          <Input type="text" placeholder="Tesla" />
        </div>
        <div className="flex flex-col">
          <label>Modelo auto</label>
          <Input type="text" placeholder="X" />
        </div>
        <div className="flex flex-col">
          <label>Color auto</label>
          <Input type="text" placeholder="Blanco" />
        </div>
        <div className="flex flex-col">
          <label>Numero llantas</label>
          <Input type="text" placeholder="4" />
        </div>
        <div className="flex flex-col">
          <label>Preliquidacion</label>
          <Input type="text" placeholder="12345678" />
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full">
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
};

export default MultaForm;

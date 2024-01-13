export interface Marker {
  geocode: geoCode;
  estado: boolean;
  id: number;
  tipo: number;
  direccion: string;
  concepto: string;
  estadoPago?: string | Date | null;
}

export const fetchMarkers = async (multas: Multa[]) => {
  const markers: Marker[] = multas.map((multa) => ({
    geocode: [multa.gCoordenadasXMulta, multa.gCoordenadasYMulta],
    estado: multa.bEstadoRegistro,
    id: multa.iCodMulta,
    tipo: multa.iCodTipoCepo,
    direccion: multa.vDireccionMulta,
    concepto: multa.vConceptoMulta,
    estadoPago: multa.dFechaPago,
  }));

  return markers;
};

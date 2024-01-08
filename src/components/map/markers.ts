interface Marker {
  geocode: [number, number];
}

export const fetchMarkers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/multa`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  const multas: Multa[] = await response.json();

  const markers: Marker[] = multas.map((multa) => ({
    geocode: [multa.gCoordenadasXMulta, multa.gCoordenadasYMulta],
  }));

  console.log("Markers", markers);
  return markers;
};

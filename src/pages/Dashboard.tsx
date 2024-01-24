import { useEffect, useState } from 'react'
import { useMulta } from '../hooks/useMulta'
import DataTable from '../components/dashboard/DataTable'
import MapView from '../components/map/MapView'
import Alarm from '../assets/audio/beep-warning.mp3'
import type { Map } from 'leaflet'

const Dashboard = () => {
  const [map, setMap] = useState<Map | null>(null)
  const { multasToday, isLoading, getAllMultas } = useMulta()
  const [previousMultas, setPreviousMultas] = useState<Multa[]>(multasToday);

  useEffect(() => {
    if (!isLoading) getAllMultas()

    const reFetchMultas = setInterval(() => {
      getAllMultas()
    }, 10000)

    return () => clearInterval(reFetchMultas)
  }, [])

  useEffect(() => {
    const newMultas = multasToday.filter(
      (newMulta) => !previousMultas.some((prevMulta) => prevMulta.iCodMulta === newMulta.iCodMulta)
    );

    if (newMultas.length > 0) {
      playNotificationSound(); 
    }

    setPreviousMultas(multasToday);
  }, [multasToday, previousMultas]);

  const playNotificationSound = () => {
    const audio = new Audio(Alarm);
    audio.play();
  };

  return (
    <div className="flex flex-col gap-5">
      <MapView onMapChange={setMap} multas={multasToday} />
      <DataTable map={map} multas={multasToday} />
    </div>
  )
}

export default Dashboard

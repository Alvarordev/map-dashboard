import { useEffect, useState } from 'react'
import DataTable from '../components/dashboard/DataTable'
import MapView from '../components/map/MapView'
import type { Map } from 'leaflet'
import { useMulta } from '../hooks/useMulta'

const Dashboard = () => {
  const [map, setMap] = useState<Map | null>(null)
  const { multasToday, isLoading, getAllMultas } = useMulta()

  useEffect(() => {
    if (!isLoading) getAllMultas()

    const reFetchMultas = setInterval(() => {
      getAllMultas()
    }, 10000)

    return () => clearInterval(reFetchMultas)
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <MapView onMapChange={setMap} multas={multasToday} />
      <DataTable map={map} multas={multasToday} />
    </div>
  )
}

export default Dashboard

import {
  AreaChart,
  Card,
  Metric,
  Text,
} from "@tremor/react";

const MultaProgressBar = ({
  total,
  multas,
}: {
  total: number | null;
  multas: Multa[];
}) => {
  interface ResultEntry {
    date: string;
    costo: number;
  }

  const resultArr: ResultEntry[] = multas
    .reduce((acc: ResultEntry[], multa: Multa) => {
      let date: string = new Date(multa.dtFechaBloqueo).toDateString();
      let existingEntry: ResultEntry | undefined = acc.find(
        (entry) => entry.date === date
      );

      if (existingEntry) {
        existingEntry.costo += +multa.tipocepo.vCostoCepo;
      } else {
        acc.push({ date, costo: +multa.tipocepo.vCostoCepo });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const valueFormatter = function (number: number) {
    return "S/. " + number;
  };

  return (
    <Card className="max-w-sm mr-auto rounded-md mb-5 p-4">
      <Text>Total Recaudado</Text>
      <Metric>S/. {total}</Metric>
      <AreaChart
        className="mt-4 h-32"
        data={resultArr}
        index="date"
        categories={["costo"]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export default MultaProgressBar;

import { PieChart } from "@mui/x-charts";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function GraficoMaterias({data}) {
  return (
    <PieChart
      series={[{ innerRadius: 30, outerRadius: 80, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}

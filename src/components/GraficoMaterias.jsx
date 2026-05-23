import { PieChart } from "@mui/x-charts";

const data = [
  { label: 'Group A', value: 30, color: '#d62c5b' },
  { label: 'Group B', value: 40, color: '#144a75' },
  { label: 'Group C', value: 60, color: '#2fa4a9' },
  { label: 'Group D', value: 32, color: '#009cd1' },
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function GraficoMaterias() {
  return (
    <PieChart
      series={[{ innerRadius: 30, outerRadius: 80, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}

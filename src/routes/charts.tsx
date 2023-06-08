import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Suspense, lazy } from 'react';
const LeafletMap = lazy(() => import('../components/leaflet-map'));

interface DailyCases {
  date: string;
  cases: number;
}

const getChartData = async () => {
  const res = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  const cases = res.data.cases;
  const series = Object.keys(cases).map((key) => {
    return {
      date: key,
      cases: cases[key],
    };
  });
  return series as DailyCases[];
};

const Charts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: getChartData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-2'>Charts & Maps</h1>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 10, bottom: 5, left: 50 }}
      >
        <Line type='monotone' dataKey='cases' stroke='#8884d8' />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis dataKey='date' />
        <YAxis />
      </LineChart>
      <Suspense fallback={<div>Loading...</div>}>
        <LeafletMap />
      </Suspense>
    </>
  );
};

export default Charts;

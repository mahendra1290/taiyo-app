import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line, CartesianGrid, XAxis, YAxis, LineChart } from 'recharts';

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

const LineGraph = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: getChartData,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LineChart
        width={700}
        height={400}
        data={data}
        margin={{ top: 5, right: 10, bottom: 5, left: 50 }}
      >
        <Line type='monotone' dataKey='cases' stroke='#8884d8' />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis dataKey='date' />
        <YAxis />
      </LineChart>
      <p className='text-sm text-gray-500 text-center'>Covid cases Source: disease.sh (all days)</p>
    </>
  );
};

export default LineGraph;

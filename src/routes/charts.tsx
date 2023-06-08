import { Suspense, lazy, useState } from 'react';
import Button from '../components/Button';
const LeafletMap = lazy(() => import('../components/leaflet-map'));
const LineGraph = lazy(() => import('../components/line-graph'));

const Charts = () => {
  const [activeTab, setActiveTab] = useState('chart');

  return (
    <>
      <h1 className='text-2xl font-bold mb-2'>Charts & Maps</h1>
      <div className='mb-4'>
        <Button
          variant='outline'
          onClick={() => setActiveTab('chart')}
          className={activeTab === 'chart' ? 'bg-green-200 text-black' : ''}
        >
          Chart
        </Button>
        <Button
          variant='outline'
          onClick={() => setActiveTab('map')}
          className={`ml-2 ${activeTab === 'map' ? 'bg-green-200 text-black' : ''}`}
        >
          Map
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {activeTab === 'chart' && <LineGraph />}
        {activeTab === 'map' && <LeafletMap />}
      </Suspense>
    </>
  );
};

export default Charts;

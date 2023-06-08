import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';

const getMapData = async () => {
  const res = await axios.get('https://disease.sh/v3/covid-19/countries');
  return res.data.map((country: any) => {
    return {
      country: country.country,
      lat: country.countryInfo.lat,
      lng: country.countryInfo.long,
      cases: country.cases.toLocaleString(),
      deaths: country.deaths.toLocaleString(),
      recovered: country.recovered.toLocaleString(),
    };
  });
};
const position: [number, number] = [20, 70];

const LeafletMap = () => {
  const { data: mapData, isLoading } = useQuery({
    queryKey: ['mapData'],
    queryFn: getMapData,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MapContainer className='h-[500px] w-[calc(100vw - 160px)]' center={position} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapData?.map((country: any) => {
          return (
            <Marker position={[country.lat, country.lng]}>
              <Popup>
                <div className='flex flex-col'>
                  <div className='font-bold mb-2'>{country.country}</div>
                  <div className='font-bold'>{country.cases}</div>
                  <div className='text-sm text-gray-500'>Cases</div>
                  <div className='font-bold'>{country.deaths}</div>
                  <div className='text-sm text-gray-500'>Deaths</div>
                  <div className='font-bold'>{country.recovered}</div>
                  <div className='text-sm text-gray-500'>Recovered</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <p className='text-sm text-gray-500 text-center'>
        Covid cases per country Source: disease.sh (all countries)
      </p>
    </>
  );
};

export default LeafletMap;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LatLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

interface DailyCases {
  date: string;
  cases: number;
}

const position: [number, number] = [51.505, -0.09];

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

const Charts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: getChartData,
  });

  const { data: mapData, isLoading: isMapLoading } = useQuery({
    queryKey: ['mapData'],
    queryFn: getMapData,
  });

  if (isLoading || isMapLoading) return <div>Loading...</div>;

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
    </>
  );
};

export default Charts;

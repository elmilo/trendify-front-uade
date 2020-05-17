import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { getTrendData } from '../../Axios/Axios';


// Generate Sales Data

export default function Chart() {
  const theme = useTheme();
  
  const data = getTrendData('2020');
  /* Arreglar cuando se tenga el endpoint posta
  .then((response)=>{
      const data = response;
      console.log(response);
  })
  .catch((error) => {
      console.log(error)
  });*/

  return (
    <React.Fragment>
      <Title>Hoy</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Ventas ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

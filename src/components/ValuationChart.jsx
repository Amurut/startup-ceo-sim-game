import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Title, Text } from '@mantine/core';

export function ValuationChart({ data }) {
  return (
    <Paper p="md" className="glass-panel" style={{ height: 300 }}>
      <Title order={5} mb="lg">Company Valuation ($)</Title>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" hide />
          <YAxis 
            stroke="#666" 
            fontSize={12} 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1b', border: '1px solid #333' }}
            itemStyle={{ color: '#2ecc71' }}
          />
          <Line 
            type="monotone" 
            dataKey="valuation" 
            stroke="#2ecc71" 
            strokeWidth={3} 
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
      <Text size="xs" c="dimmed" ta="right">Live Market Data</Text>
    </Paper>
  );
}
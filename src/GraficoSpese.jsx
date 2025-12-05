import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

const GraficoSpese = ({ spese }) => {
  if (!spese || spese.length === 0) {
    return null;
  }

  // Aggregare spese per descrizione
  const aggregatedData = {};
  spese.forEach(spesa => {
    const key = spesa.descrizione || 'Senza categoria';
    aggregatedData[key] = (aggregatedData[key] || 0) + Number(spesa.importo);
  });

  // Convertire in array e ordinare per valore (decrescente)
  const pieData = Object.entries(aggregatedData)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value);

  // Colori palette - più accattivanti
  const COLORS = [
    '#2563eb', '#3b82f6', '#60a5fa', '#0ea5e9',
    '#06b6d4', '#10b981', '#34d399', '#6ee7b7',
    '#f59e0b', '#fbbf24', '#ef4444', '#f87171',
    '#ec4899', '#f472b6', '#a855f7', '#d8b4fe'
  ];

  // Calcolo totale per le percentuali
  const totalSpese = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginTop: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>Distribuzione Spese</h2>

      {/* Grafico a Torta - Migliorato */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoSpese;

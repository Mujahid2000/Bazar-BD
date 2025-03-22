import React from 'react';
import { Building, DollarSign, Gift, Wallet } from 'lucide-react';

const MetricsCard = ({ icon: Icon, value, label, isHighlighted }) => (
  <div className={`p-6 rounded-lg border ${isHighlighted ? 'bg-blue-500 text-white' : 'bg-white'}`}>
    <div className="flex flex-col items-center text-center space-y-2">
      <div className={`p-3 rounded-full ${isHighlighted ? 'bg-blue-400' : 'bg-gray-200'}`}>
        <Icon size={24} className={isHighlighted ? 'text-white' : 'text-gray-700'} />
      </div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className={`text-sm ${isHighlighted ? 'text-blue-100' : 'text-gray-600'}`}>{label}</p>
    </div>
  </div>
);

const MetricsDashboard = () => {
  const metrics = [
    {
      icon: Building,
      value: '10.5k',
      label: 'Sallers active our site',
      isHighlighted: false
    },
    {
      icon: DollarSign,
      value: '33k',
      label: 'Monthly Producduct Sale',
      isHighlighted: true
    },
    {
      icon: Gift,
      value: '45.5k',
      label: 'Customer active in our site',
      isHighlighted: false
    },
    {
      icon: Wallet,
      value: '25k',
      label: 'Anual gross sale in our site',
      isHighlighted: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricsCard
            key={index}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
            isHighlighted={metric.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsDashboard;
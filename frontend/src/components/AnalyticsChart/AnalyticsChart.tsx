import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExampleProps {
  data: any[]; // Replace `any[]` with the actual type of your data
}

const colors = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff3860", // Additional colors
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", // More colors
  "#0066cc", "#ff99ff", "#009999", "#ff9933", "#3399ff", // Even more colors
  "#ff3333", "#00ff00", "#9900cc", "#ffff00", "#006633"  // And more colors
];

class Example extends PureComponent<ExampleProps> {
  constructor(props: ExampleProps) {
    super(props);
    const { data } = props;
    // Manipulate the data prop here
  }

  render() {
    const { data } = this.props;
    if (!data) return null;
    const uniqueDates = Array.from({ length: 13 }, (_, index) => `day-${index + 1}`).reverse();
    const formatDate = (date: Date): string => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return `${day}/${month}`;
    };

    const today = new Date();
    const realDates = Array.from({ length: 13 }, (_, index) => {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - index - 1);
      return formatDate(pastDate);
    }).reverse();
    let uniqueAPIs = [...new Set(data.map((item) => {
      const identifier = item.api_service_name + ' [' + item.id + ']';
      item.id = identifier;
      return identifier;
    } ))];
    let displayed = [];
    for (let i = 0; i < uniqueDates.length; i++) {
      let temp = {};
      temp['name'] = uniqueDates[i];
      for (let j = 0; j < uniqueAPIs.length; j++) {
        let api = uniqueAPIs[j];
        let usage = data.find((item) => item.id === api && item.days === uniqueDates[i]);
        if (usage) {
          temp[api] = usage.count;
        } else {
          temp[api] = 0;
        }
      }
      temp['name'] = realDates[i];
      displayed.push(temp);
    }
    
    console.log(displayed)
    return (
      <ResponsiveContainer  width="100%" height="80%">
        <AreaChart
          width={500}
          height={400}
          data={displayed}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"  />
          <YAxis label={{ value: 'Requests', angle: -90, position: 'insideLeft', offset: 10 }} />
          <Tooltip  />
          {uniqueAPIs.map((api, index) => (
            <Area type="monotone" dataKey={api} stackId="1" stroke={colors[index % colors.length]} fill={colors[index % colors.length]} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default Example;
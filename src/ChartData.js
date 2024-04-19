import React, { useState } from "react";
import { useQuery } from "react-query";
import { formatPrice } from "./CryptoTracker";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

const intervals = [
  {
    label: "Day",
    value: 1
  },
  {
    label: "Week",
    value: 7
  },
  {
    label: "Month",
    value: 30
  },
  {
    label: "Year",
    value: 365
  },
];

const useGetChartData = (cryptoName, interval, options) => {
  return useQuery(["chartData", interval],
    async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=${interval}`
      );
      return await response.json();
    },
    options
  );
};

const ChartData = ({ cryptoName }) => {
  const [dataInterval, setDataInterval] = useState(intervals[0].value);

  const { data, } = useGetChartData(cryptoName, dataInterval,
    {
      refetchInterval: 6000,
      staleTime: 6000,
      select: (data) =>
        data?.prices?.map((item) => ({
          x: item[0],
          y: item[1]
        })),
    });
  if (!data) {
    return <div>Loading...</div>;
  }

  const validData = data?.filter(item => isFinite(item.y)) ?? [];
  const prices = validData.map(item => item.y);
  const lowerPrice = Math.min(...prices);
  const higherPrice = Math.max(...prices);

  return (
    <ResponsiveContainer width={1250} height={400}>

      <div className="chart-actions">
        {intervals.map((interval) => (
          <button
            key={interval.value}
            className={dataInterval === interval.value ? "active" : "inactive"}
            onClick={() => setDataInterval(interval.value)}
          >
            {interval.label}
          </button>
        ))}
      </div>

      <AreaChart

        data={validData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff9b1f" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#ff9b1f" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip />
        {lowerPrice && (
          <g>
            <image href="/images/red_dot.png" x={80} y={10} width="40" height="40" />
            <text x={150} y={40} fill="#999999" fontSize={50} fontFamily='arial'>{`Lower: ${formatPrice(lowerPrice.toFixed(0))}`}</text>
          </g>
        )}
        {higherPrice && (
          <g>
            <image href="/images/green_dot.png" x={750} y={10} width="30" height="30" />
            {higherPrice && <text x={820} y={40} fill="#999999" fontSize={50} fontFamily='arial'>{`Higher: ${formatPrice(higherPrice.toFixed(0))}`}</text>}
          </g>
        )}

        {formatPrice && (
          <g>
            <image href="/images/orange_dot.png" x={100} y={360} width="30" height="30" />
          </g>
        )}

        <Area type="monotone" dataKey="y" stroke="#ff9d22" fillOpacity={2} fill="url(#colorPv)" strokeWidth={10} activeDot={{ r: 30 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default ChartData;

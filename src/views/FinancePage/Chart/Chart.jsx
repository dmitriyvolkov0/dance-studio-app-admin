import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import Title from '@components/Title/Title';

const data = [
  {
    name: "Январь",
    'Открытая группа': 6700,
    'Закрытая группа': 4000,
  },
  {
    name: "Февраль",
    'Открытая группа': 6400,
    'Закрытая группа': 5500,
  },
  {
    name: "Март",
    'Открытая группа': 4600,
    'Закрытая группа': 4000,
  },
  {
    name: "Апрель",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Май",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Июнь",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Июль",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Август",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Сентябрь",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Октябрь",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Ноябрь",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
  {
    name: "Декабрь",
    'Открытая группа': 3500,
    'Закрытая группа': 2000,
  },
 
];

export default function Chart() {
  return (
      <div className="w-full">
        <Title>Заработано (по месяцам)</Title>
        <div className="overflow-x-auto w-full">
            <BarChart
                width={700}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Открытая группа" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Закрытая группа" stackId="a" fill="#8884d8" />
            </BarChart>
        </div>
    </div>
  );
}

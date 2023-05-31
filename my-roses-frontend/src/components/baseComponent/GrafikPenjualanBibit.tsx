import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ResourceRecord } from 'src/types/resources';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Jumlah Bibit Dijual',
    },
  },
  options: {
    layout: {
      padding: 500,
      height: 500,
    },
  },
};

const GrafikPenjualanBibit: React.FC<Props> = ({ pembukuans }) => {
  const labelsTimeSeries = _.map(_.values(pembukuans.rows), (pembukuan) =>
    moment(pembukuan.tanggal).format('dddd / DD MMMM YYYY')
  );

  const dataTimeSeries = {
    labels: labelsTimeSeries,
    datasets: [
      {
        label: 'Jumlah Batang',
        data: _.map(
          _.values(pembukuans.rows),
          (pembukuan) => pembukuan.sumWood
        ),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Line options={options} data={dataTimeSeries} width={100} height={100} />
  );
};

type Props = { pembukuans: ResourceRecord<'pembukuans'> };

export default GrafikPenjualanBibit;

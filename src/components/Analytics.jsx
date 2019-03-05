// @flow
import * as React from 'react';
// import {Doughnut} from 'react-chartjs-2';
import Chart from 'react-chartjs2';

class Analytics extends React.Component<{}> {
    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#00ffb7',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [10, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: 'My second dataset',
                    fill: false,
                    data: [40, 55, 56, 81, 80, 59, 10],
                    // lineTension: 0,
                },
                {
                    label: 'My third dataset',
                    fill: false,
                    data: [69, 49, 85, 93, 15, 12, 27],
                    // lineTension: 0,
                },
            ],
        };

        return (
            <div>
                <Chart data={data} type='line'/>
            </div>
        );
    }
}

export default Analytics;

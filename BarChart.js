import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import "../../../src/App.css";
import TableComponent from './PieChartTable';
import BackButton from './PieChartButtons';
 
const BarChart = () => {
    const [totalAuditoriumCount, setTotalAuditoriumCount] = useState(0);
    const [bookedAuditoriumCount, setBookedAuditoriumCount] = useState(0);
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalAuditoriumResponse = await fetch('http://localhost:8080/admin/totalAuditoriumCount');
                const totalAuditoriumData = await totalAuditoriumResponse.json();
                console.log('Total Auditorium Response:', totalAuditoriumData);
 
                const bookedAuditoriumResponse = await fetch('http://localhost:8080/admin/booked/count');
                const bookedAuditoriumData = await bookedAuditoriumResponse.json();
                console.log('Booked Auditorium Response:', bookedAuditoriumData);
 
                setTotalAuditoriumCount(totalAuditoriumData); // Update state with count
                setBookedAuditoriumCount(bookedAuditoriumData); // Update state with count
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
 
        fetchData();
    }, []);
 
    const processDataForBarChart = (totalAuditoriumCount, bookedAuditoriumCount) => {
        const unbookedAuditoriumCount = totalAuditoriumCount - bookedAuditoriumCount;
        return [
            ['Status', 'Count', { role: 'style' }],
            ['Total Auditorium Count', totalAuditoriumCount],
            ['Booked', bookedAuditoriumCount],
            ['Unbooked', unbookedAuditoriumCount]
        ];
    };
 
    const data = processDataForBarChart(totalAuditoriumCount, bookedAuditoriumCount);
 
    return (
        <div className="Chart">
            <Chart
                width={'100%'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Status', 'Count', { role: 'style' }],
                    ['Booked', bookedAuditoriumCount, 'color: blue'],
                    ['Unbooked', totalAuditoriumCount - bookedAuditoriumCount, 'color: green'],
                    ['Total', totalAuditoriumCount, 'color: gray']
                ]}
                options={{
                    title: 'Auditorium Booking Status',
                    legend: { position: 'none' },
                    hAxis: { title: 'Count' },
                    vAxis: { title: 'Status' },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
 
           
 
            <TableComponent totalAuditoriumCount={totalAuditoriumCount} bookedAuditoriumCount={bookedAuditoriumCount} />
            <BackButton/>
        </div>
    );
};
 
export default BarChart;
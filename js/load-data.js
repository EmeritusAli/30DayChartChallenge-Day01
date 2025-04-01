console.log('load-data.js loaded');

d3.csv('./data/UKEnergySource_data.csv', d => {
    const parsedDate = d3.timeParse("%d/%m/%Y")(d.Date);
    if (parsedDate.getFullYear() !== 2025) {
        return {
            ...d,
            date: parsedDate,
            demand: +d['Demand (GW)'],
            source: d['Energy Source'],
            value: +d['Value (GW)']
        };
    }
} ).then(data => {
    console.log('data',data);
    drawWaffle(data);
});
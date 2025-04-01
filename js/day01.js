
console.log('day01.js loaded');
const drawWaffle = (data) => {
              const margin = {top: 20, right: 40, bottom: 20, left: 40};
              const width = 600;
              const height = 600;
              const sourceGroups = d3.group(data, d => d.source);
              const renewableData = sourceGroups.get("Renewables (GW)") || [];
              const renewableEnergy = d3.sum(renewableData, d => d.value);
              const totalEnergy = d3.sum(data, d => d.value);
              const renewablePercentage = totalEnergy > 0 ? (renewableEnergy / totalEnergy) * 100 : 0;
            
              const usableWidth = width - margin.left - margin.right;
              const usableHeight = height - margin.top - margin.bottom;
           
              function renderWaffle() {
                // Clear previous content
                d3.select('#chart').html('');

                // grid size
                const cellsize = Math.floor(usableWidth/12);
                const numCols = Math.floor(usableWidth / cellsize);
                const numRows = Math.floor(usableHeight / cellsize);
                const totalCells = numCols * numRows;

                // cells 4 renewable energy
                const renewableCells = Math.floor((renewablePercentage / 100) * totalCells);
                console.log('renewableCells', renewableCells, 'renewable Percentage', renewablePercentage);
                
                
                const cells = Array.from({length: totalCells}, (_, i) => ({
                    index: i,
                    renewable: i >= totalCells - renewableCells,
                }));

                let svg = d3.select('#chart svg');
                if (svg.empty()) {
                    svg = d3.select('#chart')
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                        .attr('transform', `translate(${margin.left}, ${margin.top})`);
                } else {
                    svg.selectAll('*').remove(); // Clear previous content
                };

                svg.selectAll('rect')
                    .data(cells)
                    .enter()
                    .append('rect')
                    .attr('x', d => (d.index % numCols) * cellsize)
                    .attr('y', d => Math.floor(d.index / numCols) * cellsize)
                    .attr('width', cellsize - 2)
                    .attr('height', cellsize - 2)
                    .attr('rx', 10)
                    .attr('ry', 10)
                    .attr('fill', d => d.renewable ? '#4CAF50' : 'gray')
                    .attr('stroke', 'white')
                    .attr('stroke-width', 1);
                    
                    

                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', height / 2 -20)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .attr('font-size', '40px')
                    .attr('font-weight', 'bold')
                    .attr('fill', '#4CAF50')
                    .attr('stroke', 'black')
                    .attr('stroke-opacity', 0.4)
                    .attr('font-family', 'Arial, sans-serif')
                    .text(`${Math.round(renewablePercentage)}%`);

                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', height / 2 + 30)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '25px')
                    .attr('fill', '#4CAF50')
                    .attr('font-weight', 'bold')
                    .attr('stroke', 'black')
                    .attr('stroke-opacity', 0.4)
                    .attr('font-family', 'Arial, sans-serif')
                    .text('Renewable Energy');

           

            };

            


renderWaffle();



}
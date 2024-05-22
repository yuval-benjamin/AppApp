// barChartRace.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate ages from birth dates
    function calculateAges(birthDates) {
        const currentYear = new Date().getFullYear();
        return birthDates.map(date => {
            const birthYear = new Date(date).getFullYear();
            return currentYear - birthYear;
        });
    }

    // Function to prepare data for the bar chart race
    function prepareData(customers) {
        const birthDates = customers.map(customer => customer.birthDate);
        const ages = calculateAges(birthDates);
        const ageCounts = {};

        // Count occurrences of each age
        ages.forEach(age => {
            ageCounts[age] = (ageCounts[age] || 0) + 1;
        });

        // Convert to an array of objects for D3
        const data = Object.keys(ageCounts).map(age => ({
            age: +age,
            count: ageCounts[age]
        }));

        // Sort by age
        data.sort((a, b) => a.age - b.age);

        return data;
    }

    // Function to create the bar chart race
    function createBarChartRace(customers) {
        const data = prepareData(customers);

        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const container = d3.select("#bar-chart-container");
        const chart_width = container.node().clientWidth - margin.left - margin.right;
        const chart_height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", chart_width + margin.left + margin.right)
            .attr("height", chart_height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([0, chart_width]);

        const y = d3.scaleBand()
            .domain(data.map(d => d.age))
            .range([chart_height, 0])
            .padding(0.1);

        const xAxis = g => g
            .attr("transform", `translate(0,${chart_height})`)
            .call(d3.axisBottom(x).ticks(chart_width / 80))
            .call(g => g.select(".domain").remove());

        const yAxis = g => g
            .call(d3.axisLeft(y).tickSize(0))
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", 0)
            .attr("y", d => y(d.age))
            .attr("width", d => x(d.count))
            .attr("height", y.bandwidth())
            .attr("fill", "steelblue");

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);
    }

    // Get filtered customers data from the global window object
    const chart_customers = window.customers;
    createBarChartRace(chart_customers);
});

// Sample data (replace with your actual data)
const data = [
    { gender: "Female", count: 40 },
    { gender: "Male", count: 20 }
];

// Set up SVG dimensions
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Create SVG element
const svg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Create a pie generator
const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

// Create an arc generator
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Define colors for pie segments
const color = d3.scaleOrdinal()
    .domain(data.map(d => d.gender))
    .range(["#ff7f0e", "#1f77b4"]); // Example colors (replace with your own)

// Create pie chart
const arcs = svg.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.gender));
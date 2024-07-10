let female_count = 0
let male_count = 0

// Get male and female amount from DB
customers.forEach(customer => {
    if (customer.gender == "female") {
        female_count = female_count + 1 
    } else {
        male_count = male_count + 1
    }
});

const data = [
    { gender: "Female", count: female_count },
    { gender: "Male", count: male_count }
];

// Set SVG dimensions
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Create SVG element
const svg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g") // This means to group all chart elements together 
    .attr("transform", `translate(${width / 1.12}, ${height / 2})`); //Move the group around the screen

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
    .range(["#ff0ed352", "#62b4ee"]); 

// Create pie chart
const arcs = svg.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.gender));

// Add labels with the count on the pie
arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("class", "pie-label")
    .text(d => d.data.count);
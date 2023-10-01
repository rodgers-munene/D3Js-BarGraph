// plotting a bar chart using d3.js
var years = [];
var gdpData = []
var dataObjects = []

// ! Lets first the fetch the data
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data =>{
        finData = data["data"]
        for(i = 0; i< finData.length; i++){
         const dateData = new Date(finData[i][0])
         years.push(dateData.getFullYear())
         gdpData.push(finData[i][1]/100)
         dataObjects.push({date: finData[i][0], gdp: (finData[i][1])})
        }
      
      //! After fetching the data lets plot the data
      //? creating an svg element
      w = 900;
      h = 560;
      padding = 60

      var svg = d3.select("body")
                  .append("svg")
                  .style("width", w)
                  .style("height", h)
                  .style("background-color", "white");


        var selection = d3.select("svg")
         //? lets us create the scale
        //* x-scale
        const xScale = d3.scaleLinear()
                         .domain([d3.min(years, (d) => d), d3.max(years, (d) => d)])
                         .range([padding, w - padding])
        //* y-scale
        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(gdpData, (d) => d * 100)])
                         .range([h - padding, padding])

        //*x-axis
        xAxis = d3.axisBottom(xScale)
        selection.append("g")
                 .attr("transform", "translate(0," + (h-padding) + ")")
                 .attr("id", "x-axis")
                 .call(xAxis)

        //* y-axis
        yAxis = d3.axisLeft(yScale)
        selection.append("g")
                 .attr("transform", "translate("+ padding + ",0)")
                 .attr("id", "y-axis")
                 .call(yAxis)
                
        selection.selectAll("rect")
                 .data(dataObjects)
                 .enter().append("rect")
                 .attr("x", (d, i) => {d = i * 2.84; return d + padding})
                 .attr("y", (d, i) =>{
                  i = h -(((d.gdp/100) * 2.5) + padding);
                  return i;
                 })
                 .attr("width", 2.3)
                 .attr("height", (d, i) => {
                  i = (d.gdp /100) * 2.5
                  return i;
                 })
                 .attr("class", "bar")
                 .attr("data-gdp", (d) => d.gdp)
                 .attr("data-date", (d) => d.date)
                 .attr("index", (d, i) => d[i])
                 .on("mouseover", function(e, d) {

                    d3.select(".tool-tip")
                    .attr("data-gdp", d.gdp)
                    .attr("data-date", d.date)
                    .style("opacity", 1)
                    .style("left", (e.target.pageX + 20) + "px")
                    .style("top", (e.target.pageY - 30) + "px")
                    .html("<p>" + d.date + "</p><h2>$" + d.gdp + " Billion</h2>");
                    })
                  .on("mouseout", function(d, i) {
                    d3.select(".tool-tip")
                    .style("opacity", 0)
});
        
        
        
       

      //? tooltip function 
      var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

    
})
  



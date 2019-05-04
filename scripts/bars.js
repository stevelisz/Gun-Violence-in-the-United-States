var b_margin = {top: 20, right: 20, bottom: 20, left: 140},
	width = 900 - b_margin.left - b_margin.right,
	height = 540 - b_margin.top - b_margin.bottom;

var bars_svg = d3.select("#state-laws-barchart")
	.append("svg")
	.attr("width", width + b_margin.left + b_margin.right)
	.attr("height", height + b_margin.top + b_margin.bottom)
	.append("g")
	.attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")");

var x_scale = d3.scale.linear().range([b_margin.left, width - b_margin.right]);
var y_scale = d3.scale.ordinal().rangeBands([height - b_margin.bottom, b_margin.top], 0.5, 0.2);

var xAxis = d3.svg.axis()
	.scale(x_scale)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y_scale)
	.orient("left");

bars_svg.append('g').attr('class','x-axis').attr("transform", "translate(0," + (height - b_margin.top) + ")");
bars_svg.append('g').attr('class','y-axis').attr("transform", "translate(" + b_margin.left + ",0)");

var years = [2014, 2015, 2016, 2017];
var current_year = years[0];
var current_state = 'CA';

var columns = [
	'year',
	'Category',
	'Sub-Category',
	'Brief Description of Provision'
]

var num_bars = 0;

queue()
	.defer(d3.csv, "../data/state-gun-laws.csv")
	.defer(d3.csv, "../data/state-gun-laws-info.csv")
	.await(ready);


function ready(error, gl_data, gl_info) {

	// GUN LAW INFO
	gl_info.forEach(function(d) {
		d.code = d['Category Code'],
		d.category = d['Category'],
		d.sub_category = d['Sub-Category'],
		d.law = d['Variable Name'],
		d.description = d['Brief Description of Provision'],
		d.details = d['Detailed Description of Provision']
	});

	var glInfoByLaw = d3.nest()
		.key(function(d) { return d.law; })
		.map(gl_info);

	// GUN LAW DATA
	gl_data.forEach(function(d) {
		d.state = d.state,
		d.year = +d.year;

		for (law in d) {
			if (['state','year'].includes(law)) {
				continue;
			} else {
				d[law] = +d[law];
			}
		}
	});

	var glDataByStateByYear = d3.nest()
		.key(function(d) { return d.state; })
		.key(function(d) { return d.year; })
		.map(gl_data);

	gl_data.forEach(function(d) {
		laws = glDataByStateByYear[d.state][d.year][0];
		delete laws[''];

		categories = {}
		for (var law in laws) {
			exists = laws[law];
			if (exists == 0 || ['state', 'year', 'lawtotal'].includes(law)) {
				continue;
			}
			
			info = glInfoByLaw[law][0];
			count = categories[info.category] || 0; 
			categories[info.category] = count + 1;
		}

		laws.categories = categories;
	});

	// SET UP LAW TABLE
	var table = d3.select('#state-laws-table').append('table');
	table.attr("class", "table table-striped")
		 .attr("style", "font-size: 8pt");
	var thead = table.append('thead');
	var	tbody = table.append('tbody');

	column_headers = ['Year'] // TODO ugly way of resolving capitalization on one header
	column_headers.push(...columns.slice(1,columns.length))
	thead.append('tr')
		.selectAll('th')
		.data(column_headers).enter()
		.append('th')
		.text(function (column) { return column; });

	// BUILD THE INTERACTIVE CONTROLS
	var input_state = d3.select('#state-laws-choice');
	var input_state_list = d3.select('#state-laws-list');
	var input_year = d3.select('#state-laws-year');
	input_year.text(current_year);
	var input_slider = d3.select('#state-laws-slider');

	for (var state in glDataByStateByYear) {
		input_state_list.append("option")
			.attr('value', state);
	}

	input_state.attr("value", current_state);
	input_state.on("input", function() {
		if (typeof glDataByStateByYear[this.value] !== 'undefined') {
			current_state = this.value;
			update(current_state, current_year);
		}
	});

	// SLIDER
	input_slider
		.append("input")
		.attr("type", "range")
		.attr("min", years[0])
		.attr("max", years[years.length - 1])
		.attr("step", 1)
		.on("input", function() {
			current_year = +this.value;
			input_year.text(current_year);
			update(current_state, current_year);
		});

	// UPDATE VIZ & TABLE
	function update(state, year) {

		// Update controls
		input_slider.property("value", year);
		d3.select("#map-year").text(year);

		// Populate the law table
		// Clear old info first
		tbody.selectAll('tr').remove();
		years.forEach(function(y) {
			laws = glDataByStateByYear[state][y][0]

			law_info = []
			Object.keys(laws).forEach(function (law) {
				exists = laws[law];
				var skip = exists == 0 || ['state', 'year', 'lawtotal', 'categories'].includes(law);
				if (!skip) {
					info = glInfoByLaw[law][0]
					info['year'] = y;
					law_info.push(info);
				}
			});

			var rows = tbody.selectAll('tr')
				.data(law_info)
				.enter()
				.append('tr');

			var cells = rows.selectAll('td')
				.data(function (row) {
					return columns.map(function (column) {
						return {column: column, value: row[column]};
					});
				})
				.enter()
				.append('td')
				.text(function (d) { return d.value; });
		});

		// Populate the bar-chart correctly
		var laws = glDataByStateByYear[state][year][0]
		var categories = []
		for (category in laws.categories) {
			categories.push({
				'name': category,
				'value': laws.categories[category]
			})
		}

		current_length = categories.length;
		if (num_bars != current_length) {
			bars_svg.selectAll('rect').remove();
			num_bars = current_length;
		}

		categories = categories.sort(function (a, b) {
			return d3.ascending(a.value, b.value);
		})

		// Reset the axes in case data came in or out or was reordered
		// var titles = datapoints.map( function(d) { return d['title'] });
		var names = categories.map( function(d) { return d.name });
		y_scale.domain(names);
		x_scale.domain([0, 30]);
		d3.select('.y-axis').transition().call(yAxis);
		d3.select('.x-axis').transition().call(xAxis);

		var rectangles = bars_svg.selectAll('rect')
			.data(categories, function(d) { 
				return d.name 
			});

		rectangles.enter()
			.append('rect')
			.attr('y', 0)
			.attr('x', 0)
			.attr('height', y_scale.rangeBand());
		
		rectangles.transition()
			.attr('y', function(d) {
				return y_scale(d.name);
			})
			.attr('x', b_margin.left)
			.attr('height', y_scale.rangeBand())
			.attr('width', function(d) {
				return x_scale(d.value) - b_margin.left;
			})
	}

	update(current_state, current_year);

}

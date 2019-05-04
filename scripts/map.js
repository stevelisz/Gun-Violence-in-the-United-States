var m_margin = {top: 50, right: 20, bottom: 20, left: 60};
	width = 820 - m_margin.left - m_margin.right,
	height = 550 - m_margin.top - m_margin.bottom,
	formatPercent = d3.format(".1%");
var zoom = d3.behavior.zoom()
	.translate([0,0])
	.scale(1)
	.on("zoom", zoomed)


var map_svg = d3.select("#map")
	.append("svg")
	.attr("width", width + m_margin.left + m_margin.right)
	.attr("height", height + m_margin.top + m_margin.bottom)
	.append("g")
	.attr("transform", "translate(" + m_margin.left + "," + m_margin.top + ")")
	.call(zoom);
var child = map_svg.append("g");

function zoomed() {
	child.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
}
tooltip = d3.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0)
	.style("min-width", "300px");

var plasmaLong = ["#0d0887","#100788","#130789","#16078a","#19068c","#1b068d","#1d068e","#20068f","#220690","#240691","#260591","#280592","#2a0593","#2c0594","#2e0595","#2f0596","#310597","#330597","#350498","#370499","#38049a","#3a049a","#3c049b","#3e049c","#3f049c","#41049d","#43039e","#44039e","#46039f","#48039f","#4903a0","#4b03a1","#4c02a1","#4e02a2","#5002a2","#5102a3","#5302a3","#5502a4","#5601a4","#5801a4","#5901a5","#5b01a5","#5c01a6","#5e01a6","#6001a6","#6100a7","#6300a7","#6400a7","#6600a7","#6700a8","#6900a8","#6a00a8","#6c00a8","#6e00a8","#6f00a8","#7100a8","#7201a8","#7401a8","#7501a8","#7701a8","#7801a8","#7a02a8","#7b02a8","#7d03a8","#7e03a8","#8004a8","#8104a7","#8305a7","#8405a7","#8606a6","#8707a6","#8808a6","#8a09a5","#8b0aa5","#8d0ba5","#8e0ca4","#8f0da4","#910ea3","#920fa3","#9410a2","#9511a1","#9613a1","#9814a0","#99159f","#9a169f","#9c179e","#9d189d","#9e199d","#a01a9c","#a11b9b","#a21d9a","#a31e9a","#a51f99","#a62098","#a72197","#a82296","#aa2395","#ab2494","#ac2694","#ad2793","#ae2892","#b02991","#b12a90","#b22b8f","#b32c8e","#b42e8d","#b52f8c","#b6308b","#b7318a","#b83289","#ba3388","#bb3488","#bc3587","#bd3786","#be3885","#bf3984","#c03a83","#c13b82","#c23c81","#c33d80","#c43e7f","#c5407e","#c6417d","#c7427c","#c8437b","#c9447a","#ca457a","#cb4679","#cc4778","#cc4977","#cd4a76","#ce4b75","#cf4c74","#d04d73","#d14e72","#d24f71","#d35171","#d45270","#d5536f","#d5546e","#d6556d","#d7566c","#d8576b","#d9586a","#da5a6a","#da5b69","#db5c68","#dc5d67","#dd5e66","#de5f65","#de6164","#df6263","#e06363","#e16462","#e26561","#e26660","#e3685f","#e4695e","#e56a5d","#e56b5d","#e66c5c","#e76e5b","#e76f5a","#e87059","#e97158","#e97257","#ea7457","#eb7556","#eb7655","#ec7754","#ed7953","#ed7a52","#ee7b51","#ef7c51","#ef7e50","#f07f4f","#f0804e","#f1814d","#f1834c","#f2844b","#f3854b","#f3874a","#f48849","#f48948","#f58b47","#f58c46","#f68d45","#f68f44","#f79044","#f79143","#f79342","#f89441","#f89540","#f9973f","#f9983e","#f99a3e","#fa9b3d","#fa9c3c","#fa9e3b","#fb9f3a","#fba139","#fba238","#fca338","#fca537","#fca636","#fca835","#fca934","#fdab33","#fdac33","#fdae32","#fdaf31","#fdb130","#fdb22f","#fdb42f","#fdb52e","#feb72d","#feb82c","#feba2c","#febb2b","#febd2a","#febe2a","#fec029","#fdc229","#fdc328","#fdc527","#fdc627","#fdc827","#fdca26","#fdcb26","#fccd25","#fcce25","#fcd025","#fcd225","#fbd324","#fbd524","#fbd724","#fad824","#fada24","#f9dc24","#f9dd25","#f8df25","#f8e125","#f7e225","#f7e425","#f6e626","#f6e826","#f5e926","#f5eb27","#f4ed27","#f3ee27","#f3f027","#f2f227","#f1f426","#f1f525","#f0f724","#f0f921"];
//var plasmaShort = plasmaLong.slice(0, 236);

var viridisLong = ["#440154","#440256","#450457","#450559","#46075a","#46085c","#460a5d","#460b5e","#470d60","#470e61","#471063","#471164","#471365","#481467","#481668","#481769","#48186a","#481a6c","#481b6d","#481c6e","#481d6f","#481f70","#482071","#482173","#482374","#482475","#482576","#482677","#482878","#482979","#472a7a","#472c7a","#472d7b","#472e7c","#472f7d","#46307e","#46327e","#46337f","#463480","#453581","#453781","#453882","#443983","#443a83","#443b84","#433d84","#433e85","#423f85","#424086","#424186","#414287","#414487","#404588","#404688","#3f4788","#3f4889","#3e4989","#3e4a89","#3e4c8a","#3d4d8a","#3d4e8a","#3c4f8a","#3c508b","#3b518b","#3b528b","#3a538b","#3a548c","#39558c","#39568c","#38588c","#38598c","#375a8c","#375b8d","#365c8d","#365d8d","#355e8d","#355f8d","#34608d","#34618d","#33628d","#33638d","#32648e","#32658e","#31668e","#31678e","#31688e","#30698e","#306a8e","#2f6b8e","#2f6c8e","#2e6d8e","#2e6e8e","#2e6f8e","#2d708e","#2d718e","#2c718e","#2c728e","#2c738e","#2b748e","#2b758e","#2a768e","#2a778e","#2a788e","#29798e","#297a8e","#297b8e","#287c8e","#287d8e","#277e8e","#277f8e","#27808e","#26818e","#26828e","#26828e","#25838e","#25848e","#25858e","#24868e","#24878e","#23888e","#23898e","#238a8d","#228b8d","#228c8d","#228d8d","#218e8d","#218f8d","#21908d","#21918c","#20928c","#20928c","#20938c","#1f948c","#1f958b","#1f968b","#1f978b","#1f988b","#1f998a","#1f9a8a","#1e9b8a","#1e9c89","#1e9d89","#1f9e89","#1f9f88","#1fa088","#1fa188","#1fa187","#1fa287","#20a386","#20a486","#21a585","#21a685","#22a785","#22a884","#23a983","#24aa83","#25ab82","#25ac82","#26ad81","#27ad81","#28ae80","#29af7f","#2ab07f","#2cb17e","#2db27d","#2eb37c","#2fb47c","#31b57b","#32b67a","#34b679","#35b779","#37b878","#38b977","#3aba76","#3bbb75","#3dbc74","#3fbc73","#40bd72","#42be71","#44bf70","#46c06f","#48c16e","#4ac16d","#4cc26c","#4ec36b","#50c46a","#52c569","#54c568","#56c667","#58c765","#5ac864","#5cc863","#5ec962","#60ca60","#63cb5f","#65cb5e","#67cc5c","#69cd5b","#6ccd5a","#6ece58","#70cf57","#73d056","#75d054","#77d153","#7ad151","#7cd250","#7fd34e","#81d34d","#84d44b","#86d549","#89d548","#8bd646","#8ed645","#90d743","#93d741","#95d840","#98d83e","#9bd93c","#9dd93b","#a0da39","#a2da37","#a5db36","#a8db34","#aadc32","#addc30","#b0dd2f","#b2dd2d","#b5de2b","#b8de29","#bade28","#bddf26","#c0df25","#c2df23","#c5e021","#c8e020","#cae11f","#cde11d","#d0e11c","#d2e21b","#d5e21a","#d8e219","#dae319","#dde318","#dfe318","#e2e418","#e5e419","#e7e419","#eae51a","#ece51b","#efe51c","#f1e51d","#f4e61e","#f6e620","#f8e621","#fbe723","#fde725"];

var magmaLong = ["#000004","#010005","#010106","#010108","#020109","#02020b","#02020d","#03030f","#030312","#040414","#050416","#060518","#06051a","#07061c","#08071e","#090720","#0a0822","#0b0924","#0c0926","#0d0a29","#0e0b2b","#100b2d","#110c2f","#120d31","#130d34","#140e36","#150e38","#160f3b","#180f3d","#19103f","#1a1042","#1c1044","#1d1147","#1e1149","#20114b","#21114e","#221150","#241253","#251255","#271258","#29115a","#2a115c","#2c115f","#2d1161","#2f1163","#311165","#331067","#341069","#36106b","#38106c","#390f6e","#3b0f70","#3d0f71","#3f0f72","#400f74","#420f75","#440f76","#451077","#471078","#491078","#4a1079","#4c117a","#4e117b","#4f127b","#51127c","#52137c","#54137d","#56147d","#57157e","#59157e","#5a167e","#5c167f","#5d177f","#5f187f","#601880","#621980","#641a80","#651a80","#671b80","#681c81","#6a1c81","#6b1d81","#6d1d81","#6e1e81","#701f81","#721f81","#732081","#752181","#762181","#782281","#792282","#7b2382","#7c2382","#7e2482","#802582","#812581","#832681","#842681","#862781","#882781","#892881","#8b2981","#8c2981","#8e2a81","#902a81","#912b81","#932b80","#942c80","#962c80","#982d80","#992d80","#9b2e7f","#9c2e7f","#9e2f7f","#a02f7f","#a1307e","#a3307e","#a5317e","#a6317d","#a8327d","#aa337d","#ab337c","#ad347c","#ae347b","#b0357b","#b2357b","#b3367a","#b5367a","#b73779","#b83779","#ba3878","#bc3978","#bd3977","#bf3a77","#c03a76","#c23b75","#c43c75","#c53c74","#c73d73","#c83e73","#ca3e72","#cc3f71","#cd4071","#cf4070","#d0416f","#d2426f","#d3436e","#d5446d","#d6456c","#d8456c","#d9466b","#db476a","#dc4869","#de4968","#df4a68","#e04c67","#e24d66","#e34e65","#e44f64","#e55064","#e75263","#e85362","#e95462","#ea5661","#eb5760","#ec5860","#ed5a5f","#ee5b5e","#ef5d5e","#f05f5e","#f1605d","#f2625d","#f2645c","#f3655c","#f4675c","#f4695c","#f56b5c","#f66c5c","#f66e5c","#f7705c","#f7725c","#f8745c","#f8765c","#f9785d","#f9795d","#f97b5d","#fa7d5e","#fa7f5e","#fa815f","#fb835f","#fb8560","#fb8761","#fc8961","#fc8a62","#fc8c63","#fc8e64","#fc9065","#fd9266","#fd9467","#fd9668","#fd9869","#fd9a6a","#fd9b6b","#fe9d6c","#fe9f6d","#fea16e","#fea36f","#fea571","#fea772","#fea973","#feaa74","#feac76","#feae77","#feb078","#feb27a","#feb47b","#feb67c","#feb77e","#feb97f","#febb81","#febd82","#febf84","#fec185","#fec287","#fec488","#fec68a","#fec88c","#feca8d","#fecc8f","#fecd90","#fecf92","#fed194","#fed395","#fed597","#fed799","#fed89a","#fdda9c","#fddc9e","#fddea0","#fde0a1","#fde2a3","#fde3a5","#fde5a7","#fde7a9","#fde9aa","#fdebac","#fcecae","#fceeb0","#fcf0b2","#fcf2b4","#fcf4b6","#fcf6b8","#fcf7b9","#fcf9bb","#fcfbbd","#fcfdbf"];

var plasmaShort = []
for(i = 8; i < plasmaLong.length; i += 8){
	plasmaShort.push(plasmaLong[i]);
}

var viridisShort = []
for(i = 8; i < viridisLong.length; i += 8){
	viridisShort.push(viridisLong[i]);
}

var magmaShort = []
for(i = 8; i < magmaLong.length; i += 8){
	magmaShort.push(magmaLong[i]);
}

var parseDateYMD = d3.time.format("%Y-%m-%d").parse

//HERE IS WHERE TO TWEAK SCALES

var n_incidents_color = d3.scale.quantize()
	.range(plasmaShort)
	.domain([0,1600]);

var n_injured_color = d3.scale.quantize()
	.range(viridisShort)
	.domain([0,800]);

var n_killed_color =  d3.scale.quantize()
	.range(magmaShort)
	.domain([0,120]);

var change_color = d3.scale.linear()
   .domain([-3, 0, 3])
   .range(['green', 'white', 'red']);

console.log(change_color(0.45));

//max value for all data: 3089

var legendText = {'n_incidents':["0", "200", "400", "600", "800", "1k", "1.2k", "1.6k+"], 'n_injured':["0", "100", "200", "300", "400", "500", "600", "700", "800+"], 'n_killed':["0", "20", "40", "60", "80", "100", "120+"], 'change':["-300%", "-200%", "-100%", "0%", "100%", "200%", "300%"]};
var legendColors = [n_incidents_color, n_injured_color , n_killed_color, change_color];
var scaleBins = {'n_incidents':[0, 200, 400, 600, 800, 1000, 1200, 1600], 'n_injured':[0, 100, 200, 300, 400, 500, 600, 700, 800], 'n_killed':[0, 20, 40, 60, 80, 100, 120], 'change':[-3, -2, -1, 0, 1, 2, 3]};
var scaleBinColors = legendColors;

var mouseOverColor = "#FFDF00"
//var undefinedColor = {'n_incidents': n_incidents_color(0), 'n_injured': n_injured_color(0), 'n_killed': n_killed_color(0)};
var undefinedColor = {'n_incidents': plasmaLong[0], 'n_injured': viridisLong[0], 'n_killed': magmaLong[0], 'change': "#C0C0C0"};
// var undefinedColor = "#C0C0C0"
// var undefinedColor = "#FFFFFF"

var years = [2014, 2015, 2016, 2017];
var min_year = years[0];
var max_year = years[years.length - 1];
var current_year = min_year;

var n_incidents = 'n_incidents';
var n_injured = 'n_injured';
var n_killed = 'n_killed';
var inquiries = [n_incidents, n_injured, n_killed];

var total = 'total';
var change = 'change';
var measures = [total, change];

var current_inquiry = inquiries[0];
var current_measure = measures[0];


queue()
	.defer(d3.csv, "../data/gun-violence-cleaned.csv")
	.defer(d3.csv, "../data/county-names-cleaned.csv")
	.defer(d3.json, "../data/us.json")
	.await(ready);


function ready(error, gv_data, cn_info, us) {

	// Load in topographical details
	var counties = topojson.feature(us, us.objects.counties);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);

	var countyShapes = child.selectAll(".county")
		.data(counties.features)
		.enter()
		.append("path")
			.attr("class", "county")
			.attr("d", path);

	child.append("path")
		.datum(topojson.feature(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "states")
			.attr("d", path);

	// GUN VIOLENCE INCIDENT DATA
	gv_data.forEach(function(d) {
		d.date = parseDateYMD(d.date),
		d.fips = +d.fips,
		d.state = d.state,
		d.n_killed = +d.n_killed,
		d.n_injured = +d.n_injured,
		d.gun_stolen = d.gun_stolen,
		d.n_guns_involved = +d.n_guns_involved
	});

	// Nest the details to be grouped by FIPS then Year 
	// mapping to an array of full incident details
	var gvDataByCountyByYear = d3.nest()
		.key(function(d) { return d.fips; })
		.key(function(d) { return d.date.getFullYear(); })
		.map(gv_data);

	// FIPS ANNOTATIONS (state / name)
	cn_info.forEach(function(d) {
		d.fips = +d.fips,
		d.state = d.state,
		d.county = d.county
	});

	var cnDataByCounty = d3.nest()
		.key(function(d) { return d.fips; })
		.map(cn_info);

	function hasYear(d, year) {
		return typeof d.properties.gun_incidents !== 'undefined' 
			&& typeof d.properties.gun_incidents[year] !== 'undefined';
	}

	// For each county in the topographical layout
	// Associate pertinent information with the county object
	counties.features.forEach(function(county) {

		// Associate CN data to county elements
		var naming = cnDataByCounty[+county.id];
		try {
			naming = naming[0] // TODO can we get this to not pack into an array? it's one item
			name = naming.county;
			state = naming.state;
		} catch (err) {
			name = "Unknown";
			state = "Unknown";
		}
		county.properties.name = name;
		county.properties.state = state;

		// Associate GV data to county elements
		var gv_by_year = gvDataByCountyByYear[+county.id]

		for (var year in gv_by_year) {
			var current_year = gv_by_year[year]

			var incidents = 0;
			var injured = 0;
			var killed = 0;

			for (var incident in current_year) {
				incidents += 1
				injured += current_year[incident].n_injured;
				killed += current_year[incident].n_killed;
			}

			current_year.n_incidents = incidents;
			current_year.n_injured = injured;
			current_year.n_killed = killed;

			// Compute changes if possible
			var previous_year = gv_by_year[year - 1];
			if (typeof previous_year !== 'undefined') {
				inquiries.forEach(function(inquiry) {
					//console.log(current_year[inquiry]);
					//console.log(previous_year[inquiry]);
					current_year[inquiry+"_change"] = (current_year[inquiry] - previous_year[inquiry]) / (previous_year[inquiry])
				});
			}
		}

		county.properties.gun_incidents = gv_by_year;
	});

	   
	var color = function(value) {
		 // TODO find real max, use log? try to color most things off white? stdevs or what?
		if (current_measure == total ) {
			value = Math.max(value, 0);
			if (current_inquiry == n_incidents) {
			//console.log(value);
			//console.log(n_incidents_color(value));
				return n_incidents_color(value);
			} else if (current_inquiry == n_injured) {
				return n_injured_color(value);
			} else {
				return n_killed_color(value);
			}
		} else { //current_measure == change
			//console.log(current_measure);
			//console.log(value);
			value = change_color(value);
			return value;
		}
	};

	function colorCounty(d) {
		
		if (hasYear(d, current_year)) {
			if (current_measure == total) {
				value = d.properties.gun_incidents[current_year][current_inquiry];
				return color(value);
			} else {
				value = d.properties.gun_incidents[current_year][current_inquiry+"_change"];
				//console.log(value);
				if (typeof value !== "undefined") {
					console.log("we made it here");
					return color(value);
				} else {
					return undefinedColor['change'];
				}
			}
		}
		if (current_measure == total) {
			return undefinedColor[current_inquiry];
		} else {
			return undefinedColor['change'];
		}

	};

	// TOOLTIP
	countyShapes
		.on("mouseover", function(d, i) {

			// Visual feedback on mouse over
			d3.select(this).style("fill", mouseOverColor);

			// Gather pertinent data for tooltip
			var min_year_value = hasYear(d, min_year) 
				? d.properties.gun_incidents[min_year][current_inquiry]
				: "Unknown";
			var current_year_value = hasYear(d, current_year) 
				? d.properties.gun_incidents[current_year][current_inquiry] 
				: "Unknown";
			var change = (hasYear(d, min_year) && hasYear(d, current_year)) 
				? formatPercent((current_year_value - min_year_value)/(min_year_value)) 
				: "Unknown";

			var county = d.properties.name;
			var state = d.properties.state;

			// Create tooltip visual
			tooltip.transition()
			.duration(250)
			.style("opacity", 1);
			tooltip.html(
				"<p><strong>" + county + ", " + state + "</strong></p>" +
				"<table><tbody><tr><td class='wide'>" + current_inquiry + " in " + min_year + ":</td><td>" + min_year_value + "</td></tr>" +
				"<tr><td>" + current_inquiry + " in " + current_year + ":</td><td>" + current_year_value + "</td></tr>" +
				"<tr><td>Change:</td><td>" + change + "</td></tr></tbody></table>"
			)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d, i) {
			// Restore to original color w/o full update of map
			d3.select(this).style("fill", colorCounty(d));
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		})
		/*
		.on("click", function(d, i){
			var zoom = d3.behavior.zoom().scale(10);
			d3.select(this).call(zoom.event());
		})
		*/
		;

	// REPAINT MAP

	function update() {
		slider.property("value", current_year);
		d3.select("#map-year").text(current_year);
		countyShapes.style("fill", colorCounty);

		// MAP LEGEND'

		d3.selectAll(".legenditem").remove();

		var legend = map_svg.append("g")
			.attr("id", "legend");

		var legenditem = legend.selectAll(".legenditem")
			.data(function(){
				if (current_measure == total){
					return scaleBins[current_inquiry];
				} else {
					return scaleBins['change'];
				}
			})
			.enter()
			.append("g")
				.attr("class", "legenditem")
				.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });


		legenditem.append("rect")
			.attr("x", width - 240)
			.attr("y", -7)
			.attr("width", 30)
			.attr("height", 6)
			.attr("class", "rect")
			.style("fill", function(d, i) {
				if(current_measure == change){
					return change_color(d);
				}
				else if(current_inquiry == n_incidents){
					return n_incidents_color(d); 
				}
				else if(current_inquiry == n_injured){
					return n_injured_color(d);
				}
				else if(current_inquiry == n_killed){
					return n_killed_color(d);
				}
				else {
					return change_color(d);
				}
			});

		legenditem.append("text")
			.attr("x", width - 240)
			.attr("y", -10)
			.style("text-anchor", "middle")
			.text(function(d, i) { 
				if(current_measure == change){
					return legendText['change'][i]
				} else {
					return legendText[current_inquiry][i];
				}
			});
			
	}

	// SLIDER
	var slider = d3.select("#map-slider")
		.append("input")
			.attr("type", "range")
			.attr("min", min_year)
			.attr("max", max_year)
			.attr("step", 1)
			.on("input", function() {
				current_year = this.value;
				update();
			});

	// RADIO-GV-INQUIRY
	d3.select(".radio-gv-inquiry")
		.append("input")
		.attr("type", "radio")
		.attr("id", n_incidents)
		.attr("name", "inquiry")
		.property("checked", "True")
		.on("input", function() {
			current_inquiry = this.id;
			update();
		});

	d3.select(".radio-gv-inquiry")
		.append("label")
		.attr("class", "label")
		.attr("for", n_incidents)
		.text("No. incidents")

	d3.select(".radio-gv-inquiry")
		.append("input")
		.attr("type", "radio")
		.attr("id", n_injured)
		.attr("name", "inquiry")
		.on("input", function() {
			current_inquiry = this.id;
			update();
		});

	d3.select(".radio-gv-inquiry")
		.append("label")
		.attr("class", "label")
		.attr("for", n_injured)
		.text("No. injured")

	d3.select(".radio-gv-inquiry")
		.append("input")
		.attr("type", "radio")
		.attr("id", n_killed)
		.attr("name", "inquiry")
		.on("input", function() {
			current_inquiry = this.id;
			update();
		});	

	d3.select(".radio-gv-inquiry")
		.append("label")
		.attr("class", "label")
		.attr("for", n_killed)
		.text("No. killed")

	// RADIO-GV-MEASURE
	d3.select(".radio-gv-measure")
		.append("input")
		.attr("type", "radio")
		.attr("id", total)
		.attr("name", "measure")
		.property("checked", "True")
		.on("input", function() {
			current_measure = this.id;
			update();
		});

	d3.select(".radio-gv-measure")
		.append("label")
		.attr("class", "label")
		.attr("for", total)
		.text("Total")

	d3.select(".radio-gv-measure")
		.append("input")
		.attr("type", "radio")
		.attr("id", change)
		.attr("name", "measure")
		.on("input", function() {
			current_measure = this.id;
			update();
		});

	d3.select(".radio-gv-measure")
		.append("label")
		.attr("class", "label")
		.attr("for", change)
		.text("% Change")

	// Paint the map at the start with a given value
	update();

}

d3.select(self.frameElement).style("height", "685px");

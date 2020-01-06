/*
	Modified: 2020-06-01

	Copyright (c) 2020 Thorsten Willert

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
	Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
	PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


//==============================================================================

var UpdateInterval = 500;
var data = [];
var einheit = "°C";

//==============================================================================

$(function() {
	var viewData = [];

	var pause = false;
	var max, min, len;

	min = Number.MAX_VALUE;
	max = Number.MIN_VALUE;
//==============================================================================

	function DataSelectOptions() {
		var oOption;
		parent.top.$("#IDdata").find("input").each( function() {
			id = this.id;

			oOption = document.createElement("option");
			oOption.text = id;
			oOption.value = id;
			document.getElementById("IDdataSelect").add(oOption);

		});
	};
	DataSelectOptions();
//==============================================================================
	var datasets = {
		"data": {
			lines: { show: true, lineWidth: 2 },
			data: data
		}
	};
//==============================================================================
	// hard-code color indices to prevent them from shifting as
	// lines are turned on/off
	var i = 0;
	$.each(datasets, function(key, val) {
		val.color = i;
		++i;
	});
//==============================================================================
	// insert checkboxes
	var choiceContainer = $("#choices");
	$.each(datasets, function(key, val) {
		choiceContainer.append("<br/><input style='display:hidden' type='checkbox' name='" + key +
			"' checked='checked' id='id" + key + "'></input>" +
			"<label for='id" + key + "'>"
			+ val.label + "</label>");
	});
//==============================================================================
	choiceContainer.find("input").click(plotAccordingToChoices);
//==============================================================================
	var options = {
			yaxis: {
				min: 0
			},
			xaxis: {
				mode: "time",
				timeformat: "%H:%M:%S",
				minTickSize: [1, "second"]
			},
			series: {
				lines: {
					show: true,
					lineWidth: 1.5,
					fill: true,
					steps: false,
					fillColor: "rgba(128, 128, 128, 0.3)"
				},
				curvedLines: {
					active: false,
					apply:true,
					fit:true,
					curvePointFactor: 15,
					fitPointDist: 10
				},
				points: {
					show:true,
					radius: 2.0,
					symbol: "circle"
				},
				shadowSize: 5
			},
			colors: ["rgba(255,0,0,0.8)"],
			selection: {
				mode: "x"
			},
			grid: {
				backgroundColor: "#ccc",
				markings: []
			}
		}
//==============================================================================
	function plotAccordingToChoices() {

		var data = [];

		choiceContainer.find("input:checked").each(function () {
			var key = $(this).attr("name");
			if (key && datasets[key]) {
				data.push(datasets[key]);
			}
		});

		if (data.length > 0) {
			plot = $.plot("#chart", data, options );
		}
	}
	plotAccordingToChoices();
//==============================================================================
	var overview_options =  {
		series: {
			lines: {
				show: true,
				lineWidth: 1,
				fill: true,
				fillColor: "rgba(64, 64, 64, 0.8)",
				steps: false
			},
			curvedLines: {
					active:false,
					fit:true,
					apply:true,
					curvePointFactor: 10
				},
			shadowSize: 0
		},
		xaxis: {
			timeformat: "%H:%M:%S",
			mode: "time",
			minTickSize: [1, "minute"]
		},
		yaxis: {
			ticks: [],
			min: 0,
			autoscaleMargin: 0.1
		},
		selection: {
			mode: "x"
		},
		colors: ["#bbb"]
	}

	overview = $.plot("#overview", [ ], overview_options);
//==============================================================================
	$("#chart").bind("plotselected", function (event, ranges) {

		// do the zooming
		plot = $.plot("#chart", [data], $.extend(true, {}, options, {
			xaxis: {
				min: ranges.xaxis.from,
				max: ranges.xaxis.to
			}
		}));
		setPause();
		// don't fire event on the overview to prevent eternal loop
		overview.setSelection(ranges, true);
	});
//==============================================================================
	$("#overview").bind("plotselected", function (event, ranges) {
		plot.setSelection(ranges);
	});
//==============================================================================
	function GraphUpdate()
	{
		var mid;
		var d = [];
		var zeit = moment().format('HH:mm:ss');
		var c = data.length;
		var srcID = $("#IDdataSelect").val()
		var newVal = parent.top.$( "#" + srcID ).val();

		if (srcID.indexOf("D") == -1 ) {
			overview_options.series.lines.steps = false;
			options.series.lines.steps = false;
			document.getElementById("IDsmooth").removeAttribute("disabled");
		} else {
			overview_options.series.lines.steps = true;
			options.series.lines.steps = true;
			document.getElementById("IDsmooth").setAttribute("disabled", "disabled");
		};

		if(c > 200) overview_options.series.curvedLines.curvePointFactor = 5;
		if(c > 400) overview_options.series.curvedLines.active = false;
		if(c > 3600 ) data.shift();
		if(viewData.length > 120) viewData.shift();

		if (min > newVal) min = newVal;
		if (newVal > max) max = newVal;
		mid = (max-min) / 2 + min;

			options.grid.markings = [{
				yaxis: { from: max, to: max }, color:"rgba(0,0,255,0.6)", lineWidth: 1.5 },{
				yaxis: { from: min, to: min }, color:"rgba(0,255,0,0.7)", lineWidth: 1.5 },{
				yaxis: { from: mid, to: mid }, color:"rgba(64,64,64,0.5)",lineWidth: 2 }
				];

			data.push( [ moment() , newVal ] );
			viewData.push( [ moment() , newVal ] );

			if (pause == false) {
				plot = $.plot('#chart',  [viewData] , options);
				overview = $.plot('#overview',  [data], overview_options);
				$(".cur_value").val( Round(newVal,2) + " " + einheit);
				$(".min_value").val( Round(min,2) + " " + einheit);
				$(".max_value").val( Round(max,2) + " " + einheit);
				$(".avg_value").val( Round(mid,2) + " " + einheit);

			};
			$("#DataSize").val( c );


		setTimeout(GraphUpdate, UpdateInterval);
	}
	setTimeout(GraphUpdate, UpdateInterval);
//==============================================================================
	function refreshGraph() {
		overview = $.plot("#overview", [data], overview_options);
		plot = $.plot('#chart',  [viewData] , options);
	};

//==============================================================================
	$("#IDsmooth").click(function () {
			options.series.curvedLines.active = ( options.series.curvedLines.active  ? false : true );
			overview_options.series.curvedLines.active = ( overview_options.series.curvedLines.active  ? false : true );
			options.series.points.show = ( options.series.points.show  ? false : true );
			refreshGraph();
		});
//==============================================================================
	$("#IDfill").click(function () {
			options.series.lines.fill = ( options.series.lines.fill  ? false : true );
			refreshGraph();
		});
//==============================================================================
	$("#IDlight").click(function () {
			if ( $("#IDlight").hasClass('active') ) {
				options.grid.backgroundColor = "#ccc";
				options.xaxis.font= { size:12,color:"#ccc", weight: "normal"};
				options.yaxis.font= { size:12,color:"#ccc", weight: "normal"};

			} else {
				options.grid.backgroundColor = "#fff";
				options.xaxis.font= {size:12,color:"#fff", weight: "bold"};
				options.yaxis.font= {size:12, color:"#fff", weight: "bold"};
			};
			refreshGraph();
		});
//==============================================================================
	$("#IDmaxReset").click(function () {
			max = 0;
		});
//==============================================================================
	$("#IDminReset").click(function () {
			min = max;
		});
//==============================================================================
	$("#IDPause").click(function () {
		pause = ( pause ? false : true);
		changePause();
	});
//==============================================================================
	function setPause() {
		pause = true;
		$("#IDPause").addClass('active');
		changePause();
	}
//==============================================================================
	function changePause(){
		if ( $("#IDPause").hasClass('active') ) {
			if (!pause) $("#IDPauseIcon").removeClass( "glyphicon-play" ).addClass( "glyphicon-pause" );
		} else {
			$("#IDPauseIcon").removeClass( "glyphicon-pause" ).addClass( "glyphicon-play" );
		};
	}
//==============================================================================
	$("#IDDataReset").click(function () {
		BootstrapDialog.confirm('<div class="alert alert-warning">Really Reset Data?</div>', function(r) {
		if (r) {
			viewData = [];
			data = [];
			refreshGraph();
		}
		});
	});
//==============================================================================
	$( window ).resize(function() {
		plot.resize();
		plot.setupGrid();
		plot.draw();
		overview.resize();
		overview.setupGrid();
		overview.draw();
	});

//==============================================================================
});

//==============================================================================
jQuery.browser={};
(function(){
	jQuery.browser.msie=false;
	jQuery.browser.version=0;
	if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
		jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;
		}
})();
//==============================================================================
var UpdateIntervalOptions = function()
{
	for (var i = 1; i < 121; i++) {
		oOption = document.createElement("option");
		oOption.text = i;
		oOption.value = i * 1000;
		document.getElementById("updateInterval").add(oOption);
	}
}
//==============================================================================
var Download = function()
{
	var csvRows = [];
	for (var i = 0, l = data.length ; i<l; ++i) {
		csvRows.push(data[i].join(';'));
	}
	var csvString = csvRows.join("%0A");
	var fileName = moment().format() + "_Data.csv";

	if (!$.browser.msie) {
		var a         = document.createElement('a');
		a.href        = 'data:text/csv;charset=utf-8,' + csvString;
		a.target      = '_blank';
		a.download    = fileName;
		document.body.appendChild(a);
		a.click();
	} else {
		var blob = new Blob([csvString],{
		type: "text/csv;charset=utf-8;"
		});
		navigator.msSaveBlob(blob, fileName)
	}
}
//==============================================================================

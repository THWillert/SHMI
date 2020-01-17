/*
	Modified: 2020-17-01

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

var UpdateInterval = 1000;
var smooth = 11;
var smoothType = 0;
var data = [];
var einheit = "%";
var fag_Average = [0];

//==============================================================================

$(function() {
	var viewData = [];
	var MVA = [];

	var pause = false;
	var max, min, len;

	min = Number.MAX_VALUE;
	max = Number.MIN_VALUE;
//==============================================================================

	function DataSelectOptions() {
		var oOption;
		var bSelect = false;

		parent.top.$("#IDdata").find("input").each( function() {
			id = this.id;

			oOption = document.createElement("option");
			oOption.text = id;
			oOption.value = id;

			// select first analog chanel
			if ( bSelect == false && id.indexOf("A") != -1 ) {
				oOption.selected = "selected";
				bSelect = true;
			};

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
			autoScale: 'loose',
			autoScaleMargin: 0.1,
			growOnly: true,
			datamin: 0,
			datamax: 100
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
				fillColor:  { colors: [{ opacity: 0.0 },{ opacity: 0.1}, { opacity: 0.4}] },
				zero: false
			},
			splines: {
				show: false,
				tension: 0.35,
				lineWidth: 1.5,
				fill:  0.10
			},
			points: {
				show:true,
				radius: 2.0,
				symbol: "circle"
			},
			shadowSize: 0
		},
		colors:  ["#F00", "#00FF00aa"],
		selection: {
			mode: "x"
		},
		grid: {
			hoverable: true,
			markings: [],
			color: "white",
			borderColor: "#00000033"
		}
	}
// test - not working
	options.xaxis.font= { size:12,color:"#fff", weight: "normal"};
	options.yaxis.font= { size:12,color:"#fff", weight: "normal"};
//==============================================================================
// Tooltip for datapoints in chart
	/* Tooltip */
	$("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			padding: "0.5em",
			color: "white",
			"text-align": "center",
			"border-radius": "0.3em",
			"background-color": "black"
	}).appendTo("body");

	/* Show tooltip */
	$("#chart").bind("plothover", function (event, pos, item) {

		if (!pos.x || !pos.y) return;

		if (item) {
			var x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);

			/* shows value and time */
			$("#tooltip").html( "<b>" + y + "</b><br>" + moment().format('HH:mm:ss') )
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(500);
		} else {
			$("#tooltip").hide();}
	});

	/* Hide tooltip */
	$("#chart").bind("plothovercleanup", function (event, pos, item) {
			$("#tooltip").hide();
	});
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
				fillColor: { colors: [{ opacity: 0.0 },{ opacity: 0.1}, { opacity: 0.4}] },
				steps: false
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
			autoscaleMargin: 0.1
		},
		selection: {
			mode: "x"
		},
		colors: ["#bbb"]
	}

	//overview = $.plot("#overview", [ ], overview_options);
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
		var x =  moment();

		if (srcID.indexOf("D") == -1 ) {
			overview_options.series.lines.steps = false;
			options.series.lines.steps = false;
			document.getElementById("IDsmooth").removeAttribute("disabled");
		} else {
			overview_options.series.lines.steps = true;
			options.series.lines.steps = true;
			document.getElementById("IDsmooth").setAttribute("disabled", "disabled");
		};

		if(c > 3600 ) data.shift();
		if(viewData.length > 240) {
			viewData.shift();
			MVA.shift();
		};

		if (newVal < min) min = newVal;
		if (newVal > max) max = newVal;
		mid = ((max-min) / 2) + min;

		options.grid.markings = [{
			yaxis: { from: max, to: max }, color:"rgba(255,170,0)", lineWidth: 2 },{
			yaxis: { from: min, to: min }, color:"rgba(68,135,255)", lineWidth: 2 },{
			yaxis: { from: mid, to: mid }, color:"grey",lineWidth: 2 }
			];
		// orange 0,215,145



		data.push( [ x , newVal ] );
		viewData.push( [ x , newVal ] );

		// Statistics ----------------------------------------------------------
		if ( typeof newVal === "undefined") newVal = 0;

		if ( smooth !== 0 ) {

			fag_Average.unshift( parseFloat(newVal) );
			if(fag_Average.length > smooth) fag_Average.pop();

			switch ( smoothType ) {
				case 0:
					mid = ss.mean(fag_Average); break;
				case 1:
					mid = ss.median(fag_Average); break;
				case 2:
					mid = ss.rootMeanSquare(fag_Average); break;
			};

			MVA.push( [ x , mid  ] );
		} else {
			fag_Average = [];
		};
		// ---------------------------------------------------------------------

		if (pause == false) {

			plot = $.plot('#chart',
			[
				{data: viewData, options },
				{data: MVA, lines: {fill: false}, points: {show: false}}
			],
			options);

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
		$('#ID_AutoZoom').on('change', function() {

            var val = $('option[name="AutoZoom"]:selected', '#ID_AutoZoom').val();

            options.yaxis.min = "0";
            options.yaxis.max = "100";

            switch (val) {
                case '0':
                    options.yaxis.autoScale = "none";
                    break;
                case '10':
                    options.yaxis.autoScaleMargin = 0.1;
                    options.yaxis.autoScale = "loose";
                    break;
                case '11':
                    options.yaxis.autoScale = "exact";
                    break;
                case '20': // default
                    options.yaxis.autoScaleMargin = 0.1;
                    options.yaxis.autoScale = "loose";
                    options.yaxis.growOnly = true;
                    break;
                case '21':
                    options.yaxis.autoScale = "exact";
                    options.yaxis.growOnly = true;
                    break;
                case '30':
                    options.yaxis.autoScale = "sliding-window";
                    break;
            };

            refreshGraph();
        });

//==============================================================================
	$("#IDsmooth").click(function () {

		if (  options.series.lines.show ) {
			options.series.lines.show = false;
			options.series.splines.show = true;
		} else {
			options.series.lines.show = true;
			options.series.splines.show = false;
		};

		refreshGraph();
	});
//==============================================================================
	$("#IDfill").click(function () {

		options.series.lines.fill = ( options.series.lines.fill  ? false : true );
		overview_options.series.lines.fill = options.series.lines.fill;

		if ( options.series.splines.fill > 0 )
			options.series.splines.fill = 0;
		else
			options.series.splines.fill = 0.15;

		refreshGraph();
	});

//==============================================================================
	$("#IDShowPoints").click(function () {

		options.series.points.show = ( options.series.points.show  ? false : true );

		refreshGraph();
	});

//==============================================================================
	$("#IDmaxReset").click(function () {
		max = 0;
		mid = 0;
	});
//==============================================================================
	$("#IDminReset").click(function () {
		min = max;
		mid = 0;
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
			viewData = [];
			MVA = [];
			fag_Average = [];
			data = [];
			refreshGraph();
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

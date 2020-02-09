/*
	Modified: 2020-02-08

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

let UpdateInterval = 1000;
let smooth = 11;
let smoothType = 0;
let data = [];
let einheit = "%";
let fag_Average = [0];

//==============================================================================

$( () => {
	let viewData = [];
	let MVA = [];

	let pause = false;
	let max, min, len;

	min = Number.MAX_VALUE;
	max = Number.MIN_VALUE;
//==============================================================================

	function DataSelectOptions() {
		let oOption;
		let bSelect = false;

		parent.top.$("#IDdata").find("input").each( function() {
			id = this.id;

			if ((
				id.indexOf("DI") !== -1||
				id.indexOf("DO") !== -1 ||
				id.indexOf("AI") !== -1 ||
				id.indexOf("AO") !== -1
				) &&
					id.indexOf("_") == -1) {

					oOption = document.createElement("option");
					oOption.text = id;
					oOption.value = id;

					// select first analog chanel
					if ( bSelect == false && id.indexOf("AI") != -1 ) {
						oOption.selected = "selected";
						bSelect = true;
					}

					document.getElementById("IDdataSelect").add(oOption);
			}

		});
	}
	DataSelectOptions();

//==============================================================================
	let options = {
		yaxis: {
			autoScale: 'loose',
			autoScaleMargin: 0.1,
			growOnly: true,
			datamin: 0,
			datamax: 100,
			position: 'right'
		},
		xaxis: {
			timezone: "browser",
			mode: "time",
			timeformat: "%H:%M:%S",
			minTickSize: [1, "second"]
		},
		series: {
			lines: {
				show: true,
				lineWidth: 2,
				fill: true,
				steps: false,
				fillColor:  { colors: [{ opacity: 0.0 },{ opacity: 0.1}, { opacity: 0.4}] },
				zero: false
			},
			splines: {
				show: false,
				tension: 0.35,
				lineWidth: 2,
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
			color: "#aaa",
			borderColor: "#00000000"
		}
	}
//==============================================================================
	let overview_options =  {
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
		colors: ["#bbb"],
		grid: {
			color: "#aaa",
			borderColor: "#00000000"
		}
	}
	//overview = $.plot("#overview", [ ], overview_options);

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
			"background-color": "black",
	}).appendTo("body");

	/* Show tooltip */
	$("#chart").bind("plothover", (event, pos, item) => {

		if (!pos.x || !pos.y) return;

		if (item) {
			let x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);

			/* shows value and time */
			$("#tooltip").html( `<span class="value_big">${y}</span><br>` + moment().format('HH:mm:ss') )
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(500);
		} else {
			$("#tooltip").hide();}
	});

	/* Hide tooltip */
	$("#chart").bind("plothovercleanup", (event, pos, item) => {
			$("#tooltip").hide();
	});

//==============================================================================
	$("#chart").bind("plotselected", (event, ranges) => {

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
	$("#overview").bind("plotselected", (event, ranges) => {
		plot.setSelection(ranges);
	});
//==============================================================================
	function GraphUpdate()
	{
		let mid;
		let d = [];
		//var zeit = moment().format('HH:mm:ss');
		let c = data.length;
		let srcID = $("#IDdataSelect").val()
		let newVal = parent.top.$( "#" + srcID ).val();
		let x =  moment();

		if (srcID.indexOf("D") == -1 ) {
			overview_options.series.lines.steps = false;
			options.series.lines.steps = false;
			document.getElementById("IDsmooth").removeAttribute("disabled");
		} else {
			overview_options.series.lines.steps = true;
			options.series.lines.steps = true;
			document.getElementById("IDsmooth").setAttribute("disabled", "disabled");
		}

		if(c > 3600 ) data.shift();
		if(viewData.length > 240) {
			viewData.shift();
			MVA.shift();
		}

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
			}

			MVA.push( [ x , mid  ] );
		} else {
			fag_Average = [];
		}

		if (newVal < min) min = newVal;
		if (newVal > max) max = newVal;

		/*
		options.grid.markings = [{
			yaxis: { from: max, to: max }, color:"rgba(255,170,0)", lineWidth: 2 },{
			yaxis: { from: min, to: min }, color:"rgba(68,135,255)", lineWidth: 2 },{
			yaxis: { from: newVal, to: newVal }, color:"rgba(255,0,0,0.4)", lineWidth: 2 },{
			yaxis: { from: mid, to: mid }, color:"rgba(0,255,0,0.3)",lineWidth: 2 }
			];
		*/
		options.grid.markings = [{
			yaxis: { from: max, to: max }, color:"rgba(255,170,0)", lineWidth: 2 },{
			yaxis: { from: min, to: min }, color:"rgba(68,135,255)", lineWidth: 2 }
			];
		// orange 0,215,145

		data.push( [ x , newVal ] );
		viewData.push( [ x , newVal ] );

		// ---------------------------------------------------------------------
		if (pause == false) {

			plot = $.plot('#chart',
			[
				{data: viewData, options },
				{data: MVA, lines: {fill: false}, points: {show: false}}
			],
			options);

			overview = $.plot('#overview',  [data], overview_options);

			$(".cur_value").html( Round(newVal,2) + "&nbsp;" + einheit);
			$(".min_value").html( Round(min,2) + "&nbsp;" + einheit);
			$(".max_value").html( Round(max,2) + "&nbsp;" + einheit);
			$(".avg_value").html( Round(mid,2) + "&nbsp;" + einheit);
		}
		$("#DataSize").text( c );

		setTimeout(GraphUpdate, UpdateInterval);
	}
	setTimeout(GraphUpdate, UpdateInterval);
//==============================================================================
	function refreshGraph() {
		overview = $.plot("#overview", [data], overview_options);
		plot = $.plot('#chart',  [viewData] , options);
	}

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
	$("#IDsmooth").click( () => {

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
	$("#IDfill").click( () => {

		options.series.lines.fill = ( options.series.lines.fill  ? false : true );
		overview_options.series.lines.fill = options.series.lines.fill;

		if ( options.series.splines.fill > 0 )
			options.series.splines.fill = 0;
		else
			options.series.splines.fill = 0.15;

		refreshGraph();
	});

//==============================================================================
	$("#IDShowPoints").click( () => {

		options.series.points.show = ( options.series.points.show  ? false : true );

		refreshGraph();
	});

//==============================================================================
	$("#IDmaxReset").click( () => {
		max = 0;
		mid = 0;
	});
//==============================================================================
	$("#IDminReset").click( () => {
		min = max;
		mid = 0;
	});
//==============================================================================
	$("#IDPause").click( () => {
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
			if (!pause) {
				$("#IDPauseIcon").removeClass( "fa-play" ).addClass( "fa-pause" );
				//$("#TXT_Pause").text('Pause');
			}
		} else {
			$("#IDPauseIcon").removeClass( "fa-pause" ).addClass( "fa-play" );
			//$("#TXT_Pause").text('Start');
		}
	}
//==============================================================================
	$("#IDDataReset").click( () => {
			viewData = [];
			MVA = [];
			fag_Average = [];
			data = [];
			refreshGraph();
	});
//==============================================================================
	$( window ).resize( () => {
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
let UpdateIntervalOptions = function()
{
	for (let i = 1; i < 121; i++) {
		oOption = document.createElement("option");
		oOption.text = i;
		oOption.value = i * 1000;
		document.getElementById("updateInterval").add(oOption);
	}
}
//==============================================================================
let Download = function()
{
	let csvRows = [];
	for (let i = 0, l = data.length ; i<l; ++i) {
		csvRows.push(data[i].join(';'));
	}
	let csvString = csvRows.join("%0A");
	let fileName = moment().format() + "_Data.csv";

	if (!$.browser.msie) {
		var a         = document.createElement('a');
		a.href        = 'data:text/csv;charset=utf-8,' + csvString;
		a.target      = '_blank';
		a.download    = fileName;
		document.body.appendChild(a);
		a.click();
	} else {
		let blob = new Blob([csvString],{
		type: "text/csv;charset=utf-8;"
		});
		navigator.msSaveBlob(blob, fileName)
	}
}
//==============================================================================

<#if cdn>
	<#assign jquery =
	"<script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK' crossorigin='anonymous'></script>">

	<#assign jquery_flot =
	"${jquery}
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.canvaswrapper.js' integrity='sha256-aXw6rg4pFmle6NIXz3juRI0MPwhYOt6JmzzEgt3HbKk=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.colorhelpers.js' integrity='sha256-MJ7ymDQJt50zdCPoJUeWtZZCaj7u86i1S9X3y1IYEkY=' crossorigin='anonymous'></script>">

	<#assign bootstrap =
	"<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js' integrity='sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6' crossorigin='anonymous'></script>">

	<#assign dayjs =
	"<script src='https://cdn.jsdelivr.net/npm/dayjs@1.10.4/dayjs.min.js' integrity='sha256-NTsR4SOm3YHfJrmrmvBtEYqfQ6jQ5yvEKMhgQe3DIl0=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/dayjs@1.10.4/plugin/utc.js' integrity='sha256-v3ECxXAznGazhiqPl5tTtC1FqxuFJmiw/F1Udrp66JY=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/dayjs@1.10.4/locale/de.js' integrity='sha256-89lO5+Yj5jggMXiRgWI8PwRVOH2KjXYckkTYgPoLMec=' crossorigin='anonymous'></script>">

	<#assign simpleStatistics =
	"<script src='https://cdn.jsdelivr.net/npm/simple-statistics@7.7.0/dist/simple-statistics.min.js' integrity='sha256-3InD7iRKVEg8jcqYe19yVV4/p5KRobZpIezVLfOu9+E=' crossorigin='anonymous'></script>">

	<#assign moment =
	"<script src='https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.js' integrity='sha256-H9jAz//QLkDOy/nzE9G4aYijQtkLt9FvGmdUTwBk6gs=' crossorigin='anonymous'></script>">

	<#assign flot = "
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/dist/es5/jquery.flot.js' integrity='sha256-f86EPKAj/0UrK6PdMEE+X8ncXezhQZQ+R5Hsq6onqsA=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.browser.js' integrity='sha256-Ii3plD4sWWFJjLA7zqw0Z+ecORDpoTmShe7tbSW5aQo=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.drawSeries.js' integrity='sha256-wgRvSn+9zumUvQIRgI5bquTesYxXER27ijoVsU4vfFc=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.hover.js' integrity='sha256-ztCVAEFCqUOiJU51xYefgFUwVpOwlP+uZ0keNvZlCaI=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.time.js' integrity='sha256-imb80Q7TKXGYFyPA/t1abETHrIWWgneBZO8ubsgWPJE=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.uiConstants.js' integrity='sha256-ckGtLOLJdDdVWZHQ9rp8Vu0Z3QlYgmaVw28V/auhQ9U=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.saturated.js' integrity='sha256-rtVAhzVNNwzHEUZdcopSWXedTkvZA1jyPeb/fHO9vQo=' crossorigin='anonymous'></script>
	<script src='https://cdn.jsdelivr.net/npm/flot@4.2.0/source/jquery.flot.selection.js' integrity='sha256-GP2yAuAo1QmFoGZbm0ymZ4sT5sFIhnYoE5hIRq7hBPA=' crossorigin='anonymous'></script>">

	<#assign peity = "
	<script src='https://cdn.jsdelivr.net/npm/peity@3.3.0/jquery.peity.min.js' integrity='sha256-B+xyblmehefmEUu8NIsuz32NsVFta9t+Y/SpAy6noc4=' crossorigin='anonymous'></script>">

	<#assign select2 = "
	<script src='https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js' integrity='sha256-AFAYEOkzB6iIKnTYZOdUf9FFje6lOTYdwRJKwTN5mks=' crossorigin='anonymous'></script>">
<#else>
	<#assign jquery= "<script src='./js/jquery-3.6.0.min.js'></script>">

	<#assign jquery_flot =
	"${jquery}
	<script src='./js/jquery.canvaswrapper.min.js'></script>
	<script src='./js/jquery.colorhelpers.min.js'></script>">

	<#assign bootstrap= "<script src='./js/bootstrap.min.js'></script>">

	<#assign dayjs =
	"<script src='./js/dayjs.min.js'></script>
	<script src='./js/dayjs/utc.js'></script>
	<script src='./js/i18n/dayjs_de.js'></script>">

	<#assign moment =
	"<script src='./js/moment.min.js'></script>
	<script src='./js/moment_locale/de.js'></script>">

	<#assign simpleStatistics = "<script src='./js/simple-statistics.min.js'></script>">

	<#assign peity = "<script src='./js/jquery.peity.min.js'></script>">

	<#assign flot = "
	<script src='./js/jquery.flot.min.js'></script>
	<script src='./js/jquery.flot.browser.min.js'></script>
	<script src='./js/jquery.flot.drawSeries.min.js'></script>
	<script src='./js/jquery.flot.hover.min.js'></script>
	<script src='./js/jquery.flot.saturated.min.js'></script>
	<script src='./js/jquery.flot.selection.min.js'></script>
	<script src='./js/jquery.flot.spline.min.js'></script>
	<script src='./js/jquery.flot.time.min.js'></script>
	<script src='./js/jquery.flot.uiConstants.min.js'></script>">
	<#assign select2 = "<script src='./js/select2.min.js'></script>">
</#if>
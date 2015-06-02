# TwoWayScrollTable (TWST)

A jQuery plugin that add two directionnal scroll to table content.
  - verticaly fixed thead
  - horizontaly fixed tbody columns

#### Demo: https://jsfiddle.net/leonsaysHi/3p5L228b/

### Requirement :

 - Table as be be div based
 - box-sizing is borderbox

##How to ue:

Make sure to include jQuery to your page :
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
```

Include **jQuery twst**

```html
<script src="js/jquery.twst.min.js"></script>
```

Include **jQuery Selectric** styles, and change it to your taste by editing as src/_twst-decoration.scss:
```html
<link rel="stylesheet" href="css/twst.css">
```

Initialize **jQuery Selectric:**

```html
<script>
$(function(){
  $('.mytable').twst();
});
</script>
```

##Options:

You can pass an options object as the first parameter when you call the plugin. For example:
```js
$('.mytable').twst({
  	xscroll : 1000, // horizontaly scrolled content width in pixels
	height : 250, // total table height
	theadClass : 'thead', // thead classname
	tbodyClass : 'tbody', // tbody classname
	rowClass : 'trow', // row classname
	cellClass : 'tcell', // cell classname
	autoScrollClass : 'twst__autoscroll',
	scrollClass : 'twst__scroll',
	scrollViewClass : 'twst__scroll__view'
});
```

### Version
0.0.0

### Todo's

Write Tests

License
----

MIT

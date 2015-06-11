(function ( $ ) {
 
    $.fn.twst = function( options ) { 
 
        var settings = $.extend({
        	xscroll : 1000,
        	height : 250,
    		theadClass : 'thead',
    		tbodyClass : 'tbody',
    		rowClass : 'trow',
    		cellClass : 'tcell',
    		fullwidthcellModifier : '--full',
    		autoScrollClass : 'twst__autoscroll',
    		scrollClass : 'twst__scroll',
    		scrollViewClass : 'twst__scroll__view'
        }, options );
 
        return this.each(function() {
        	var 
        		$table = $(this),
        		$thead = $table.find('.' + settings.theadClass),
        		$tbody = $table.find('.' + settings.tbodyClass),
        		$theadcells = $thead.find('[class*=' + settings.cellClass + '--]').not('.' + settings.autoScrollClass),
        		$theadfixedcells = $theadcells.filter(function(){
	        		return $(this).parent().is('.' + settings.rowClass) 
	        	}),

        		$theadautoscroll = $thead.find('.' + settings.autoScrollClass),
	        	$tbodyautoscroll = $('<div/>').addClass(settings.autoScrollClass).appendTo($tbody),
        		$bodyscroll = $('<div/>').addClass(settings.scrollClass).appendTo($tbody),

        		vertical_assoc = {},
        		horizontal_groups = []
        	;

        	// tbody DOM manipulation 
        	// associate cells verticaly into theadcells_assoc
        	// move scrollable content into $bodyscroll
			var
				lasttheadfixedcellindex = $theadfixedcells.length - 1;
        	;

			$.each($tbody.find('.' + settings.rowClass), function(rowindex, el){
				var 
					$row = $(el),
					$cells = $row.find('.' + settings.cellClass),
					$scrollable_row = $('<div/>').addClass(settings.rowClass),
					$hg = $cells
				;
				// WHAT KIND OF ROW : 
				// full width cell
				if ($cells.first().is('.' + settings.cellClass + settings.fullwidthcellModifier)) {
					var 
						$e = $cells.first(),
						$c = $e.clone().empty()
					;
					$scrollable_row.append($c);		
					$hg = $hg.add($c)
				}
				//normal behavior
				else {

					$.each($cells, function(colindex, cell){
						if (typeof vertical_assoc['c'+colindex] === 'undefined') { 
							vertical_assoc['c'+colindex] = {
								$from:$theadcells.eq(colindex),
								$to:$([])
							}; 
						}
						var $cell = $(cell);
						vertical_assoc['c'+colindex].$to = vertical_assoc['c'+colindex].$to.add($cell);
						// move cell to container if needed
	        			if (colindex > lasttheadfixedcellindex) {
	        				$scrollable_row.append($cell);
	        			}
					});
				}

				horizontal_groups.push($hg);
				$bodyscroll.append($scrollable_row);
			});

			$tbodyautoscroll
				.append(
					$tbody.find('> .' + settings.rowClass)
				)
			;

			// associate thead autoscroll width to tbodyscroll's
			vertical_assoc['scrollwidth'] = {
				$from:$theadautoscroll,
				$to:$bodyscroll
			};

			// init
			$theadautoscroll
				.wrapInner($('<div/>').width(settings.xscroll))
			; 			
			$bodyscroll
				.wrapInner($('<div/>').width(settings.xscroll))
			;

			// autoscroll
			$bodyscroll.on('scroll', function(){
				$tbodyautoscroll.scrollTop($bodyscroll.scrollTop());
				$theadautoscroll.scrollLeft($bodyscroll.scrollLeft());
			});

        	// apply sizes using theadsizes and theadcells_assoc:
        	var sizeCols = function () {
        		$.each(vertical_assoc, function(key, assoc) {
        			var 
        				$from = assoc.$from,
        				$from_parent = $from.closest('.' + settings.rowClass)
        			;
	        		assoc.$to.outerWidth($from.outerWidth());
	        	});
	        }
	        var sizeRows = function () {
	        	$.each(horizontal_groups, function(index, cells){
	        		var $cells = $(cells), h = 0;
	        		$.each($cells, function(){
	        			h = Math.max(h, $(this).outerHeight());
	        		});
	        		$cells.outerHeight(h);
	        	});
	        }
	        // depends on scrollbars or not
	        var sizeWrapper = function() {
	        	var
	        		tbodymaxheight = settings.height - $thead.outerHeight()
        		;        		
        		$bodyscroll
					.css('max-height', tbodymaxheight)
				;
				$tbodyautoscroll
					.css('max-height', tbodymaxheight)
				;
				var 
	        		$view = $('<div/>').addClass(settings.scrollViewClass)
	        	;	        	
        		$bodyscroll.append($view);
				$theadautoscroll.outerWidth( $view.width() );
				$tbodyautoscroll.outerHeight( $view.height() );
				$view.remove();
	        }
	        var resetSizes = function() {
	        	$theadautoscroll.css('width', '');
	        }

	        // init
	        $(window).on('resize', function() {
	        	resetSizes();
	        	sizeCols();
	        	sizeRows();
		        sizeWrapper();
	        });

	        sizeCols();
	        sizeRows();
	        sizeWrapper();
        });
 
    };
 
}( jQuery ));
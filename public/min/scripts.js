(function( $ ) {
	'use strict';
		
	$( '.wp-block-pdf-viewer-block-standard' ).each( function() {
		var href = $( this ).find( '.uploaded-pdf > a' ).attr( 'href' );
		if ( href != undefined && href != '' ) { 
			var widthValue = $( this ).find( '.uploaded-pdf > a' ).attr( 'data-width' );
			var heightValue = $( this ).find( '.uploaded-pdf > a' ).attr( 'data-height' );

			var width = '100%';
			if ( $.isNumeric( widthValue ) && widthValue > 0 ) {
				width = $( this ).find( '.uploaded-pdf > a' ).attr( 'data-width' ) + 'px';
			}
			var height = '700px';
			if ( $.isNumeric( heightValue ) && heightValue > 0 ) {
				height = $( this ).find( '.uploaded-pdf > a' ).attr( 'data-height' ) + 'px';
			}
			$( '<iframe class="pdfjs-viewer" style="width:' + width + ';height:' + height + '" src="' + pdfViewerUrl + '?file=' + href + '"></iframe>' ).appendTo( $( this ) );
			$( this ).find( '.uploaded-pdf' ).remove();
			console.log(pdfViewerUrl);
		}
	});

})( jQuery );

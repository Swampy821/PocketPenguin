(function() {

	function pcon() {

		var day = new Date();
		var self = this;
		var activeDate;
		day = day.getDate();

		switch( day ) {
			case 29:
				activeDate = "04/29/2016";
				break;
			case 30:
				activeDate = "04/30/2016";
				break;
			case 1:
				activeDate = "05/01/2016";
				break;
			default:
				activeDate = "04/29/2016";
				break;
		}
		this.getFavList();
		this.setActiveDayButton( activeDate );
		this.bindButtons();
		$.when( this.getData() ).then( function( data ) {
			localStorage.setItem( "sched", JSON.stringify( data ) );
			self.data = data;
			self.fillData = [];
			self.buildData( activeDate );
			self.renderTable();
		} );
	};

	pcon.prototype.getFavList = function() {
		var list = localStorage.getItem( "fav" );
		if ( list ) {
			this.favList = JSON.parse( list );
		} else {
			this.favList = [];
		}
	};

	pcon.prototype.getData = function() {
		var defer = $.Deferred();
		var data = localStorage.getItem( "sched" );
		if ( data ) {
			data = JSON.parse( data ) ;
			defer.resolve( data );
		} else {
			$.get( "/data/data.min.json", function( data ) {
				defer.resolve( data );
			} );
		}

		return defer.promise();
	};


	pcon.prototype.buildData = function( day ) {
		var self = this;
		this.fillData = [];
		this.data.eventlist.forEach( function( item ) {
			if ( item.start.substr( 0, 10 ) ===  day ) {
				self.fillData.push( [ 
					item.title, 
					self.convertTo24( item.start.substr( 11, item.start.length ) ) + " (" + item.start.substr( 11, item.start.length ) + ")", 
					item.rooms, 
					item.description 
				]  );
			}
		} );
	};

	pcon.prototype.clearTable = function() {
		this.table.rows().remove().draw();
	}
	pcon.prototype.renderTable = function() {
		this.table = $( ".tbl-schedule" ).DataTable( {
			data: this.fillData,
			paging: false,
			"order": [ 1, "asc" ]
		} );
		this.bindRowClicks();
		this.updateTableForFavList();
	};

	pcon.prototype.rerenderTable = function() {
		this.table.draw();
		this.bindRowClicks();
		this.updateTableForFavList();


	};

	pcon.prototype.setActiveDayButton = function( day ) {
		$( ".nav-day" ).removeClass( "active" );
		switch(  day ) {
			case "04/30/2016":
				$( ".sat" ).addClass( "active" );
				$( ".tit" ).text( "Saturday's Schedule" );
				break;
			case "05/01/2016":
				$( ".sun" ).addClass( "active" );
				$( ".tit" ).text( "Sunday's Schedule" );
				break;
			default:
				$( ".fri" ).addClass( "active" );
				$( ".tit" ).text( "Friday's Schedule" );
				break;
		}
	};
	pcon.prototype.convertTo24 = function(time) {
		if ( time[ 0 ] === "0" ) {
			time = time.slice( 1 );
		}
	    var hours = parseInt(time.substr(0, 2));
	    if(time.indexOf('AM') != -1 && hours < 10 ) {
	    	time = "0" + time;
	    }
	    if(time.indexOf('AM') != -1 && hours == 12) {
	        time = time.replace('12', '00');
	    }
	    if(time.indexOf('PM')  != -1 && hours < 12) {
	        time = time.replace(hours, (hours + 12));
	    }
	    return time.replace(/(AM|PM)/, '');
	}

	pcon.prototype.changeDay = function( day ) {
		var activeDate;
		switch( day ) {
			case 30:
				activeDate = "04/30/2016";
				break;
			case 1:
				activeDate = "05/01/2016";
				break;
			default:
				activeDate = "04/29/2016";
				break;
		}
		this.clearTable();
		this.setActiveDayButton( activeDate );
		this.buildData( activeDate );
		this.table.rows.add( this.fillData );
		this.rerenderTable();
	}

	pcon.prototype.bindButtons = function() {
		var self = this;
		$( ".fri" ).on( "click", function() {
			self.changeDay( 29 );
		} );
		$( ".sat" ).on( "click", function() {
			self.changeDay( 30 );
		} );
		$( ".sun" ).on( "click", function() {
			self.changeDay( 1 );
		} );

		$( ".btn-all" ).on( "click", function() {
			localStorage.removeItem( "fav-btn" );
			$( ".b-fav" ).removeClass( "btn-info" ).removeClass( "btn-default" );
			$( ".btn-all" ).addClass( "btn-info" );
			$( ".btn-favorites" ).addClass( "btn-default" );
			self.removeFilters();
			self.bindRowClicks();
		} );
		$( ".btn-favorites" ).on( "click", function() {
			localStorage.setItem( "fav-btn", true );
			$( ".b-fav" ).removeClass( "btn-info" ).removeClass( "btn-default" );
			$( ".btn-favorites" ).addClass( "btn-info" );
			$( ".btn-all" ).addClass( "btn-default" );
			self.addFavoriteFilter();
			self.bindRowClicks();
		} );

		if ( localStorage.getItem( "fav-btn" ) ) {
			setTimeout( function() {
				$( ".btn-favorites" ).trigger( "click" );
			} );
		}
	};




	pcon.prototype.bindRowClicks = function() {
		var self = this;
		$( "table tbody tr" ).off().on( "click", function( e, data ) {
			var row = $( e.target ).parent();
			var name = row.children( "td" )[0];
			name = $( name ).text();
			var key = $( row ).children( "td" )[1];
			key = name + "-" + $( key ).text();
			row.toggleClass( "fav" );
			self.toggleFav( key );
			self.saveFav();
		} );
	};
	pcon.prototype.updateTableForFavList = function() {
		var self = this;
		this.favList.forEach( function( item ) {
			self.updateClassOnItem( item );
		} );
	};

	pcon.prototype.updateClassOnItem = function( item ) {
		$( "table tbody tr" ).each( function( index, row ) {
			var name = $( row ).children( "td" )[0];
			name = $( name ).text();
			var key = $( row ).children( "td" )[1];
			key = name + "-" + $( key ).text();
			if ( key === item ) {
				$( row ).toggleClass( "fav" );
			}
		} );
	};

	pcon.prototype.saveFav = function() {
		localStorage.setItem( "fav", JSON.stringify( this.favList ) );
	};

	pcon.prototype.toggleFav = function( key ) {
		if ( !this.inFav( key ) ) {
			this.favList.push( key );
		} else {
			this.removeFromFav( key );
		}
	};
	pcon.prototype.removeFromFav = function( key ) {
		for(var i = 0; i < this.favList.length; i++) {
		    if(this.favList[i] === key) {
		        delete this.favList[ i ];
		        break;
		    }
		}
	};
	pcon.prototype.inFav = function( key ) {
		return this.favList.find( function( el ) {
			return el === key;
		} ) !== undefined;
	};


	pcon.prototype.addFavoriteFilter = function() {
		var self = this;
		$.fn.dataTableExt.afnFiltering.push( function( settings, data, index ) {
    		return self.inFav( data[ 0 ] + "-" + data[ 1 ] );

    	} );
    	this.table.draw();
	};

	pcon.prototype.removeFilters = function() {
		$.fn.dataTableExt.afnFiltering.forEach( function( row, index ) {
			$.fn.dataTableExt.afnFiltering[ index ] = function() {
	    		return true;
    		}
		} );
		this.table.draw();
	};



	$( function() {
		window.pcon = new pcon();
	} );

} )();
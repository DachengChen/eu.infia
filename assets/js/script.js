/*
Author       : INFIA GMBH
Template Name: INFIA Website
Version      : 1.0
*/


(function($) {
	'use strict';

	
    /*-------------------------------------
    Main menus
    -------------------------------------*/
	
    	$('.main_menu').onePageNav({
    		currentClass: 'current',
    		changeHash: true,
    		scrollSpeed: 750,
    		scrollThreshold: 0.5,
    		filter: '',
    		easing: 'swing',
    		begin: function() {
    			//I get fired when the animation is starting
    		},
    		end: function() {
    			//I get fired when the animation is ending
    		},
    		scrollChange: function(jQuerycurrentListItem) {
    			//I get fired when you enter a section and I pass the list item of the section
    		}
    	});
    	
    	$(window).on('scroll', function () {
    		
    		if ($(this).scrollTop() > 100) {
    			$('.header').addClass('sticky');
    		} else {
    			$('.header').removeClass('sticky');
    		}
    	});
    
    
    
    	/*PRELOADER JS*/
    		$('.status').fadeOut();
    		$('.preloader').delay(350).fadeOut('slow'); 
    	/*END PRELOADER JS*/
    
    /*-------------------------------------
     LIGHTBOX popup
    -------------------------------------*/
    
    	lightbox.option({
    	  'resizeDuration': 200,
    	  'wrapAround': true
    	})	
	 /*---------------------
     Appoinment Wrapper
    ---------------------*/

    if ($('.header .humber_menu').length) {
        //Show Form
        $('.header .humber_menu').on('click', function(e) {
            e.preventDefault();
            $('body').addClass('visible-appointment');
        });
        //Hide Form
        $('.appointment-wrapper .appoint-box .cross-icon,.layer-drop').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('visible-appointment');
        });
    }

})(jQuery);

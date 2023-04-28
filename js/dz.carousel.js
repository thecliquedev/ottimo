/* JavaScript Document */
jQuery(document).ready(function() {
    'use strict';

	/* image-carousel function by = owl.carousel.js */
	jQuery('.img-carousel').owlCarousel({
		loop:true,
		margin:30,
		center: true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
        autoplay: 3000,
		nav:true,
		dots: false,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		responsive:{
			0:{
				items:2,
				margin:15
			},
			480:{
				items:2
			},			
			1024:{
				items:2
			},
			1200:{
				items:2
			}
		}
	})	
	
	
	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.project-carousel').owlCarousel({
		loop:true,
		margin:25,
		nav:false,
		autoplay:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		slideSpeed: 1000,
		dots: true,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:2,
				center:true
			},
			480:{
				items:3,
			},			
			1024:{
				items:2
			},
			1200:{
				items:3
			},
			1549:{
				items:4
			}
		}
	})
	
	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.slide-carousel').owlCarousel({
		loop:true,
		margin:25,
		nav:true,
		autoplay:5000,
		autoplayHoverPause:true,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		paginationSpeed: 1000,
		dots: true,
		navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1,
			},			
			1024:{
				items:1
			},
			1200:{
				items:1
			},
			1549:{
				items:1
			}
		}
	})
	
	/* image-carousel no margin function by = owl.carousel.js */
	 var owlSlide = jQuery('.slide-carousel2');
	owlSlide.owlCarousel({
		loop:true,
		margin:25,
		nav:false,
		autoplay:false,
		autoplayHoverPause:true,
		autoplaySpeed: 2000,
		navSpeed: 3000,
		paginationSpeed: 4000,
		slideSpeed: 5000,
		dots: true,
		//navText: [''],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1,
			},			
			1024:{
				items:1
			},
			1200:{
				items:1
			},
			1549:{
				items:1
			}
		}
	});
	var carouselTiming = 3000;
	
	/*Custom Navigation work*/
	jQuery('.next').on('click', function(){
	   //owlSlide.trigger('owl-next');
	   owlSlide.trigger('next.owl.carousel',[carouselTiming]);
	});

	jQuery('.prev').on('click', function(){
	   //owlSlide.trigger('owl-prev');
	   owlSlide.trigger('prev.owl.carousel',[carouselTiming]);
	});
	/*Custom Navigation work*/
	
});

/* Document .ready END */
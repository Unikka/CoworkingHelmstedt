var Unikka = Unikka || {};

(function($) {
	Unikka.Coworking = function(container) {
		this.container = container;

		this.init();
	};

	Unikka.Coworking.prototype = {
		/**
		 * @var {jQuery}
		 */
		container: null,

		/**
		 * @var {jQuery}
		 */
		header: null,

		/**
		 * @var {Boolean}
		 */
		didScroll: false,

		/**
		 * @var {Integer}
		 */
		changeHeaderOn: 0,

		/**
		 * The function initialize the animation of the header.
		 *
		 * @return {void}
		 */
		initAnimatedHeader: function() {
			window.addEventListener(
				'scroll', function(event) {
					if (!this.didScroll) {
						setTimeout(
							function() {
								this.didScroll = true;
								this.scrollPage();
							}.bind(this), 100
						);
					}
				}.bind(this), false
			);
		},

		/**
		 * @return void
		 */
		scrollPage: function() {
			var scrollY = this.scrollY();

			if (scrollY >= this.changeHeaderOn) {
				this.header.addClass('navbar-shrink');
			} else if (scrollY < this.changeHeaderOn && this.header.hasClass('navbar-shrink') && scrollY > 0) {
				this.header.removeClass('navbar-shrink');
			}

			this.didScroll = false;
		},

		/**
		 * Funtion returns the scolling position for y.
		 *
		 * @returns {Integer}
		 */
		scrollY: function() {
			return window.pageYOffset || this.container.scrollTop();
		},

		initJumpToSection: function() {
			this.container.find('a.page-scroll').bind(
				'click', function(event) {
					var $anchor = $(this);
					$('html, body').stop().animate(
						{
							scrollTop: $($anchor.attr('href')).offset().top
						}, 1500, 'easeInOutExpo'
					);
					event.preventDefault();
				}
			);
		},

		/**
		 * Make the navigation fix in position by watching with scroll spy.
		 *
		 * @return {void}
		 */
		initFixHeaderOnScrollSpy: function() {
			this.container.scrollspy({target: '.navbar-fixed-top'});
		},

		/**
		 * Function that closes the responsive menu on click.
		 *
		 * @return {void}
		 */
		initCloseResponsiveMenu: function() {
			$('.navbar-collapse ul li a').click(
				function() {
					$('.navbar-toggle:visible').click();
				}
			);
		},

		/**
		 * Initialize
		 *
		 * @return {void}
		 */
		init: function() {
			this.header = this.container.find('.navbar-default');
			this.changeHeaderOn = 300;
			this.initAnimatedHeader();
			this.initJumpToSection();
			this.initFixHeaderOnScrollSpy();
			this.initCloseResponsiveMenu();
		}
	};

	$(document).ready(
		function() {
			new Unikka.Coworking($('body'));
		}
	);
})
(jQuery);
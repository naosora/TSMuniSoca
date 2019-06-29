   
   $(document).ready(function()
   {
      $('#contact-text').addClass('visibility-hidden');
      $("a[href*='#contact']").click(function(event)
      {
         event.preventDefault();
         $('html, body').stop().animate({ scrollTop: $('#wb_contact').offset().top }, 600, 'easeOutCirc');
      });
      function contactScroll()
      {
         var $obj = $("#wb_contact");
         if (!$obj.hasClass("in-viewport") && $obj.inViewPort(false))
         {
            $obj.addClass("in-viewport");
            AnimateCss('contact-text', 'animate-fade-in-up', 0, 1000);
         }
      }
      contactScroll();
      $(window).scroll(function(event)
      {
         contactScroll();
      });
      $("a[href*='#header']").click(function(event)
      {
         event.preventDefault();
         $('html, body').stop().animate({ scrollTop: $('#wb_header').offset().top }, 600, 'easeOutCirc');
      });
      $(document).on('click','.headerMenu-navbar-collapse.in',function(e)
      {
         if ($(e.target).is('a') && ($(e.target).attr('class') != 'dropdown-toggle')) 
         {
            $(this).collapse('hide');
         }
      });
      SetStyle('Card1', 'initially-hidden');
      SetStyle('Card2', 'initially-hidden');
      SetStyle('Card3', 'initially-hidden');
      SetStyle('Card4', 'initially-hidden');
      SetStyle('Card5', 'initially-hidden');
      SetStyle('Card6', 'initially-hidden');
      SetStyle('portfolio-image1', 'initially-hidden');
      SetStyle('portfolio-image2', 'initially-hidden');
      SetStyle('about-text', 'initially-hidden');
      SetStyle('contact-text', 'initially-hidden');
      SetStyle('location-text', 'initially-hidden');
      SetStyle('service-text', 'initially-hidden');
      SetStyle('location-icon1', 'initially-hidden');
      SetStyle('location-icon2', 'initially-hidden');
      SetStyle('location-icon3', 'initially-hidden');
      SetStyle('location-icon4', 'initially-hidden');
      SetStyle('location-icon5', 'initially-hidden');
      SetStyle('JavaScript1', 'initially-hidden');
      var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      if (iOS)
      {
         $('#wb_contact').css('background-attachment', 'scroll');
      }
   });

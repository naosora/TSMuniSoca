   
   $(document).ready(function()
   {
      $('#contact-text').addClass('visibility-hidden');
      $("a[href*='#cabecera']").click(function(event)
      {
         event.preventDefault();
         $('html, body').stop().animate({ scrollTop: $('#wb_cabecera').offset().top }, 600, 'easeOutCirc');
      });
      $(document).on('click','.navegacion-navbar-collapse.in',function(e)
      {
         if ($(e.target).is('a') && ($(e.target).attr('class') != 'dropdown-toggle')) 
         {
            $(this).collapse('hide');
         }
      });
      $("a[href*='#cuerpo']").click(function(event)
      {
         event.preventDefault();
         $('html, body').stop().animate({ scrollTop: $('#wb_cuerpo').offset().top }, 600, 'easeOutCirc');
      });
      function cuerpoScroll()
      {
         var $obj = $("#wb_cuerpo");
         if (!$obj.hasClass("in-viewport") && $obj.inViewPort(false))
         {
            $obj.addClass("in-viewport");
            AnimateCss('contact-text', 'animate-fade-in-up', 0, 1000);
         }
      }
      cuerpoScroll();
      $(window).scroll(function(event)
      {
         cuerpoScroll();
      });
   });

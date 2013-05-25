(function () {
  function slugify(heading) {
    heading = heading.replace(/[^\-a-zA-Z0-9,&\s]+/g, "");
    heading = heading.replace(/-/g, "_");
    heading = heading.replace(/\s/g, "-");
    return heading.toLowerCase();
  }

  $(document).ready(function() {
    var path = window.location.pathname;
    
    //
    // Insert slug anchor links
    //
    $("h1, h2, h3, h4, h5").each(function (i, h) {
      var heading = $(h),
          slug    = slugify(heading.text()),
          codeEls = heading.find('code'),
          code    = codeEls.length && codeEls[0].innerText,
          text    = heading.text();
          
      
      if (!code.length || text !== code) {
        heading
          .attr('id', slug)
          .prepend("<a href='#" + slug + "' class='anchor'>&para;</a>&nbsp; ");
      }
    });

    //
    // Prettyify the TOC links
    //
    $('#toc .vertical-tabs').each(function (i, el) {
      var details = $(el).find('.tree'),
          anchor;
      
      $(details).each(function (_, item) {
        anchor = $($(item).find('.page-details a').first());
        if (anchor.attr('href') === path) {
          anchor.addClass('active');
        }
      });
      
      //
      // Insert "dropdown" arrows for TOC items and perform
      // active styling.
      //
      anchor = $($(details[0]).find('.page-details a'));
      if (anchor.attr('href') !== path) {        
        if (details.length > 1) {
          anchor.after(
            '<a class="dropdown" href="#sidebar-dd-4"><s class="ss-navigateright" role="presentation"></s></a>'
          );
        }

        anchor.css('background-color', '#fafafa');
      }
      else {
        anchor.css('background-color', '#e9f4ff');
      }
    });
  });
})();
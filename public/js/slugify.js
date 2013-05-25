(function () {
  function slugify(heading) {
    heading = heading.replace(/[^\-a-zA-Z0-9,&\s]+/g, "");
    heading = heading.replace(/-/g, "_");
    heading = heading.replace(/\s/g, "-");
    return heading.toLowerCase();
  }

  $(document).ready(function() {
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
  });
})();
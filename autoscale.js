function autoScale() {
    // AUTO-SCALE SCRIPT
    // B.Crauet - 2015
     
    /********************
    *** CONFIGURATION ***
    ********************/
     
    // querySelector for targeted object(s)
    var asContainerQuery = "#conteneur";
     
    // Script can upscale targeted object?
    var asCanUpscale = true;
     
    // Center object (only for position:absolute)
    var asCenterObject = true;
     
    /*****************
    *** INITIALIZE ***
    *****************/
     
    // New coordinate point (X & Y)
    var asNewX, asNewY;
     
    // Ratios (window & container)
    var ratioWindow, ratioContainer;
     
    // New calculated scale
    var asNewScale;
     
    /***********
    *** CODE ***
    ***********/
     
    // Get container sizes
    var asContainerW = $(asContainerQuery).width();
    var asContainerH = $(asContainerQuery).height();
     
    // Get window sizes
    var asWindowW = $("body").width();
    var asWindowH = $("body").height();
     
     
     
    // Calculate ratios
    ratioWindow = asWindowW / asWindowH;
    ratioContainer = asContainerW / asContainerH;
     
    // Ratio window < ratio object
    if( ratioWindow < ratioContainer )
        // Calculate scale with WIDTH
        newScale = asWindowW / asContainerW;
    else
        newScale = asWindowH / asContainerH;
     
     
    // Can we upscale the container?
    if( newScale > 1  &&  !asCanUpscale )
        // We can't upscale container. Limit scale to 1
        newScale = 1;
     
    // Update the scale
    $(asContainerQuery).
        css("transform", "scale("+newScale+")").
        css("transform-origin", "0 0");
     
    // Update the new sizes of object
    asContainerW = $(asContainerQuery).width();
    asContainerH = $(asContainerQuery).height();
     
    // Can we center the object?
    if(asCenterObject)
    {
        // Calculate X & Y coordinate points
        asNewX = asWindowW/2 - asContainerW/2;
        asNewY = asWindowH/2 - asContainerH/2;
         
        $(asContainerQuery).
            css("position", "absolute").
            css("left", asNewX).
            css("top", asNewY);
            $(window).on("load resize", autoScale);
    }
     
}
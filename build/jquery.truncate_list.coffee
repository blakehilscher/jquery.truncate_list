jQuery ($) ->
  $.fn.truncateList = (opt) ->
    sf = @
    jo = $(@)
    target = target
    map = {}
    opt = $.extend {
      limit: 10
      log: false
      lang: {
        more:       '+ View More'
        less:       '- View Less'
      }
      sel: {
        container:  'truncate_list-container'
        hidden:     'truncate_list-hidden'
        visible:    'truncate_list-visible'
        more:       'truncate_list-more'
        expanded:   'truncate_list-expanded'
        language:   'truncate_list-language'
      }
    }, opt
    
    lang = opt.lang
    sel = opt.sel
    cls = (k) -> ".#{opt.sel[k]}"
    find_cls = (k) -> jo.find(cls(k))
    
    uls = jo.children('ul')
    lis = uls.children('li')
    
    @construct = ->
      uls.addClass(sel.container)
      ticker = 1
      more_needed = false
      lis.each ->
        li = $(this)
        if ticker > opt.limit
          li.addClass(sel.hidden)
          more_needed = true
        else
          li.addClass(sel.visible)
        ticker++
        
      if more_needed
        jo.append($("<div class='#{sel.more}'><a href='#' class='#{sel.language}'>#{lang.more}</a></div>"))      
        find_cls('more').click (e) ->
          e.preventDefault()
          more = $(this)
          container = more.siblings(cls('container'))
          if container.hasClass(sel.expanded)
            container.removeClass(sel.expanded)
            more.removeClass(sel.expanded).children(cls('language')).html(lang.more)
          else
            container.addClass(sel.expanded)
            more.addClass(sel.expanded).children(cls('language')).html(lang.less)
    
    @construct()
  
    return sf
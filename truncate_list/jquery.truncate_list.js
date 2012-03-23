(function() {
  jQuery(function($) {
    return $.fn.truncateList = function(opt) {
      var cls, find_cls, jo, lang, lis, map, sel, sf, target, uls;
      sf = this;
      jo = $(this);
      target = target;
      map = {};
      opt = $.extend({
        limit: 10,
        log: false,
        lang: {
          more: '+ View More',
          less: '- View Less'
        },
        sel: {
          container: 'truncate_list-container',
          hidden: 'truncate_list-hidden',
          visible: 'truncate_list-visible',
          more: 'truncate_list-more',
          expanded: 'truncate_list-expanded',
          language: 'truncate_list-language'
        }
      }, opt);
      lang = opt.lang;
      sel = opt.sel;
      cls = function(k) {
        return "." + opt.sel[k];
      };
      find_cls = function(k) {
        return jo.find(cls(k));
      };
      uls = jo.children('ul');
      lis = uls.children('li');
      this.construct = function() {
        var more_needed, ticker;
        uls.addClass(sel.container);
        ticker = 1;
        more_needed = false;
        lis.each(function() {
          var li;
          li = $(this);
          if (ticker > opt.limit) {
            li.addClass(sel.hidden);
            more_needed = true;
          } else {
            li.addClass(sel.visible);
          }
          return ticker++;
        });
        if (more_needed) {
          jo.append($("<div class='" + sel.more + "'><a href='#' class='" + sel.language + "'>" + lang.more + "</a></div>"));
          return find_cls('more').click(function(e) {
            var container, more;
            e.preventDefault();
            more = $(this);
            container = more.siblings(cls('container'));
            if (container.hasClass(sel.expanded)) {
              container.removeClass(sel.expanded);
              return more.removeClass(sel.expanded).children(cls('language')).html(lang.more);
            } else {
              container.addClass(sel.expanded);
              return more.addClass(sel.expanded).children(cls('language')).html(lang.less);
            }
          });
        }
      };
      this.construct();
      return sf;
    };
  });
}).call(this);

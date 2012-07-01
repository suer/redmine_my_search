# -*- coding: utf-8 -*-
class MySearchViewListener < Redmine::Hook::ViewListener
  def view_layouts_base_content(context)
    html = '<div id="my-search-box">'
    html << '<div><input id="my-search-input" type="text"></input></div>'
    html << '<div id="my-search-status-line">'
    html << '<span id="my-search-title"></span>: '
    html << '<span id="my-search-description"></span>'
    html << '<span id="my-search-url"></span>'
    html << '</div>'
    html << '</div>'
    js_url = Redmine::Utils.relative_url_root + '/plugin_assets/redmine_my_search/javascripts/my_search.js'
    html << javascript_include_tag(js_url)
    css_url = Redmine::Utils.relative_url_root + '/plugin_assets/redmine_my_search/stylesheets/my_search.css'
    html << stylesheet_link_tag(css_url)
  end
end

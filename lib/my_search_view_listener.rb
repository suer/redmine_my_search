class MySearchViewListener < Redmine::Hook::ViewListener
  def view_layouts_base_content(context)
    html = '<div id="my-search-box"></div>'
    js_url = Redmine::Utils.relative_url_root + '/plugin_assets/redmine_my_search/javascripts/my_search.js'
    html << javascript_include_tag(js_url)
    css_url = Redmine::Utils.relative_url_root + '/plugin_assets/redmine_my_search/stylesheets/my_search.css'
    html << stylesheet_link_tag(css_url)
  end
end

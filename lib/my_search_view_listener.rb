class MySearchViewListener < Redmine::Hook::ViewListener
  def view_layouts_base_content(context)
    '<div id="my-search-box"></div>'
  end
end

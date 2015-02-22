require 'redmine'
require 'my_search_view_listener'

Redmine::Plugin.register :redmine_my_search do
  name 'Redmine My Search plugin'
  author 'suer'
  description 'This plugin generate text data for searching'
  version '0.0.6'
  url 'https://github.com/suer/redmine_my_search'
  author_url 'http://d.hatena.ne.jp/suer/'
  menu :top_menu, :my_search_plugin_menu, '#my-search', :last => true,  :caption => :label_top_menu_my_search
end

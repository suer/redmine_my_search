ActionController::Routing::Routes.draw do |map|
  map.connect '/my_search/:action.:format', :controller => 'my_search'
 # map.connect '/my_search/data.:format', :controller => 'my_search', :action => 'data'
end

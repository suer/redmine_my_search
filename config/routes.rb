match '/my_search', :controller => 'my_search', :action => 'index'
match '/my_search/:action(.:format)', :controller => 'my_search'

class MySearchController < ApplicationController
  unloadable

  include QueriesHelper
  include MySearchHelper

  def data
    retrieve_query
    @issues = Issue.visible.find(:all, :order => "issues.id desc")
    render :text => @issues.inject('') {|list, issue| list << issue_to_s(issue) }, :content_type => 'text/plain'
  end
end

class MySearchController < ApplicationController
  unloadable
  accept_api_auth :data

  include QueriesHelper
  include MySearchHelper

  def data
    retrieve_query
    issues = Issue.visible.order("issues.id desc")
    render :text => issues.inject('') {|list, issue| list << issue_to_s(issue) }, :content_type => 'text/plain'
  end

  def data_all
    retrieve_query
    issues = Issue.visible.order("issues.id desc")
    projects = Project.visible
    data = projects.inject('') {|list, project| list << project_to_s(project) }
    projects.each do |project|
      project.wiki.pages.each do |page|
        data << wiki_page_to_s(page)
      end
    end
    data << issues.inject('') {|list, issue| list << issue_to_s(issue) }
    render :text => data, :content_type => 'text/plain'
  end

  def api_request?
    %w(text).include? params[:format]
  end

end

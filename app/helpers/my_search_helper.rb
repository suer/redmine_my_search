module MySearchHelper
  def issue_to_s(issue)
    text = ''
    text << issue.subject
    text << "\n"
    text << (issue.description.blank? ? '' : issue.description.gsub(/\r\n|\r|\n/, ''))
    text << "\n"
    text << url_for(:controller => 'issues', :action => 'show', :id => issue)
    text << "\n"
  end

  def project_to_s(project)
    text = ''
    text << project.name
    text << "\n"
    text << (project.description.blank? ? '' : project.description.gsub(/\r\n|\r|\n/, ''))
    text << "\n"
    text << url_for(:controller => 'projects', :action => 'show', :id => project)
    text << "\n"
  end

  def wiki_page_to_s(wiki_page)
    text = ''
    text << wiki_page.title
    text << "\n"
    text << ''
    text << "\n"
    text << url_for(:controller => 'wiki', :action => 'show', :project_id => wiki_page.project, :id => wiki_page.title)
    text << "\n"
  end

end

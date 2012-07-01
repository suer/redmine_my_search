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
end

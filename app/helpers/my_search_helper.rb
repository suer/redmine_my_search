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
end

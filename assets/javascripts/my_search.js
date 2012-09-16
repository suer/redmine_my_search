// my search plugin

(function(document, window, undefined) {
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;
    var ENTER = 13;
    var ESC = 27;

    var MAX_MATCHED = 10;

    var data = [];
    var matchedData = [];
    var selectedIndex = 0;
    var prevValue = null;

    $('.my-search-plugin-menu').click(function() {
        toggleBox();
        return false;
    });

    $('#my-search-input').keypress(function(e) {
        if (e.keyCode != ENTER) {
            return true;
        }
        move();
    });

    $('#my-search-input').keyup(function(e) {
        if ([DOWN, UP].indexOf(e.keyCode) >= 0) {
            return true;
        }
        var value = $('#my-search-input').val();
        if (value == null || value.length == 0) {
            return true;
        }
        if (value != prevValue) {
            prevValue = value;
            search(value);
            displayResults();
        }
        return true;
    });

    $('#my-search-input').keydown(function(e) {
        if (e.keyCode == DOWN) {
            if (selectedIndex < Math.min(MAX_MATCHED, matchedData.length) - 1) {
                selectedIndex += 1;
                select(selectedIndex);
            }
            return false;
        } else if (e.keyCode == UP) {
            if (selectedIndex > 0) {
                selectedIndex -= 1;
                select(selectedIndex);
            }
            return false;
        } else if (e.keyCode == ESC) {
            toggleBox();
        }
        return true;
    });

    function move() {
        location.href = matchedData[selectedIndex]['url'];
    }

    function search(value) {
        var len = data.length;
        var regExp = new RegExp(value, 'i');
        matchedData = [];
        for (var i = 0; i < len; i++) {
            target = data[i]['title'];
            if (target.match(regExp)) {
                matchedData.push(data[i]);
            }
        }
    }

    function select(index) {
        var min = Math.min(MAX_MATCHED, matchedData.length);
        for (var i = 0; i < min; i++) {
            if (i == index) {
                $('#my-search-result-' + i).css({backgroundColor: '#888888'});
            } else {
                $('#my-search-result-' + i).css({backgroundColor: '#333333'});
            }
        }
    }

    function toggleBox() {
        if (data.length == 0) {
            loadData();
        }

        var searchBox = $('#my-search-box').toggle('normal', function() {
            if (searchBox.css('display') == 'block') {
                $('#my-search-input').focus();
            } else {
                matchedData = [];
                prevValue = null;
                displayResults();
            }
        });
    }

    function loadData() {
        $.ajax(
            getBaseURL() + '/my_search/data_all',
            {
                method: 'get',
                parameters: '',
                success: function (response) {
                    parseData(response);
                    $('#my-search-box').show();
                    $('#my-search-input').focus();
                }
            });
    }

    function parseData(text) {
        var wikiPageRegExp = new RegExp(".+/projects/(.+)/wiki/.+");
        var projectPageRegExp = new RegExp(".+/projects/.+");
        var issuePageRegExp = new RegExp(".+/issues/(.+)");
        var textArray = text.split(/\r\n|\r|\n/);
        var len = textArray.length;
        var obj = {}
        for (var i = 0; i < len; i++) {
            if (i % 3 == 0) {
                obj['title'] = textArray[i];
            } else if (i % 3 == 1) {
                obj['description'] = textArray[i];
            } else if (i % 3 == 2) {
                obj['url'] = textArray[i];
                if (obj['url'].match(wikiPageRegExp)) {
                    obj['type'] = 'Wiki';
                    obj['subtitle'] = obj['url'].match(wikiPageRegExp)[1];
                } else if (obj['url'].match(projectPageRegExp)) {
                    obj['type'] = 'Project';
                    obj['subtitle'] = '';
                } else if (obj['url'].match(issuePageRegExp)) {
                    obj['type'] = 'Issue';
                    obj['subtitle'] = '#' + obj['url'].match(issuePageRegExp)[1];
                }
                data.push(obj);
                obj = {};
            }
        }
    }

    function displayResults() {
        $('#my-search-results').empty();
        var len = matchedData.length;
        var min = Math.min(MAX_MATCHED, len);
        for (var i = 0; i < min; i++) {
            html = '<div id="my-search-result-' + i + '">'
            html += '<span>' + matchedData[i]['title'] + '</span> '
            html += generateSubtitleElement(matchedData[i]);
            html += '</div>';
            $('#my-search-results').append(html);
        }
        if (min > 0) {
            select(0);
        }
    }

    function generateSubtitleElement(matchedDatum) {
      var html = '';
      html += '<span class="my-search-result-type ';
      html += 'my-search-result-type-';
      html += matchedDatum['type'].toLowerCase();
      html += '">';
      html += matchedDatum['subtitle'];
      html += ' ';
      html += matchedDatum['type'];
      html += '</span>';
      return html;
    }

    function getBaseURL() {
        return document.getElementsByTagName('script')[0].src.split('/javascripts')[0];
    }

})(document, window);

// my search plugin

(function(document, window, undefined) {
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;
    var G = 71;
    var ENTER = 13;

    var MAX_MATCHED = 5;

    var data = [];
    var matchedData = [];
    var selectedIndex = 0;
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode == G) {
            toggleBox();
        }
    });

    $('my-search-input').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode == G) {
            return;
        }
        if (e.keyCode == ENTER) {
            move();
            return;
        } else if (e.keyCode == DOWN) {
            if (selectedIndex < Math.min(MAX_MATCHED, matchedData.length) - 1) {
                selectedIndex += 1;
                select(selectedIndex);
            }
            return;
        } else if (e.keyCode == UP) {
            if (selectedIndex > 0) {
                selectedIndex -= 1;
                select(selectedIndex);
            }
            return;
        }
        var value = $('my-search-input').value;
        if (value == null || value.length == 0) {
            return;
        }
        search(value);
        displayResults();
    });

    function move() {
        location.href = matchedData[selectedIndex]['url'];
    }

    function search(value) {
        var len = data.length;
        var regExp = new RegExp(value);
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
                $('my-search-result-' + i).style.backgroundColor = '#888888';
            } else {
                $('my-search-result-' + i).style.backgroundColor = '#333333';
            }
        }
    }

    function toggleBox() {
        if (data.length == 0) {
            loadData();
        }

        var display = $('my-search-box').style.display;
        if (display == 'none') {
            $('my-search-box').style.display = 'block';
            $('my-search-input').focus();
        } else {
            $('my-search-box').style.display = 'none';
        }
    }

    function loadData() {
        new Ajax.Request(
            getBaseURL() + '/my_search/data_all',
            {
                method: 'get',
                parameters: '',
                onComplete: function (request) {
                    parseData(request.responseText);
                    $('my-search-box').style.display = 'block';
                    $('my-search-input').focus();
                }
            });
    }

    function parseData(text) {
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
                data.push(obj);
                obj = {};
            }
        }
    }

    function displayResults() {
        $('my-search-results').innerHTML = '';
        var len = matchedData.length;
        var min = Math.min(MAX_MATCHED, len);
        for (var i = 0; i < min; i++) {
            html = '<div id="my-search-result-' + i + '">'
            html += '<span>' + matchedData[i]['title'] + '</span> '
            html += '<span class="my-search-url">' + matchedData[i]['url'] + '</span>'
            html += '</div>';
            new Insertion.Bottom('my-search-results', html);
        }
        if (min > 0) {
            select(0);
        }

    }

    function getBaseURL() {
        return document.getElementsByTagName('script')[0].src.split('/javascripts')[0];
    }

})(document, window);

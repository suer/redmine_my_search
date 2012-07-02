// my search plugin

(function(document, window, undefined) {
    var data = [];
    var matchedData = [];
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode == 71) {
            toggleBox();
        }
    });

    $('my-search-input').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode == 71) {
            return;
        }
        if (e.keyCode == 13 && matchedData.length > 0) {
            location.href = matchedData[0]['url'];
        }
        var value = $('my-search-input').value;
        if (value == null || value.length == 0) {
            return;
        }
        var len = data.length;
        var regExp = new RegExp(value);
        matchedData = [];
        for (var i = 0; i < len; i++) {
            target = data[i]['title'] + data[i]['description'];
            if (target.match(regExp)) {
                matchedData.push(data[i]);
            }
        }
        if (matchedData.length > 0) {
            $('my-search-title').innerHTML = matchedData[0]['title'];
            $('my-search-description').innerHTML = matchedData[0]['description'];
            $('my-search-url').innerHTML = matchedData[0]['url'];
        }

    });

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

    function getBaseURL() {
        return document.getElementsByTagName('script')[0].src.split('/javascripts')[0];
    }

})(document, window);

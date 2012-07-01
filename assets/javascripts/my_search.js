// my search plugin

var data = [];
var selectedData = null;
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.keyCode == 71) {
        toggleBox();
        if (data.length == 0) {
            loadData();
        }
    }
});

$('my-search-input').addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.keyCode == 71) {
        return;
    }
    if (e.keyCode == 13 && selectedData) {
        location.href = selectedData['url'];
    }
    var value = $('my-search-input').value;
    if (value == null || value.length == 0) {
        return;
    }
    var len = data.length;
    var regExp = new RegExp(value);
    for (var i = 0; i < len; i++) {
        target = data[i]['title'] + data[i]['description'];
        if (target.match(regExp)) {
            $('my-search-title').innerHTML = data[i]['title'];
            $('my-search-description').innerHTML = data[i]['description'];
            $('my-search-url').innerHTML = data[i]['url'];
            selectedData = data[i];
        }
    }
});

function toggleBox() {
    var display = $('my-search-box').style.display;
    if (display == 'none') {
        $('my-search-box').style.display = 'block';
        $('my-search-input').focus();
    } else {
        $('my-search-box').style.display = 'none';
    }

}

function loadData() {
	var myAjax = new Ajax.Request(
		'http://localhost:3000/my_search/data_all', 
		{
			method: 'get', 
			parameters: '', 
			onComplete: function (request) {
                parseData(request.responseText);
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

// my search plugin

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 191) {
        toggleBox();
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


function saveSelection() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

/**
* How to use:
* You have a text editor, or a textarea, or any text element, then you want to create a widget 
* that adds a link, or anything that causes a new element to get focus so your text element looses it and
* selection is lost, then you may want to restore that selection after.
*/

var selectionRange = saveSelection();

// then, you loose focus

/**
* You get what you wanted and you want your selection back there
*/
restoreSelection(selectionRange);


// Credits: Tim Down's SO answer http://stackoverflow.com/a/3316483/1470564
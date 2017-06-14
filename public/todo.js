// append new to-do item to #list & clear input field
function addItem() {
    var itemText = $("#input-field").val();
    var $item = $("<div class='item'><span class='glyphicon glyphicon-exclamation-sign'/><input type='checkbox' class='checkbox'/><p>" + itemText + "</p></div>");
    $("#list").append($item);
    $("#input-field").val('');
}
// remove to-do items containing checked boxes
function clearCompleted() {
    var $checkboxes = $(".checkbox");
    for (var i=0; i<$checkboxes.length; i++) {
        if ($checkboxes[i].checked === true) {
            $($checkboxes[i]).parent().remove();
        }
    }
}

$(document).ready( function() {
    
    // for targeting DOM elements that are present initially
    // on button click, addItem
    $("#add-item").on("click", function() {
        addItem();
    })
    // when Enter key is pressed from input field, addItem
    $("#input-field").on("keydown", function(event) {
        if (event.keyCode === 13 && $("#input-field").val()) {
            addItem();
        }
    })
    // on button click, remove completed to-do items
    $("#clear-completed").on("click", function() {
        clearCompleted();
    })
    // on button click, remove all to-do items
    $("#clear-all").on("click", function() {
        $(".item").remove();
    })
    
    // for targeting DOM elements added dynamically - add an event listener during creation instead?
    // when item is checked or unchecked, toggle strikethrough
    $("#list").on("click", '.checkbox', function(event) {
        var $checkbox = $(this);
        var $text = $checkbox.parent().children("p");
        if ($checkbox.is(':checked')) {
            $text.css("text-decoration", "line-through");
        } else {
            $text.css("text-decoration", "none");
        }
    })
    $("#list").on("click", '.glyphicon-exclamation-sign', function(event) {
        $(this).toggleClass('priority-on');
    })
})
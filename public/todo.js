// append new to-do item to #list & clear input field
function addItem(text, checked, priority) {
    var $item = $("<div class='item'><span class='glyphicon glyphicon-exclamation-sign'/><input type='checkbox' class='checkbox'/><p>" + text + "</p></div>");
    if (checked) {
        $item.children("input").prop("checked", true);
    }
    if (priority) {
        $item.children("span").addClass("priority-on");
    }
    $("#list").append($item);
    $("#input-field").val('');
}
// find & delete to-do item from localStorage
function deleteItem(text) {
    var tempList = getList();
    for (var item in tempList) {
        if (tempList[item]["text"] == text) {
            delete tempList[item];
            saveList(tempList);
            return;
        }
    }
}
// delete & remove to-do items containing checked boxes
function clearCompleted() {
    var $checkboxes = $(".checkbox");
    for (var i=0; i<$checkboxes.length; i++) {
        if ($checkboxes[i].checked === true) {
            var text = $($checkboxes[i]).parent().children("p").text();
            deleteItem(text);
            $($checkboxes[i]).parent().remove();
        }
    }
}
// initialize, or restore data from, localStorage
function prepList() {
    var list = getList();
    if (list) {
        for (var item in list) {
            addItem(list[item]["text"], list[item]["checked"], list[item]["priority"]);
        }
    } else {
        localStorage.setItem("list", JSON.stringify({}));
        localStorage.setItem("count", JSON.stringify(0));
    }
}
// get list from localStorage, returns an object
function getList() {
    return JSON.parse(localStorage.getItem("list"));
}
// save updated list object to localStorage
function saveList(updatedList) {
    localStorage.setItem("list", JSON.stringify(updatedList));
}
// save to-do item to localStorage
// text (string), checked (boolean), priority (boolean)
function saveItem(text, checked, priority) {
    localStorage.setItem("count", (localStorage.getItem("count") + 1));
    var tempList = getList();
    tempList[localStorage.getItem("count")] = { text: text,
                                                checked: checked,
                                                priority: priority
                                              };
    saveList(tempList);
}
// find item (based on text) and update item
// to update checked or priority status, pass boolean. to ignore, pass null.
function updateItem(text, checked, priority) {
    var tempList = getList();
    for (var item in tempList) {
        if (tempList[item]["text"] == text) {
            if ((checked == true) || (checked == false)) {
                tempList[item]["checked"] = checked;
            }
            if ((priority == true ) || (priority == false)) {
                tempList[item]["priority"] = priority;
            }
            saveList(tempList);
            return;
        }
    }
    
}

$(document).ready( function() {
    
    // restore data from localStorage, if available
    prepList();
    
    // for targeting DOM elements that are present initially
    // on button click, add & save item
    $("#add-item").on("click", function() {
        var itemText = $("#input-field").val();
        addItem(itemText, false, false);
        saveItem(itemText, false, false);
    })
    // when Enter key is pressed from input field, add & save item
    $("#input-field").on("keydown", function(event) {
        if (event.keyCode === 13 && $("#input-field").val()) {
            var itemText = $("#input-field").val();
            addItem(itemText, false, false);
            saveItem(itemText, false, false);
        }
    })
    // on button click, remove & delete completed to-do items
    $("#clear-completed").on("click", function() {
        clearCompleted();
    })
    // on button click, remove & delete all to-do items
    $("#clear-all").on("click", function() {
        $(".item").remove();
        localStorage.clear();
    })
    
    // for targeting DOM elements added dynamically - add an event listener during creation instead?
    // when item is checked or unchecked, toggle strikethrough & update checked status in localStorage
    $("#list").on("click", '.checkbox', function(event) {
        var $text = $(this).parent().children("p");
        if ($(this).is(':checked')) {
            $text.css("text-decoration", "line-through");
            updateItem($text.text(), true, null);
        } else {
            $text.css("text-decoration", "none");
            updateItem($text.text(), false, null);
        }
    })
    // when exclamation mark is clicked, toggle icon color & update priority status in localStorage
    $("#list").on("click", '.glyphicon-exclamation-sign', function(event) {
        $(this).toggleClass('priority-on');
        var text = $(this).parent().children("p").text();
        if ($(this).hasClass('priority-on')) {
            updateItem(text, null, true);
        } else {
            updateItem(text, null, false);
        }
    })
})
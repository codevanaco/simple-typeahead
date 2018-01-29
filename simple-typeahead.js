$(document).ready(function(){

console.log("hello world");

$.typeahead({
    input: ".js-typeahead",
    order: "asc",
    source: {
        groupName: {
            // Ajax Request
            ajax: {
                url: "..."
            }
        }
    },
    callback: {
        onClickBefore: function () { 
        	console.log("on click happened")
        }
    }
});

});


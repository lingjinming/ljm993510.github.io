define(['jquery'], function($) {

    function Dialog() {}; //定义一个Dialog的类

    Dialog.prototype = {
        alert: function(con) {
            var boundingBox = $("<div class='boundingBox'></div>");
            boundingBox.appendTo('body');
            boundingBox.html(con)
        },
        confirm: function() {},
        prompt: function() {}

    }
    return {
        Dialog: Dialog
    }
});
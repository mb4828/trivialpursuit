var gamescripts = (function() {

    var item = null;

    return {
        init: function(){
            $('.gamepiece').each(function(){
                this.addEventListener('dragstart', gamescripts.drag_start, false);
            });

            document.body.addEventListener('dragover', gamescripts.drag_over, false);
            document.body.addEventListener('drop', gamescripts.drop, false);
        },

        drag_start: function(event){
            item = event.target;
            var style = window.getComputedStyle(event.target, null);
            event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
        },

        drag_over: function(event){
            if (item) {
                event.preventDefault();
                return false;
            }
        },

        drop: function(event){
            if (item) {
                var offset = event.dataTransfer.getData("text/plain").split(',');
                dm = document.getElementById(item.id);
                item.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
                item.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
                event.preventDefault();
                item = null;
                return false;
            }
        }
    }

}());

$(function(){gamescripts.init();});
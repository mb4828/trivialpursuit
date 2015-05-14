var gamescripts = (function() {

    var item = null;
    var wid = 6;

    return {
        init: function(){
            // install listeners for game pieces
            $('.gamepiece').each(function(){
                this.addEventListener('dragstart', gamescripts.drag_start, false);
            });

            // install listeners for master wedges
            $('.wedge').each(function(){
               this.addEventListener('dragstart', gamescripts.drag_start, false);
            });

            // install listeners on board
            document.body.addEventListener('dragover', gamescripts.drag_over, false);
            document.body.addEventListener('drop', gamescripts.drop, false);
        },

        drag_start: function(event){
            item = event.target;
            var style = window.getComputedStyle(event.target, null);
            event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
        },

        drag_over: function(event){
            if (!item) return;
            event.preventDefault();
            return false;
        },

        drop: function(event){
            if (!item) return;

            // allow game pieces to be dropped anywhere on the board
            if (item.getAttribute('data-draggable') == 'gamepiece' && event.target.id == 'board') {
                var offset = event.dataTransfer.getData("text/plain").split(',');
                dm = document.getElementById(item.id);
                item.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
                item.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
            }

            // allow master wedges to be dropped into team score boxes
            if (item.getAttribute('data-draggable') == 'master-wedge' && $('#'+event.target.id).parents('table:first').attr('id') == 'score-table') {
                gamescripts.master_wedge_helper(event);
            }

            // allow slave wedges to be deleted from team score boxes
            if (item.getAttribute('data-draggable') == 'slave-wedge' && $('#'+event.target.id).parents('table:first').attr('id') != 'score-table') {
                gamescripts.slave_wedge_helper(event);
            }

            item = null;
            event.preventDefault();
            return false;
        },

        master_wedge_helper: function(event){
            var colorid = item.id[1];
            var team = event.target.id;

            if (!team || team == undefined) return;

            // add wedge to table and give it a listener for dragstart
            $('#'+team).append('<span id="w' + wid + '" class="wedge wedge' + colorid + '" draggable="true" data-draggable="slave-wedge">&#9660;</span>');
            document.getElementById('w'+wid).addEventListener('dragstart', gamescripts.drag_start, false);

            // increment wedge id
            wid += 1;
        },

        slave_wedge_helper: function(event){
            $('#'+item.id).remove();
        }
    }

}());

$(function(){gamescripts.init()});
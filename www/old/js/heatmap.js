
var heatmap = null; 
function initHeatMap(config) {
    heatmap = h337.create(config);
    var active = false,
            lastCoords = [],
            mouseMove = false,
            mouseOver = false,
            activate = function() {
                active = true;
            },
            $ = function(id) {
                return document.getElementById(id);
            },
            timer = null,
            simulateEv = function() {
                heatmap.store.addDataPoint(lastCoords[0], lastCoords[1]);
            },
            antiIdle = function() {
                if (mouseOver && !mouseMove && lastCoords && !timer) {
                    timer = setInterval(simulateEv, 1000);
                }
            };


    (function(fn) {
        setInterval(fn, 1000);
    }(antiIdle));
    var tmp = $("heatmapArea");

    tmp.onmouseout = function() {
        mouseOver = false;
        if (timer) {
            clearInterval(timer)
            timer = null;
        }
    };

    tmp.onmousemove = tmp.onclick = function(ev) {
        mouseMove = true;
        mouseOver = true;
        if (active) {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }

            var pos = h337.util.mousePosition(ev);

            heatmap.store.addDataPoint(pos[0], pos[1]);
            lastCoords = [pos[0], pos[1]];

            active = false;
        }
        mouseMove = false;
    };
    tmp["ontouchmove"] = function(ev) {
        var touch = ev.touches[0],
                // simulating a mousemove event           
                simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent("mousemove", true, true, window, 1,
                touch.screenX, touch.screenY,
                touch.clientX, touch.clientY, false,
                false, false, false, 0, null);
        // dispatching the simulated event              
        touch.target.dispatchEvent(simulatedEvent);
        // we don't want to have the default iphone scrolling behaviour ontouchmove  
        ev.preventDefault();
    };

    (function(fn) {
        setInterval(fn, 50);
    }(activate));
}

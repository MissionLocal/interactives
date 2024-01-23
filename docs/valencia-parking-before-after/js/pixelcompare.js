"use strict";
/**
 * PIXELCOMPARE
 * Javascript image comparison
 * @author diamanthaxhimusa@gmail.com
 */
(function() {
  var _extend = function(defaults, options) {
    var extended = {};
    var prop;
    for (prop in defaults) {
      if(Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }
    for (prop in options) {
      if(Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }
    return extended;
  };

  var _addClass = function(element, classname) {
    var arr;
    arr = element.className.split(" ");
    if(arr.indexOf(classname) == -1) {
      element.className += " " + classname;
    }
  };

  var _hasClass = function(element, className) {
    return new RegExp("(\\s|^)" + className + "(\\s|$)").test(
      element.className
    );
  };

  var _removeClass = function(element, className) {
    element.classList.remove(className);
  };

  var _wrap = function(element, tag, sliderOrientation) {
    var div = document.createElement(tag);
    _addClass(div, "pixelcompare-wrapper pixelcompare-" + sliderOrientation);
    element.parentElement.insertBefore(div, element);
    div.appendChild(element);
    return div;
  };

  var dragMeLabel;
  var beforeLabel = document.createElement("span");
  var afterLabel = document.createElement("span");
  var labelLeft = -225;

  var _createSlider = function(beforeDirection, afterDirection) {
    var pxcHandleNode = document.createElement("div");
    _addClass(pxcHandleNode, "pixelcompare-handle");

    var sliderChildNodeBeforeDirection = document.createElement("span");
    sliderChildNodeBeforeDirection.innerHTML = "&#x25BC;"
    _addClass(
      sliderChildNodeBeforeDirection,
      "pixelcompare-" + beforeDirection + "-arrow"
    );
    pxcHandleNode.appendChild(sliderChildNodeBeforeDirection);

    var sliderChildNodeAfterDirection = document.createElement("span");
    sliderChildNodeAfterDirection.innerHTML = "&#x25B2;"
    _addClass(
      sliderChildNodeAfterDirection,
      "pixelcompare-" + afterDirection + "-arrow"
    );
    pxcHandleNode.appendChild(sliderChildNodeAfterDirection);

    beforeLabel.innerHTML = "BEFORE"
    _addClass(beforeLabel, "pixelcompare-label-before");
    pxcHandleNode.appendChild(beforeLabel);

    afterLabel.innerHTML = "AFTER"
    _addClass(afterLabel, "pixelcompare-label-after");
    pxcHandleNode.appendChild(afterLabel);

    dragMeLabel = document.createElement("span");
    dragMeLabel.innerHTML = "&#x1f880;DRAG THIS UP AND DOWN"
    _addClass(dragMeLabel, "pixelcompare-label-dragme");
    pxcHandleNode.appendChild(dragMeLabel);

    pxcHandleNode.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
    return pxcHandleNode;
  };

  var options = {
    default_offset_pct: 0.01,
    orientation: "horizontal",
    overlay: false,
    hover: false,
    move_with_handle_only: true,
    click_to_move: true,
    showSlider: true,
  };

  var pxcContainers = document.querySelectorAll("[data-pixelcompare]");
  var scrollContainer = document.getElementById("pc-scroll-container");


  pxcContainers.forEach(function(pcContainer) {
    var sliderPct = options.default_offset_pct;
    var imageContainer = pcContainer;
    options.hover = pcContainer.hasAttribute("data-hover");
    options.showSlider = options.hover ? pcContainer.hasAttribute("data-show-slider") : options.showSlider;
    options.orientation = pcContainer.hasAttribute("data-vertical")
      ? "vertical"
      : "horizontal";
    var orientations = ["vertical", "horizontal", "sides"];

    var datasetOrientation = imageContainer.dataset.pixelcompareOrientation;
    var sliderOrientation = orientations.includes(datasetOrientation)
      ? datasetOrientation
      : options.orientation;
    var beforeDirection = sliderOrientation === "vertical" ? "down" : "left";
    var afterDirection = sliderOrientation === "vertical" ? "up" : "right";

    var container = _wrap(pcContainer, "div", sliderOrientation);

    var beforeImg = container.querySelectorAll("img")[0];
    var imageWidth = 600;
    var imageHeight = 13506;
    beforeImg.onload = function(){
      if (beforeImg.naturalWidth) {
        imageWidth = beforeImg.clientWidth;
        var scale = imageWidth / beforeImg.naturalWidth;
        imageHeight = beforeImg.naturalHeight * scale;
        beforeLabel.style.left = (labelLeft * scale) + "px";
        afterLabel.style.left = (labelLeft * scale) + "px";
      }
      // container.style.height = imageHeight;
      adjustSlider(sliderPct);
    }
    beforeImg.draggable = false;

    var afterImg = container.querySelectorAll("img")[1];
    afterImg.draggable = false;

    _addClass(container, "pixelcompare-container");
    _addClass(beforeImg, "pixelcompare-before");
    _addClass(afterImg, "pixelcompare-after");

    var slider = null
    if(options.showSlider) {
      slider = _createSlider(beforeDirection, afterDirection);
      container.appendChild(slider);
    }
    if(options.overlay) {
      var overlayNode = document.createElement("div");
      _addClass(overlayNode, "pixelcompare-overlay");
      container.appendChild(overlayNode);
    }

    var calcOffset = function(dimensionPct) {
      var w = imageWidth;
      var h = imageHeight;
      return {
        w: w + "px",
        h: h + "px",
        wp: dimensionPct * 100,
        cw: dimensionPct * w + "px",
        ch: dimensionPct * h + "px",
        sh: dimensionPct * h - (slider.offsetHeight / 2) + "px",
      };
    };

    var adjustContainer = function(offset) {
      if(sliderOrientation === "vertical") {
        var w = beforeImg.parentElement.style.width;
        beforeImg.style.clip =
          "rect(0, " + w + ", " + offset.ch + ", 0)";
        afterImg.style.clip =
          "rect(" + offset.ch + ", " + w + ", " + offset.h + ", 0)";
      } else if(sliderOrientation === "sides") {
        beforeImg.style.clipPath = `polygon(0% ${2 * (50 - offset.wp)}%, ${
          2 * offset.wp
        }% 100%, 0% 100%)`;
        afterImg.style.clipPath = `polygon(100% ${2 * (100 - offset.wp)}%, ${
          -2 * (50 - offset.wp)
        }% 0%, 100% 0%)`;
      } else {
        beforeImg.style.clip =
          "rect(0, " + offset.cw + ", " + offset.h + ", 0)";
        afterImg.style.clip =
          "rect(0, " + offset.w + "," + offset.h + "," + offset.cw + ")";
      }
      container.style.height = offset.h;
    };

    var adjustSlider = function(pct) {
      var offset = calcOffset(pct);
      if(slider) {
        if(sliderOrientation === "vertical") {
          slider.style.top = offset.sh;
        } else {
          slider.style.left = offset.cw;
        }
      }
      adjustContainer(offset);
    };

    // Return the number specified or the min/max number if it outside the range given.
    var minMaxNumber = function(num, min, max) {
      return Math.max(min, Math.min(max, num));
    };

    // Calculate the slider percentage based on the position.
    var getSliderPercentage = function(positionX, positionY) {
      var sliderPercentage =
        sliderOrientation === "vertical"
          ? ((positionY - offsetY) + scrollContainer.scrollTop) / imageHeight
          : (positionX - offsetX) / imageWidth;
      return minMaxNumber(sliderPercentage, 0, 1);
    };

    window.addEventListener("resize", function(e) {
      if (beforeImg.naturalWidth) {
        imageWidth = beforeImg.clientWidth;
        var scale = imageWidth / beforeImg.naturalWidth;
        imageHeight = beforeImg.naturalHeight * scale;
        beforeLabel.style.left = (labelLeft * scale) + "px";
        afterLabel.style.left = (labelLeft * scale) + "px";
      }
      container.style.height = imageHeight;
      adjustSlider(sliderPct);
    });

    var offsetX = 0;
    var offsetY = 0;
    var onMoveStart = function(e) {
      if(
        ((e.distX > e.distY && e.distX < -e.distY) ||
          (e.distX < e.distY && e.distX > -e.distY)) &&
        sliderOrientation !== "vertical"
      ) {
        e.preventDefault();
      } else if(
        ((e.distX < e.distY && e.distX < -e.distY) ||
          (e.distX > e.distY && e.distX > -e.distY)) &&
        sliderOrientation === "vertical"
      ) {
        e.preventDefault();
      }
      _addClass(container, "active");
      offsetX = container.offsetLeft;
      offsetY = container.offsetTop;
    };

    var stopDownScrolling = true;
    var scrollDownAnimation;
    var mouseY = 0;

    function fixScroll() {
      var offset = scrollContainer.scrollTop + mouseY;
      slider.style.top = (offset - (slider.offsetHeight / 2)) + 'px';
      var offset = calcOffset(offset / imageHeight);
      adjustContainer(offset);
    }

    function scrollDown() {
      if(stopDownScrolling ||
        (scrollContainer.scrollTop + scrollContainer.clientHeight >= imageHeight)) {
        clearInterval(scrollDownAnimation);
      } else {
        scrollContainer.scrollTo(0,
          Math.min(imageHeight - scrollContainer.clientHeight, scrollContainer.scrollTop + 3));
        fixScroll();
      }
    }

    var stopUpScrolling = true;
    var scrollUpAnimation;
    function scrollUp() {
      if(stopUpScrolling || (scrollContainer.scrollTop === 0)) {
        clearInterval(scrollUpAnimation);
      } else {
        scrollContainer.scrollTo(0, Math.max(0, scrollContainer.scrollTop - 3));
        fixScroll();
      }
    }

    var onMove = function(e) {
      if(_hasClass(container, "active")) {
        dragMeLabel.style.display = "none";

        var scrollTop = scrollContainer.scrollTop;
        var scrollHgt = scrollContainer.clientHeight;
        mouseY = e.clientY || e.targetTouches[0].clientY;
        mouseY -= offsetY;
        var isCursorAtBottom = mouseY / scrollContainer.offsetHeight > 0.95;
        var isScrollAtBottom = scrollTop + scrollHgt >= imageHeight;
        if(isCursorAtBottom && !isScrollAtBottom) {
          stopUpScrolling = true;
          stopDownScrolling = false;
          scrollDownAnimation = setInterval(scrollDown, 100);
        } else {
          stopDownScrolling = true;
        }

        var isCursorAtTop = mouseY / scrollContainer.offsetHeight < 0.05;
        var isScrollAtTop = scrollTop === 0;
        if(isCursorAtTop && !isScrollAtTop) {
          stopDownScrolling = true;
          stopUpScrolling = false;
          scrollUpAnimation = setInterval(scrollUp, 100);
        } else {
          stopUpScrolling = true;
        }

        if (stopUpScrolling && stopDownScrolling) {
            sliderPct = getSliderPercentage(
            e.pageX || e.changedTouches[0].pageX,
            e.pageY || e.changedTouches[0].pageY
            );
            adjustSlider(sliderPct);
        }
      } else {
        stopDownScrolling = true;
        stopUpScrolling = true;
      }
    };
    var onMoveEnd = function() {
      _removeClass(container, "active");
      stopDownScrolling = true;
      stopUpScrolling = true;
    };

    if(options.hover) {
      container.addEventListener("mouseenter", onMoveStart);
      container.addEventListener("mouseleave", onMoveEnd);
      container.addEventListener("mousemove", onMove);
    } else {
      var moveTarget = options.move_with_handle_only ? slider : container;
      window.addEventListener("mouseup", onMoveEnd);
      container.addEventListener("mousemove", onMove);
      moveTarget.addEventListener("mousedown", onMoveStart);
      moveTarget.addEventListener("touchstart", onMoveStart);
      moveTarget.addEventListener("touchmove", onMove);
      /* container.addEventListener("touchmove", onMove); */
      window.addEventListener("touchend", onMoveEnd);
    }

    container
      .querySelector("img")
      .addEventListener("mousedown", function(event) {
        event.preventDefault();
      });

    if(options.click_to_move) {
      container.addEventListener("click", function(e) {
        offsetX = container.offsetLeft;
        offsetY = container.offsetTop;
        sliderPct = getSliderPercentage(e.pageX, e.pageY);
        adjustSlider(sliderPct);
      });
    }
    window.dispatchEvent(new Event("resize"));
  });
})();

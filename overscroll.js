'use strict';

function initOverScroll(elements) {
  var isChrome = navigator.userAgent.includes('Chrom');

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var timingFunction = 'cubic-bezier(0, 0, 0, 1)';
  var duration = 300;
  var durationBacking = 600;
  var timePadding = 0;
  var power = 2.25;
  if(isChrome) {
    power = power / 6;
  }
  var isBouncing = false;
  var verticalScrollbars = true;
  var horizontalScrollbars = false;

  function initScrollbars(element) {
    window.addEventListener('load', function() {
      if (horizontalScrollbars && ((element.getBoundingClientRect().width <= element.scrollWidth) ||
              ((element.getBoundingClientRect().width <= window.innerWidth)))) {
        var scrollTrackX = document.createElement('wos-scrollbar-track');
        var scrollThumbX = document.createElement('wos-scrollbar-thumb');

        scrollTrackX.classList.add('horizontal');
        element.style.setProperty('scrollbar-width', 'none');

        var y = (element.scrollLeft / element.scrollWidth) * 100;
        var y2 = (element.getBoundingClientRect().height / element.scrollWidth) * 100;
        var sx = 0;
        var sy = 0;

        setInterval(function() {
          y = (element.scrollLeft / element.scrollWidth) * 100;
          y2 = (element.getBoundingClientRect().height / element.scrollWidth) * 100;
          scrollThumbX.style.left = y + '%';
          scrollThumbX.style.width = y2 + '%';
        }, 1000 / 60);
        element.addEventListener('scroll', function() {
          y = (element.scrollLeft / element.scrollWidth) * 100;
          y2 = (element.getBoundingClientRect().height / element.scrollWidth) * 100;

          scrollThumbX.style.left = y + '%';
          scrollThumbX.style.width = y2 + '%';
          scrollThumbX.style.opacity = 1;

          setTimeout(function() {
            if (sx == element.scrollLeft && sy == element.scrollTop) {
              scrollThumbX.style.opacity = 0;
            }
          }, 3000);
          sx = element.scrollLeft;
          sy = element.scrollLeft;
        });

        var mx = 0;
        var my = 0;
        element.addEventListener('mousemove', function(evt) {
          scrollThumbX.style.opacity = 1;

          setTimeout(function() {
            if (mx == evt.clientX && my == evt.clientY) {
              scrollThumbX.style.opacity = 0;
            }
          }, 3000);
          mx = evt.clientX;
          my = evt.clientY;
        });

        scrollThumbX.onpointerdown = function(e) {
          e = e || window.event;
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onpointerup = function() {
            // stop moving when mouse button is released:
            document.onpointerup = null;
            document.onpointermove = null;
          };
          // call a function whenever the cursor moves:
          document.onpointermove = function(e) {
            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            element.scrollLeft = (element.scrollLeft - pos1) * (element.scrollWidth / element.offsetWidth);
          };
        };

        element.addEventListener('wheel', function(evt) {
          scrollThumbX.style.opacity = 1;

          sx = element.scrollLeft;
          sy = element.scrollTop;
        });

        element.appendChild(scrollTrackX);
        scrollTrackX.appendChild(scrollThumbX);
      }
      if (verticalScrollbars && ((element.getBoundingClientRect().height <= element.scrollHeight) ||
                    (element.getBoundingClientRect().height <= window.innerHeight))) {
        var scrollTrackY = document.createElement('wos-scrollbar-track');
        var scrollThumbY = document.createElement('wos-scrollbar-thumb');

        scrollTrackY.classList.add('vertical');
        element.style.setProperty('scrollbar-width', 'none');

        var y = (element.scrollTop / element.scrollHeight) * 100;
        var y2 = (element.getBoundingClientRect().height / element.scrollHeight) * 100;
        var sx = 0;
        var sy = 0;

        scrollThumbY.style.top = y + '%';
        setInterval(function() {
          y = (element.scrollTop / element.scrollHeight) * 100;
          y2 = (element.getBoundingClientRect().height / element.scrollHeight) * 100;
          scrollThumbY.style.top = y + '%';
          scrollThumbY.style.height = y2 + '%';
        }, 1000 / 60);
        element.addEventListener('scroll', function() {
          y = (element.scrollTop / element.scrollHeight) * 100;
          y2 = (element.getBoundingClientRect().height / element.scrollHeight) * 100;

          scrollThumbY.style.top = y + '%';
          scrollThumbY.style.height = y2 + '%';
          scrollThumbY.style.opacity = 1;

          setTimeout(function() {
            if (sx == element.scrollLeft && sy == element.scrollTop) {
              scrollThumbY.style.opacity = 0;
            }
          }, 3000);
          sx = element.scrollLeft;
          sy = element.scrollTop;
        });

        var mx = 0;
        var my = 0;
        element.addEventListener('mousemove', function(evt) {
          scrollThumbY.style.opacity = 1;

          setTimeout(function() {
            if (mx == evt.clientX && my == evt.clientY) {
              scrollThumbY.style.opacity = 0;
            }
          }, 3000);
          mx = evt.clientX;
          my = evt.clientY;
        });

        var lastY = 0;
        scrollThumbY.onpointerdown = function(e) {
          e = e || window.event;
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onpointerup = function() {
            // stop moving when mouse button is released:
            document.onpointerup = null;
            document.onpointermove = null;
          };
          // call a function whenever the cursor moves:
          document.onpointermove = function(e) {
            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            lastY = lastY - pos2;
            element.scrollTop = lastY * (element.scrollHeight / element.offsetHeight);
          };
        };

        element.addEventListener('wheel', function(evt) {
          scrollThumbY.style.opacity = 1;

          sx = element.scrollLeft;
          sy = element.scrollTop;
        });

        element.appendChild(scrollTrackY);
        scrollTrackY.appendChild(scrollThumbY);
      }
    });
  }

  elements.forEach(function(element) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      html, body {
        height: 100vh;
        overflow: scroll;
        box-sizing: border-box;
        margin: 0;
      }

      ::-webkit-scrollbar {
        display: none;
      }
      
      wos-scroll-area {
        display: block;
      }

      wos-scrollbar-track {
        transition: background-color 0.2s;
        position: absolute;
        top: 0;
        width: 16px;
        height: 100%;
        display: block;
        right: 0;
        border-left: solid 1px transparent;
      }
      html[dir="rtl"] wos-scrollbar-track {
        left: 0;
        border-left: none;
        border-right: solid 1px transparent;
      }

      wos-scrollbar-track:hover {
        background: var(--background);
        border-left: solid 1px var(--button-background);
      }
      html[dir="rtl"] wos-scrollbar-track:hover {
        border-left: none;
        border-right: solid 1px var(--button-background);
      }

      wos-scrollbar-track > wos-scrollbar-thumb {
        border: solid 3px transparent;
        width: 12px;
        transition: width 0.2s;
        box-sizing: border-box;
        display: block;
        position: absolute;
        border-radius: 16px;
        background: #858585;
        background-clip: content-box;
        margin-left: 4px;
        transition: width 0.2s ease, margin 0.2s ease, opacity 0.5s ease;
      }
      html[dir="rtl"] wos-scrollbar-track > wos-scrollbar-thumb {
        margin-left: 0;
        margin-right: 4px;
      }

      wos-scrollbar-track:hover > wos-scrollbar-thumb {
        width: 16px;
        margin: 0 !important;
        opacity: 1 !important;
      }
    `;
    if (element) {
      element.appendChild(style);
    }

    // element.ontouchstart = function(e) {
    //   e = e || window.event;
    //   // get the mouse cursor position at startup:
    //   pos3 = e.clientX;
    //   pos4 = e.clientY;
    //   document.ontouchend = function() {
    //     // stop moving when mouse button is released:
    //     document.ontouchend = null;
    //     document.ontouchmove = null;
    //     element.querySelectorAll('wos-scroll-area').forEach(function(inlineElement) {
    //       inlineElement.style.transition = 'all ' + duration + ' ' + timingFunction;
    //       inlineElement.style.pointerEvents = '';
    //     });
    //   };
    //   // call a function whenever the cursor moves:
    //   document.ontouchmove = function(e) {
    //     e = e || window.event;
    //     // calculate the new cursor position:
    //     pos1 = pos3 - e.clientX;
    //     pos2 = pos4 - e.clientY;
    //     pos3 = e.clientX;
    //     pos4 = e.clientY;
    //     element.querySelectorAll('wos-scroll-area').forEach(function(inlineElement) {
    //       inlineElement.style.transition = '';
    //       inlineElement.style.pointerEvents = 'none';
    //       // set the element's new position:
    //       if (horizontalScrollbars && (inlineElement.scrollWidth >= inlineElement.getBoundingClientRect().width)) {
    //         inlineElement.style.transform = 'translateX(' + (inlineElement.offsetLeft - pos1) + 'px)';
    //       } else if (verticalScrollbars && (inlineElement.scrollHeight >= inlineElement.getBoundingClientRect().height)) {
    //         inlineElement.style.transform = 'translateY(' + (inlineElement.offsetTop - pos2) + 'px)';
    //       } else {
    //         inlineElement.style.transform = 'translate(' + (inlineElement.offsetLeft - pos1) + 'px, ' + (inlineElement.offsetTop - pos2) + 'px)';
    //       }
    //     });
    //   };
    // };

    element.innerHTML = '<wos-scroll-area>' + element.innerHTML + '</wos-scroll-area>';
    initScrollbars(element);

    element.addEventListener('wheel', function(evt) {
      element.querySelectorAll('wos-scroll-area').forEach(function(inlineElement, index) {
        if (!isBouncing) {
          if (element.getBoundingClientRect().width <= element.scrollWidth) {
            if (((element.scrollLeft <= 1) && evt.deltaX <= 0) &&
                ((document.scrollingElement.scrollLeft <= 0) && evt.deltaX <= 0)) {
              inlineElement.style.transition = 'all ' + duration + 'ms ' + timingFunction;
              inlineElement.style.transform = 'translateX(' + (evt.deltaX * power) + 'px)';
              setTimeout(function() {
                inlineElement.style.transition = 'all ' + durationBacking + 'ms ' + timingFunction + ' ' + (index * timePadding) + 'ms';
                inlineElement.style.transform = '';
                setTimeout(function() {
                  inlineElement.style.transition = '';
                }, durationBacking);
              }, duration);
            } else if (((element.scrollLeft >= (element.scrollWidth - element.offsetWidth)) && evt.deltaX >= 0) ||
                       (((document.scrollingElement.scrollLeft + window.innerHeight) >= (element.scrollWidth - 1)) && evt.deltaX >= 0)) {
              inlineElement.style.transition = 'all ' + duration + 'ms ' + timingFunction + ' ' + (index * timePadding) + 'ms';
              inlineElement.style.transform = 'translateX(' + (evt.deltaX * power) + 'px)';
              setTimeout(function() {
                inlineElement.style.transition = 'all ' + durationBacking + 'ms ' + timingFunction + ' ' + (index * timePadding) + 'ms';
                inlineElement.style.transform = '';
                setTimeout(function() {
                  inlineElement.style.transition = '';
                }, durationBacking);
              }, duration);
            }
          }
          if (element.getBoundingClientRect().height <= (element.scrollHeight - 1)) {
            if ((element.scrollTop <= 1) && evt.deltaY <= 0) {
              inlineElement.style.transition = 'all ' + duration + 'ms ' + timingFunction;
              inlineElement.style.transform = 'translateY(' + ((evt.deltaY * -1) * power) + 'px)';
              setTimeout(function() {
                inlineElement.style.transition = 'all ' + durationBacking + 'ms ' + timingFunction + ' ' + (index * timePadding) + 'ms';
                inlineElement.style.transform = '';
                setTimeout(function() {
                  inlineElement.style.transition = '';
                }, durationBacking);
              }, duration);
            } else if ((element.scrollTop >= (element.scrollHeight - element.offsetHeight)) && evt.deltaY >= 0) {
              inlineElement.style.transition = 'all ' + duration + 'ms ' + timingFunction;
              inlineElement.style.transform = 'translateY(' + ((evt.deltaY * -1) * power) + 'px)';
              setTimeout(function() {
                inlineElement.style.transition = 'all ' + durationBacking + 'ms ' + timingFunction + ' ' + (index * timePadding) + 'ms';
                inlineElement.style.transform = '';
                setTimeout(function() {
                  inlineElement.style.transition = '';
                }, durationBacking);
              }, duration);
            }
          }
        }
      });
      
      if (isChrome && (element.scrollTop + element.offsetHeight) == element.scrollHeight) {
        element.scrollTop = element.scrollHeight - element.offsetHeight;
      }
    });

    element.addEventListener('onmouseup', function() {
      isBouncing = false;
    });
  });
}

/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "selectionsortS2CON";

  var interpret = {
    "av_c1": "Second pass: moving from left to right, find the element with the second greatest value.",
    "av_c2": "For each element moving through the list: the biggest seen so far is shown in red.",
    "av_c3": "Compare to biggest seen so far.",
    "av_c4": "Found something bigger, so switch value of bigindex.",
    "av_c5": "Now swap the next biggest element into place.",
    "av_c6": "Done this pass."
  };

  var theArray2 = [20, 10, 15, 54, 55, 11, 14, 78];
  var av = new JSAV(av_name);
  var arr = av.ds.array(theArray2, {indexed: true});
  var j;
  var bigindex = 0;

  arr.addClass(arr.size() - 1, "deemph");
  av.umsg(interpret["av_c1"]);
  av.displayInit();

  av.umsg(interpret["av_c2"]);
  arr.addClass(0, "special");
  av.step();

  for (j = 1; j < arr.size() - 1; j++) {
    arr.addClass(j, "processing");
    av.umsg(interpret["av_c3"]);
    av.step();

    if (arr.value(j) > arr.value(bigindex)) {
      av.umsg(interpret["av_c4"]);
      arr.removeClass(bigindex, "special");
      bigindex = j;
      arr.addClass(bigindex, "special");
      av.step();
    }
    arr.removeClass(j, "processing");
  }
  av.umsg(interpret["av_c5"]);
  av.step();

  arr.removeClass(bigindex, "special");
  arr.addClass(arr.size() - 2, "special");
  arr.swap(bigindex, arr.size() - 2); // swap the two indices
  av.step();

  av.umsg(interpret["av_c6"]);
  arr.removeClass(arr.size() - 2, "special");
  arr.addClass(arr.size() - 2, "deemph");
  av.recorded();
});

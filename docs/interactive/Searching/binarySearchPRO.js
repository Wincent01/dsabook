"use strict";
/*global alert, ODSA, PARAMS */
$(document).ready(function () {
  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret[".avTitle"], interpret["av_Authors"]));
  }

  // show the code and highlight the row where mid is calculated
  function initialize() {

    //generate random array with ascending values
    var randomVal = 0;
    for (var i = 0; i < arraySize; i++) {
      randomVal += Math.floor(JSAV.utils.rand.random() * 10);
      initialArray[i] = randomVal;
    }

    //generate a random key, with value between the min and max of the array
    key = Math.ceil(5 * (initialArray[0] + initialArray[arraySize - 1]) / 7);
    // log the key
    ODSA.AV.logExerciseInit([key]);

    // clear old elements
    if (keyholder) {
      keyholder.clear();
    }
    if ($findLabel) {
      $findLabel.remove();
    }
    if (array) {
      array.clear();
    }

    //insert key into the array (the blue box)
    keyholder = av.ds.array([key], {indexed: false});
    keyholder.element.css("margin-top", 25);
    keyholder.css(0, {"background-color": "#ddf"});
    $findLabel = $("<p>" + interpret["av_find_label"] + "</p>")
      .css("text-align", "center")
      .css("font-weight", "bold")
      .css("margin-bottom", -15)
      .insertBefore(keyholder.element);

    // create the empty array
    array = av.ds.array(new Array(arraySize),
                        {indexed: true, autoresize: false});
    array.click(clickhandler);
    array.layout();

    return array;
  }

  function modelSolution(jsav) {
    jsav.ds.array([key], {indexed: false}).css(0, {"background-color": "#ddf"});
    var modelArray = jsav.ds.array(new Array(arraySize),
                                   {indexed: true, autoresize: false});
    if (code) {
      jsav.code(code).highlight("highlight");
    }
    jsav._undo = [];
    var low = 0, high = arraySize - 1, mid;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      jsav.umsg(interpret["av_ms_comment1"],
                {fill: {low: low, high: high, mid: mid}});
      refLines(jsav, code, "highlight");
      modelArray.value(mid, initialArray[mid]);
      modelArray.highlight(mid);
      if (modelArray.value(mid) < key) {
        jsav.umsg(interpret["av_ms_comment2"],
                  {preserve: true,
                   fill: {arr_at_mid: modelArray.value(mid),
                          key: key, mid_plus_1: mid + 1}});
        refLines(jsav, code, "tbl_mid_lt_key");
        low = mid + 1;
        paintGrey(modelArray, 0, mid);
      }
      if (modelArray.value(mid) > key) {
        jsav.umsg(interpret["av_ms_comment3"],
                  {preserve: true,
                   fill: {arr_at_mid: modelArray.value(mid),
                          key: key, mid_minus_1: mid - 1}});
        refLines(jsav, code, "tbl_mid_gt_key");
        high = mid - 1;
        paintGrey(modelArray, mid, arraySize - 1);
      }
      if (modelArray.value(mid) === key) {
        jsav.umsg(interpret["av_ms_comment4"],
                  {preserve: true, fill: {mid: mid}});
        paintGrey(modelArray, 0, arraySize - 1);
      }
      jsav.stepOption("grade", true);
      jsav.step();
      if (modelArray.value(mid) === key) {
        return modelArray;
      }
    }
    jsav.umsg(interpret["av_ms_comment5"], {preserve: true});
    return modelArray;
  }

  // a function to handle all click events on the array
  var clickhandler = function (index) {
    // if the clicked index is not higlighted earlier, highlight it
    // and paint the ones which are outside of the new range
    if (!this.isHighlight(index)) {
      this.value(index, initialArray[index]);
      this.highlight(index);
      exercise.gradeableStep();
    }
  };

  // paints the background gray for indices [first, last].
  function paintGrey(array, first, last) {
    array.addClass(function (index) {
      return index >= first && index <= last;
    }, "unused");
  }

  function refLines(av, code, lineTag) {
    if (!code) {
      return;
    }
    var lines = code.tags[lineTag];
    if (typeof lines === "number") {
      av.umsg(" " + interpret["av_line"],
              {preserve: true, fill: {first: lines}});
    } else if (typeof lines === "object") {
      av.umsg(" " + interpret["av_lines"],
              {preserve: true, fill: {first: lines[0], second: lines[1]}});
    }
  }

  // Set click handlers
  $("#about").click(about);

  var arraySize = 20,
      key,
      initialArray = [],
      array,
      keyholder,
      $findLabel,
      av = new JSAV($("#container"));

  av.recorded(); // we are not recording an AV with an algorithm

  var interpret = {
    ".exerciseTitle": "Binary Search",
    ".instructLabel": "Instructions:",
    ".instructions": "The blue box contains a search key. The array stores values in ascending order, but these are intially hidden from your view. Find the key in the array by clicking on the midpoint positions as they would be calculated by the binary search algorithm. Whenever you click in the array, the value stored there will be displayed. Remember that midpoint calculation uses interger arithmetic, so the position calculation rounds down.",
    "#about": "About",
    ".avTitle": "Binary Search Proficiency Exercise",
    "av_Authors": "Kasper Hellström",
    "av_find_label": "Find",
    "av_ms_comment1": "Low = {low} and high = {high}, so mid = ( {low} + {high} ) / 2 = <strong>{mid}</strong> (division truncates!)",
    "av_ms_comment2": "<br/>Because {arr_at_mid} is less than {key}, the new low will be <strong>{mid_plus_1}</strong>.",
    "av_ms_comment3": "<br/>Because {arr_at_mid} is greater than {key}, the new high will be <strong>{mid_minus_1}</strong>.",
    "av_ms_comment4": "<br/>The key was found at index {mid}!",
    "av_ms_comment5": "<br/>The key was not found in the table.",
    "av_line": "(line {first})",
    "av_lines": "(lines {first} and {second})"
  };


  var pseudo = av.code([
    "# Return the position of an element in a list.",
    "# If the element is not found, return -1.",
    "def binarySearch(elements, e):",
    "    low = 0",
    "    high = len(elements) - 1",
    "    while low <= high:             # Stop when low and high meet",
    "        mid = (low + high) // 2    # Check middle of subarray",
    "        if elements[mid] < e:",
    "            low = mid + 1          # In right half",
    "        elif elements[mid] > e:",
    "            high = mid - 1         # In left half",
    "        else:",
    "            return mid             # Found it",
    "    return -1                      # Search value not in array",
  ], {lineNumbers: false,
      after: {element: $(".instructions")}, 
      visible: true,
      tags: {
        "highlight": 7,
        "tbl_mid_lt_key": 8,
        "tbl_mid_gt_key": 10,
      }
  });
  pseudo.highlight("highlight");

  if (PARAMS["JXOP-feedback"] === undefined) { // Default to "atend" grading
    window.JSAV_EXERCISE_OPTIONS.feedback = "atend";
  }

  var exercise = av.exercise(modelSolution, initialize,
                             {modelDialog: {width: 700}});
  exercise.reset();
});

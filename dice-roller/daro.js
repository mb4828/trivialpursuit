///////////////////////////////////////////////////////////////////////////////////////
//    JavaScript Animated D6 Dice Roller - DARO - D6 Doubles Add and Roll Over Dice Roller
//
//    Written in 2012 by Michael K. Eidson, mike@eposic.org, http://eposic.org 
//
//    To the extent possible under law, the author(s) have dedicated all
//    copyright and related and neighboring rights to this software to the
//    public domain worldwide. This software is distributed without any warranty. 
//
//    You should have received a copy of the CC0 Public Domain Dedication along
//    with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>. 
///////////////////////////////////////////////////////////////////////////////////////

// Make sure you include the d6.js JavaScript file before you include this one.
// Include this JavaScript file in the place where you want the DARO dice roller
// to show up. You must also provide a div or p tag with an id that you set
// DARO.info.results_id equal to, or you can use the default id of __results. You
// must also be sure to call D6.setBaseUrl if you need to before you include
// this file. Don't include this file more than once in any web page, and don't
// call D6.dice anywhere else in the web page, or you won't like the results.
// If you need more than one dice roller (whether a DARO roller or otherwise)
// on a single web page, you'll have to use the lower level classes in d6.js
// to build them.

// This code uses DARO as the object that will include all the functions and variables.
// Change it to something else if you already have an DARO object elsewhere in your
// JavaScript code. There are of course other ways to do this, but I'm being
// lazy, because I have other things I want to be working on now too. (And I'm
// giving this away for free, so who can complain?) :)

var DARO = {};

DARO.info = {sum: 0, result_string: "", results_id: "__results"};

DARO.callback = function(total, info, results) {
  info.sum = info.sum + total;
  info.result_string = info.result_string + " (" + results[0] + "," + results[1] + ")";
  DARO.update_results(info);
  if (results[0] == results[1]) {
	// Here's how we make the dice roll again when doubles are rolled.
	// The value of 1000 gives a one second delay between rolls.
    window.setTimeout("D6AnimBuilder.get('dice').reset(); D6AnimBuilder.get('dice').start()", 1000);
  } else {
    info.result_string = info.result_string + " = " + info.sum;
    DARO.update_results(info);
    info.result_string = "";
    info.sum = 0;
  }
}

DARO.update_results = function(info) {
  var res_elem = document.getElementById(info.results_id);
  if (res_elem) {
    res_elem.innerHTML = info.result_string;
  }
}

// Here's where we initialize the dice roller to use 2 dice and to invoke
// the above callback with the desired arguments after the dice are rolled.
D6.dice(2, DARO.callback, DARO.info);

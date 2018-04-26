/*
  Closure is when a function 
  "remembers" its lexical scope
  even when the function is 
  executed outside that lexical 
  scope.
*/

/* Closure */
/* Example 1 */
function foo() {
	var bar = "bar";

	function baz() {
		console.log(bar);
	}

	bam(baz);
}

function bam(baz) {
	baz();            // "bar"
}

foo();
// ----------------------------

/* Example 2 */
function foo() {
	var bar = "bar";

	return function() {
		console.log(bar);
    };
}

function bam() {
	foo()();        // "bar"
}

bam();
// -----------------------------

/* Example 3 */
function foo() {
	var bar = "bar";

	setTimeout(function() {
		console.log(bar);
    }, 1000);
}

foo(); 
// -----------------------------

/* Example 4 */

// -----------------------------

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
function foo() {
	var bar = 0;
	
	setTimeout(function() {
        console.log(bar++);
    }, 100);
	
	setTimeout(function() {
        console.log(bar++);
    }, 200);
}

foo(); // 0 1
// -----------------------------

/* Example 5 */
function foo() {
	var bar = 0;
    
    setTimeout(function() {
        var baz = 1;
        console.log(bar++);
        
        setTimeout(function() {
            console.log(bar+baz);
        }, 200);
    }, 100);
}

foo(); // 0 2
// -----------------------------

/* Example 6 */
for(var i=1; i<=5; i++) {
    setTimeout(function() {
        console.log("i: " + i);
    }, i*1000);
}
//(5) > i: 6
// -----------------------------

/* Example 7 */
// Solution for Example 6 (above)
for (var i=1; i<=5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log("i: " + i);
        }, i*1000);
    })(i);
}
//> i: 1
//> i: 2
//> i: 3
//> i: 4
//> i: 5
// -----------------------------

/* Example 8 */
// Using `let` keyword for Example 6
for (let i=1; i<5; i++) {
    setTimeout(function() {
        console.log("i: " + i);
    }, i*1000);
}

//> i: 1
//> i: 2
//> i: 3
//> i: 4
// -----------------------------

/* Example 9 */
// w.r.t to our closure definition
// This example is not a closure
// Its an object reference.
var foo = (function() {
    
    var o = { bar: "bar" };
	
    return { obj: o };
    
})();

console.log(foo.obj.bar); // "bar"
// -----------------------------

/* Example 10 */
// Closure: classic module pattern
var foo = (function() {
	
	var o = { bar: "bar" };
    
    return {
        bar: function() {
            console.log(o.bar);
        }
    };
})();

foo.bar(); // "bar"
// -----------------------------

/* Example 11 */
// Closure: modified module pattern
var foo = (function() {
    var publicAPI = {
        bar: function() {
            publicAPI.baz();
        },
        baz: function() {
            console.log("baz");
        }
    };
    
    return publicAPI;
})();

foo.bar(); // "baz"
// -----------------------------

/* Example 12 */
// Closure: modern module pattern
define("foo", function() {
    
    var o = { bar: "bar" };
    
    return {
        bar: function() {
            console.log(o.bar);
        }
    };
    
});
// -----------------------------


/* Example 1 */
var foo = "bar";

function bar() {
    var foo = "baz";
}

function baz(foo) {
    foo = "bam";
    bam = "yay";
}

/* Example 2 */
var foo = "bar";

function bar() {
    var foo = "baz";

    function baz(foo) {
        foo = "bam";
        bam = "yay";
    }
    baz();
}

bar();
foo;    // "bar"
bam;    // "yay"
baz();  // "Error!" ReferenceError

/* Example 3 */
var foo = function bar() {
    var foo = "baz";

    function baz(foo) {
        foo = bar;
        foo;
    }
    baz();
};

foo();
bar(); // Error! ReferenceError

/* Example 4 */
var foo;

try {
    foo.length;
} catch(error) {
    console.log(error); // TypeError
}

console.log(error); // ReferenceError

/* Example 1 */
var foo = "bar";

function bar() {
    var foo = "baz";
}

function baz(foo) {
    foo = "bam";
    bam = "yay";
}
// ------------------------------------

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
// --------------------------------------

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
// ----------------------------------

/* Example 4 */
var foo;

try {
    foo.length;
} catch(error) {
    console.log(error); // TypeError
}

console.log(error); // ReferenceError
// ------------------------------------

/* Lexical Scope */
/* Example 5 */
function foo() {
    var bar = "bar";

    function baz() {
        console.log(bar);
    }

    baz();
}

foo();
// ------------------------------

/* Example 6 */
var bar = "bar";

function foo(str) {
    eval(str); // cheating
    console.log(bar); // 42
}

foo("var bar = 42;")
// ----------------------------

/* Example 7 */
var obj = {
    a: 2,
    b: 3,
    c: 4
}

obj.a = obj.b + obj.c;
obj.c = obj.b - obj.a;

with (obj) {
    a = b + c;
    d = b - a;
    d = 3; // ??
}

obj.d; // undefined
d; // 3 -- oops!
// -------------------------------

/* Function Scope */
/* Example 8 */
// IIFE pattern
// immediately invoked function expression
var foo = "foo";

(function() {

    var foo = "foo2";
    console.log(foo); // foo2

})();

console.log(foo); // "foo"
// --------------------------------

/* Example 9 */
// IIFE pattern
var foo = "foo";

(function(bar){

    var foo = bar;
    console.log(foo); // "foo"

})(foo);

console.log(foo); // "foo"
// -------------------------------------

/* Block Scope */
/* Example 10 */
// let (ES6+)
function foo() {
    var bar = "bar";
    for (let i=0; i<bar.length; i++) {
        console.log(bar.charAt(i));
    }
    console.log(i); // 4
}

foo(); //
// --------------------------------------

/* Example 11 */
function foo(bar) {
    if(bar) {
        let baz = bar;
        if(baz) {
            let bam = baz;
        }
        console.log(bam); // ReferenceError
    }
    console.log(baz); // ReferenceError
}

foo("bar");
// ----------------------------------------

/* Example 12 */
function foo(bar) {
    {
        let baz = bar;
        console.log(baz); // "bar"
    }
    console.log(baz); // Error
}

foo("bar");
// -----------------------------------------

/* Theoretical Dynamic Scoping *
/* Example 13 */
function foo() {
    console.log(bar); // dynamic!
}

function baz() {
    var bar = "bar";
    foo();
}

baz();
// -----------------------------------------

/**
    Quiz
    1. What type of scoping rule(s) does
    JavaScript have? Exceptions?
    Answer:
        Scopes
            1. Lexical Scope
        Exceptions
            1. eval
            2. with (keyword)


    2. What are the different ways you can
    create a new scope?
    Answer:
        1. functions
        2. catch blocks
        3. { } (with `let` keyword in ES6)

    3. What's the difference between undeclared
    and undefined?
    Answer:
        1. undefined has a value
        2. undeclared not declared in the scope
        If variable is not declared then ReferenceError
        is thrown.
**/

/* Scope: Hoisting */
/* Example 14 */
a;
b;
var a = b;
var b = 2;
b;
a;
// -----------------------------

/* Example 15 */
var a = b();
var c = d(); // TypeError
a; //
c; //

function b() {
    return c;
}

var d = function() {
    return b();
}


/* Hoisted */
function b() {
    return c;
}
var a;
var c;
var d;
a = b();
c = d(); // TypeError
a;
c;
d = function() {
    return b();
};
// ---------------------------------

/* Example 16 */
foo(); // "foo"

var foo = 2;

function foo() {
    console.log("bar");
}

function foo () {
    console.log("foo");
}
// ----------------------------------

/* Example 17 */
a(1);

function a(foo) {
    if(foo > 20) return foo;
    return b(foo+2);
}

function b(foo) {
    return c(foo) + 1;
}

function c(foo) {
    return a(foo*2);
}
// -----------------------------------

/* Hosting: let gotcha */
function foo(bar) {
    if(bar) {
        console.log(baz); // ReferenceError
        let baz = bar;
    }
}

foo("bar");
// -----------------------------------

/* this */
/*
    Every function, while
    executing, has a reference to
    it's current execution context,
    called `this`.
*/

/* Example 18 */
function foo() {
    console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo: foo }
var o3 = { bar: "bar3", foo: foo }

foo();      // "bar1"
o2.foo();   // "bar2"
o3.foo();   // "bar3"
// -----------------------------------

/* Example 19 */
var o1 = {
    bar: "bar1",
    foo: function() {
        console.log(this.bar);
    }
};

var o2 = {bar: "bar2", foo: o1.foo };

var bar = "bar3";
var foo = o1.foo;

o1.foo();   // "bar1"
o2.foo();   // "bar2"
foo();      // "bar3"
// ------------------------------------

/* this: binding confusion */
/* Example 20 */
function foo() {
    var bar = "bar1";
    baz();
}

function baz() {
    console.log(this.bar);
}

var bar = "bar2";
foo();
// ------------------------------------

/* Example 21 */
function foo() {
    var bar = "bar1";
    this.baz = baz;
    this.baz();
}

function baz() {
    console.log(this.bar);
}

var bar = "bar2";
foo(); // "bar2"
// --------------------------------------

/* this: explicit binding */
/* Example 22 */
function foo() {
    console.log(this.bar);
}

var bar = "bar1";
var obj = { bar: "bar2" };

foo();          // "bar1"
foo.call(obj);  // "bar2"
// --------------------------------------

/* this: hard binding */
/* Example 23 */
function foo() {
    console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar: "bar2" };

var orig = foo;
foo = function() { orig.call(obj); }

foo();          // "bar"
foo.call(obj2); // "bar"
// --------------------------------------

/* Example 24 */
function bind(fn, o) {
    return function() {
        fn.call(o);
    };
}

function foo() {
    console.log(this.bar);
}

var obj  = { bar: "bar" };
var obj2 = { bar: "bar2" };

foo = bind(foo, obj);

foo();          // "bar"
foo.call(obj2); // "bar"
// --------------------------------------

/* Example 25 */
if(!Function.prototype.bind2) {
    Function.prototype.bind2 =
    function(o) {
        var fn = this; // the function
        return function() {
            return fn.apply(o,arguments);
        };
    };
}

function foo(baz) {
    console.log(this.bar + " " + baz);
}

var obj = { bar: "bar" };
foo = foo.bind2(obj);

foo("baz");                 // "bar baz"
// --------------------------------------

/* Example 26 */
function foo(baz, bam) {
    console.log(this.bar + " " + baz + " " + bam);
}

var obj = { bar: "bar" };
foo = foo.bind(obj,"baz"); // ES5 only

foo("bam"); // "bar baz bam"
// --------------------------------------

/* this: new */
/* Example 27 */
function foo() {
    this.baz = "baz";
    console.log(this.bar + " " + baz);
}

var bar = "bar";
var baz = new foo();
/* new keyword does following
1. A brand new empty object will be created.
2. This object getting linked to another object
   called `Object`.
3. Object bound to this keyword for the
   purpose of function call.
4. implicitly return at the end of the
   function if no return statement exist.
*/
// --------------------------------------

/* this: determination
    1. Was the function called with `new`?
    Answer:
        If so use that Object.

    2. Was the function called with `call` or
    `apply` specifying an explicit `this`?
    Answer:
        If so use that Object.

    3. Was the function called via a
    containing/owning object (context)?
    Answer:
        If so use that Object.

    4. DEFAULT: global object (except strict mode)
*/

/* Quiz [this]
    1. What determines which object a
    functions `this` points to? What's the
    default?
    Answer:
        DEFAULT is global.

    2. How do you "borrow" a function by
    implicit assignment of `this`?
    Answer:
        function foo() { console.log(this.bar); }
        var obj = {bar: 'bar', foo: foo}
        obj.foo() // "bar"

    3. How do you explicitly bind `this`?
    Answer:
        Using
            1. call
            2. apply
            3. bind

    4. How can you seal a specific `this` to a
    function? Why do that? Why not?
    Answer:
        Using "bind" function.
        To be predictable `this`.

    5. How do you create a new `this`?
    Answer:
        Using a `new` keyword.

*/


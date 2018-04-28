/*
    Agenda

    Async Patterns
        o Callbacks
        o Generators/Co-routines
        o Promises
*/

/* Callbacks */
/* Example 1 */
// not a callback hell
setTimeout(function() {
    console.log("one");

    setTimeout(function() {
        console.log("two");

        setTimeout(function() {
            console.log("three");
        }, 1000);

    }, 1000);

}, 1000);
// ---------------------------------

/* Example 2 */
function one(cb) {
    console.log("one");
    setTimeout(cb, 1000);
}

function two(cb) {
    console.log("two");
    setTimeout(cb, 1000);
}

function three() {
    console.log("three");
}

one(function() {
        two(three)
});
// ---------------------------------

/* Example 3 */
function trySomething(ok, err) {
    setTimeout(function() {
        var num = Math.random();
        if(num > 0.5) ok(num);
    }, 1000);
}

trySomething(
    function(num) {
        console.log("success: " + num);
    },
    function(num) {
        console.log("Sorry: " + num);
    }
);
// ----------------------------------

/* Example 4 */
function trySomething(cb) {
    setTimeout(function() {
        var num = Math.random();
        if(num > 0.5) cb(null, num);
        else cb("Too low!")
    }, 1000);
}

trySomething(function(err, num) {
    if(err) {
        console.log(err);
    } else {
        console.log("Number: " + num);
    }
});
// ---------------------------------

/* Example 5 */
// nested-callbacks tasks
function getData(d, cb) {
    setTimeout(function() { cb(d); }, 1000);
}

getData(10, function(num1) {
    var x = 1 + num1;
    getData(30, function(num2) {
        var y = 1 + num2;

        getData(
            "Meaning of life: " + (x + y),
            function(answer) {
                console.log(answer);
            }
        );
    });
});
// ---------------------------------

/* Example 6 */
/* Generators (yield) */
function* get() {
    console.log("Hello");
    yield null;
    console.log("World");
}

var it = gen();
it.next(); // prints "Hello"
it.next(); // prints "World"
// ---------------------------------

/* Example 7 */
/* Promises (Mc D food order example)*/
var wait = jQuery.Deferred();
var p = wait.promise();

p.done(function(value) {
    console.log(value);
});

setTimeout(function() {
    wait.resolve(Math.random());
}, 1000);
// ---------------------------------

/* Example 8 */
// (native) promise tasks
function getData(d) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() { resolve(d); }, 1000);
    });
}

var x;

getData(10)
.then(function(num1) {
    x = 1 + num1;
    return getData(30);
})
.then(function(num2) {
    var y = 1 + num2;
    return getData("Meaning of life: " + (x + y));
})
.then(function(answer) {
    console.log(answer);
    // Meaning of life: 42
});
// ---------------------------------

/* Quiz

    1. What is "callback hell"? Why do
    callbacks suffer from "inversion of
    control"?

    2. How do you pause a generator? How
    do you resume it?

    3. What is a Promise? How does it solve
    inversion of control issues?

    4. How do we combine generators and
    promises for flow control?
    
*/
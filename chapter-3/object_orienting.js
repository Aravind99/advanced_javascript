/*
    Agenda

    o Object Orienting
        o Common OO Patterns
        o prototype
        o "Inheritance" vs "Behavior Delegation"
            (OO vs OLOO)

*/

/*
    prototype

        Every Single "object" is built by
        a constructor function

        False:
        A constructor makes an object
        "based on" its own prototype

        True:
        A constructor makes an object
        linked to its own prototype


    Square: It is an Object.
    Circle: It is a function.
     ___________________________________________________
    |           Part of the env.                        |
    |      Already present before the                   |
    |      Example 1 is executed.                       |
    |     ____     .prototype       ______              |
    |   / fun  \ ----------------> |      |             |
    |  ( Object )  constructor.    |      |             |
    |   \ ____ / <---------------- |______|             |
    |                                  /|\              |
    |___________________________________|_______________|
    |   [[Prototype]] // prototype chain|               |
    |   aka __proto__ // dunder proto   | [[P]]         |
    |    ___    .prototype          ____|______         |
    |  / fun \ ------------------> | .identify |        |
    | (  Foo  ) constructor.       |           |        |
    |  \ ___ / <------------------ |___________|        |
    |                             /|\  /|\              |
    |      public link for [[P]]   |    |               |
    |                is __proto__ /     | new Foo("a1") |
    |              new Foo("a2") /      | [[P]]         |
    |                   _________    _________          |
    |                  | Obj: a2 |  | Obj: a1 |         |
    |                  | .me     |  | .me     |         |
    |                  | .speak  |  |_________|         |
    |                  |_________|                      |
    |___________________________________________________|
*/

/* Example 1 */
// prototype
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
}

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function() {
    alert("Hello, " + this.identify() + ".")
}

a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype;
a1.__proto__ === a2.__proto__;
// -------------------------------------------------

/* Example 2 */
// shadowing in Example 1
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
}

var a1 = new Foo("a1");
a1.identify(); // "I am a1"

a1.identify = function() { // <-- Shadowing
    // this function will not
    // replace the
    // Foo.prototype.identify function,
    // instead it will create
    // identify function in
    // object `${a1}` itself.
    alert("Hello, " +
        Foo.prototype.identify.call(this) +
        ".");
}

a1.identify(); // alerts: "Hello, I am a1."
// -------------------------------------------------

/* Example 3 */
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
}

Foo.prototype.speak = function() {
    alert("Hello, " +
        this.identify() + // super unicorn magic
    ".")
}

var a1 = new Foo("a1");
a1.speak(); // alerts: "Hello, I am a1."
// -------------------------------------------------

/* prototype: objects linked */
/* Example 4 */
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
}

function Bar(who) {
    Foo.call(this, who);
}
// Bar.prototype = new Foo();  // Or...
Bar.prototype = Object.create(Foo.prototype);
// NOTE: .constructor is borked here, need to fix

Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
}

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); // alerts: "Hello, I am b1."
b2.speak(); // alerts: "Hello, I am b2."
// -------------------------------------------------

/* Quiz

    1. What is a constructor?
    2. What is a [[Prototype]] and where
    does it come from?
    3. How does a [[Prototype]] affect an
    object?
    4. How do we find out where an object's
    [[Prototype]] points to (3 ways)?
*/

/* Example 5 */
/* prototype: this redux

    remember how this has a
    pesky way of getting
    unassigned?
*/
function Foo() {
    this.me = who;
}

Foo.prototype.speak = function() {
    alert("Hello, I am " + this.me + ".");
}

var a1 = new Foo("a1");

$("#speak").click(a1.speak);
// -------------------------------------------------

/* OO: classical inheritance

    Foo ------>a1
     '--------> a2
     |
    Bar ------> b1
     '--------> b2
*/

/* OO: prototypal inheritance

    Foo.prototype <------------ a1
        ^
        |---------------------- a2
        |
    Bar.prototype <------------ b1
       ^
       |----------------------- b2
*/

/* OO: js

    JS "<strike>Inheritance</strike>"
    "Behavior Delegation"
*/

/* Example 6 */
// Delegate object to be able to call `speak`
function Foo(who) {
    this.me = who;
}

Foo.prototype.speak = function() {
    alert("Hello, I am " + this.me + ".");
};

var a1 = new Foo("a1");
a1.speak(); // alerts: "Hello, I am a1."
// -------------------------------------------

/* OLOO: Objects Linked to Other Objects */
/* Example 7 */
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
//^^^^^^^^^^^ Bar.prototype linked to Foo.prototype
    return "I am " + this.me;
}

function Bar(who) {
    Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
//^^^^^^^^^^^ b1 linked to Bar.prototype
Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
}

var b1 = Object.create(Bar.prototype);
//       ^^^^^^^^^^^^^
Bar.call(b1, "b1");
//  ^^^^^^^
b1.speak();
// -------------------------------------------

/* OLOO: delegated objects */
/* Example 8 */
var Foo = {
    init: function(who) {
        this.me = who;
    },

    identify: function() {
        return "I am " + this.me;
    }
}

var Bar = Object.create(Foo);

Bar.speak = function() {
    alert("Hello, " + this.identify() + ".")
}

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak(); // alerts: "Hello, I am b1."
// -------------------------------------------

/* OLOO: js Quiz

    1. How is JavaScript's [[Prototype]] chain
    not like traditional/classical inheritance?

    2. What does "behavior delegation" mean
    and how does it describe object linking
    in JS?

    3. Why is "behavior delegation" as a
    design pattern a helpful thing? What are
    the trade-offs?

*/


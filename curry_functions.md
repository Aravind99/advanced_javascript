# Curry Functions in JavaScript

### What are curry funtions?

In mathematics and computer science, currying is the technique of translating the 
evaluation of a function that takes multiple arguments (or a tuple of arguments) 
into evaluating a sequence of functions, each with a single argument. Currying is 
related to, but not the same as, partial application.

### Examples:
```javascript
  
  // Normal function that take two argunments as input parameters.
  
  function add(a, b) {
    return a + b;
  }
  
  // Lets see turn the fn add() to curry fn.
  
  function cadd(a) {
    return function(b) {
      return a + b;
    }
  }
  
  
  console.log(add(1,3)) // 4
  console.log(cadd(1)(3)) // 4
```

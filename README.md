# TypeScript Mix

A tweaked implementation of TypeScript's default applyMixins(...) idea using ES7 decorators. 

## Dependencies
   * TypeScript
   * ES7 Decorators
 

## Installation
```
npm install --save typescript-mix
```

## Goals

   * Ensure programming to an interface and not just only multiple implementations.

   * Create simple mixins that implement that interface

   * Provide an intuitive and readable way of using such mixins in a concrete class.


## Why I wrote yet another Mixin Library.

The mixin pattern is somewhat a popular pattern amongst JavaScript/TypeScript devs as it gives the power of "mixin in" additional functionality to a class. The official way of using mixins as declared by Microsoft in TypeScript can be really verbose and downright unreadable.

## Things you should keep in mind while using this Library.

  * The mixin isn't/shouldn't really be a class. 
  * A mixin shouldn't be instantiated or used like a class.
  * A mixin shouldn't be inheriting functionality from other classes.
  
I've constantly seen mixins have being confused for multiple inheritance, while mixins and multiple inheritance can be similar in ability or results, how we use them and reason about them is different. A favourite pattern of mine is essentially using mixins as default implementations an interface


## How to use

Program to an interface.

```
interface Buyer {
  price: number
  buy(): void
  negotiate(): void
}
```

Create a reusable implementation for that interface and that interface alone (Mixin)

```
const Buyer: Buyer = {
  price: 1000,
  buy() {
    console.log("buying items at #", this.price );
  },
  negotitate(price: number) {
    console.log("currently negotiating...");
    this.price = price;
  },
}
```

Define a concrete class that uses the interface/mixin

```
import use from "typescript-mix";

class Shopperholic {
  @use( Buyer ) this
}

const shopper = new Shopperholic();
shopper.buy() // buying items at #1000
shopper.negotiate(500) // currently negotiating...
shopper.price // 500
```

### What about intellisense support?
We trick typescript by using the inbuilt interface inheritance and declaration merging ability.
```
interface Shopperholic extends Buyer {}

class Shopperholic {
  @use( Buyer ) this
}
```

### Things to note about this library?
* using the 'use' decorator mutates the class prototype. This doesn't depend on inheritance (But if you use mixins correctly, you should be fine)

* mixins don't override already declared methods of fields in the concrete class using them.

* Mixins take precedence over a super class. i.e. they would override any field or method from a super class with the same name.

* instance variables/fields/properties can be declared or even initialized in your mixins but the library will throw an error if any field is initialized as an object, null or class. This is because the initialization of mixin properties/fields should primarily be the responsibility of the concrete class using it. This easily prevents unwanted bugs. In such situations when you need to define property which is not a primitive type like string, number, or function initialize it in the mixin as undefined and delegate the actal initialization of that property to the concrete class using the mixin.


## Advantages
   * Inheritance still works, (multiple inheritance still works).




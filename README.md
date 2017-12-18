# TypeScript Mix

A tweaked implementation of TypeScript's default applyMixins(...) idea using ES7 decorators. 

## Dependencies
   * TypeScript
   * ES7 Decorators
 

## Installation
```
npm install --save typescript-mix
```

## New Changes.

  * Properties on mixins are no longer considered. 
  * Classes and Object Literals can be used as mixins.


## Goals

   * Ensure programming to an interface and not just only multiple implementations.

   * Create simple mixins that implement that interface

   * Provide an intuitive and readable way of using such mixins in a concrete class.


## Why I wrote yet another Mixin Library.

The mixin pattern is somewhat a popular pattern amongst JavaScript/TypeScript devs as it gives the power of "mixin in" additional functionality to a class. The official way of using mixins as declared by Microsoft in TypeScript can be really verbose and downright unreadable.


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
  price: undefined,
  buy() {
    console.log("buying items at #", this.price );
  },
  negotitate(price: number) {
    console.log("currently negotiating...");
    this.price = price;
  },
}
```

Define another mixin this time using a Class declaration.
```
class Transportable {
  distance:number;
  transport() {
    console.log(`moved ${distance}km.`);
  }
}
```


Define a concrete class that utilizes the defined mixins.

```
import use from "typescript-mix";

class Shopperholic {
  @use( Buyer, Transportable ) this
  
  price = 2000;
  distance = 140;
}

const shopper = new Shopperholic();
shopper.buy() // buying items at #2000
shopper.negotiate(500) // currently negotiating...
shopper.price // 500
shopper.transport() // moved 140km
```

### What about intellisense support?
We trick typescript by using the inbuilt interface inheritance and declaration merging ability.
```
interface Shopperholic extends Buyer, Transportable {}

class Shopperholic {
  @use( Buyer, Transportable ) this
  
  price = 2000;
  distance = 140;
}
```

### Things to note about this library?
* using the 'use' decorator mutates the class prototype. This doesn't depend on inheritance (But if you use mixins correctly, you should be fine)

* mixins don't override already declared methods of fields in the concrete class using them.

* Mixins take precedence over a super class. i.e. they would override any field or method from a super class with the same name.

* instance variables/fields/properties can be declared or even initialized in your mixins. This is necessary if you're defining methods that depend on object or class properties but note these properties won't be mixed-in to the base class so you have to redefine or redeclare those properties in the base class using the mixin.


## Advantages
   * Inheritance still works, (multiple inheritance still works).


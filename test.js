// This can be a new blog post.

/*
 * Prototype chain in native objects.
 */

Function.prototype.constructor      === Function;
Function.__proto__                  === Function.prototype;
Function.__proto__.__proto__        === Object.prototype;
Function instanceof Function        === true;
Function instanceof Object          === true;
Function.prototype.__proto__        === Object.prototype;

Object.prototype.constructor        === Object;
Object.__proto__                    === Function.prototype;
Object.__proto__.__proto__          === Object.prototype;
Object instanceof Function          === true;
Object instanceof Object            === true;
Object.prototype.__proto__          === null;

Number.prototype.constructor        === Number;
Number.__proto__                    === Function.prototype;
Number.__proto__.__proto__          === Object.prototype;
Number instanceof Function          === true;
Number instanceof Object            === true;
Number.prototype.__proto__          === Object.prototype;

RegExp.prototype.constructor        === RegExp;
RegExp.__proto__                    === Function.prototype;
RegExp.__proto__.__proto__          === Object.prototype;
RegExp.instanceof Function          === true;
RegExp instanceof Object            === true;
RegExp.prototype.__proto__          === Object.prototype;

Date.prototype.constructor          === Date;
Date.__proto__                      === Function.prototype;
Date.__proto__.__proto__            === Object.prototype;
Date.instanceof Function            === true;
Date instanceof Object              === true;
Date.prototype.__proto__            === Object.prototype;

(function fn).prototype.constructor === fn;
(function fn).__proto__             === Function.prototype;
(function fn).__proto__.__proto__   === Object protoype;
(function fn) instanceof Function   === true;
(function fn) instanceof Object     === true;
(function fn).protoype.__proto__    === Object.prototype;

/*
 * Remarks:
 *
 * 1. the `instanceof` operator follows the __proto__ chain.
 * 2. All native JavaScript objects have a `.prototpye` property whose
 * `.constructor` points back the object itself.
 * 3. All native JavaScript object, except for `Object` object itself, have a
 * `.protptype.__proto__` that is equal to `Object.prototype`.
 * 3. the `__proto__` of any native JavaScript object is `Function.prototype`.
 */

/*
 * Now, let us test a simple inheritance model. The logic is the same.
 *
 * Just keep in mind that...
 *
 *      var target = new Destination()
 *
 * is the same as saying...
 *
 *      target.__proto__ = Destination.protoype;
 */

function Car(){}

Car.__proto__                     === Function.prototype;
Car instanceof Function           === true;
Car.prototype.constructor         === Car;

Car.prototype.__proto__           === Object.prototype;
Car.prototype instanceof Object   === true;

Car.prototype.__proto__.__proto__ === null;

function Mustang() {}

Mustang.__proto__                 === Function.prototype;
Mustang.prototype.constructor     === Mustang;
Mustang.prototype.__proto__       === Object.prototype;
Mustang instanceof Function       === true;

Mustang.prototype = new Car();

/*
 * ...was `Object.prototype`.
 */
Mustang.prototype.__proto__       === Car.prototype;
Mustang.prototype instanceof Car  === true;
Mustang.prototype.constructor     === Car;

var roadRunner = new Mustang();

roadRunner.__proto__                               === Mustang.prototype;
roadRunner.__proto__.__proto__                     === Car.prototype;
roadRunner.__proto__.__proto__.__proto__           === Object.prototype;
roadRunner.__proto__.__proto__.__proto__.__proto__ === null;
roadRunner instanceof Mustang                      === true;
roadRunner instanceof Car                          === true;
roadRunner instanceof Object;                      === true;

roadRunner.constructor === Car;

/*
 * Fixes the incorrect constructor mapping:
 */
Mustang.prototype.constructor = Mustang;

/*
 * This is more in line with the expectations.
 */
roadRunner.constructor === Mustang;

Mustang.foo = 10;

/*
 * Update to the prototype will be shared across all instances; both old,
 * and also newly-created
 */
Mustang.prototype.bar = 20;

var gonzales = new Mustang();

gonzales.foo           === undefined;
gonzales.bar           === 20;
gonzales.__proto__.bar === 20;

Mustang.prototype.bat = 30;

gonzales.bat           === 20;
gonzales.__proto__.bat === 20;



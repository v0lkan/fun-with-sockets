/* simple prototype chain */

function User() {}
User.prototype.shout = function() {};
User.prototype => [User_Prototype]
[User_Prototype].__proto__ => Object.prototype

var jack = new User();
// jack.__proto__ <= User.prototype;

// j.__proto__ == Jack.prototype 
// j.__proto__.__proto__ == Object.prototype

User
UserProto

// given
// User.__proto__ => Function.prototype;
// Function.prototype.__proto__ => Object.prototype
// Object.prototype.__proto__ => null

(function() {
    var collection = [1,2,3,4,5,6,7,8,9,10];

    function mapping(item) {
       console.log(item);

       return item;
    }

    collection.map(mapping).reverse().map(mapping);
}());

function isEven(n) { return !(n % 2); }
function isOdd(n) { return !isEven(n); }

function printFriends() {
    var buddies = ['Joe', 'Jim', 'Jack'];

    console.log(buddies);
}

/*----*/

i = 1;

console.log(i);

(function() {
    'use strict';

    var i = 12;

    function() { var j = 12; console.log(j); }

    console.log(j);
}());


(function() {

function Alien() {};

function Volkan() {}

Volkan.prototype = new Alien();

Volkan.prototype.getName = function() {
    return "Volkan Ozcelik";
};

console.log( new Volkan().getName() );





}());






















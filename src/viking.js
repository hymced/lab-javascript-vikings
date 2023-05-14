// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health
        this.strength = strength
    };
    attack() {
        return this.strength
    }
    receiveDamage(damage) {
        this.health -= damage
        // prevent negative numbers because I use a truthy if condition with it later
        // this.health = Math.max(0, this.health) // no because then won't pass spec "should make Saxon receiveDamage() equal to the strength of a Viking"
    }

}

// Viking
class Viking extends Soldier {
    constructor(name, health, strength) {
        super(health, strength) // calls the contructor of the parent, it cannot be referenced with super.constructor(), it is implicit
        this.name = name
        //return this // automatic for a constructor
    }
    // js support overriding (last method with the same name) but no native overloading (can be implemented with a generic foo() function and testing the passed arguments with the arguments keyword)
    //attack() // no need to implement, parent method is the same
    receiveDamage(damage) {
        super.receiveDamage(damage)
        // if (this.health) cannot use truthy condition because can be a neg number which are truthy 
        if (this.health > 0)
            return `${this.name} has received ${damage} points of damage`
        else
            return `${this.name} has died in act of combat`

        // nice syntax with ternary operator by pmiossec:
        // return this.health > 0
        // ? `${this.name} has received ${damage} points of damage`
        // : `${this.name} has died in act of combat`;

    }
    battleCry() {
        return "Odin Owns You All!"
    }
}

// Saxon
class Saxon extends Soldier {
    /*
    constructor(health, strength) {
        super(health, strength)
    }
    */
   // no need to call the parent constructor in this case
   // JavaScript uses prototype-based inheritance (meaning objects inherit properties and methods from their prototypes)
   // here, the constructor method is not overridden, so the constructor of the parent is called uppon instantiation
    receiveDamage(damage) {
        super.receiveDamage(damage)
        // if (this.health) // same story
        if (this.health > 0)
            return `A Saxon has received ${damage} points of damage`
        else
            return `A Saxon has died in combat`
    }
}

function getRandomInt(min, max) {
    // return Math.random() * (max - min) + min // no because min and max would have half the chance to roll
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min // this gives uniform distribution because Math.random() returns in [0; 1[, it if was [0; 1] then there would be a non-zero chance to get max + 1 (if Math.random() returned 1)
}

// War
class War {
    constructor() {
        this.vikingArmy = []
        this.saxonArmy = []
    }
    addViking(viking) {
        this.vikingArmy.push(viking)
    }
    addSaxon(saxon) {
        this.saxonArmy.push(saxon)
    }

    // >>>
    // there is no equivalent to VBA With block statements in JS
    // 4 alternatives:
    // - temp variable
    // const veryLongObjectName = {foo: "foo", bar: "bar"}
    // const o = veryLongObjectName
    // console.log(o.foo); console.log(o.bar)
    // - method chaining: this.method1().method2() but each method requires to return the this object.
    // - object destructuring:
    // const o = { a: 1, b: 2 };
    // const { a, b } = o;
    // console.log(a); // 1
    // console.log(b); // 2
    // - with statement:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with
    // DEPRECATED
    // FORBIDDEN IN STRICT MODE
    // The with statement extends the scope chain for a statement.
    // Syntax
    // with (expression)
    //     statement
    // expression
    // Adds the given expression to the scope chain used when evaluating the statement. The parentheses around the expression are required.
    // statement
    // Any statement. To execute multiple statements, use a block statement ({ ... }) to group those statements.
    // Description
    // There are two types of identifiers:
    // foo; // unqualified identifier
    // foo.bar; // bar is a qualified identifier
    // Normally, an unqualified identifier is resolved by searching the scope chain for a variable with that name, while a qualified identifier is resolved by searching the prototype chain of an object for a property with that name.
    // const foo = { bar: 1 };
    // console.log(foo.bar);
    // // foo is found in the scope chain as a variable;
    // // bar is found in foo as a property
    // One exception to this is the global object, which sits on top of the scope chain, and whose properties automatically become global variables that can be referred to without qualifiers.
    // (https://developer.mozilla.org/en-US/docs/Glossary/Global_object)
    // The with statement adds the given object to the head of this scope chain during the evaluation of its statement body.
    // >>> I think its rather the properties and methods of the objects that are added to the scope chain as variables, rather than the object...
    // Every unqualified name would first be searched within the object (through a in check) before searching in the upper scope chain.
    // Note that if the unqualified reference refers to a method of the object, the method is called with the object as its this value.
    // with ([1, 2, 3]) {
    //     console.log(toString()); // 1,2,3
    // }
    // const obj = {
    //     greeting: "Hello",
    //     sayHello: function(name) {
    //         console.log(this.greeting + " " + name);
    //     }
    // };
    // const greetFunc = obj.sayHello; // assign method to a variable
    // greetFunc("John"); // calls the method as a standalone function, the this value will not refer to the obj object anymore, but to the global object (or undefined in strict mode), resulting in unexpected behavior.
    // >>> function invoked as standalone function  --> this = the global object (non-strict mode) / undefined (strict mode)
    // >>> function invoked as method of object     --> this = the object instance
    // >>> arrow function                           --> this = the this value of the enclosing lexical scope
    // >>> global scope                             --> this = the global object (window object in browsers)
    // The object may have an @@unscopables property, which defines a list of properties that should not be added to the scope chain (for backward compatibility)
    // Reasons why with statements are not desirable:
    // ¤ Performance: The with statement forces the specified object to be searched first for all name lookups. Therefore, all identifiers that aren't members of the specified object will be found more slowly in a with block. Moreover, the optimizer cannot make any assumptions about what each unqualified identifier refers to, so it must repeat the same property lookup every time the identifier is used.
    // ¤ Readability: The with statement makes it hard for a human reader or JavaScript compiler to decide whether an unqualified name will be found along the scope chain, and if so, in which object. For example:
    // function f(x, o) {
    //     with (o) {
    //         console.log(x);
    //     }
    // }
    // If you look just at the definition of f, it's impossible to tell what the x in the with body refers to. Only when f is called can x be determined to be o.x or f's first formal parameter. If you forget to define x in the object you pass as the second parameter, you won't get an error — instead you'll just get unexpected results. It's also unclear what the actual intent of such code would be.
    // ¤ Forward compatibility: Code using with may not be forward compatible, especially when used with something other than a plain object, which may gain more properties in the future. Consider this example:
    // function f(foo, values) {
    //     with (foo) {
    //         console.log(values);
    //     }
    // }
    // If you call f([1, 2, 3], obj) in an ECMAScript 5 environment, the values reference inside the with statement will resolve to obj. However, ECMAScript 2015 introduces a values property on Array.prototype (so it will be available on every array). So, after upgrading the environment, the values reference inside the with statement resolves to [1, 2, 3].values instead, and is likely to cause bugs. In this particular example, values is defined as unscopable through Array.prototype[@@unscopables], so it still correctly resolves to the values parameter. If it were not defined as unscopable, one can see how this would be a difficult issue to debug.
    // Alternatives
    // Avoiding the with statement by destructuring properties into the current scope
    // You can usually avoid using with through property destructuring. Here we create an extra block to mimic the behavior of with creating an extra scope — but in actual usage, this block can usually be omitted.
    // let a, x, y;
    // const r = 10;
    // {
    //     const { PI, cos, sin } = Math;
    //     a = PI * r * r;
    //     x = r * cos(PI);
    //     y = r * sin(PI / 2);
    // }
    // Avoiding the with statement by using an IIFE
    // If you're producing an expression that must reuse a long-named reference multiple times, and your goal is to eliminate that lengthy name within your expression, you can wrap the expression in an IIFE and provide the long name as an argument.
    // const objectHavingAnEspeciallyLengthyName = { foo: true, bar: false };
    // if (((o) => o.foo && !o.bar)(objectHavingAnEspeciallyLengthyName)) {
    //   // code to run if condition
    // }
    // https://2ality.com/2011/06/with-statement.html
    // Introduces the properties of object as local variables in statement.
    // The braces are optional for single statements, but it is recommended to add them.
    // Its intended use is to avoid redundancy when accessing an object several times.
    // const foo = {bar: {baz: {quz: {}}}}
    // foo.bar.baz.quz._1   = 123;
    // foo.bar.baz.quz._A = "abc";
    // with(foo.bar.baz.quz) {
    //     console.log(_1) // 123
    //     console.log(_A) // "abc"
    // }
    // There is one similar case in JavaScript where the properties of an object are turned into variables and that is the global object window.
    // All of its properties are global variables and vice versa.
    // While new global variables are automatically added to window, the with statement works differently:
    // variables that are declared inside it are not added to its argument (the statement and its newly created block scope in the scope chain), but to the surrounding function, where they still exist after leaving it.
    // with({}) { var x = "abc"; } // makes x a global variable, and adds to the window object in a browser (this syntax with the optional brackets also introduces a new lexical scope)
    // console.log(x) // 'abc'
    // >>> with as the same syntax than a function ((param) {statements}) but its not: the var statement declares a function-scoped or globally-scoped variable, and it is unaffected by with scoping
    // with ({})
    //     { let a = 1 }
    // console.log(a) // Error: a is not defined
    // with ({})
    //     let a = 1 // Error: Lexical declaration cannot appear in a single-statement context
    // (function() {}()) // immediately invoked function expression (IIFE)
    // https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
    // JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.
    // 3 types of hoisting:
    // - value hoisting: being able to use a variable's value in its scope before the line it is declared 
    //   (or function hoisting: possible to call a function before its declaration) 
    //   (function, function*, async function, and async function* declarations)
    // - declaration hoisting: being able to reference a variable in its scope before the line it is declared, without throwing a ReferenceError, but the value is always undefined
    //   (only the variable declaration is hoisted to the top of the scope, but the assignment is not) (var)
    // - the declaration of the variable causes behavior changes in its scope before the line in which it is declared 
    //   (or block hoisting, introduced with ES6 block-scoped declarations)
    //   (let, const, and class declarations (also collectively called lexical declarations)
    //   Some prefer to see let, const, and class as non-hoisting, because the temporal dead zone strictly forbids any use of the variable before its declaration. 
    //   This dissent is fine, since hoisting is not a universally-agreed term. 
    //   However, the temporal dead zone can cause other observable changes in its scope, which suggests there's some form of hoisting:
    //   const x = 1;
    //   {
    //       console.log(x); // ReferenceError
    //       const x = 2;
    //   }
    //   If the const x = 2 declaration is not hoisted at all (as in, it only comes into effect when it's executed), then the console.log(x) statement should be able to read the x value from the upper scope. 
    //   However, because the const declaration still "taints" the entire scope it's defined in, the console.log(x) statement reads the x from the const x = 2 declaration instead, which is not yet initialized, and throws a ReferenceError. 
    //   Still, it may be more useful to characterize lexical declarations as non-hoisting, because from a utilitarian perspective, the hoisting of these declarations doesn't bring any meaningful features.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
    // The var statement declares a function-scoped or globally-scoped variable, optionally initializing it to a value.
    // var declarations, wherever they occur, are processed before any code is executed. This is called hoisting and is discussed further below.
    // The scope of a variable declared with var is its current execution context and closures thereof, which is either the enclosing function and functions declared within it, or, for variables declared outside any function, global. Duplicate variable declarations using var will not trigger an error, even in strict mode, and the variable will not lose its value, unless another assignment is performed.
    // Variables declared using var are created before any code is executed in a process known as hoisting. Their initial value is undefined.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    // A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
    // In other words, a closure gives you access to an outer function's scope from an inner function. 
    // In JavaScript, closures are created every time a function is created, at function creation time.
    // function outer() {
    //   let x = 10; // or var x = 10;
    //   function inner() { console.log(x); } // inner function closes over the x variable
    //   return inner;
    // }
    // let innerFn = outer();
    // innerFn(); // 10
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators
    // At a high level, an expression is a valid unit of code that resolves to a value.
    // There are two types of expressions: those that have side effects (such as assigning values) and those that purely evaluate.
    // The expression x = 7 is an example of the first type. This expression uses the = operator to assign the value seven to the variable x. The expression itself evaluates to 7.
    // The expression 3 + 4 is an example of the second type. This expression uses the + operator to add 3 and 4 together and produces a value, 7. However, if it's not eventually part of a bigger construct (for example, a variable declaration like const z = 3 + 4), its result will be immediately discarded — this is usually a programmer mistake because the evaluation doesn't produce any effects.
    // >>> const o = {}
    // >>>> o // this a a valid value expression (even if it goes out of scope immediately) and thats why the with's expression can be an object
    // >>> OTHER INTERESTING
    // Lexical Scope = Static Scoping <> Dynamic Scoping 
    // https://stackoverflow.com/questions/61552/are-there-legitimate-uses-for-javascripts-with-statement
    // https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-hoisted
    // https://stackoverflow.com/questions/3387247/in-javascript-is-chained-assignment-okay
    // https://www.borderlessengineer.com/post/how-js-works-lexical-environment
    // >>> REMINDERS
    // >>> Scope of function parameters
    // >>> When a function is called, its parameters are passed as local variables to the function's inner scope, and they exist only for the duration of the function call. 
    // >>> Once the function call is completed, the parameters are discarded and cannot be accessed. (general rule, thare are exceptions...)
    // >>> Function parameters have their own scope, and they can be named the same as variables in the outer scope without causing a naming conflict.

    vikingAttack() {
        let randomSaxon = this.saxonArmy[getRandomInt(0, this.saxonArmy.length - 1)]
        let randomViking = this.vikingArmy[getRandomInt(0, this.saxonArmy.length - 1)] 
        let result = randomSaxon.receiveDamage(randomViking.strength)
        // this.saxonArmy.forEach((saxon, index) => { this.saxonArmy.splice(index, saxon.health ? 0 : 1) }) // same story
        this.saxonArmy.forEach((saxon, index) => { this.saxonArmy.splice(index, saxon.health > 0 ? 0 : 1) })
        return result
    }
    saxonAttack() {
        let randomSaxon = this.saxonArmy[getRandomInt(0, this.saxonArmy.length - 1)]
        let randomViking = this.vikingArmy[getRandomInt(0, this.saxonArmy.length - 1)] 
        let result = randomViking.receiveDamage(randomSaxon.strength)
        this.vikingArmy.forEach((viking, index) => { this.vikingArmy.splice(index, viking.health > 0 ? 0 : 1) })
        return result
    }
    showStatus() {
        let vikingsWin = "Vikings have won the war of the century!" 
        let saxonsWin = "Saxons have fought for their lives and survived another day..." 
        let battle = "Vikings and Saxons are still in the thick of battle."
        if (this.saxonArmy.length == 0)
            return vikingsWin
        else if (this.vikingArmy.length == 0)
            return saxonsWin
        else return battle
    }
}

// quick tests
const thor = new Viking("Thor", 100, 100)
console.log(thor.receiveDamage(50))
console.log(thor.receiveDamage(50))

const saxon1 = new Saxon(100, 100)
console.log(saxon1.receiveDamage(50))
console.log(saxon1.health)

// const war = new War()
// war.addViking(thor)
// war.addSaxon(saxon1)
// console.log(war.vikingAttack()) // Thor can kill even when dead!

const harald = new Viking("Harald", 300, 150)
const saxon2 = new Saxon(60, 25)
const war = new War()
war.addViking(harald)
war.addSaxon(saxon2)
console.log(war.vikingAttack()) 
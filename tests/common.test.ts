import { Container, Injectable } from "../src/container";
import { ModifiableClass, SealedClass } from "../src/decorators";

describe('Decorators', () => {
    
    it('sealed objects should not be extensible', () => {
        const test = new SealedClass();
        expect(() => {
            (test as any)["foo"] = "bar";
        }).toThrow();
    });

    it('class hidden property added via decorator', () => {
        const sc = new SealedClass();
        const mod = new ModifiableClass(sc);
        const accessor = Object.getOwnPropertySymbols(mod).filter(sym => sym.description === "injectable")[0]
        expect((mod as any)[accessor]).toBe(true);
    })

    it('injectable is not a property in keys', () => {
        const sc = new SealedClass();
        const mod = new ModifiableClass(sc);
        const keys = Object.keys(mod);
        expect(keys).not.toContain("injectable");
    })
})

describe('Prototypes', () => {
    it('empty object prototype points to `Object.prototype`', () => {
        const blankObj = {};
        const proto = Object.getPrototypeOf(blankObj);
        expect(proto).toBe(Object.prototype);
    });

    it('prototype of `Object.prototype is null`', () => {
        expect(Object.getPrototypeOf(Object.prototype)).toBe(null);
    });

    it('when own properties are not found, prototype is searched', () => {
        const sample = {
            a: 1,
            b: 2,
            __proto__: {
                c: 3,
                __proto__: {
                    d: 4
                }
            }
        }

        expect((sample as any).c).toBe(3);
        expect((sample as any).d).toBe(4);
    });

    it('method inheritance and `this` keyword', () => {
        const parent = {
            value: 10,
            method() {
                return this.value + 1;
            }
        }

        expect(parent.method()).toBe(11); // `this` points to the same object that is parent

        const child = {
            __proto__: parent,
        }

        /*
        `this` points to the child object, but since it does not have 
        `value` property, it goes to the prototype
        */
        expect((child as any).method()).toBe(11);

        const child_2 = {
            value: 20,
            __proto__: parent,
        }

        /*
        this points to child_2 object, and it has `value` property, so it uses that
        */
        expect((child_2 as any).method()).toBe(21);
    });

    it('the constructor function is on prototype of the function', () => {
        
        function Box(this: { value: number; getValue: () => number }, value: number) {
            let self = this;
            self.value = value;
            self.getValue = function() {
                return this.value;
            }
        }

        expect(Box.prototype.constructor).toBe(Box);
    })
})

describe('Symbols', () => {
    it('should create unique symbols', () => {
        const sym1 = Symbol("foo");
        const sym2 = Symbol("foo");
        expect(sym1).not.toBe(sym2);
    });

    it('should be used as object keys', () => {
        const sym = Symbol("foo");
        const obj = {
            [sym]: "bar"
        }

        expect(obj[sym]).toBe("bar");
    });

    it('should be used to create private properties', () => {
        const sym = Symbol("foo");
        class Foo {
            [sym]: string;
            constructor(value: string) {
                this[sym] = value;
            }

            getValue() {
                return this[sym];
            }
        }

        const foo = new Foo("bar");
        expect(foo.getValue()).toBe("bar");
    });

    it('should be used to create private methods', () => {
        const sym = Symbol("foo");
        class Foo {
            [sym]: () => string;
            constructor(value: string) {
                this[sym] = () => value;
            }

            getValue() {
                return this[sym]();
            }
        }

        const foo = new Foo("bar");
        expect(foo.getValue()).toBe("bar");
    });

    it('Adding a hidden property via symbols and retreiving it via reflection', () => {
        const injectable = Symbol("injectable");
        
        class Foo {
            [injectable]: boolean;
            constructor() {
                this[injectable] = true;
            }
        }

        const foo = new Foo();
        const accessor = Object.getOwnPropertySymbols(foo)[0]
        expect((foo as any)[accessor]).toBe(true);
    })
})
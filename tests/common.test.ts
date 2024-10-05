import { SealedClass } from "../src/decorators";

describe('Decorators', () => {
    
    it('sealed objects should not be extensible', () => {
        const test = new SealedClass();
        expect(() => {
            (test as any)["foo"] = "bar";
        }).toThrow();
    });
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
import { SealedClass } from "../src/decorators";

describe('Decorator test', () => {
    
    it('sealed objects should not be extensible', () => {
        const test = new SealedClass();
        expect(() => {
            (test as any)["foo"] = "bar";
        }).toThrow();
    });
})
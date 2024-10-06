import { Injectable } from '../src/utils';

describe('Util Decorators', () => {
    it('Injectables have the correct metadata', () => {
        @Injectable()
        class TestClass {}

        const metadata = Reflect.getMetadata('injectable', TestClass);
        expect(metadata).toBe(true);
    });

    it('Injectables have the correct scope', () => {
        @Injectable('singleton')
        class TestClass {}

        const metadata = Reflect.getMetadata('scope', TestClass);
        expect(metadata).toBe('singleton');
    });
});
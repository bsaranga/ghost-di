import { Container } from "../src/container";
import { Injectable } from "../src/utils";

describe('Container', () => {
    it('empty container has a symbols based dependency array', () => {
        const container = new Container();
        const accessor = Object.getOwnPropertySymbols(container).filter(sym => sym.description === "dependencies")[0];
        const deps = container[accessor];
        expect(deps).toEqual([]);
    });

    it('register dependency if it is marked by @Injectable', () => {
        @Injectable()
        class SampleDependency {}

        const container = new Container();
        container.register(SampleDependency);

        const accessor = Object.getOwnPropertySymbols(container).filter(sym => sym.description === "dependencies")[0];
        const deps = container[accessor];
    });
})
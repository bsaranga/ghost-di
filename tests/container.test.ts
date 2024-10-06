import { Container } from "../src/container";

describe('Container', () => {
    it('empty container has a symbols based dependency array', () => {
        const container = new Container();
        const accessor = Object.getOwnPropertySymbols(container).filter(sym => sym.description === "dependencies")[0];
        const deps = container[accessor];
        expect(deps).toEqual([]);
    })  
})
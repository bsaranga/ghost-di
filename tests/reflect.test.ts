import 'reflect-metadata'

describe('Reflection tests', () => {
    it('', () => {
        class AnotherDep {
            constructor() {}
        }

        class Dep {
            constructor(private anotherDep: AnotherDep) {}
        }

        const subtypes = Reflect.getMetadata('design:paramtypes', Dep)
        console.log(subtypes)
    })
})
import 'reflect-metadata'

function Injectable(constructor: Function) {
    
}

class AnotherDep {
    constructor() {}
}

@Injectable
class Dep {
    constructor(private anotherDep: AnotherDep) {}
}

const deps = Reflect.getMetadata('design:paramtypes', Dep)
console.log(deps)
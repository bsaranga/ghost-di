import 'reflect-metadata'

function Injectable(constructor: Function) {
    console.log(constructor)
    console.log(Reflect.getMetadata('design:paramtypes', constructor))
}

class AnotherDep {
    constructor() {}
}

@Injectable
class Dep {
    constructor(private anotherDep: AnotherDep) {}
}

const dep = new Dep(new AnotherDep())
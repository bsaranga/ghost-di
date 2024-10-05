function sealed<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            Object.seal(this);
        }
    }
}

@sealed
class SealedClass {
    constructor() {

    }
}

function classModder<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            console.log(args[0])
            super(...args);
            (this as any)["foo"] = "bar";
        }
    }
}

@classModder
class ModifiableClass {
    message: SealedClass;
    constructor(message: SealedClass) {
        this.message = message;
    }
}

export { SealedClass, ModifiableClass };
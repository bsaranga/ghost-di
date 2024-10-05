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

function injectable<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            const injectable = Symbol("injectable");
            (this as any)[injectable] = true;
        }
    }
}

@injectable
class ModifiableClass {
    message: SealedClass;
    constructor(message: SealedClass) {
        this.message = message;
    }
}

export { SealedClass, ModifiableClass };
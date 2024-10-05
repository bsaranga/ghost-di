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

export default SealedClass;
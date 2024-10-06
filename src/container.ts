class Container {
    
    constructor() {
        const dep = Symbol('dependencies');
        this[dep] = {};
    }

    register(dependency: any) {
        
    }
}


export { Container };
import 'reflect-metadata';

type Scope = 'singleton' | 'transient';

function Injectable(scope: Scope = 'transient') {
    return function (constructor) {
        Reflect.defineMetadata('injectable', true, constructor);
        Reflect.defineMetadata('scope', scope, constructor);

        const deps = Reflect.getMetadata('dependency', constructor)
        console.log(Reflect.getMetadataKeys(constructor))
        console.log(deps);
    };
}

export { Injectable };
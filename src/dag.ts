type DAGNode<T> = {
    id: string;
    isRoot?: boolean;
    value: T;
}

type DAGEdge = {
    from: string;
    to: string;
}

export default class DAG<T> {
    nodes: DAGNode<T>[];
    edges: DAGEdge[];
    
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node: DAGNode<T>) {
        if (this.nodes.length === 0) {
            node.isRoot = true;
        }
        
        if (this.nodes.find(n => n.id === node.id)) {
            throw new Error(`Node with id ${node.id} already exists`);
        }

        this.nodes.push(node);
    }

    addEdge(edge: DAGEdge) {
        if (this.#isCyclic(edge)) {
            throw new Error('Cyclic dependency detected');
        }
        this.edges.push(edge);
    }

    #isCyclic(edge: DAGEdge) {
        const visited = new Set<string>();
        const recStack = new Set<string>();
        const allEdges = [...this.edges, edge];

        const dfs = (node: string) => {
            
            if (recStack.has(node)) {
                return true;
            }

            if (visited.has(node)) {
                return false;
            }

            visited.add(node);
            recStack.add(node);

            for (const currEdge of allEdges) {
                if (currEdge.from === node) {
                    if (dfs(currEdge.to)) {
                        return true;
                    }
                }
            }

            recStack.delete(node);
            return false;
        }

        return dfs(edge.from);
    }

    getAllDependencies(node: string | DAGNode<T>) {
        
        if (typeof node === 'string') {
            node = this.nodes.find(n => n.id === node)!;
        }

        const dependencies = new Set<DAGNode<T>>();
        const visited = new Set<DAGNode<T>>();

        const dfs = (node: DAGNode<T>) => {
            if (visited.has(node)) {
                return;
            }

            visited.add(node);

            for (const currEdge of this.edges) {
                if (currEdge.from === node.id) {
                    const selectedNode = this.nodes.find(n => n.id === currEdge.to);
                    dependencies.add(selectedNode!);
                    dfs(selectedNode!);
                }
            }
        }

        dfs(node);
        return Array.from(dependencies);
    }
}
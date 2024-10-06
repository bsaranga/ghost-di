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
}
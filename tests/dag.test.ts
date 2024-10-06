import DAG from "../src/dag";

describe('DAG Data Structure', () => {
    describe('Common operations', () => {
        it('The node that is pushed first is the root node', () => {
            const dag = new DAG<number>();
            dag.addNode({ id: "1", value: 1 });
            dag.addNode({ id: "2", value: 2 });
            expect(dag.nodes[0].isRoot).toBe(true);
            expect(dag.nodes[1].isRoot).toBeUndefined();
        });
    })

    describe("Cycle detection", () => {
        it('Detects self cycle', () => {
            const dag = new DAG<any>();
            dag.addNode({ id: "A", value: null });
            expect(() => dag.addEdge({ from: "A", to: "A" })).toThrow('Cyclic dependency detected');
        })

        it('Detects cyclic dependencies (2 nodes)', () => {
            const dag = new DAG<any>();
            dag.addNode({ id: "A", value: null });
            dag.addNode({ id: "B", value: null });
            dag.addEdge({ from: "A", to: "B" });
            expect(() => dag.addEdge({ from: "B", to: "A" })).toThrow('Cyclic dependency detected');
        });

        it('Detects cyclic dependencies (3 nodes)', () => {
            const dag = new DAG<any>();
            dag.addNode({ id: "A", value: null });
            dag.addNode({ id: "B", value: null });
            dag.addNode({ id: "C", value: null });
            dag.addEdge({ from: "A", to: "B" });
            dag.addEdge({ from: "A", to: "C" });
            expect(() => dag.addEdge({ from: "C", to: "A" })).toThrow('Cyclic dependency detected');
        });

        it('Detects cyclic dependencies (complex structure)', () => {
            const dag = new DAG<any>();
            dag.addNode({ id: "A", value: null });
            dag.addNode({ id: "B", value: null });
            dag.addNode({ id: "C", value: null });
            dag.addNode({ id: "D", value: null });
            dag.addNode({ id: "E", value: null });
            dag.addNode({ id: "F", value: null });
            dag.addNode({ id: "G", value: null });

            // 1st level
            dag.addEdge({ from: "A", to: "B" });
            dag.addEdge({ from: "A", to: "C" });

            // 2nd level (B)
            dag.addEdge({ from: "B", to: "D" });
            dag.addEdge({ from: "B", to: "E" });
            dag.addEdge({ from: "B", to: "F" });
            dag.addEdge({ from: "B", to: "G" });

            // 2nd level (C)
            dag.addEdge({ from: "C", to: "D" });
            dag.addEdge({ from: "C", to: "E" });
            dag.addEdge({ from: "C", to: "F" });
            dag.addEdge({ from: "C", to: "G" });

            // cycle
            expect(() => dag.addEdge({ from: "G", to: "A" })).toThrow('Cyclic dependency detected');
        });
    })
})
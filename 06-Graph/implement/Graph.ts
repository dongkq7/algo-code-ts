class Graph<T> {
  // 顶点
  vertices: T[] = []
  // 边: 邻接表
  adjList: Map<T, T[]> = new Map()

  addVertex(v: T) {
    this.vertices.push(v)
    // 添加该顶点的邻接表
    this.adjList.set(v, [])
  }

  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2)
    this.adjList.get(v2)?.push(v1)
  }

  // 打印顶点及所对应的边
  printEdges() {
    this.vertices.forEach(v => {
      console.log(`${v} -> ${this.adjList.get(v)?.join(' ')}`)
    })
  }

  // 广度优先搜索
  bfs() {
    // 存放已访问过的节点
    const visited = new Set<T>()
    // 待访问队列
    const queue: T[] = []

    queue.push(this.vertices[0])
    visited.add(this.vertices[0])

    while(queue.length) {
      const visitedNode = queue.shift()!
      console.log(visitedNode)
      // 获取该节点的相邻节点
      const neighbors = this.adjList.get(visitedNode)
      // 没有相邻节点则继续循环
      if (!neighbors) continue
      for(const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
  }
  // 深度优先搜索
  dfs() {
    const visited = new Set<T>()
    const stack: T[] = []

    visited.add(this.vertices[0])
    stack.push(this.vertices[0])

    while(stack.length) {
      const visitedNode = stack.pop()!
      console.log(visitedNode)
      const neighbors = this.adjList.get(visitedNode)

      if (!neighbors) continue
      for(let i = neighbors.length - 1; i >= 0; i--) {
        const node = neighbors[i]
        if (!visited.has(node)) {
          stack.push(node)
          visited.add(node)
        }
      }
    }
  }
}
const graph = new Graph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')
graph.addVertex('G')
graph.addVertex('H')
graph.addVertex('I')
graph.addEdge('A','B')
graph.addEdge('A','C')
graph.addEdge('A','D')
graph.addEdge('C','D')
graph.addEdge('C','G')
graph.addEdge('D','G')
graph.addEdge('D','H')
graph.addEdge('B','E')
graph.addEdge('B','F')
graph.addEdge('E','I')
// graph.printEdges()
// graph.bfs()
graph.dfs()

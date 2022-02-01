import edges from './input/input12';

const testEdges = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const biggerTestEdges = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

interface Edge {
  start: string;
  end: string;
}

const isCaveBig = (vertex: string) => {
  // A big cave is when the letters are all uppercased.
  return vertex.toUpperCase() === vertex
}

const routeHasADoubleSmallCave = (route: string[]) => {
  let count: { [key: string]: number } = {}

  for (let node of route) {
    if (!isCaveBig(node)) {
      if (count[node] === undefined) {
        count[node] = 1
      } else {
        return true
      }
    }
  }

  return false
}

const createTree = (edges: string[]) => {
  let tree: Edge[] = []

  for (let edge of edges) {
    const splitEdge = edge.split('-')
    const start = splitEdge[0]
    const end = splitEdge[1]

    // Add the normal path and the reverse path
    tree.push({ start, end })
    tree.push({ start: end, end: start })
  }

  return tree
}

const traverseTree = (tree: Edge[]) => {
  let shouldContinue = true
  let paths: string[][] = [['start']]
  let completedPaths: string[][] = []

  while (shouldContinue) {
    let nextPaths: string[][] = []
    shouldContinue = false
    
    paths.forEach((path, index) => {
      for (let edge of tree) {
        // Start from the last node and follow it in all directions it can go.
        if (edge.start === path[path.length - 1] && 
          (path.indexOf(edge.end) === -1 || // The next node wasn't traversed yet
          isCaveBig(edge.end) ||
          (edge.end !== 'start' && !routeHasADoubleSmallCave(path)))) { // or the cave is big so it can be traversed multiple times.

          const newRoute = [...path, edge.end]

          if (edge.end === 'end') {
            completedPaths.push(newRoute)
          } else {
            nextPaths.push(newRoute)
            shouldContinue = true
          }
        }
      }
    })

    paths = nextPaths
  }

  console.log(completedPaths)
  console.log(completedPaths.length)
}

const tree = createTree(edges.split('\n'))
traverseTree(tree)
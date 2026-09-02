const DIRS = {
  N: { dr: -1, dc: 0, opposite: 'S' },
  S: { dr: 1, dc: 0, opposite: 'N' },
  E: { dr: 0, dc: 1, opposite: 'W' },
  W: { dr: 0, dc: -1, opposite: 'E' },
}

function buildBlankGrid(cols, rows) {
  const grid = []
  for (let r = 0; r < rows; r += 1) {
    const row = []
    for (let c = 0; c < cols; c += 1) {
      row.push({ row: r, col: c, walls: { N: true, S: true, E: true, W: true } })
    }
    grid.push(row)
  }
  return grid
}

function unvisitedNeighbors(cell, grid, visited, cols, rows) {
  const found = []
  for (const dir of Object.keys(DIRS)) {
    const { dr, dc } = DIRS[dir]
    const nr = cell.row + dr
    const nc = cell.col + dc
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
    if (visited.has(`${nr}:${nc}`)) continue
    found.push({ dir, cell: grid[nr][nc] })
  }
  return found
}

// Recursive backtracker: guarantees a perfect maze — every cell reachable
// by exactly one path, so start and goal are always connected.
export function generateMaze(cols, rows) {
  const grid = buildBlankGrid(cols, rows)
  const visited = new Set(['0:0'])
  const stack = [grid[0][0]]

  while (stack.length > 0) {
    const current = stack[stack.length - 1]
    const options = unvisitedNeighbors(current, grid, visited, cols, rows)

    if (options.length === 0) {
      stack.pop()
      continue
    }

    const { dir, cell: next } = options[Math.floor(Math.random() * options.length)]
    current.walls[dir] = false
    next.walls[DIRS[dir].opposite] = false
    visited.add(`${next.row}:${next.col}`)
    stack.push(next)
  }

  return grid
}

export function canStep(grid, from, dir) {
  const cell = grid[from.row][from.col]
  if (cell.walls[dir]) return false
  const { dr, dc } = DIRS[dir]
  const nr = from.row + dr
  const nc = from.col + dc
  if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return false
  return { row: nr, col: nc }
}

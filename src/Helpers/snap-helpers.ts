// if within range of snapping, you best snap
export const snapTo = (parentPos: number, childPos: number, snap: number) => {
  const delta = parentPos - childPos
  if (delta < snap && delta > -snap) {
    return parentPos
  }
  return childPos
}

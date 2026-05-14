let counter = 0;
export function genId(prefix = "item") {
  return `${prefix}-${Date.now()}-${++counter}`;
}

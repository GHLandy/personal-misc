type TreeNode<T, C extends string> = T & Record<C, Array<TreeNode<T, C>>>;

export function arrayToTree<T extends object, C extends string = 'children'>(
  array: T[],
  key: keyof T = 'id' as keyof T,
  parentKey: keyof T = 'parentId' as keyof T,
  childrenKey: C = 'children' as C,
): Array<TreeNode<T, C>> {
  const map = new Map<T[keyof T], TreeNode<T, C>>();
  const roots: Array<TreeNode<T, C>> = [];

  array.forEach((item) => {
    if (map.has(item[key])) {
      console.warn(`Duplicate key detected: ${item[key]}`);
    }
    const node = {
      ...item,
      [childrenKey]: [],
    } as TreeNode<T, C>;
    map.set(node[key] as unknown as T[keyof T], node);
  });

  array.forEach((item) => {
    const node = map.get(item[key])!;
    const parentId = item[parentKey];

    if (parentId !== null && parentId !== undefined && map.has(parentId as unknown as T[keyof T])) {
      const parent = map.get(parentId as unknown as T[keyof T])!;
      parent[childrenKey].push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

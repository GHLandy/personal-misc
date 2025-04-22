import { arrayToTree } from '../ts/TreeArray';

// 使用示例
interface OrgItem {
  id: number;
  parentId: number | null;
  name: string;
}

const flatArray: OrgItem[] = [
  { id: 1, parentId: null, name: 'CEO' },
  { id: 2, parentId: 1, name: 'CTO' },
  { id: 3, parentId: 1, name: 'CFO' },
  { id: 4, parentId: 2, name: 'Frontend' },
  { id: 5, parentId: 2, name: 'Backend' },
];

const tree = arrayToTree(flatArray, 'id', 'parentId');
console.log(JSON.stringify(tree, null, 2));

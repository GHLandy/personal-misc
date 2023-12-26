/**
 * 一维数组转树形数组 (带 id, pid 键)
 * @param {object[]} array - 一维数组
 * @param {string|number} pid 初始的 pid 值 默认 '0'
 * @param {object} [config] 配置 idKey 默认 id, pidKey 默认 pid, childrenKey 默认 children
 * @param {string} [config.idKey]
 * @param {string} [config.pidKey]
 * @param {string} [config.childrenKey]
 * @return {object[]}
 */
export function array2Tree(array, pid = '0', config) {
  const { idKey = 'id', pidKey = 'pid', childrenKey = 'children' } = config || {};

  return array
    .filter((item) => item[pidKey] === pid)
    .map((item) => {
      return { ...item, [childrenKey]: array2Tree(array, item[idKey], config) };
    });
}

/**
 * 树形数组展开至一维数组
 * @param {object[]} treeArray 树形数组
 * @param {object[]} [flatArray] 默认 [] 最后组装完成的返回值
 * @param {object} [config] 配置 childrenKey 默认 children, deleteChildren 默认 true, emptyChildrenValue 默认 null
 * @param {string} [config.childrenKey]
 * @param {boolean} [config.deleteChildren]
 * @param {object[]|null} [config.emptyChildrenValue]
 * @return {object[]}
 */
export function tree2Array(treeArray, flatArray = [], config) {
  const { childrenKey = 'children', deleteChildren, emptyChildrenValue = null } = config || {};

  treeArray.forEach((item) => {
    const children =
      item[childrenKey] && item[childrenKey].length ? item[childrenKey] : emptyChildrenValue;
    if (deleteChildren !== false) {
      delete item[childrenKey];
    }
    flatArray.push(item);

    if (children && children.length) {
      return tree2Array(children, flatArray, config);
    }
  });

  return flatArray;
}

/**
 * @callback mapper
 * @param {object} data
 * @return {object}
 */

/**
 * 树形数组遍历修改
 * @param {object[]} treeArray 树形数组
 * @param {mapper} mapper 默认 data => data 修改节点的方法
 * @param {object} [config] 配置 childrenKey 默认 children, emptyChildrenValue 默认 null
 * @param {string} [config.childrenKey]
 * @param {object[]|null} [config.emptyChildrenValue]
 * @return {object[]}
 */
export function treeArrayMap(treeArray, mapper = (v) => v, config) {
  const { childrenKey = 'children', emptyChildrenValue = null } = config || {};

  /**
   * @param {object} treeNode 属性数组节点
   * @returns {object}
   */
  function localTreeMap(treeNode) {
    const hasChildren = treeNode[childrenKey] && treeNode[childrenKey].length;

    return mapper({
      ...treeNode,
      [childrenKey]: hasChildren
        ? treeNode[childrenKey].map((it) => localTreeMap(it))
        : emptyChildrenValue,
    });
  }

  const newTreeArray = treeArray.map((item) => localTreeMap(item));

  return newTreeArray;
}

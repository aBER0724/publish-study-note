---
title: "0x4_树"
published: 2025-07-21
lang: zh
tags:
   - 数据结构
   - 树
   - 二叉树
---

## 二叉树

`二叉树 (binary tree)`是一种非线性数据结构, 一分为二.

```python
class TreeNode:
    """二叉树节点类"""
    def __init__(self, val: int):
        self.val: int = val                # 节点值
        self.left: TreeNode | None = None  # 左子节点引用
        self.right: TreeNode | None = None # 右子节点引用
```

`根节点 (root node)`: 二叉树顶层的节点, 没有父节点.  
`叶节点 (leaf node)`: 没有子节点的节点, 其两个指针均指向 None.  
`边 (edge)`: 连接两个节点的线段, 即节点引用 (指针).  
`节点所在的层 (level)`: 从顶至底递增, 根节点所在层为 1 .  
`节点的度 (degree)`: 节点的子节点的数量.  在二叉树中, 度的取值范围是 `0`, `1`, `2` .  
`二叉树的高度 (height)`: 从根节点到最远叶节点所经过的边的数量.  
`节点的深度 (depth)`: 从根节点到该节点所经过的边的数量.  
`节点的高度 (height)`: 从距离该节点最远的叶节点到该节点所经过的边的数量.  

### 基本操作

#### 初始化二叉树

```python
# 初始化二叉树
# 初始化节点
n1 = TreeNode(val=1)
n2 = TreeNode(val=2)
n3 = TreeNode(val=3)
n4 = TreeNode(val=4)
n5 = TreeNode(val=5)
# 构建节点之间的引用（指针）
n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5
```

#### 插入与删除节点

```python
# 插入与删除节点
p = TreeNode(0)
# 在 n1 -> n2 中间插入节点 P
n1.left = p
p.left = n2
# 删除节点 P
n1.left = n2
```

### 常见二叉树

1. 完美二叉树 (perfect binary tree)

    > 也叫 满二叉树.

    所以节点都有左右子节点.

    若树的高度为 $h$, 则节点总数为 $2^{h+1} - 1$. 
 

2. 完全二叉树 (complete binary tree)

    除了叶节点, 所以节点都有左右子节点. 但底层节点必须, 靠左填满.

3. 完满二叉树 (full binary tree)

    除了叶节点, 所以节点都有左右子节点.

4. 平衡二叉树 (balanced binary tree)

    任意节点的左子树和右子树的高度之差的绝对值不超过 1.

### 二叉树遍历

#### 层序遍历

层序遍历 (level-order traversal): 每层按从左向右访问节点.

![](https://quickchart.io/graphviz?graph=digraph{rankdir=TB;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node6[shape=circle,label="6"];node7[shape=circle,label="7"];node1->node2;node1->node3;node2->node4;node2->node5;node3->node6;node3->node7;})

```python
def level_order(root: TreeNode | None) -> list[int]:
    """层序遍历"""
    # 初始化队列，加入根节点
    queue: deque[TreeNode] = deque()
    queue.append(root)
    # 初始化一个列表，用于保存遍历序列
    res = []
    while queue:
        node: TreeNode = queue.popleft()  # 队列出队
        res.append(node.val)  # 保存节点值
        if node.left is not None:
            queue.append(node.left)  # 左子节点入队
        if node.right is not None:
            queue.append(node.right)  # 右子节点入队
    return res
```

### 前/中/后序遍历

![](https://imgbed.aberrrrrrr.space/file/1753110866616_20250722001411573.png)

![](https://imgbed.aberrrrrrr.space/file/1753110890253_20250722001438838.png)

```python
def pre_order(root: TreeNode | None):
    """前序遍历"""
    if root is None:
        return
    # 访问优先级：根节点 -> 左子树 -> 右子树
    res.append(root.val)
    pre_order(root=root.left)
    pre_order(root=root.right)

def in_order(root: TreeNode | None):
    """中序遍历"""
    if root is None:
        return
    # 访问优先级：左子树 -> 根节点 -> 右子树
    in_order(root=root.left)
    res.append(root.val)
    in_order(root=root.right)

def post_order(root: TreeNode | None):
    """后序遍历"""
    if root is None:
        return
    # 访问优先级：左子树 -> 右子树 -> 根节点
    post_order(root=root.left)
    post_order(root=root.right)
    res.append(root.val)
```

### 二叉树的表示

在完美二叉树中, $i$ 节点左子节点索引为 $2i+1$, 右子节点索引为 $2i+2$. 若想表示任意二叉树, 则将不存在的节点记为 `None` 即可.

```python
# 完美二叉树
tree = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

# 任意二叉树
tree = [1, 2, 3, 4, None, 6, 7, 8, 9, None, None, 12, None, None, 15]
```

```python
class ArrayBinaryTree:
    """数组表示下的二叉树类"""

    def __init__(self, arr: list[int | None]):
        """构造方法"""
        self._tree = list(arr)

    def size(self):
        """列表容量"""
        return len(self._tree)

    def val(self, i: int) -> int | None:
        """获取索引为 i 节点的值"""
        # 若索引越界，则返回 None ，代表空位
        if i < 0 or i >= self.size():
            return None
        return self._tree[i]

    def left(self, i: int) -> int | None:
        """获取索引为 i 节点的左子节点的索引"""
        return 2 * i + 1

    def right(self, i: int) -> int | None:
        """获取索引为 i 节点的右子节点的索引"""
        return 2 * i + 2

    def parent(self, i: int) -> int | None:
        """获取索引为 i 节点的父节点的索引"""
        return (i - 1) // 2

    def level_order(self) -> list[int]:
        """层序遍历"""
        self.res = []
        # 直接遍历数组
        for i in range(self.size()):
            if self.val(i) is not None:
                self.res.append(self.val(i))
        return self.res

    def dfs(self, i: int, order: str):
        """深度优先遍历"""
        if self.val(i) is None:
            return
        # 前序遍历
        if order == "pre":
            self.res.append(self.val(i))
        self.dfs(self.left(i), order)
        # 中序遍历
        if order == "in":
            self.res.append(self.val(i))
        self.dfs(self.right(i), order)
        # 后序遍历
        if order == "post":
            self.res.append(self.val(i))

    def pre_order(self) -> list[int]:
        """前序遍历"""
        self.res = []
        self.dfs(0, order="pre")
        return self.res

    def in_order(self) -> list[int]:
        """中序遍历"""
        self.res = []
        self.dfs(0, order="in")
        return self.res

    def post_order(self) -> list[int]:
        """后序遍历"""
        self.res = []
        self.dfs(0, order="post")
        return self.res
```

## 二叉搜索树

任意节点都满足: 左子节点(1) < 父节点(2) < 右节点(3).

1. 查找节点

    ```python
    def search(self, num: int) -> TreeNode | None:
        """查找节点"""
        cur = self._root
        # 循环查找，越过叶节点后跳出
        while cur is not None:
            # 目标节点在 cur 的右子树中
            if cur.val < num:
                cur = cur.right
            # 目标节点在 cur 的左子树中
            elif cur.val > num:
                cur = cur.left
            # 找到目标节点，跳出循环
            else:
                break
        return cur
    ```

2. 插入节点: 大于向右, 小于向左, 有空位插空位

    ```python
    def insert(self, num: int):
        """插入节点"""
        # 若树为空，则初始化根节点
        if self._root is None:
            self._root = TreeNode(num)
            return
        # 循环查找，越过叶节点后跳出
        cur, pre = self._root, None
        while cur is not None:
            # 找到重复节点，直接返回
            if cur.val == num:
                return
            pre = cur
            # 插入位置在 cur 的右子树中
            if cur.val < num:
                cur = cur.right
            # 插入位置在 cur 的左子树中
            else:
                cur = cur.left
        # 插入节点
        node = TreeNode(num)
        if pre.val < num:
            pre.right = node
        else:
            pre.left = node
    ```

3. 删除节点

    | 节点的情况 | 策略 |
    | :---: | :---: |
    | 叶节点 | 直接删除 |
    | 只有一个子节点 | 直接替换 |
    | 有两个子节点 | 找到右子树的最小值/左子树的最大值替换|

    ```python
    def remove(self, num: int):
        """删除节点"""
        # 若树为空，直接提前返回
        if self._root is None:
            return
        # 循环查找，越过叶节点后跳出
        cur, pre = self._root, None
        while cur is not None:
            # 找到待删除节点，跳出循环
            if cur.val == num:
                break
            pre = cur
            # 待删除节点在 cur 的右子树中
            if cur.val < num:
                cur = cur.right
            # 待删除节点在 cur 的左子树中
            else:
                cur = cur.left
        # 若无待删除节点，则直接返回
        if cur is None:
            return

        # 子节点数量 = 0 or 1
        if cur.left is None or cur.right is None:
            # 当子节点数量 = 0 / 1 时， child = null / 该子节点
            child = cur.left or cur.right
            # 删除节点 cur
            if cur != self._root:
                if pre.left == cur:
                    pre.left = child
                else:
                    pre.right = child
            else:
                # 若删除节点为根节点，则重新指定根节点
                self._root = child
        # 子节点数量 = 2
        else:
            # 获取中序遍历中 cur 的下一个节点
            tmp: TreeNode = cur.right
            while tmp.left is not None:
                tmp = tmp.left
            # 递归删除节点 tmp
            self.remove(tmp.val)
            # 用 tmp 覆盖 cur
            cur.val = tmp.val
    ```

二叉搜索树的`中序遍历`就是升序排列.

二叉搜索树的查找, 插入和删除操作的复杂度都是 $O(log\ n)$.

## AVL 树

AVL 树既是二叉搜索树，也是平衡二叉树, 即平衡二叉搜索树 (balanced binary search tree).

```python
class TreeNode:
    """AVL 树节点类"""
    def __init__(self, val: int):
        self.val: int = val                 # 节点值
        self.height: int = 0                # 节点高度
        self.left: TreeNode | None = None   # 左子节点引用
        self.right: TreeNode | None = None  # 右子节点引用
    
    def height(self, node: TreeNode | None) -> int:
    """获取节点高度"""
    # 空节点高度为 -1 ，叶节点高度为 0
    if node is not None:
        return node.height
    return -1

    def update_height(self, node: TreeNode | None):
        """更新节点高度"""
        # 节点高度等于最高子树高度 + 1
        node.height = max([self.height(node.left), self.height(node.right)]) + 1

    def balance_factor(self, node: TreeNode | None) -> int:
        """获取平衡因子"""
        # 空节点平衡因子为 0
        if node is None:
            return 0
        # 节点平衡因子 = 左子树高度 - 右子树高度
        return self.height(node.left) - self.height(node.right)
```

### AVL 树旋转

旋转操作保持`二叉搜索树`的性质，也能使树重新变为`平衡二叉树`.

1. 右旋

    ![](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_right_rotate_with_grandchild.png)

    ```python
    def right_rotate(self, node: TreeNode | None) -> TreeNode | None:
        """右旋操作"""
        child = node.left
        grand_child = child.right
        # 以 child 为原点，将 node 向右旋转
        child.right = node
        node.left = grand_child
        # 更新节点高度
        self.update_height(node)
        self.update_height(child)
        # 返回旋转后子树的根节点
        return child
    ```

2. 左旋

    ![](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_left_rotate.png)

    ```python
    def left_rotate(self, node: TreeNode | None) -> TreeNode | None:
        """左旋操作"""
        child = node.right
        grand_child = child.left
        # 以 child 为原点，将 node 向左旋转
        child.left = node
        node.right = grand_child
        # 更新节点高度
        self.update_height(node)
        self.update_height(child)
        # 返回旋转后子树的根节点
        return child
    ```

3. 先左旋后右旋

    ![](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_left_right_rotate.png)

4. 先右旋后左旋

    ![](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_right_left_rotate.png)

5. 旋转的选择

    |失衡节点的平衡因子|子节点的平衡因子|应采用的旋转方法|
    |:-------------:|:-----------:|:------------:|
    |$> 1$ (左偏树)|$\geq 0$|右旋|
    |$> 1$ (左偏树)|$< 0$|先左旋后右旋|
    |$< -1$ (右偏树)|$\leq 0$|左旋|
    |$< -1$ (右偏树)|$> 0$|先右旋后左旋|

    ```python
    def rotate(self, node: TreeNode | None) -> TreeNode | None:
        """执行旋转操作，使该子树重新恢复平衡"""
        # 获取节点 node 的平衡因子
        balance_factor = self.balance_factor(node)
        # 左偏树
        if balance_factor > 1:
            if self.balance_factor(node.left) >= 0:
                # 右旋
                return self.right_rotate(node)
            else:
                # 先左旋后右旋
                node.left = self.left_rotate(node.left)
                return self.right_rotate(node)
        # 右偏树
        elif balance_factor < -1:
            if self.balance_factor(node.right) <= 0:
                # 左旋
                return self.left_rotate(node)
            else:
                # 先右旋后左旋
                node.right = self.right_rotate(node.right)
                return self.left_rotate(node)
        # 平衡树，无须旋转，直接返回
        return node
    ```

### 常用操作

1. 插入节点

    ```python
    def insert(self, val):
        """插入节点"""
        self._root = self.insert_helper(self._root, val)

    def insert_helper(self, node: TreeNode | None, val: int) -> TreeNode:
        """递归插入节点（辅助方法）"""
        if node is None:
            return TreeNode(val)
        # 1. 查找插入位置并插入节点
        if val < node.val:
            node.left = self.insert_helper(node.left, val)
        elif val > node.val:
            node.right = self.insert_helper(node.right, val)
        else:
            # 重复节点不插入，直接返回
            return node
        # 更新节点高度
        self.update_height(node)
        # 2. 执行旋转操作，使该子树重新恢复平衡
        return self.rotate(node)
    ```

2. 删除节点

    ```python
    def remove(self, val: int):
        """删除节点"""
        self._root = self.remove_helper(self._root, val)

    def remove_helper(self, node: TreeNode | None, val: int) -> TreeNode | None:
        """递归删除节点（辅助方法）"""
        if node is None:
            return None
        # 1. 查找节点并删除
        if val < node.val:
            node.left = self.remove_helper(node.left, val)
        elif val > node.val:
            node.right = self.remove_helper(node.right, val)
        else:
            if node.left is None or node.right is None:
                child = node.left or node.right
                # 子节点数量 = 0 ，直接删除 node 并返回
                if child is None:
                    return None
                # 子节点数量 = 1 ，直接删除 node
                else:
                    node = child
            else:
                # 子节点数量 = 2 ，则将中序遍历的下个节点删除，并用该节点替换当前节点
                temp = node.right
                while temp.left is not None:
                    temp = temp.left
                node.right = self.remove_helper(node.right, temp.val)
                node.val = temp.val
        # 更新节点高度
        self.update_height(node)
        # 2. 执行旋转操作，使该子树重新恢复平衡
        return self.rotate(node)
    ```
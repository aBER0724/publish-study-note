---
title: "0x5_堆"
published: 2025-07-25
lang: zh
tags:
   - 数据结构
   - 堆
---

## 堆

`堆` `heap`是一种满足特定条件的完全二叉树，主要可分为两种类型，如图 8-1 所示。

小顶堆 `min heap`: 任意节点的值 $\leq$ 其子节点的值.  
大顶堆 `max heap`:任意节点的值 $\geq$ 其子节点的值.

底层节点在其他填满层后, 靠左填充.  

`堆顶`: 根节点.  
`堆底`: 底层最靠右的节点.

### 常用操作

|方法名|描述|时间复杂度|
|:---:|:---:|:---:|
|`push()` | 元素入堆 | $O(\log n)$ |
|`pop()` | 堆顶元素出堆 | $O(\log n)$ |
|`peek()` | 访问堆顶元素 (最大/小值) | $O(1)$ |
|`size()` | 获取堆的元素数量 | $O(1)$ |
|`isEmpty()` | 判断堆是否为空 | $O(1)$|

```python
# 初始化小顶堆
min_heap, flag = [], 1
# 初始化大顶堆
max_heap, flag = [], -1

# Python 的 heapq 模块默认实现小顶堆
# 考虑将“元素取负”后再入堆，这样就可以将大小关系颠倒，从而实现大顶堆
# 在本示例中，flag = 1 时对应小顶堆，flag = -1 时对应大顶堆

# 元素入堆
heapq.heappush(max_heap, flag * 1)
heapq.heappush(max_heap, flag * 3)
heapq.heappush(max_heap, flag * 2)
heapq.heappush(max_heap, flag * 5)
heapq.heappush(max_heap, flag * 4)

# 获取堆顶元素
peek: int = flag * max_heap[0] # 5

# 堆顶元素出堆
# 出堆元素会形成一个从大到小的序列
val = flag * heapq.heappop(max_heap) # 5
val = flag * heapq.heappop(max_heap) # 4
val = flag * heapq.heappop(max_heap) # 3
val = flag * heapq.heappop(max_heap) # 2
val = flag * heapq.heappop(max_heap) # 1

# 获取堆大小
size: int = len(max_heap)

# 判断堆是否为空
is_empty: bool = not max_heap

# 输入列表并建堆
min_heap: list[int] = [1, 3, 2, 5, 4]
heapq.heapify(min_heap)
```

### 堆的实现

#### 堆的存储

与树的实现相同, 使用数组进行存储.

节点索引 $i$, 其左子节点的索引为 $2i+1$, 右子节点的索引为 $2i+2$, 父节点的索引为 $\dfrac{i-1}{2}$ (向下整除).

```python
def left(self, i: int) -> int:
    """获取左子节点的索引"""
    return 2 * i + 1

def right(self, i: int) -> int:
    """获取右子节点的索引"""
    return 2 * i + 2

def parent(self, i: int) -> int:
    """获取父节点的索引"""
    return (i - 1) // 2  # 向下整除
```

#### 元素入堆

元素入堆默认添加到堆底, 堆的大小顺序结构可能会被破坏.

`堆化` `heapify`: 重新恢复堆的结构.

入堆元素逐个与父节点比较, 若大于父节点则交换位置. 继续比较, 直到无需交换或到达根节点.

```python
def push(self, val: int):
    """元素入堆"""
    # 添加节点
    self.max_heap.append(val)
    # 从底至顶堆化
    self.sift_up(self.size() - 1)

def sift_up(self, i: int):
    """从节点 i 开始，从底至顶堆化"""
    while True:
        # 获取节点 i 的父节点
        p = self.parent(i)
        # 当“越过根节点”或“节点无须修复”时，结束堆化
        if p < 0 or self.max_heap[i] <= self.max_heap[p]:
            break
        # 交换两节点
        self.swap(i, p)
        # 循环向上堆化
        i = p
```

#### 堆顶出堆

`堆顶`与`堆底`对换, 对换后原理的`堆顶`在`堆底`出堆, 再进行`堆化`. 

新的`堆顶`与左右节点进行比较, 最大的节点与父节点进行对换. 直到无需交换或到达叶节点.

```python
def pop(self) -> int:
    """元素出堆"""
    # 判空处理
    if self.is_empty():
        raise IndexError("堆为空")
    # 交换根节点与最右叶节点（交换首元素与尾元素）
    self.swap(0, self.size() - 1)
    # 删除节点
    val = self.max_heap.pop()
    # 从顶至底堆化
    self.sift_down(0)
    # 返回堆顶元素
    return val

def sift_down(self, i: int):
    """从节点 i 开始，从顶至底堆化"""
    while True:
        # 判断节点 i, l, r 中值最大的节点，记为 ma
        l, r, ma = self.left(i), self.right(i), i
        if l < self.size() and self.max_heap[l] > self.max_heap[ma]:
            ma = l
        if r < self.size() and self.max_heap[r] > self.max_heap[ma]:
            ma = r
        # 若节点 i 最大或索引 l, r 越界，则无须继续堆化，跳出
        if ma == i:
            break
        # 交换两节点
        self.swap(i, ma)
        # 循环向下堆化
        i = ma
```

### 建堆操作

1. 入堆操作实现

    从空堆开始, 对每个元素都执行[入堆操作](0x5-heap#元素入堆).

2. 遍历堆化实现

    元素直接在原位创建堆, 再进行遍历堆化, 调整成堆的结构.

    从倒数第 $n-1$ 层的节点开始进行堆化. $i$ 层节点的堆化, 会从 $i$ 到 $n$ 层进行一次从上到下的排序.

    ```python
    def __init__(self, nums: list[int]):
        """构造方法，根据输入列表建堆"""
        # 将列表元素原封不动添加进堆
        self.max_heap = nums
        # 堆化除叶节点以外的其他所有节点
        for i in range(self.parent(self.size() - 1), -1, -1):
            self.sift_down(i)
    ```

    输入列表并建堆的时间复杂度为 $O(n)$.

### Top-k 问题

::: info Top-k 问题
给定一个长度为 $n$ 的无序数组 `nums` ，请返回数组中最大的 $k$ 个元素. 
:::

#### 方法一: 遍历选择

遍历选择, 每次选择一个最大的. 

时间复杂度为 $O(nk)$.

#### 方法二: 排序

先对数组进行排序, 再返回右侧的 $k$ 个元素.

时间复杂度为 $O(n \ log \ n)$.

#### 方法三: 堆

1. 初始化一个小顶堆, 其堆顶元素最小.
2. 先将数组的前 $k$ 个元素依次入堆.
3. 从第 $k+1$ 个元素开始, 若当前元素大于堆顶元素, 则将堆顶元素出堆, 并将当前元素入堆.
4. 遍历完成后, 堆中保存的就是最大的 $k$ 个元素.

```python
def top_k_heap(nums: list[int], k: int) -> list[int]:
    """基于堆查找数组中最大的 k 个元素"""
    # 初始化小顶堆
    heap = []
    # 将数组的前 k 个元素入堆
    for i in range(k):
        heapq.heappush(heap, nums[i])
    # 从第 k+1 个元素开始，保持堆的长度为 k
    for i in range(k, len(nums)):
        # 若当前元素大于堆顶元素，则将堆顶元素出堆、当前元素入堆
        if nums[i] > heap[0]:
            heapq.heappop(heap)
            heapq.heappush(heap, nums[i])
    return heap
```

时间复杂度为 $O(n \ log \ k)$.
> $k$ 较小时, 时间复杂度趋于 $O(n)$.  
> $k$ 较大时, 时间复杂度不会超过 $O(n \ log \ n)$.

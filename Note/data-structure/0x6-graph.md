---
title: "0x6_图"
published: 2025-07-31
lang: zh
tags:
   - 数据结构
   - 图
---

## 图

`图 Graph` 是一种非线性数据结构, 由 `顶点 vertex` 和 `边 edge` 组成.

|类型|图|说明|
|:--:|:-:|:--:|
|无向图<br />`undirected graph`|![](https://quickchart.io/graphviz?graph=graph{rankdir=LR;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node1--node2;color=gray;node1--node3;color=gray;node1--node5;color=gray;node2--node3;color=gray;node2--node4;color=gray;node2--node5;color=gray;node5--node4;color=gray;})|边没有方向.|
|有向图<br />`directed graph`|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node1->node3;color=gray;node3->node2;color=gray;node3->node1;color=gray;node5->node1;color=gray;node5->node2;color=gray;node5->node4;color=gray;node2->node4;color=gray;node4->node5;color=gray;})|边有方向.|
|连通图<br />`connected graph`|![](https://quickchart.io/graphviz?graph=graph{rankdir=LR;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node1--node2;color=gray;node1--node3;color=gray;node1--node5;color=gray;node2--node3;color=gray;node2--node4;color=gray;node2--node5;color=gray;node5--node4;color=gray;})|所有顶点皆可达.|
|非连通图<br />`disconnected graph`|![](https://quickchart.io/graphviz?graph=graph{rankdir=LR;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node1--node3;color=gray;node1--node5;color=gray;node1--node2;color=gray;node3--node2;color=gray;node5--node2;color=gray;})|存在顶点不可达.|
|有权图<br />`weighted graph`|![](https://quickchart.io/graphviz?graph=graph{rankdir=LR;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node1--node3[label="0.2",color=gray];node1--node2[label="0.5",color=gray];node1--node5[label="0.25",color=gray];node3--node2[label="0.3",color=gray];node2--node4[label="1.0",color=gray];node5--node4[label="0.88",color=gray];node5--node2[label="0.7",color=gray];})|`边`带有`权重`.<br /> `无权图` 即权重相等.|

`邻接矩阵 Adjacency Matrix`: $n \times n$ 的矩阵来表示图中边的关系.

![](https://quickchart.io/graphviz?graph=graph{rankdir=LR;node1[shape=circle,label="1"];node2[shape=circle,label="2"];node3[shape=circle,label="3"];node4[shape=circle,label="4"];node5[shape=circle,label="5"];node1--node2;color=gray;node1--node3;color=gray;node1--node5;color=gray;node2--node3;color=gray;node2--node4;color=gray;node2--node5;color=gray;node5--node4;color=gray;})

$$
\begin{bmatrix}
0 & 1 & 1 & 1 & 0 \\
1 & 0 & 1 & 0 & 0 \\
1 & 1 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 \\
0 & 0 & 1 & 1 & 0
\end{bmatrix}
$$

`matrix[i,j]` 表示 `i` 与 `j` 节点之间存在边.  
- 节点不与自己相连, 所以对角线均为`0`.  
- 使用权重来替换`0`和`1`, 即可表示`有权图`.

`邻接表`: 使用 $n$ 个链表来表示图，链表节点表示顶点. 第 $i$ 个链表对应顶点 $i$, 其中存储了该顶点的所有邻接顶点.

|顶点|顶点的所有邻接顶点|
|:-:|:-------------:|
|`1`|`2`->`3`->`5`|
|`3`|`1`->`2`|
|`2`|`1`->`3`->`5`->`4`|
|`5`|`1`->`2`->`4`|
|`4`|`2`->`5`|

### 基于邻接矩阵实现的无向图

|方法名|描述|时间复杂度|
|:---:|:---:|:---:|
|`add_edge()` | 添加边 | $O(1)$ |
|`remove_edge()` | 删除边 | $O(1)$ |
|`add_vertex()` | 添加顶点 | $O(n)$ |
|`remove_vertex()` | 删除顶点 | $O(n^2)$ |
|`__init__()` | 初始化 | 长度为 $n$ 的顶点列表: $O(n)$<br/> $n \times n$ 的顶点矩阵: $O(n^2)$|


```python
class GraphAdjMat:
    """基于邻接矩阵实现的无向图类"""

    def __init__(self, vertices: list[int], edges: list[list[int]]):
        """构造方法"""
        # 顶点列表，元素代表“顶点值”，索引代表“顶点索引”
        self.vertices: list[int] = []
        # 邻接矩阵，行列索引对应“顶点索引”
        self.adj_mat: list[list[int]] = []
        # 添加顶点
        for val in vertices:
            self.add_vertex(val)
        # 添加边
        # 请注意，edges 元素代表顶点索引，即对应 vertices 元素索引
        for e in edges:
            self.add_edge(e[0], e[1])

    def size(self) -> int:
        """获取顶点数量"""
        return len(self.vertices)

    def add_vertex(self, val: int):
        """添加顶点"""
        n = self.size()
        # 向顶点列表中添加新顶点的值
        self.vertices.append(val)
        # 在邻接矩阵中添加一行
        new_row = [0] * n
        self.adj_mat.append(new_row)
        # 在邻接矩阵中添加一列
        for row in self.adj_mat:
            row.append(0)

    def remove_vertex(self, index: int):
        """删除顶点"""
        if index >= self.size():
            raise IndexError()
        # 在顶点列表中移除索引 index 的顶点
        self.vertices.pop(index)
        # 在邻接矩阵中删除索引 index 的行
        self.adj_mat.pop(index)
        # 在邻接矩阵中删除索引 index 的列
        for row in self.adj_mat:
            row.pop(index)

    def add_edge(self, i: int, j: int):
        """添加边"""
        # 参数 i, j 对应 vertices 元素索引
        # 索引越界与相等处理
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        # 在无向图中，邻接矩阵关于主对角线对称，即满足 (i, j) == (j, i)
        self.adj_mat[i][j] = 1
        self.adj_mat[j][i] = 1

    def remove_edge(self, i: int, j: int):
        """删除边"""
        # 参数 i, j 对应 vertices 元素索引
        # 索引越界与相等处理
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        self.adj_mat[i][j] = 0
        self.adj_mat[j][i] = 0

    def print(self):
        """打印邻接矩阵"""
        print("顶点列表 =", self.vertices)
        print("邻接矩阵 =")
        print_matrix(self.adj_mat)
```

### 基于邻接表实现的无向图

|方法名|描述|时间复杂度|
|:---:|:---:|:---:|
|`add_edge()` | 添加边 | $O(1)$ |
|`remove_edge()` | 删除边 | $O(m)$ |
|`add_vertex()` | 添加顶点 | $O(1)$ |
|`remove_vertex()` | 删除顶点 | $O(n+m)$ |
|`__init__()` | 初始化 | $n+m$|

```python
class GraphAdjList:
    """基于邻接表实现的无向图类"""

    def __init__(self, edges: list[list[Vertex]]):
        """构造方法"""
        # 邻接表，key：顶点，value：该顶点的所有邻接顶点
        self.adj_list = dict[Vertex, list[Vertex]]()
        # 添加所有顶点和边
        for edge in edges:
            self.add_vertex(edge[0])
            self.add_vertex(edge[1])
            self.add_edge(edge[0], edge[1])

    def size(self) -> int:
        """获取顶点数量"""
        return len(self.adj_list)

    def add_edge(self, vet1: Vertex, vet2: Vertex):
        """添加边"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # 添加边 vet1 - vet2
        self.adj_list[vet1].append(vet2)
        self.adj_list[vet2].append(vet1)

    def remove_edge(self, vet1: Vertex, vet2: Vertex):
        """删除边"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # 删除边 vet1 - vet2
        self.adj_list[vet1].remove(vet2)
        self.adj_list[vet2].remove(vet1)

    def add_vertex(self, vet: Vertex):
        """添加顶点"""
        if vet in self.adj_list:
            return
        # 在邻接表中添加一个新链表
        self.adj_list[vet] = []

    def remove_vertex(self, vet: Vertex):
        """删除顶点"""
        if vet not in self.adj_list:
            raise ValueError()
        # 在邻接表中删除顶点 vet 对应的链表
        self.adj_list.pop(vet)
        # 遍历其他顶点的链表，删除所有包含 vet 的边
        for vertex in self.adj_list:
            if vet in self.adj_list[vertex]:
                self.adj_list[vertex].remove(vet)

    def print(self):
        """打印邻接表"""
        print("邻接表 =")
        for vertex in self.adj_list:
            tmp = [v.val for v in self.adj_list[vertex]]
            print(f"{vertex.val}: {tmp},")
```

### 图的遍历

#### 广度优先遍历 BFS

由近及远的遍历方式. 

从某个节点出发，递归访问所有邻接顶点.

时间复杂度: $O(|V|+|E|)$  
空间复杂度: $O(|V|)$

```python
def graph_bfs(graph: GraphAdjList, start_vet: Vertex) -> list[Vertex]:
    """广度优先遍历"""
    # 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
    # 顶点遍历序列
    res = []
    # 哈希集合，用于记录已被访问过的顶点
    visited = set[Vertex]([start_vet])
    # 队列用于实现 BFS
    que = deque[Vertex]([start_vet])
    # 以顶点 vet 为起点，循环直至访问完所有顶点
    while len(que) > 0:
        vet = que.popleft()  # 队首顶点出队
        res.append(vet)  # 记录访问顶点
        # 遍历该顶点的所有邻接顶点
        for adj_vet in graph.adj_list[vet]:
            if adj_vet in visited:
                continue  # 跳过已被访问的顶点
            que.append(adj_vet)  # 只入队未访问的顶点
            visited.add(adj_vet)  # 标记该顶点已被访问
    # 返回顶点遍历序列
    return res
```

#### 深度优先遍历 DFS

先走到底, 无路可走再回头. 不断向下访问, 到尽头后返回, 直到节点全部被访问, 返回出发节点, 完成遍历.

时间复杂度: $O(|V|+|E|)$  
空间复杂度: $O(|V|)$

```python
def dfs(graph: GraphAdjList, visited: set[Vertex], res: list[Vertex], vet: Vertex):
    """深度优先遍历辅助函数"""
    res.append(vet)  # 记录访问顶点
    visited.add(vet)  # 标记该顶点已被访问
    # 遍历该顶点的所有邻接顶点
    for adjVet in graph.adj_list[vet]:
        if adjVet in visited:
            continue  # 跳过已被访问的顶点
        # 递归访问邻接顶点
        dfs(graph, visited, res, adjVet)

def graph_dfs(graph: GraphAdjList, start_vet: Vertex) -> list[Vertex]:
    """深度优先遍历"""
    # 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
    # 顶点遍历序列
    res = []
    # 哈希集合，用于记录已被访问过的顶点
    visited = set[Vertex]()
    dfs(graph, visited, res, start_vet)
    return res
```
---
title: "0x2_贪心算法"
published: 2025-07-31
lang: zh
tags:
   - 算法
   - 贪心算法
---

## 贪心算法

### Dijkstra 算法

最短距离数组中每次选择一个最近的点, 将其作为下一个点, 然后重新计算从起始点经过该点到其他所有点的距离, 更新最短距离数据.  
当计算达到最远的节点后, 得到从开始节点到各个节点的最短路径.  

```python
def dijkstra(matrix, start_node):
    
    #矩阵一维数组的长度, 即节点的个数
    matrix_length = len(matrix)

    #访问过的节点数组
    used_node = [False] * matrix_length

    #最短路径距离数组
    distance = [MAX] * matrix_length

    #初始化, 将起始节点的最短路径修改成0
    distance[start_node] = 0
    
    #将访问节点中未访问的个数作为循环值, 其实也可以用个点长度代替.
    while used_node.count(False):
        min_value = float('inf')
        min_value_index = 999
        
        #在最短路径节点中找到最小值, 已经访问过的不在参与循环.
        #得到最小值下标, 每循环一次肯定有一个最小值
        for index in range(matrix_length):
            if not used_node[index] and distance[index] < min_value:
                min_value = distance[index]
                min_value_index = index

            if min_value == float("inf"):
                break
        
        #将访问节点数组对应的值修改成True, 标志其已经访问过了
        used_node[min_value_index] = True

        #更新distance数组.
        #以B点为例：distance[x] 起始点达到B点的距离, 
        #distance[min_value_index] + matrix[min_value_index][index] 是起始点经过某点达到B点的距离, 比较两个值, 取较小的那个.
        for index in range(matrix_length):
            distance[index] = min(distance[index], distance[min_value_index] + matrix[min_value_index][index])

    return distance
```

### 背包问题

:::info Question
给定 $n$ 个物品, 第 $i$ 个物品的重量为 $wgt[i-1]$, 价值为 $val[i-1]$, 和一个容量为 $cap$ 的背包。 每个物品只能选择一次, 但可以选择物品的一部分, 价值根据选择的重量比例计算, 问在限定背包容量下背包中物品的最大价值.
:::

最大化单位重量下的物品价值.

|编号|重量|价值|单位价值|
|:-:|:-:|:-:|:------:|
|$i$|$\text{wgt[i-1]}$|$\text{val[i-1]}$|$\dfrac{\text{val[i-1]}}{\text{wgt[i-1]}}$|
|2|20|120|6|
|4|40|210|5.25|
|1|10|50|5|
|3|30|150|5|
|5|50|240|4.8|

时间复杂度: $O(log \ n)$  
空间复杂度: $O(log \ n)$ 或 $O(n)$

```python
class Item:
    """物品"""

    def __init__(self, w: int, v: int):
        self.w = w  # 物品重量
        self.v = v  # 物品价值

def fractional_knapsack(wgt: list[int], val: list[int], cap: int) -> int:
    """分数背包：贪心"""
    # 创建物品列表，包含两个属性：重量、价值
    items = [Item(w, v) for w, v in zip(wgt, val)]
    # 按照单位价值 item.v / item.w 从高到低进行排序
    items.sort(key=lambda item: item.v / item.w, reverse=True)
    # 循环贪心选择
    res = 0
    for item in items:
        if item.w <= cap:
            # 若剩余容量充足，则将当前物品整个装进背包
            res += item.v
            cap -= item.w
        else:
            # 若剩余容量不足，则将当前物品的一部分装进背包
            res += (item.v / item.w) * cap
            # 已无剩余容量，因此跳出循环
            break
    return res
```
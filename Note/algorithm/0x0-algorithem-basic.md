---
title: "0x0_算法基础"
published: 2025-07-03
lang: zh
tags:
   - 算法
---

# 算法基础

## 算法效率

1. 时间效率: 运行时间长短.
2. 空间效率: 占用内存空间大小.


## 迭代与递归

### 迭代 Iteration

重复执行任务.

1. `for` 循环: 常用于已知迭代次数的情况.
2. `while` 循环: 满足循环条件继续执行.
3. 嵌套循环: 多个循环结构. 每嵌套一层时间复杂度就升一维.

### 递归 Recursion

1. 两段过程

    1. 递: 不断调用自身.
    2. 归: 从最深逐层返回.

2. 三要素

    1. 终止条件: 什么时候从`递`转`归`.
    2. 递归调用: `递`更小更简化的参数.
    3. 返回结果: `归`每层的结果.

3. 调用栈

    每次`递`都会分配新的内存, 直至函数返回后才会被释放, 所以递归通常比迭代更加耗费内存空间.

4. 尾递归

    递归调用是函数返回前的最后一个操作, 即开始返回时, 每层直接返回, 无需执行其他操作.

    > Python 默认不支持尾递归优化, 可能会栈溢出.

    ::: info Exmaple

    ```python
    def tail_recur(n, res):
      """尾递归"""
      # 终止条件
      if n == 0:
          return res
      # 尾递归调用
      return tail_recur(n - 1, res + n)
    ```

    :::

5. 递归树

    从一个调用产生了个调用分支。比如, $f(n) = f(n-1) + f(n-2)$.

    ![斐波那契数列的递归树](https://www.hello-algo.com/chapter_computational_complexity/iteration_and_recursion.assets/recursion_tree.png)

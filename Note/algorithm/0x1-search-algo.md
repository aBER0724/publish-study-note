---
title: "0x1_查找算法"
published: 2025-07-31
lang: zh
tags:
   - 算法
   - 查找算法
---

## 二分查找 Binary Search

通过有序数组的二分, 不断缩小搜索范围.

1. 时间复杂度 $O(log \ n)$

2. 代码

   ```python
   def binary_search(nums: list[int], target: int) -> int:
        """二分查找（双闭区间）"""
        # 初始化双闭区间 [0, n-1] ，即 i, j 分别指向数组首元素、尾元素
        i, j = 0, len(nums) - 1
        # 循环，当搜索区间为空时跳出（当 i > j 时为空）
        while i <= j:
           # 理论上 Python 的数字可以无限大（取决于内存大小），无须考虑大数越界问题
           m = (i + j) // 2  # 计算中点索引 m
           if nums[m] < target:
                   i = m + 1  # 此情况说明 target 在区间 [m+1, j] 中
           elif nums[m] > target:
                   j = m - 1  # 此情况说明 target 在区间 [i, m-1] 中
           else:
                   return m  # 找到目标元素，返回其索引
        return -1  # 未找到目标元素，返回 -1

    def binary_search_lcro(nums: list[int], target: int) -> int:
        """二分查找（左闭右开区间）"""
        # 初始化左闭右开区间 [0, n) ，即 i, j 分别指向数组首元素、尾元素+1
        i, j = 0, len(nums)
        # 循环，当搜索区间为空时跳出（当 i = j 时为空）
        while i < j:
            m = (i + j) // 2  # 计算中点索引 m
            if nums[m] < target:
                i = m + 1  # 此情况说明 target 在区间 [m+1, j) 中
            elif nums[m] > target:
                j = m  # 此情况说明 target 在区间 [i, m) 中
            else:
                return m  # 找到目标元素，返回其索引
        return -1  # 未找到目标元素，返回 -1
    ```
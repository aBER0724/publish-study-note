---
title: "0x0_排序算法"
published: 2025-07-03
lang: zh
tags:
   - 算法
   - 排序
---

# 排序算法

## 插入排序 Insert Sort

类似手动排序.

逐轮选择基准元素作为 `base`. `base` 依次与左侧元素比较大小.

1. 时间复杂度 $O(n^2)$: 每轮插入操作分别需要 $n-1,n-2,\dots,2,1$, 求和得到 $\frac{(n-1)n}{2}$, 即 $n^2$.

    > 输入数组完全有序时, 时间复杂度为 $O(n)$.

2. 空间复杂度 $O(1)$: 原地排序.

3. 稳定排序: 排序过程不会打乱数组.

4. 代码

    ```python
    def insert_sort(arr: list[int]):

        for i in range(1,len(arr)):
            
            base = arr[i] # 设置基准
            j = i -1
            
            while j >= 0 and arr[j] > base:
                
                arr[j+1] = arr[j] # 右移 1 位
                j -= 1

            arr[j+1] = base

        return arr

    if __name__ == "__main__":
        
        array = [4,1,3,1,5,2]
        
        print("排序前:", array)
        print("排序后:", insert_sort(array))
    ```

    输出结果

    ```plaintext
    排序前: [4, 1, 3, 1, 5, 2]
    排序后: [1, 1, 2, 3, 4, 5]
    ```

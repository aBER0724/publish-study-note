---
title: "0x0_排序算法"
published: 2025-07-03
lang: zh
tags:
   - 算法
   - 排序算法
---

## 快速排序 Quick Sort

分治策略的排序算法. 

使用`哨兵划分`寻找合适的基准值.

1. 时间复杂度 $O(n \ log \ n)$

2. 空间复杂度 $O(n)$

3. 非稳定排序: 比较后会移动数组元素.

4. 代码

    1. 哨兵划分
        1. 选取数组最左端元素作为基准数, 初始化两个指针 `i` 和 `j` 分别指向数组的两端.
        2. 循环的每轮中使用 `i`和 `j` 分别寻找第一个比基准数大和小的元素, 然后交换这两个元素.
        3. 若 `i` 和 `j`相遇, 则结束循环. 将基准数交换至分界处.

        ```python
        def partition(self, nums: list[int], left: int, right: int) -> int:
            """哨兵划分"""
            # 以 nums[left] 为基准数
            i, j = left, right
            while i < j:
                while i < j and nums[j] >= nums[left]:
                    j -= 1  # 从右向左找首个小于基准数的元素
                while i < j and nums[i] <= nums[left]:
                    i += 1  # 从左向右找首个大于基准数的元素
                # 元素交换
                nums[i], nums[j] = nums[j], nums[i]
            # 将基准数交换至两子数组的分界线
            nums[i], nums[left] = nums[left], nums[i]
            return i  # 返回基准数的索引
        ```

    2. 快速排序

        递归执行`哨兵划分`.

        ``` python
        def quick_sort(self, nums: list[int], left: int, right: int):
            """快速排序"""
            # 子数组长度为 1 时终止递归
            if left >= right:
                return
            # 哨兵划分
            pivot = self.partition(nums, left, right)
            # 递归左子数组、右子数组
            self.quick_sort(nums, left, pivot - 1)
            self.quick_sort(nums, pivot + 1, right)
        ```

## 堆排序 Heap Sort

堆本身就有大小排序. 所以可以通过`建堆`和`出堆`的操作获得排序.

1. 时间复杂度 $O(n \ log \ n)$

2. 空间复杂度 $O(1)$

3. 非稳定排序: 数组元素位置会变化.

4. 代码

    ```python
    def sift_down(nums: list[int], n: int, i: int):
        """堆的长度为 n ，从节点 i 开始，从顶至底堆化"""
        while True:
            # 判断节点 i, l, r 中值最大的节点，记为 ma
            l = 2 * i + 1
            r = 2 * i + 2
            ma = i
            if l < n and nums[l] > nums[ma]:
                ma = l
            if r < n and nums[r] > nums[ma]:
                ma = r
            # 若节点 i 最大或索引 l, r 越界，则无须继续堆化，跳出
            if ma == i:
                break
            # 交换两节点
            nums[i], nums[ma] = nums[ma], nums[i]
            # 循环向下堆化
            i = ma

    def heap_sort(nums: list[int]):
        """堆排序"""
        # 建堆操作：堆化除叶节点以外的其他所有节点
        for i in range(len(nums) // 2 - 1, -1, -1):
            sift_down(nums, len(nums), i)
        # 从堆中提取最大元素，循环 n-1 轮
        for i in range(len(nums) - 1, 0, -1):
            # 交换根节点与最右叶节点（交换首元素与尾元素）
            nums[0], nums[i] = nums[i], nums[0]
            # 以根节点为起点，从顶至底进行堆化
            sift_down(nums, i, 0)
    ```

## 归并排序 Merge Sort

分治策略的排序算法. 

`划分阶段`: 不断 2 分.
`合并阶段`: 数组长度为 1, 开始合并.

将数组拆分成最小的子数组(数组长度为 1)后, 再短数组开始, 比较一一对比相同索引位置的元素, 排序后合并短数组.

1. 时间复杂度 $O(n \ log \ n)$

2. 空间复杂度 $O(n)$

3. 稳定排序

4. 代码

    ```python
    def merge(nums: list[int], left: int, mid: int, right: int):
        """合并左子数组和右子数组"""
        # 左子数组区间为 [left, mid], 右子数组区间为 [mid+1, right]
        # 创建一个临时数组 tmp ，用于存放合并后的结果
        tmp = [0] * (right - left + 1)
        # 初始化左子数组和右子数组的起始索引
        i, j, k = left, mid + 1, 0
        # 当左右子数组都还有元素时，进行比较并将较小的元素复制到临时数组中
        while i <= mid and j <= right:
            if nums[i] <= nums[j]:
                tmp[k] = nums[i]
                i += 1
            else:
                tmp[k] = nums[j]
                j += 1
            k += 1
        # 将左子数组和右子数组的剩余元素复制到临时数组中
        while i <= mid:
            tmp[k] = nums[i]
            i += 1
            k += 1
        while j <= right:
            tmp[k] = nums[j]
            j += 1
            k += 1
        # 将临时数组 tmp 中的元素复制回原数组 nums 的对应区间
        for k in range(0, len(tmp)):
            nums[left + k] = tmp[k]

    def merge_sort(nums: list[int], left: int, right: int):
        """归并排序"""
        # 终止条件
        if left >= right:
            return  # 当子数组长度为 1 时终止递归
        # 划分阶段
        mid = (left + right) // 2 # 计算中点
        merge_sort(nums, left, mid)  # 递归左子数组
        merge_sort(nums, mid + 1, right)  # 递归右子数组
        # 合并阶段
        merge(nums, left, mid, right)
    ```

## 冒泡排序 Bubble Sort

从数组最左端开始向右遍历, 依次比较相邻元素大小, 如果`左元素` > `右元素`就交换.  
遍历完成后, 最大的元素会被移动到数组的最右端.

1. 时间复杂度 $O(n^2)$

2. 空间复杂度 $O(1)$

3. 稳定排序

4. 代码

    ```python
    def bubble_sort(nums: list[int]):
        """冒泡排序"""
        n = len(nums)
        # 外循环：未排序区间为 [0, i]
        for i in range(n - 1, 0, -1):
            # 内循环：将未排序区间 [0, i] 中的最大元素交换至该区间的最右端
            for j in range(i):
                if nums[j] > nums[j + 1]:
                    # 交换 nums[j] 与 nums[j + 1]
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]

    def bubble_sort_with_flag(nums: list[int]):
        """冒泡排序（标志优化）"""
        n = len(nums)
        # 外循环：未排序区间为 [0, i]
        for i in range(n - 1, 0, -1):
            flag = False  # 初始化标志位
            # 内循环：将未排序区间 [0, i] 中的最大元素交换至该区间的最右端
            for j in range(i):
                if nums[j] > nums[j + 1]:
                    # 交换 nums[j] 与 nums[j + 1]
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
                    flag = True  # 记录交换元素
            if not flag:
                break  # 此轮“冒泡”未交换任何元素，直接跳出
    ```

## 插入排序 Insert Sort

类似手动排序.

逐轮选择基准元素作为 `base`. `base` 依次与左侧元素比较大小.

1. 时间复杂度 $O(n^2)$: 每轮插入操作分别需要 $n-1,n-2,\dots,2,1$, 求和得到 $\dfrac{(n-1)n}{2}$, 即 $n^2$.

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
    ```

## 基数排序 Radix Sort

逐个位数进行大小排序.

1. 时间复杂度 $O(nk)$

2. 空间复杂度 $O(n+d)$

> `k`: 最大位数  
> `d`: 进制, 10 进制, 2 进制,...

3. 稳定排序

4. 代码 

    ```python
    def digit(num: int, exp: int) -> int:
        """获取元素 num 的第 k 位，其中 exp = 10^(k-1)"""
        # 传入 exp 而非 k 可以避免在此重复执行昂贵的次方计算
        return (num // exp) % 10

    def counting_sort_digit(nums: list[int], exp: int):
        """计数排序（根据 nums 第 k 位排序）"""
        # 十进制的位范围为 0~9 ，因此需要长度为 10 的桶数组
        counter = [0] * 10
        n = len(nums)
        # 统计 0~9 各数字的出现次数
        for i in range(n):
            d = digit(nums[i], exp)  # 获取 nums[i] 第 k 位，记为 d
            counter[d] += 1  # 统计数字 d 的出现次数
        # 求前缀和，将“出现个数”转换为“数组索引”
        for i in range(1, 10):
            counter[i] += counter[i - 1]
        # 倒序遍历，根据桶内统计结果，将各元素填入 res
        res = [0] * n
        for i in range(n - 1, -1, -1):
            d = digit(nums[i], exp)
            j = counter[d] - 1  # 获取 d 在数组中的索引 j
            res[j] = nums[i]  # 将当前元素填入索引 j
            counter[d] -= 1  # 将 d 的数量减 1
        # 使用结果覆盖原数组 nums
        for i in range(n):
            nums[i] = res[i]

    def radix_sort(nums: list[int]):
        """基数排序"""
        # 获取数组的最大元素，用于判断最大位数
        m = max(nums)
        # 按照从低位到高位的顺序遍历
        exp = 1
        while exp <= m:
            # 对数组元素的第 k 位执行计数排序
            # k = 1 -> exp = 1
            # k = 2 -> exp = 10
            # 即 exp = 10^(k-1)
            counting_sort_digit(nums, exp)
            exp *= 10
    ```
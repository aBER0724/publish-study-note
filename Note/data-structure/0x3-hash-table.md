---
title: "0x3_哈希表"
published: 2025-07-21
lang: zh
tags:
   - 数据结构
   - 哈希表
---

## 哈希表

通过 `key` 和 `vulue` 进行映射.

哈希表中进行增删查改的时间复杂度都是 $O(1)$.

### 常用操作

初始化、查询操作、添加键值对和删除键值对等.

```python
# 初始化哈希表
hmap: dict = {}

# 添加操作
# 在哈希表中添加键值对 (key, value)
hmap[12836] = "小哈"
hmap[15937] = "小啰"
hmap[16750] = "小算"
hmap[13276] = "小法"
hmap[10583] = "小鸭"

# 查询操作
# 向哈希表中输入键 key ，得到值 value
name: str = hmap[15937]

# 删除操作
# 在哈希表中删除键值对 (key, value)
hmap.pop(10583)
```

哈希表遍历方式: 遍历键值对、遍历键和遍历值.

```python
# 遍历哈希表
# 遍历键值对 key->value
for key, value in hmap.items():
    print(key, "->", value)
# 单独遍历键 key
for key in hmap.keys():
    print(key)
# 单独遍历值 value
for value in hmap.values():
    print(value)
```

### 基于数组简单实现

$index = hash(key) \ \% \ capacity$

这里使用的哈希函数就是对 `数组长度` 取模.

```python
class Pair:
    """键值对"""

    def __init__(self, key: int, val: str):
        self.key = key
        self.val = val

class ArrayHashMap:
    """基于数组实现的哈希表"""

    def __init__(self):
        """构造方法"""
        # 初始化数组，包含 100 个桶
        self.buckets: list[Pair | None] = [None] * 100

    def hash_func(self, key: int) -> int:
        """哈希函数"""
        index = key % 100
        return index

    def get(self, key: int) -> str:
        """查询操作"""
        index: int = self.hash_func(key)
        pair: Pair = self.buckets[index]
        if pair is None:
            return None
        return pair.val

    def put(self, key: int, val: str):
        """添加操作"""
        pair = Pair(key, val)
        index: int = self.hash_func(key)
        self.buckets[index] = pair

    def remove(self, key: int):
        """删除操作"""
        index: int = self.hash_func(key)
        # 置为 None ，代表删除
        self.buckets[index] = None

    def entry_set(self) -> list[Pair]:
        """获取所有键值对"""
        result: list[Pair] = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair)
        return result

    def key_set(self) -> list[int]:
        """获取所有键"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.key)
        return result

    def value_set(self) -> list[str]:
        """获取所有值"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.val)
        return result

    def print(self):
        """打印哈希表"""
        for pair in self.buckets:
            if pair is not None:
                print(pair.key, "->", pair.val)
```

### 哈希冲突与扩容

当输入空间大于输出空间时，　就容易发生哈希冲突 (hash collision), 即哈希值相同.

通过扩容哈希表即可解决这个问题, 但是扩容需要一定的计算开销, 不可以频繁的进行扩容.  
通过`负载因子 (laod factor)` 进行衡量哈希冲突的严重程度. 

$负载因子 \alpha = \dfrac{哈希表中元素的数量 (n)}{哈希表的总槽位数 (m)}$
> 比如当负载因子大于 0.75 时, 就进行扩容操作.

## 哈希冲突

### 链式地址

之前一个哈希值只能存储一个键值对. 使用 `链式地址 (separate chaining)`, 将单个元素转换成链表. 链表中存储发生哈希冲突的元素, 即哈希值相同的元素.

查找元素时, 先计算哈希值 `hash(key)`, 找到链表, 再在链表值比对 `key`.  
插入和删除的操作和链表一样.  

因为链表需要存储指针信息, 所以消耗了更多的空间. 在链表中查询时, 也需要进行线性查找.

```python
class HashMapChaining:
    """链式地址哈希表"""

    def __init__(self):
        """构造方法"""
        self.size = 0  # 键值对数量
        self.capacity = 4  # 哈希表容量
        self.load_thres = 2.0 / 3.0  # 触发扩容的负载因子阈值
        self.extend_ratio = 2  # 扩容倍数
        self.buckets = [[] for _ in range(self.capacity)]  # 桶数组

    def hash_func(self, key: int) -> int:
        """哈希函数"""
        return key % self.capacity

    def load_factor(self) -> float:
        """负载因子"""
        return self.size / self.capacity

    def get(self, key: int) -> str | None:
        """查询操作"""
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # 遍历桶，若找到 key ，则返回对应 val
        for pair in bucket:
            if pair.key == key:
                return pair.val
        # 若未找到 key ，则返回 None
        return None

    def put(self, key: int, val: str):
        """添加操作"""
        # 当负载因子超过阈值时，执行扩容
        if self.load_factor() > self.load_thres:
            self.extend()
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # 遍历桶，若遇到指定 key ，则更新对应 val 并返回
        for pair in bucket:
            if pair.key == key:
                pair.val = val
                return
        # 若无该 key ，则将键值对添加至尾部
        pair = Pair(key, val)
        bucket.append(pair)
        self.size += 1

    def remove(self, key: int):
        """删除操作"""
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # 遍历桶，从中删除键值对
        for pair in bucket:
            if pair.key == key:
                bucket.remove(pair)
                self.size -= 1
                break

    def extend(self):
        """扩容哈希表"""
        # 暂存原哈希表
        buckets = self.buckets
        # 初始化扩容后的新哈希表
        self.capacity *= self.extend_ratio
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
        # 将键值对从原哈希表搬运至新哈希表
        for bucket in buckets:
            for pair in bucket:
                self.put(pair.key, pair.val)

    def print(self):
        """打印哈希表"""
        for bucket in self.buckets:
            res = []
            for pair in bucket:
                res.append(str(pair.key) + " -> " + pair.val)
            print(res)
```

### 开放寻址

`开放寻址 (open addressing)` 是通过使用不同的方式来寻找空位存储.

#### 线性探测

如果发生哈希冲突, 那就按步长为 1, 向后继续寻找空位.

查找元素时, 也按步长为 1 向后寻找. 如果存在空位, 则元素不存在.

如果哈希冲突严重, 容易出现聚集现象, 发生冲突的元素都一直往后顺延, 就会占用其他的位置 (比如原来没有发生冲突, 位置却被占用了), 导致恶性循环.

在这个机制下, 不能直接删除元素. 因为删除元素会产生空位, 当查询其他元素时, 遇到空位, 也就不再继续向后查询了, 误认为元素不存在.

所以采用`懒删除 (lazy deletion)`. 懒删除不直接删除元素, 使用 `TOMESTONE` 来标记. `TONESTONE` 和 `NONE` 一样表示空位, 但在查询时, 遇到 `TONESTONE` 会继续查询.  
在遇到第一个 `TONESTONE` 之后标记位置, 将之后查找到的元素调换位置. 这样可以优化查询效率.

```python
class HashMapOpenAddressing:
    """开放寻址哈希表"""

    def __init__(self):
        """构造方法"""
        self.size = 0  # 键值对数量
        self.capacity = 4  # 哈希表容量
        self.load_thres = 2.0 / 3.0  # 触发扩容的负载因子阈值
        self.extend_ratio = 2  # 扩容倍数
        self.buckets: list[Pair | None] = [None] * self.capacity  # 桶数组
        self.TOMBSTONE = Pair(-1, "-1")  # 删除标记

    def hash_func(self, key: int) -> int:
        """哈希函数"""
        return key % self.capacity

    def load_factor(self) -> float:
        """负载因子"""
        return self.size / self.capacity

    def find_bucket(self, key: int) -> int:
        """搜索 key 对应的桶索引"""
        index = self.hash_func(key)
        first_tombstone = -1
        # 线性探测，当遇到空桶时跳出
        while self.buckets[index] is not None:
            # 若遇到 key ，返回对应的桶索引
            if self.buckets[index].key == key:
                # 若之前遇到了删除标记，则将键值对移动至该索引处
                if first_tombstone != -1:
                    self.buckets[first_tombstone] = self.buckets[index]
                    self.buckets[index] = self.TOMBSTONE
                    return first_tombstone  # 返回移动后的桶索引
                return index  # 返回桶索引
            # 记录遇到的首个删除标记
            if first_tombstone == -1 and self.buckets[index] is self.TOMBSTONE:
                first_tombstone = index
            # 计算桶索引，越过尾部则返回头部
            index = (index + 1) % self.capacity
        # 若 key 不存在，则返回添加点的索引
        return index if first_tombstone == -1 else first_tombstone

    def get(self, key: int) -> str:
        """查询操作"""
        # 搜索 key 对应的桶索引
        index = self.find_bucket(key)
        # 若找到键值对，则返回对应 val
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            return self.buckets[index].val
        # 若键值对不存在，则返回 None
        return None

    def put(self, key: int, val: str):
        """添加操作"""
        # 当负载因子超过阈值时，执行扩容
        if self.load_factor() > self.load_thres:
            self.extend()
        # 搜索 key 对应的桶索引
        index = self.find_bucket(key)
        # 若找到键值对，则覆盖 val 并返回
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            self.buckets[index].val = val
            return
        # 若键值对不存在，则添加该键值对
        self.buckets[index] = Pair(key, val)
        self.size += 1

    def remove(self, key: int):
        """删除操作"""
        # 搜索 key 对应的桶索引
        index = self.find_bucket(key)
        # 若找到键值对，则用删除标记覆盖它
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            self.buckets[index] = self.TOMBSTONE
            self.size -= 1

    def extend(self):
        """扩容哈希表"""
        # 暂存原哈希表
        buckets_tmp = self.buckets
        # 初始化扩容后的新哈希表
        self.capacity *= self.extend_ratio
        self.buckets = [None] * self.capacity
        self.size = 0
        # 将键值对从原哈希表搬运至新哈希表
        for pair in buckets_tmp:
            if pair not in [None, self.TOMBSTONE]:
                self.put(pair.key, pair.val)

    def print(self):
        """打印哈希表"""
        for pair in self.buckets:
            if pair is None:
                print("None")
            elif pair is self.TOMBSTONE:
                print("TOMBSTONE")
            else:
                print(pair.key, "->", pair.val)
```

#### 平方探测

与线性探测机制相同, 但步长采用平方的形式, 即 1,4,9,...

这样可以缓解聚集现象, 也能使数据分布的更均匀.

#### 多次哈希

多次哈希方法使用多个哈希函数进行探测. 如果使用 $hash_1()$ 发生了冲突, 那就需要 $hash_2()$ 来帮助计算哈希值, 比如 $index = (hash_1(key) + i * hash_2(key)) \ \% \ m$.

## 哈希算法

### 目标

1. 确定性: 对于相同的输入, 哈希算法应始终产生相同的输出.
2. 效率高: 计算哈希值的过程应该足够快. 计算开销越小, 哈希表的实用性越高. 
3. 均匀分布: 分布越均匀, 哈希冲突的概率就越低. 

安全特性: 

1. 单向性: 无法通过哈希值反推出关于输入数据的任何信息.
2. 抗碰撞性: 应当极难找到两个不同的输入, 使得它们的哈希值相同.
3. 雪崩效应: 微小变化就会导致输出的显著且不可预测的变化.

### 哈希算法逻辑

1. 加法哈希: 对输入的每个字符的 ASCII 码进行相加, 将得到的总和作为哈希值. 
    ```python
    def add_hash(key: str) -> int:
        """加法哈希"""
        hash = 0
        modulus = 1000000007
        for c in key:
            hash += ord(c)
        return hash % modulus
    ```
2. 乘法哈希: 利用乘法的不相关性, 每轮乘以一个常数, 将各个字符的 ASCII 码累积到哈希值中. 
    ```python
    def mul_hash(key: str) -> int:
        """乘法哈希"""
        hash = 0
        modulus = 1000000007
        for c in key:
            hash = 31 * hash + ord(c)
        return hash % modulus
    ```
3. 异或哈希: 将输入数据的每个元素通过异或操作累积到一个哈希值中. 
    ```python
    def xor_hash(key: str) -> int:
        """异或哈希"""
        hash = 0
        modulus = 1000000007
        for c in key:
            hash ^= ord(c)
        return hash % modulus
    ```
4. 旋转哈希: 将每个字符的 ASCII 码累积到一个哈希值中, 每次累积之前都会对哈希值进行旋转操作. 
    ```python
    def rot_hash(key: str) -> int:
        """旋转哈希"""
        hash = 0
        modulus = 1000000007
        for c in key:
            hash = (hash << 4) ^ (hash >> 28) ^ ord(c)
        return hash % modulus
    ```

> 对大质数 1000000007 取模, 是为了保证哈希值的均匀分布, 减少周期性重复.

### 常见哈希算法

| | MD5 | SHA-1 | SHA-2 | SHA-3 |
|:---:|:---:|:---:|:---:|:---:|
| 输出长度 | 128 bit | 160 bit | 256/512 bit | 224/256/384/512 bit |
| 哈希冲突 | 较多 | 较多 | 很少 | 很少 |
| 安全等级 | 低, 已被成功攻击 | 低, 已被成功攻击 | 高 | 高 |
| 应用 | 已被弃用, 仍用于数据完整性检查 | 已被弃用 | 加密货币交易验证、数字签名等 | 可用于替代 SHA-2 |
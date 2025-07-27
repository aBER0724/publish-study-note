---
title: 0x1_进程与线程
published: 2025-07-27
lang: zh
subject: 操作系统
tags:
  - 操作系统
  - 进程
  - 线程
---

## 进程与线程

### 生产者-消费者问题

`生产者`生产商品到`缓冲区`.  
`消费者`从`缓冲区`中取商品.

`缓冲区`满了, `生产者`停止生产.  
`缓冲区`为空, `消费者`无法取商品.

```python
# mutex: 互斥缓冲区锁, empty: 缓冲区空位, full: 缓冲区产品数量
semaphore mutex = 1, empty = n, full = 0

def producer():
    while(TRUE):
        Produce() # 生产一个产品
        P(empty) # 缓冲区是否为空
        P(mutex) # 缓冲区上锁
        Add() # 产品添加到缓冲区
        V(mutex) # 缓冲区上解锁
        V(full) # 产品数量+1

def consumer():
    while(TRUE):
        P(full) # 缓冲区是否有产品
        P(mutex) # 缓冲区上锁
        Consume() # 购买一个产品
        V(mutex) # 缓冲区上解锁
        V(empty) # 缓冲区空位+1
```

### 读者-写者问题

`写者`写`文章`  
`读者`读`文章`

`读者`读的时候, `写者`不能`写`.  
`写者`写的时候, `读者`不能`读`.  

```python
# rmutex: 读互斥缓冲区锁, wmutex: 写互斥缓冲区锁
semaphore rmutex = 1, wmutex = 1
# 读进程数量
int readcount = 0

def reader():
    while(TRUE):
        P(rmutex) # 读操作上锁, 避免 readcount 修改

        if readcount == 0: # 如果为第一个读者, 则禁止写操作
            P(wmutex) # 写操作上锁
        
        readcount++ # 读者数+1

        V(rmutex) # 允许其他用户读操作

        Read() # 读操作

        P(rmutex) # 读操作上锁, 避免 readcount 修改

        readcount-- # 读者数-1

        if readcount == 0: # 如果为最后一个读者, 则允许写操作
            V(wmutex) # 写操作解锁
            V(rmutex) # 读操作解锁

def writer():
    while(TRUE):
        P(wmutex) # 写操作上锁

        Write() # 写操作

        V(wmutex) # 写操作解锁
```

### 哲学家问题

5 个哲学家, 5 双筷子.  
哲学家需要左右两双筷子才能吃饭.

```python
semaphore chopsticks[5] = [1,1,1,1,1]
semaphore mutex = 1

def philosopher(int i):
    while(TRUE):
        Think()

        P(mutex) # 进入临界区

        # 在持有mutex锁期间，完成两根筷子的获取
        P(chopsticks[i])
        P(chopsticks[(i + 1) % 5])

        V(mutex) # 获得两根筷子后，立刻释放mutex锁

        Eat() # 其他哲学家现在可以去尝试获取筷子了

        # 吃完后归还筷子
        V(chopsticks[i])
        V(chopsticks[(i + 1) % 5])
```

### 银行家算法

Dijkstra 的银行家算法

`最大需求矩阵 Max`: 每个进程需要的所有资源.  
`分配矩阵 Allocation`: 当前已经分配给进程的资源.  
`系统可用资源向量 Available`: 当前可分配的资源.  
`需求矩阵 Need`: 除了分配矩阵中的资源外, 还需要的资源.  
> Need = Max - Allocation

| 进程 (Process) | Max (A B C) | Allocation (A B C) | Need (A B C)  |
| :------------: | :---------: | :----------------: | :----------: |
|       P₀       |    7 5 3    |       0 1 0        |    7 4 3     |
|       P₁       |    3 2 2    |       2 0 0        |    1 2 2     |
|       P₂       |    9 0 2    |       3 0 2        |    6 0 0     |
|       P₃       |    2 2 2    |       2 1 1        |    0 1 1     |
|       P₄       |    4 3 3    |       0 0 2        |    4 3 1     |

`安全状态`: 从某一时刻开始, 系统中可用资源可以满足所有进程顺利完成 (不出现死锁).

若在某一时刻, 进程提出额外需要的资源. 则先假设新的需求进行分配, 若这样系统是安全的 (满足安全状态), 则可以分配新提出的资源.
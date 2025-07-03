---
title: 0x0_基础知识
published: 2025-05-08
lang: zh
subject: 形式语言与自动机
tags:
  - 形式语言与自动机
description: 形式语言理论与自动机原理
keywords:
  - 形式语言与自动机
  - 形式语言
  - 自动机
  - 编译原理
  - 基础知识
---

### 字母表

符号(字符) 的非空有穷集.  

> $\Sigma_{1} = \{ 0,1 \}$  
> $\Sigma_{2} = \{a,b,\dots,z \}$  
> $\Sigma_{3} = \{x | x 是一个汉字\}$  

### 字符串

由字母表中符号组成的**有穷序列**.  

> $\Sigma_{1} = \{ 0,1 \}$, `0`, `1`, `00`, `111011` 均为 $\Sigma_{1}$ 上的字符串.  
> $\Sigma_{2} = \{a,b,\dots,z \}$, `ab`, `adz` 均为 $\Sigma_{2}$ 上的字符串.  

### 空串  

$\epsilon$, 0 个字符的串.  

> 字母表 $\Sigma$ 可以是任意的, $\epsilon$ 不是一个字符, 所以 $\epsilon \notin \Sigma$.  
> 单个字符既是字符, 也是字符串. $a \in \Sigma$.  

### 符号表示  

 1. 字母表:  $Sigma \ \Sigma$, $Gamma \ \Gamma$  
 2. 字符: $a,b,\dots$  
 3. 字符串: $\dots, w, x, y, z$  
 4. 集合: $A,B,C,\dots$  

### 字符串长度  

字符串中符号所占位置的个数, 记为 $| \cdot|$.  

### 字符串的连接

将首尾相接得到新字符串的运算, 记为 $x \cdot y$ 或 $xy$.  

> 连接运算是有顺序的, $xy \neq yx$.  
> 对于任意的字符串, $\epsilon \cdot x = x \cdot \epsilon$.  

### 字符串 $x$ 的 $n$ 次幂 ($n \geq 0$)  

递归定义为:  
$$
x^n =  
\begin{cases}  
\epsilon, & n = 0 \\  
x^{n-1} x, & n > 0 \\
\end{cases}
$$

> $(ba)^2 = (ba)^1ba = (ba)^0baba = \epsilon baba = baba$  
> $b a^2 = b a^1 a = b a^0 aa = b \epsilon aa = baa$  

### 集合的连接

$A$ 和 $B$ 的连接, 记为 $AB$, 定义为:
$$AB = \{ w | w = xy, x \in A \ \& \ y \in B \}$$

### 集合 $A$ 的 $n$ 次幂($n \geq 0$)  

递归定义为:  
$$
A^n =
\begin{cases}
\{ \epsilon \}, & n = 0 \\
A^{n-1} A, & n \geq 1 \\
\end{cases}
$$

> $\Sigma^0 = \{ \epsilon \}$  
> $\Sigma^1 = \{ 0,1 \}$  
> $\Sigma^2 = \{ 00,01,10,11 \}$  

### 克林闭包 Kleene Closure  

$$\Sigma^* = \bigcup_{i=0}^{\infty} \Sigma^i$$  

### 正闭包 Positive Closure

$$\Sigma^+ = \bigcup_{i=1}^{\infty} \Sigma^i$$

> $\Sigma^* = \Sigma^+ \cup \{ \epsilon \}$  

### 语言  

若 $\Sigma$ 为字母表且 $\forall L \subseteq \Sigma^*$, 则称 $L$ 为字母表 $\Sigma$ 上的语言.  

> **重要约束**: <u>字母表是有穷的.</u>

### 自动机理论典型问题

判定给定的字符串 $w$ 是否属于某个具体的语言 $L$: $w \in L ?$  

> 证明集合是否相等.  

### 证明方法
#### 演绎证明(三段法)  

1. 大前提: 已知的一般性原理  
2. 小前提: 所证明对象的特殊性  
3. 结论: 根据一般性原理, 对特殊情况作出判断  

> 所有奇数都不能被 2 整除 (大前提)  
> 2100+1 是奇数 (小前提)  
> 则 2100+1 不能被 2 整除 (结论)  

#### 归纳证明(数学归纳法)  

1. 基础: 基本的元素定义  
2. 归纳递推: 指出用已有元素来构造新元素的规则  

> 若 $x$ 和 $y$ 是 $\Sigma$ 上的字符串,  请证明 $|xy| = |x| + |y|$.  
>> 基础: 当 $|y| = 0$, 即 $y = \epsilon$  
>> $$
>> \begin{align}
>> |x \epsilon| & = |x| \quad 连接的定义\\
>> & = |x| + |\epsilon| \quad 长度的定义 \\
>> \end{align}
>> $$  
>> 递推: 假设 $|y| = n$ 时命题成立, 则当 $|y| = n+1$, 即 $y = wa$
>> $$
>> \begin{align}
>> |xy| & = |(xw)a| \quad 连接的定义\\
>> & = |xw| + 1  \quad 长度的定义 \\
>> & = |x| + |w| + 1  \quad 归纳假设 \\
>> & = |x| + |wa|  \quad 长度的定义\\
>> \end{align}
>> $$

#### 其他证明(反证法)  

假设**结论不成立**, 推理出**明显矛盾**.  

> "如果 $x$ 是素数, 则 $x$ 是奇数."  
>> 整数 2 是素数, 但 2 是偶数.  

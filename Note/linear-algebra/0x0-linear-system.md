---
title: 0x0_线性系统
published: 2025-05-09
lang: zh
subject: 线性代数
tags:
  - 线性代数
  - 基础
  - 向量
  - 矩阵
description: 线性系统的基本概念, 包括向量的定义与运算、矩阵表示和线性方程组的求解方法
keywords:
  - 向量
  - 矩阵
  - 线性方程组
  - 线性系统
  - 标准向量
---

## 向量 Vector

$$
\boldsymbol{v} =
\begin{bmatrix}
1 \\
2\\
3\\
\end{bmatrix}
$$

### 向量集合 Vector Set  

$\mathcal{R}^n$: 包含 $n$ 个元素的向量的集合.  

### 向量运算性质

 1. $\boldsymbol{u} + \boldsymbol{v} = \boldsymbol{v} + \boldsymbol{u}$
 2. $(\boldsymbol{u} + \boldsymbol{v}) + \boldsymbol{w} = \boldsymbol{u} + (\boldsymbol{v} + \boldsymbol{w})$
 3. $\boldsymbol{0} + \boldsymbol{u} = \boldsymbol{u}$
 4. $\boldsymbol{u}' + \boldsymbol{u} = \boldsymbol{0}$
      > $\boldsymbol{u}' = - \boldsymbol{u}$
 5. $1 \boldsymbol{u} = \boldsymbol{u}$
 6. $(ab)\boldsymbol{u} = a(b\boldsymbol{u})$
 7. $a(\boldsymbol{u} + \boldsymbol{v}) = a\boldsymbol{u} + a\boldsymbol{v}$
 8. $(a + b)\boldsymbol{v} = a\boldsymbol{u} + b\boldsymbol{u}$

## 线性系统 Linear System

> Linear System = System of Linear Equations  
> 线性系统 = 多元一次联立方程式

$$
\begin{array}{lcl}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\qquad \qquad \qquad \quad \cdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m \\
\end{array}
$$

### 标准/单位向量 Standard/Unit Vector  

$$
\boldsymbol{e}_1 =
\begin{bmatrix}
   1 \\
   0 \\
   \vdots \\
   0
\end{bmatrix},
\boldsymbol{e}_2 =
\begin{bmatrix}
   0 \\
   1 \\
   \vdots \\
   0
\end{bmatrix},
\cdots,
\boldsymbol{e}_n =
\begin{bmatrix}
   0 \\
   0 \\
   \vdots \\
   1
\end{bmatrix}
$$

将每个 Standard Vector 代入线性系统得到:  
$$
\boldsymbol{e}_1 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{11} \\
   a_{21} \\
   \vdots \\
   a_{m1}
\end{matrix},
\boldsymbol{e}_2 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{12} \\
   a_{22} \\
   \vdots \\
   a_{m2}
\end{matrix},
\cdots,
\boldsymbol{e}_n \xrightarrow[System]{Linear}
\begin{matrix}
   a_{1n} \\
   a_{2n} \\
   \vdots \\
   a_{mn}
\end{matrix}
$$

如果 Standard Vector 对应乘上 $x_n$ 得到:  
$$
x_1\boldsymbol{e}_1 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{11}x_1 \\
   a_{21}x_1 \\
   \vdots \\
   a_{m1}x_1
\end{matrix},
x_2\boldsymbol{e}_2 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{12}x_2 \\
   a_{22}x_2 \\
   \vdots \\
   a_{m2}x_2
\end{matrix},
\cdots,
x_n\boldsymbol{e}_n \xrightarrow[System]{Linear}
\begin{matrix}
   a_{1n}x_n \\
   a_{2n}x_n \\
   \vdots \\
   a_{mn}x_n
\end{matrix}
$$

最终将结果相加:  
$$
\begin{matrix}
   x_1 \\
   x_2 \\
   \vdots \\
   x_n
\end{matrix}
\xrightarrow[System]{Linear}
\begin{matrix}
   a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n  = b_1\\
   a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n  = b_2\\
   \vdots \\
   a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n  = b_m\\
\end{matrix}
$$

## 矩阵 Matrix  

`m` 行 `n` 列 (`m` x `n`)

$$
A =
\begin{bmatrix}
   a_{11} & a_{12} & \cdots & a_{1n} \\
   a_{21} & a_{22} & \cdots & a_{2n} \\
   \vdots & \ddots & \cdots & \vdots \\
   a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$  

$$
A = [\boldsymbol{a}_1 \ \boldsymbol{a}_2 \ \cdots \ \boldsymbol{a}_n]
$$

元素下标用 `(i,j)` 表示.  

### 矩阵运算

> 当矩阵大小相等时(大小都是 `m` x `n`), 可以进行计算.  

将对应元素进行计算.  

$$
A =
\begin{bmatrix}
   1 & 4 \\
   2 & 5 \\
   3 & 6
\end{bmatrix}
B =
\begin{bmatrix}
   6 & 9 \\
   8 & 0 \\
   9 & 2
\end{bmatrix}
$$

$$
9B =
\begin{bmatrix}
   54 & 81 \\
   72 & 0 \\
   81 & 18
\end{bmatrix}
A + B =
\begin{bmatrix}
   7 & 13 \\
   10 & 5 \\
   12 & 8
\end{bmatrix}
A - B =
\begin{bmatrix}
   -5 & -5 \\
   -6 & 5 \\
   -6 & 4
\end{bmatrix}
$$

### 矩阵运算性质

1. $A + B = B + A$
2. $(A + B) + C = A +(B + C)$
3. $(st)A = s(tA)$
4. $s(A + B) = sA + sB$
5. $(s + t)A = sA + tA$

### 常用矩阵

#### 方矩阵 Square Matrix

`m` = `n` 的矩阵. 方矩阵存在对角线.

##### 上三角矩阵 Upper Triangular Matrix

对角线以下元素全为 `0`.

$$
\begin{bmatrix}
   a_{11} & a_{12} & a_{13} \\
   0 & a_{22} & a_{23} \\
   0 & 0 & a_{33}
\end{bmatrix}
$$  

##### 下三角矩阵 Lower Triangular Matrix

对角线以上元素全为 `0`.

$$
\begin{bmatrix}
   a_{11} & 0 & 0 \\
   a_{21} & a_{22} & 0 \\
   a_{31} & a_{32} & a_{33}
\end{bmatrix}
$$  

##### 对角矩阵 Diagonal Matrix

除了对角线以上元素全为 `0`.

$$
\begin{bmatrix}
   a_{11} & 0 & 0 \\
   0 & a_{22} & 0 \\
   0 & 0 & a_{33}
\end{bmatrix}
$$  

##### 单位矩阵 Identity Matrix

除了对角线以上元素全为 `0`, 对角线以上元素全为 `1`. 表示为 $I_n$, $n$ 是方矩阵的大小.

$$
\begin{bmatrix}
   1 & 0 & 0 \\
   0 & 1 & 0 \\
   0 & 0 & 1
\end{bmatrix}
$$  

##### 零矩阵 Zero Matrix

元素全为 `0` 的矩阵. 表示为 $O_{m \times n}$, $m \times n$ 是矩阵的大小.

$$
\begin{bmatrix}
   0 & 0 & 0 \\
   0 & 0 & 0 \\
   0 & 0 & 0
\end{bmatrix}
$$  

### 矩阵转置 Transpose  

矩阵转置, 行$\leftrightarrow$列. 元素位置改变: $(i,j) \rightarrow (j,i)$.  
转置矩阵表示为 $A^T$.

$$
A =
\begin{bmatrix}
6 & 9 \\
8 & 0 \\
9 & 2
\end{bmatrix}
\xrightarrow{Transpose}
A^T =
\begin{bmatrix}
6 & 8 & 9 \\
9 & 0 & 2
\end{bmatrix}
$$

$(A^T)^T = A$  
$(sA)^T = sA^T$
$(A + B)^T = A^T + B^T$

#### 对称矩阵 Symmetric matrix

对称的矩阵一定是**方矩阵**.

$A^T = A$

### 矩阵-向量乘法

> **向量元素个数 = 矩阵列数**

$$
A =
\begin{bmatrix}
   a_{11} & a_{12} & \cdots & a_{1n} \\
   a_{21} & a_{22} & \cdots & a_{2n} \\
   \vdots & \vdots & \ddots & \vdots \\
   a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
\hspace{1cm}
\boldsymbol{x} =
\begin{bmatrix}
   x_1 \\
   x_2 \\
   \vdots \\
   x_n
\end{bmatrix}
$$

$$
\begin{align}
   A \boldsymbol{x}  & =
   \begin{bmatrix}
      a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n \\
      a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n \\
      \vdots \\
      a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n
   \end{bmatrix} \\
   & =
   x_1
   \begin{bmatrix}
      a_{11} \\
      \vdots \\
      a_{m1}
   \end{bmatrix}
   + x_2
   \begin{bmatrix}
      a_{12} \\
      \vdots \\
      a_{m2}
   \end{bmatrix}
   + \cdots +
   x_n
   \begin{bmatrix}
      a_{1n} \\
      \vdots \\
      a_{mn}
   \end{bmatrix}
\end{align}
$$

#### 矩阵-向量乘法性质

1. $A(\boldsymbol{u} + \boldsymbol{v}) = A\boldsymbol{u} + A\boldsymbol{v}$
2. $A(c\boldsymbol{u}) = c(A\boldsymbol{u}) = (cA)\boldsymbol{u}$
3. $(A + B)\boldsymbol{u} = A\boldsymbol{u} + B\boldsymbol{u}$
4. $A \boldsymbol{0}$ 是 `m`x`1` 零向量.
5. $\boldsymbol{0v}$ 也是 `m`x`1` 零向量.
6. $I_n\boldsymbol{v} = \boldsymbol{v}$

#### 怎么证明 $A = B$?  

$A \boldsymbol{e}_j = \boldsymbol{a}_j$.

$$
\begin{matrix}
   A \boldsymbol{e}_1 = B \boldsymbol{e}_1 \rightarrow \boldsymbol{a}_1 = \boldsymbol{b}_1 \\
   A \boldsymbol{e}_2 = B \boldsymbol{e}_2 \rightarrow \boldsymbol{a}_2 = \boldsymbol{b}_2 \\
   \qquad \qquad \cdots \\
   A \boldsymbol{e}_n = B \boldsymbol{e}_n \rightarrow \boldsymbol{a}_n = \boldsymbol{b}_n \\
\end{matrix}
\quad \Rightarrow \quad
A = B
$$

所以要确认 $A$ 与 $B$ 是否相等, 只需要检查 $\boldsymbol{a}_1,\cdots,\boldsymbol{a}_n$ 是否等于 $\boldsymbol{b}_1,\cdots,\boldsymbol{b}_n$.

## 线性组合 Linear Combination

向量集合 $\{ \boldsymbol{u}_1, \boldsymbol{u}_2, \cdots, \boldsymbol{u}_k\}$.

$\boldsymbol{v} = c_1\boldsymbol{u}_1 + c_2\boldsymbol{u}_2 + \cdots +c_k\boldsymbol{u}_k$ 称为**线性组合**, 记为 $Ax =b$.  

$c_1, c_2, \cdots, c_k$ 是 coefficients.  
相当于向量与矩阵相乘.

### 方程组是否有解?  

方程组是否有解, 可以换句话说: **$A\boldsymbol{x} = b$ 中, $b$ 是 $A$ 的列的线性组合?**

如果两个向量非平行, 可以组合成任意的向量.  
所以当 $A$ 的列不平行时, 是有解的. 但 $A$ 的列平行时, 不一定无解.

#### Example 1

$$
3x_1 + 6x_2 = 3 \\
2x_1 + 4x_2 = 4
$$

$$
Ax = b \\
A =
\begin{bmatrix}
   3 & 6 \\
   2 & 4
\end{bmatrix}
\hspace{1cm}
x =
\begin{bmatrix}
   x_1 \\
   x_2
\end{bmatrix}
\hspace{1cm}
b =
\begin{bmatrix}
   3 \\
   4
\end{bmatrix}
$$

> 要确认 $\begin{bmatrix} 3 \\ 4 \end{bmatrix}$ 是不是 $\begin{Bmatrix} \begin{bmatrix} 3 \\ 2 \end{bmatrix}, \begin{bmatrix} 6 \\ 4 \end{bmatrix} \end{Bmatrix}$ 的线性组合?

$\begin{bmatrix} 3 \\ 4 \end{bmatrix}$ 无法通过 $c_1 \begin{bmatrix} 3 \\ 2 \end{bmatrix} + c_2 \begin{bmatrix} 6 \\ 4 \end{bmatrix}$ 得到, 所以这个方程组无解.

#### Example 2  

$$
2x_1 + 3x_2 = 4 \\
3x_1 + 1x_2 = -1
$$

$$
A =
\begin{bmatrix}
   2 & 3 \\
   3 & 1
\end{bmatrix}
\hspace{1cm}
x =
\begin{bmatrix}
   x_1 \\
   x_2
\end{bmatrix}
\hspace{1cm}
b =
\begin{bmatrix}
   4 \\
   -1
\end{bmatrix}
$$  

$$
-1
\begin{bmatrix}
   2 \\
   3
\end{bmatrix}
+
2
\begin{bmatrix}
   3 \\
   1
\end{bmatrix}
=
\begin{bmatrix}
   4 \\
   -1
\end{bmatrix}
$$

$b$ 可以通过线性组合得到, 所以方程组有解.

## 张成空间 Span  

$S = \{ \boldsymbol{u}_1, \boldsymbol{u}_2, \cdots, \boldsymbol{u}_k \}$  
$Span \ S$ 是所有线性组合的集合, 即 $Span \ S = \{ c_1\boldsymbol{u}_1 + c_2\boldsymbol{u}_2 + \cdots + c_k\boldsymbol{u}_k | for \ all \ c_1,c_2,\cdots,c_k \}$  

$S_1 =\{
\begin{bmatrix}
   1 \\ -1
\end{bmatrix}
\}
$

$
Span \ S_1 = \{
\begin{bmatrix}
   1 \\ -1
\end{bmatrix},
\begin{bmatrix}
   2 \\ -2
\end{bmatrix},
\begin{bmatrix}
   -1 \\ 1
\end{bmatrix},
\cdots
\}
$

> $Span \ S_1$ 中有无穷多的向量, 但这些向量都落在同一个二维的直线上.

$S$ 中含有超过两个非平行的向量, 就可以组合得到所有向量, 即 $Span \ S = \mathcal{R}^2$.

$S = \{ \boldsymbol{u}_1, \boldsymbol{u}_2, \cdots, \boldsymbol{u}_k, \boldsymbol{v} \}$  
$S' = \{ \boldsymbol{u}_1, \boldsymbol{u}_2, \cdots, \boldsymbol{u}_k \}$  
$Span \ S = Span \ S'$, 则 $\boldsymbol{v}$ 是冗余的, 没有贡献的. $\boldsymbol{v}$ 是其他元素的线性组合.

## 秩&零度 Rank & Nullity

1. 秩: 将矩阵的列作为向量组成最大的线性独立集合.
   > 秩最大不会超过矩阵列数和行数.

2. 零度: `列数` - `秩`

## 独立&非独立 Independent & Dependent

1. 非独立 Dependent  
   1. $\{ \boldsymbol{a}_1, \boldsymbol{a}_2, \cdots, \boldsymbol{a}_n \}$ 是线性非独立的. 即向量集合中存在多余元素.  
      > 存在 $x_1\boldsymbol{a}_1 + x_2\boldsymbol{a}_2 + \cdots + x_n\boldsymbol{a}_n = 0$
   2. 矩阵的秩 = 列数, 零度 = 0

2. 独立 Independent
   1. $\{ \boldsymbol{a}_1, \boldsymbol{a}_2, \cdots, \boldsymbol{a}_n \}$ 是线性独立的.  
      > $x_1\boldsymbol{a}_1 + x_2\boldsymbol{a}_2 + \cdots + x_n\boldsymbol{a}_n = 0$, 当且仅当 $x_1=x_2=\cdots=x_n=0$ 才满足.  
      > 当集合中存在零向量是, 这个集合一定是非独立的. 因为零向量的系数可取任意值, 不满足独立的条件.
   2. 矩阵的秩 < 列数, 零度 > 0

3. 在方程组有解的情况下, 独立的集合存在**唯一解**, 非独立的集合存在**无穷多解**.

## 线性方程组解法

### 等价 Equivalent

两个线性方程组有相同的解, 则称之为**等价**(Equivalent).

### 操作

以下操作不会改变线性方程组的解:  

1. 行交换 Interchange
2. 缩放 Scaling (系数非0)
3. 行加法 Row Addition
   > 将某一行进行缩放后与另外一行相加.

### 增广矩阵 Augmented Matrix

$$Ax = b$$

$$
A =
\begin{bmatrix}
   a_{11} & a_{12} & \dots & a_{1n} \\
   a_{21} & a_{22} & \dots & a_{2n} \\
   \vdots & \vdots & \ddots & \vdots \\
   a_{m1} & a_{m2} & \dots & a_{mn}
\end{bmatrix} \quad
x =
\begin{bmatrix}
   x_1 \\
   x_2 \\
   \vdots \\
   x_n \end{bmatrix} \quad
b =
\begin{bmatrix}
   b_1 \\
   b_2 \\
   \vdots \\
   b_m
\end{bmatrix}
$$

$$
Augmented \ Matrix \ [ A \mid b ] =
\begin{bmatrix}
   a_{11} & a_{12} & \dots & a_{1n} & b_1 \\
   a_{21} & a_{22} & \dots & a_{2n} & b_2 \\
   \vdots & \vdots & \ddots & \vdots & \vdots \\
   a_{m1} & a_{m2} & \dots & a_{mn} & b_m
\end{bmatrix}
$$

> 当某一行除了最后一个元素均为0, 即 $[0 \ 0 \ 0 \cdots \ k]$, **则方程组是无解的**.  
> 因为 $0 = k$ 是不成立的.

### 简化阶梯型矩阵

#### 阶梯型矩阵 REF

阶梯型矩阵 Row Echelon Form.

$$
\begin{bmatrix}
   1 & 7 & 2 & -3 & 9 & 4 \\
   0 & 0 & 1 & 4 & 6 & 8 \\
   0 & 0 & 0 & 2 & 3 & 5 \\
   0 & 0 & 0 & 0 & 0 & 0 \\
   0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}
$$

1. 所有非零行都在零行以上.
   > 全 0 行在矩阵的最下方.

2. 引导项(Leading Entries)呈阶梯形.  
   > 引导项(Leading Entry): 每一行中, 从左边数第一个非零的元素.

#### 简化阶梯型矩阵 RREF

1. 简化阶梯型矩阵 Reduce Row Echelon Form.  

   $$
   \begin{bmatrix}
      1 & -3 & 0 & 2 & 0 & 7 \\
      0 & 0 & 1 & 6 & 0 & 9 \\
      0 & 0 & 0 & 0 & 1 & 2 \\
      0 & 0 & 0 & 0 & 0 & 0
   \end{bmatrix}
   $$

   1. 满足 REF.  
   2. 引导项所在列是**标准向量**.  

2. 中枢 Pivot
   1. Pivot Position 是 Leading Entries 的 Index.
      > (1,1),(2,3),(3,4)
   2. Pivot Columns 是矩阵中引导项所在的列.  
      > 第1,3,4列  
   3. Pivot Columns 的数量也是非零行的数量.  
   4. Pivot Columns 的数量就是秩的大小.  

3. 同一个矩阵可以通过行操作, 得到多个 REF. 但 **RREF 是唯一的**.  
   **Matrix**
   $$
   \begin{bmatrix} 1 & -2 & -1 & 3 \\ 3 & -6 & -5 & 3 \\ 2 & -1 & 1 & 0 \end{bmatrix}
   $$
   **REF**  
   $$
   \begin{bmatrix} 1 & -2 & -1 & 3 \\ 0 & 3 & 3 & -6 \\ 0 & 0 & 1 & 3 \end{bmatrix}
   \begin{bmatrix} 1 & -2 & -1 & 3 \\ 0 & 3 & 3 & -6 \\ 0 & 0 & 3 & 9 \end{bmatrix}
   \begin{bmatrix} 1 & -2 & -1 & 3 \\ 0 & 3 & 0 & -15 \\ 0 & 0 & 3 & 9 \end{bmatrix}
   $$
   **RREF**
   $$
   \begin{bmatrix} 1 & 0 & 0 & -4 \\ 0 & 1 & 0 & -5 \\ 0 & 0 & 1 & 3 \end{bmatrix}
   $$

#### RREF 计算线性方程组

$$
\begin{bmatrix}
   1 & -3 & 0 & 2 & 0 & 7 \\
   0 & 0 & 1 & 6 & 0 & 9 \\
   0 & 0 & 0 & 0 & 1 & 2 \\
   0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}
\Rightarrow
\begin{matrix}
   x_1 - 3x_2 \qquad  + 2x_4 \qquad & = 7 \\
   \quad  \qquad x_3 + 6x_4 & = 9 \\
   \quad  \qquad \qquad \qquad \qquad x_5 & = 2 \\
   \quad  \qquad \qquad \qquad \qquad 0 & = 0
\end{matrix}
$$

$$
\begin{matrix}
   x_1 = & 7 + 3x_2 - 2x_4 \\
   x_2 \quad & Free \\
   x_3 = & 9 - 6x_4 \\
   x_4 \quad & Free \\
   x_5 = & 2
\end{matrix}
$$
> $x_1,x_3,x_5$ 是基础变量.  
> $x_2,x_4$ 是自由变量.  
>
> $x_3 + 6x_4 = 9$ 也可以表示成 $x_4 = \frac{3}{2} - \frac{x_3}{6}$  
> 这样 $x_3$ 会变成自由变量, $x_4$ 变成基础变量.

使用参数化表示
$$
\begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5 \end{bmatrix}
=
\begin{bmatrix} 7 + 3x_2 - 2x_4 \\ x_2 \\ 9 - 6x_4 \\ x_4 \\ 2 \end{bmatrix}
=
\begin{bmatrix} 7 \\ 0 \\ 9 \\ 0 \\ 2 \end{bmatrix}
+ x_2 \begin{bmatrix} 3 \\ 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}
+ x_4 \begin{bmatrix} -2 \\ 0 \\ -6 \\ 1 \\ 0 \end{bmatrix}
$$  

当 RREF 没有零行时, $A$ 总有解.  

#### 列对应定理 Column Correspondence Theorem

矩阵在转换成 RREF 后, 列之间的对应关系是不变的.  

$$
A =
\begin{bmatrix}
1 & 2 & -1 & 2 & 1 & 2 \\
-1 & -2 & 1 & 2 & 3 & 6 \\
2 & 4 & -3 & 2 & 0 & 3 \\
-3 & -6 & 2 & 0 & 3 & 9
\end{bmatrix} \qquad
R =
\begin{bmatrix} 1 & 2 & 0 & 0 & -1 & -5 \\
0 & 0 & 1 & 0 & 0 & -3 \\
0 & 0 & 0 & 1 & 1 & 2 \\
0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}
$$  

$$
\mathbf{a}_2 = 2\mathbf{a}_1 \Leftrightarrow \mathbf{r}_2 = 2\mathbf{r}_1
$$  

$$
\mathbf{a}_5 = -\mathbf{a}_1 + \mathbf{a}_4 \Leftrightarrow \mathbf{r}_5 = -\mathbf{r}_1 + \mathbf{r}_4
$$  

$A$ 和 $R$ 的秩也是一样.  

### 检查独立性

求解 $Ax = \boldsymbol{0}$ 是否存在非零解.

1. 存在非零解, 则非独立.
2. 不存在非零解, 则独立.

当 `col` > `row` 时, <u>矩阵一定是非独立的</u>.  

## 秩(补充)

1. $\text{Rank} \ A$ = $\text{Number of Pivot Columns}$ = $\text{Number of Non-zero Rows}$  

2. $\text{Rank} \ A \leq min(m,n)$
   1. $\text{Rank} \ A = min(m,n)$, $A$ 是满秩(full rank).
   1. $\text{Rank} \ A < min(m,n)$, $A$ 是秩亏(rank deficient).

3. 基础变量个数 = $Rank$, 自由变量个数 = $Nullity$

4. $\text{Rank} \ A = n$ 时, $A$ 永远有解.  
   > No Zero Row.  

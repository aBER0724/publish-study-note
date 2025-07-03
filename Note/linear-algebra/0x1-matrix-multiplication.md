---
title: 0x01_矩阵乘法
published: 2025-06-13
lang: zh
subject: 线性代数
tags:
  - 线性代数
description: 线性代数基础理论与应用
keywords:
  - 线性代数
  - 向量
  - 矩阵
  - 线性变换
  - 矩阵乘法
---

## 矩阵乘法 Matrix Multiplication

四种不同的计算方法. 

### 内积 Inner Product

$$C = AB$$
$$c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$$

行 $\times$ 列 的和. 

$$
A = \begin{bmatrix}
   1 & 2 \\****
   3 & 4 \\
   5 & 6
\end{bmatrix} \quad
B = \begin{bmatrix}
   -1 & 1 \\
   3 & 2
\end{bmatrix}
$$
$$
C = AB = \begin{bmatrix}
   (-1) \times 1 + 3 \times 2 & 1 \times 1 + 2 \times 2 \\
   (-1) \times 3 + 3 \times 4 & 1 \times 3 + 2 \times 4 \\
   (-1) \times 5 + 3 \times 6 & 1 \times 5 + 2 \times 6
\end{bmatrix}
$$

### 列组合 Combination of Columns

$AB$ 也相当于 $A$ 与 $B$ 的每列进行相乘. 

$$
\begin{matrix}
AB = & A[b_1 \ b_2 \ \cdots \ b_p] \\
   = & Ab_1 + Ab_2 + \cdots + Ab_p
\end{matrix}
$$

### 行组合 Combination of Rows

$AB$ 也相当于 $A$ 与 $B$ 的行组合. 

$$c_{ij} = a_{i1}b^T_1 + a_{i2}b^T_2 + \cdots + a_{in}b^T_n$$

$$
\begin{bmatrix}
   1 & 2 \\
   3 & 4 \\
   5 & 6
\end{bmatrix}
\begin{bmatrix}
   -1 & 1 \\
   3 & 2
\end{bmatrix}
=
\begin{bmatrix}
   1[-1 \quad 1] + 2[3 \quad 2] \\
   3[-1 \quad 1] + 4[3 \quad 2] \\
   5[-1 \quad 1] + 6[3 \quad 2]
\end{bmatrix}
$$

### 矩阵和 Summation of Matrices

$$c_{ij} = a_1b^T_1 + a_2b^T_2 + \cdots + a_nb^T_n$$

多个矩阵 $a_ib^T_j$ 求和. 

$$
\begin{bmatrix}
   1 & 2 \\
   3 & 4 \\
   5 & 6
\end{bmatrix}
\begin{bmatrix}
   -1 & 1 \\
   3 & 2
\end{bmatrix} =
\begin{bmatrix}
   \begin{bmatrix}
      1 \\
      3 \\
      5
   \end{bmatrix}
   \begin{bmatrix}
      -1 & 1
   \end{bmatrix} +
   \begin{bmatrix}
      2 \\
      4 \\
      6
   \end{bmatrix}
   \begin{bmatrix}
      3 & 2
   \end{bmatrix}
\end{bmatrix}
$$

#### 块组合 Combination of Blocks

Partition: 可以将矩阵按行和列拆分成块, 每个块都可以当作一个矩阵. 

$$
A = \begin{bmatrix}
   1 & 3 & 4 & 2 \\
   0 & 5 & -1 & 6 \\
   1 & 0 & 3 & -1
\end{bmatrix}  \quad
B = \begin{bmatrix}
   1 & 0 & 3 \\
   1 & 2 & 0 \\
   2 & -1 & 2 \\
   0 & 3 & 1
 \end{bmatrix}
$$

$$
A = \begin{bmatrix}
   A_{11} & A_{12} \\
   A_{21} & A_{22}
\end{bmatrix} \quad
B = \begin{bmatrix}
   B_{11} & B_{12} \\
   B_{21} & B_{22}
\end{bmatrix}
$$

$$
\begin{matrix}
AB = &
   \begin{bmatrix}
      A_{11} & A_{12} \\
      A_{21} & A_{22}
   \end{bmatrix}
   \begin{bmatrix}
      B_{11} & B_{12} \\
      B_{21} & B_{22}
   \end{bmatrix} \\
   = & \begin{bmatrix} A_{11}B_{11} + A_{12}B_{21} & A_{11}B_{12} + A_{12}B_{22} \\ A_{21}B_{11} + A_{22}B_{21} & A_{21}B_{12} + A_{22}B_{22} \end{bmatrix}
\end{matrix}
$$

对复杂矩阵进行拆分后, 可以简化一部分运算. 

$$
A = \begin{bmatrix}
   1 & 0 & 0 & 0 \\
   0 & 1 & 0 & 0 \\
   6 & 8 & 5 & 0 \\
   -7 & 9 & 0 & 5
\end{bmatrix} \quad
A =
\begin{bmatrix}
   I_2 & O \\
   B & 5I_2
\end{bmatrix}
$$

$$
A^2 = \begin{bmatrix}
   I_2 & O \\
   B & 5I_2
\end{bmatrix}
\begin{bmatrix}
   I_2 & O \\
   B & 5I_2
\end{bmatrix} =
\begin{bmatrix}
   I_2 & O \\
   6B & 25I_2
\end{bmatrix}
$$

## 矩阵乘法意义

$$y \leftarrow A \leftarrow v \leftarrow B \leftarrow x$$
$$y \leftarrow C(A \leftarrow B) \leftarrow x$$

## 矩阵乘法的性质

1. $AB \not = BA$
2. $A$,$B$ 是 $k \times m$, $C$ 是 $m \times n$, $P,Q$ 是 $n \times p$.
   - 对任意的 $s$, $s(AC) = (sA)C = A(sC)$
   - $(A + B)C = AC + BC$
   - $C(P+Q)=CP+CQ$
   - $I_kA = A = AI_m$
   - 任何矩阵与零矩阵相乘结果都是**零矩阵**.
3. 对于 $n \times n$ 的矩阵 $A$: $A^k = AA \cdots A(k 次), A^1=A, A^0 = I_n$
4. $A$ 是 $k \times m$, $C$ 是 $m \times n$.
   - $(AC)^T = C^TA^T$

   > $AC: k \times m \cdot m \times n \rightarrow k \times n$
   > $(AC)^T: (k \times n)^T \rightarrow n \times k$
   > $A^TC^T: m \times k \cdot n \times m \not \rightarrow D.N.E.$
   > $C^TA^T: n \times m \cdot m \times k \rightarrow n \times k \rightarrow (AC)^T$

5. 对角矩阵相乘直接将对角线相乘即可. 
   $$
   A = \begin{bmatrix}
      1 & 0 & 0 \\
      0 & 2 & 0 \\
      0 & 0 & 3
   \end{bmatrix} \quad
   B = \begin{bmatrix}
      3 & 0 & 0 \\
      0 & -1 & 0 \\
      0 & 0 & 2
   \end{bmatrix} \quad
   AB = \begin{bmatrix}
      3 & 0 & 0 \\
      0 & -2 & 0 \\
      0 & 0 & 6
   \end{bmatrix}
   $$

6. $A$,$B$ 是 $k \times m$, $C$ 是 $m \times n$, $P,Q$ 是 $n \times p$.
   - A(CP) = (AC)P, A(CP) 和 (AC)P 的结果相同, 但计算量不同. 
   - 假设 $k = 1, m = 1000, n = 1, p = 1000$.
     - A(CP): $m \times n \times p + k \times m \times p = 2 \cdot 10^6$
     - (AC)P: $k \times m \times n + k \times n \times p = 2 \cdot 10^3$

## 矩阵的逆 Inverse of Matrix

$$AB = I \ and \ BA = I $$

$A$ 与 $B$ 互为逆矩阵, $B = A^{-1}, A = B^{-1}$.

> Invertible = Non-singular
> Not Invertible = Singular

**非方矩阵一定不是可逆的**.

矩阵**有且仅有**一个逆矩阵. 

1. $A$ 是可逆的, $A$ 的转置矩阵也可逆. 

   $AA^{-1}=I \Rightarrow (AA^{-1})^T=I \Rightarrow (A^{-1})^TA^T=I$
   $A^{-1}A=I \Rightarrow (A^{-1}A)^T=I \Rightarrow A^T(A^{-1})^T=I$

2. $A$ 和 $B$ 均可逆, 则 $AB$ 也可逆. 

   $(AB)^{-1} = B^{-1}A^{-1}$
   $B^{-1}A^{-1}(AB) = B^{-1}(A^{-1}A)B = B^{-1}B = I$
   $(AB)B^{-1}A^{-1} = A(BB^{-1})A^{-1} = AA^{-1} = I$

   > k 个可逆的矩阵, 他们的内积也是可逆的. 
   > $(A_1A_2 \cdots A_k)^{-1}=(A_k)^{-1}(A_{k-1})^{-1}\cdots(A_1)^{-1}$

### 如何确定矩阵是否可逆

$A$ 是方矩阵, 是 $\text{One-to-one}$ 和 $Onto$ 的 (满足任一条件, 另一个条件自然成立).

> $\text{One-to-one}$: $x$ 与 $f(x)$ 一一对应. 
> $Onto$: 对应域 = 值域.(对应域一般大于等于值域)

1. $Onto \rightarrow \text{One-to-one} \rightarrow Invertible$
   - $A$ 的列可以占满 $R^n$.
   - 对于 $R^n$ 中的任意 $b$, $Ax=b$ 均有解. 
   - $A$ 的秩 = 行数. 
2. $\text{One-to-one} \rightarrow Onto \rightarrow Invertible$
   - $A$ 的列都是 linear independent.
   - $A$ 的秩 = 列数 = 行数. 
   - $A$ 的零度 = 0.
   - $Ax=0$ 有且仅有一个解为零向量. 
   - $A$ 的 RREF 是 $I_n$.

   可以通过确认矩阵的 RREF 是否是 $I_n$.

3. 存在 $n \times n$ 的矩阵 $B$, 满足 $BA = I_n$;
   存在 $n \times n$ 的矩阵 $C$, 满足 $AC = I_n$;

4. Elementary Matrix 就是对 $I_n$ 进行 Elementary Operation 后的矩阵. 

   - 交换第二行和第三行：
      $\begin{bmatrix}
         1 & 0 & 0 \\
         0 & 1 & 0 \\
         0 & 0 & 1
       \end{bmatrix}
       \xrightarrow{\text{交换}}
       E_1 = \begin{bmatrix}
         1 & 0 & 0 \\
         0 & 0 & 1 \\
         0 & 1 & 0
       \end{bmatrix}$

   - 第二行乘以 -4:
      $\begin{bmatrix}
         1 & 0 & 0 \\
         0 & 1 & 0 \\
         0 & 0 & 1
       \end{bmatrix}
       \xrightarrow{\text{乘以 -4}}
       E_2 = \begin{bmatrix}
         1 & 0 & 0 \\
         0 & -4 & 0 \\
         0 & 0 & 1
       \end{bmatrix}$

   - 第三行 + 两倍的第一行：
      $\begin{bmatrix}
         1 & 0 & 0 \\
         0 & 1 & 0 \\
         0 & 0 & 1
       \end{bmatrix}
       \xrightarrow{\text{加法}}
       E_3 = \begin{bmatrix}
         1 & 0 & 0 \\
         0 & 1 & 0 \\
         2 & 0 & 1
       \end{bmatrix}$

   Elementary Matrix 的逆矩阵就是进行相反的操作 (交换是正常交换):
   - $\times \leftrightarrow \div$
   - $+ \leftrightarrow -$

### 如何找到矩阵的逆

通过 Elementary Operation 将 $[A \ I_n]$ 变换成 RREF $[R \ B]$.

$R$ 是 $A$ 的 RREF.
$B$ 是 $n \times n$ 的矩阵 (不是 RREF)

若 $R = I_n$, 则 $A$ 可逆, 且 $B = A^{-1}$.

所以, 求逆就是在 $A$ 右侧增加一个 $I_n$, 求得 RREF, 即得到逆矩阵. 

$$ A \rightarrow [A \ I_n] \rightarrow RREF = [R \ E_k E_{k-1} \dots E_2 E_1] = [I_n \ A^{-1}]$$

> tips  
> $C' = A^{-1}C = E_k E_{k-1} \dots E_2 E_1 \ [ A \ C] = [R E_k E_{k-1} \dots E_2 E_1 C]$

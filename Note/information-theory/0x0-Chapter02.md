---
title: 0x1_信源与信息熵
published: 2025-08-19
lang: zh
subject: 信息论
tags:
  - 信息论
  - 自信息
  - 熵
---

## 信息论

### 信息

- **自信息**：$I(x) = \log_r \frac{1}{p(x)} \longrightarrow H(X) = E_x[I(x_i)]$ (熵)
- **联合信息**：$I(x,y) = \log_r \frac{1}{p(x,y)} \longrightarrow H(X,Y) = E_{XY}[I(x_i,y_j)]$ (联合熵)
- **条件信息**：$I(x|y) = \log_r \frac{1}{p(x|y)} \longrightarrow H(X|Y) = E_{XY}[I(x_i|y_j)]$ (条件熵)

### 链式法则

- $H(X,Y) = H(X) + H(Y|X)$
- $\begin{aligned} H(X_1X_2 \dots X_N) &= \sum_{i=1}^{N} H(X_i|X_1 \dots X_{i-1}) \\ &= H(X_1) + H(X_2|X_1) + H(X_3|X_1X_2) + \dots + H(X_N|X_1 \dots X_{N-1}) \end{aligned}$

### 最大熵定理

- $H(P_1, P_2, \dots, P_n) \le \log q$，当$P_i$的概率均为$\frac{1}{q}$时，信源有最大熵. 
- 信源中各事件概率均匀分布时，信源的平均不确定性最大. 

### 不等式

- $H(X|Y) \le H(X)$
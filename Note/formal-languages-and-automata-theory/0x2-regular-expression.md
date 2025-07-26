---
title: 0x2_正则表达式
published: 2025-07-21
lang: zh
subject: 形式语言与自动机
tags:
  - 形式语言与自动机
  - 正则表达式
description: 正则表达式
---

## 正则表达式

- 有穷自动机: 通过抽象机器装置扫描和接受字符串识别 (表示)正则语言.
- 正则表达式: 通过代数式表示或产生正则语言.
 > 正则表达式所表示的语言与正则语言等价.

### 基础

1. $\emptyset$ 是一个正则表达式, 表示空语言 $\emptyset$.
2. $\epsilon$ 是一个正则表达式, 表示语言 $\{\epsilon\}$.
3. 对于任意一个符号 $a$, $a$ 是一个正则表达式,表示语言 $\{a\}$, 具有一个长度为 1 的字符串.

### 归纳

1. 如果 $E_1$ 和 $E_2$ 是正则表达式, 那么 $E_1 + E_2$ 也是正则表达式, 且 $L(E_1 + E_2) = L(E_1) \cup L(E_2)$.
2. 如果 $E_1$ 和 $E_2$ 是正则表达式, 那么 $E_1 E_2$ 也是正则表达式, 且 $L(E_1 E_2) = L(E_1)L(E_2)$.
3. 如果 $E$ 是正则表达式, 则 $E^*$ 也是正则表达式.
4. 如果 $E$ 是正则表达式, 则 $(E)$ 也是正则表达式, 表示语言 $L(E)$.

### 计算优先级

|计算优先级|示例|
|:------:|:--:|
| () |$(E)$|
| * |$E^*$|
|$\cdot$|$E_1 E_2$ ($\cdot$ 可省略)|
| + |$E_1 + E_2$|

## 有穷自动机和正则表达式

对于一个 DFA 所能识别的语言, 都**存在**一个正则表达式表示它.  
任何一个正则表达式表示的语言, 都可以由一个 $\epsilon$-NFA 识别.

```mermaid
graph LR 
  A(正则表达式) --> C
  B(DFA) --> A
  B --> C(ε-NFA)
  C(ε-NFA) --> B
  B --> D(NFA)
  D(NFA) --> B
```

### DFA --> 正则表达式

定理: 若 $L = L(A)$ 是某 DFA $A$ 的语言, 那么存在正则表达式 $R$ 满足$L = L(R)$。

#### 递归法

$$A = (\{1,2,3,...,n\},\Sigma,\delta,1,F)$$

设正则表达式 $R_{i,j}^{(k)}$ 表示从 $i$ 到 $j$, 但中间节点状态编号不超过 $k$ 全部路径的字符串集 (简称 $k$-路径):

$$R_{i,j}^{(k)} = \{x \mid \hat{\delta}(i, x) = j, \text{x经过的状态除两端外都不超过} k\}$$

> $i$, $j$ 可以超过 $k$.  
> $k = 0$, 则中间没有经过节点.

1. $k = 0$
  
    1. 情况 1: $i \neq j$

      |$R_{i,j}^{(0)} = \epsilon$ |$R_{i,j}^{(0)} = a$|$R_{i,j}^{(0)} = a_1 + a_2 + \cdots + a_t$|
      |:----:|:----:|:----:|
      |![](https://quickchart.io/graphviz?graph=digraph{rankdir=TD;i[shape=circle,label="i"];j[shape=circle,label="j"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;i[shape=circle,label="i"];j[shape=circle,label="j"];i->j[label="a"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;i[shape=circle,label="i"];j[shape=circle,label="j"];i->j[label="a_1"];i->j[label="..."];i->j[label="a_t"];})|

      2. 情况 1: $i = j$

      |$R_{i,j}^{(0)} = \epsilon$|$R_{i,j}^{(0)} = a + \epsilon$|$R_{i,j}^{(0)} = a_1 + a_2 + \cdots + a_t + \epsilon$|
      |:----:|:----:|:----:|
      |![](https://quickchart.io/graphviz?graph=digraph{rankdir=TD;i[shape=circle,label="i"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=TD;i[shape=circle,label="i"];i->i[label="a"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;i[shape=circle,label="i"];i:n->i:n[label="a_1",labeldistance=2];i:w->i:w[label="...",labeldistance=2];i:e->i:e[label="a_t",labeldistance=2];})|

2. $R_{i,j}^{(k)} = R_{i,j}^{(k-1)} + R_{i,k}^{(k-1)} (R_{k,k}^{(k-1)})^* R_{k,j}^{(k-1)}$

    - $R_{i,j}^{(k-1)}$: 不经过 $k$.
    - $R_{i,k}^{(k-1)}$: 首次从 $i$ 到 $k$.
    - $(R_{k,k}^{(k-1)})^*$: 1 或 n 次 $k$ 到 $k$.
    - $R_{k,j}^{(k-1)}$: 最后从 $k$ 到 $j$.

如果 1 是开始结点，则和 DFA 等价的正则表达式就是
$$\cup_{j \in F} R_{1,j}^{(n)}$$
即，从状态1到终结状态的所有路径的集合.

::: details Example

![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node[shape=circle];start[shape=point,label="start"];q1[label="q1"];q2[label="q2",peripheries=2];start->q1[label="start"];q1->q2[label="0"];q1->q1[label="1"];q2->q2[label="1,0"];})

|$R_{1,1}^{(0)}$ |$\epsilon + 1$|
|:---:|:---:|
|$R_{1,2}^{(0)}$ | $0$ |
|$R_{2,1}^{(0)}$ |$\emptyset$ |
|$R_{2,2}^{(0)}$ | $\epsilon + 0 + 1$|
|$R_{1,1}^{(1)}$ | $\epsilon + 1 + (\epsilon + 1)(\epsilon + 1)^* (\epsilon + 1)$|
|$R_{1,2}^{(1)}$ | $0 + (\epsilon + 1)(\epsilon + 1)^* 0$|
|$R_{2,1}^{(1)}$ | $\emptyset + \emptyset (\epsilon + 1)^* (\epsilon + 1)$|
|$R_{2,2}^{(1)}$ | $\epsilon + 0 + 1 + \emptyset (\epsilon + 1)^* 0$|
|$R_{1,1}^{(2)}$ | $1^* + 1^*0(\epsilon + 0 + 1)^* \emptyset$|
|$R_{1,2}^{(2)}$ | $1^*0 + 1^*0(\epsilon + 0 + 1)^* (\epsilon + 0 + 1)$|
|$R_{2,1}^{(2)}$ | $\emptyset + (\epsilon + 0 + 1)(\epsilon + 0 + 1)^* \emptyset$|
|$R_{2,2}^{(2)}$ | $\epsilon + 0 + 1 + (\epsilon + 0 + 1)(\epsilon + 0 + 1)^* (\epsilon + 0 + 1)$|
:::

#### 状态消除法

|消除前|消除后|
|:---:|:---:|
|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;s0[label="",shape=circle];s1[label="",shape=circle];s2[label="",shape=circle];s0->s1[label="a"];s1->s2[label="b"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;s0[label="",shape=circle];s1[label="",shape=circle];s0->s1[label="ab"];})|
|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;s0[label="",shape=circle];s1[label="",shape=circle];s0->s1[label="a"];s0->s1[label="b"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;s0[label="",shape=circle];s1[label="",shape=circle];s0->s1[label="a%2Bb"];})|
|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;s0[label="",shape=circle];s1[label="",shape=circle];s2[label="",shape=circle];s0->s1[label="a"];s1->s1[label="c"];s1->s2[label="b"];})|![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;s0[label="",shape=circle];s1[label="",shape=circle];s0->s1[label="ac%2Ab"];})|

::: details Example

![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point];q0[shape=circle,label="q0"];q1[shape=circle,label="q1"];q2[shape=doublecircle,label="q2"];start->q0[label="start"];q0->q0[label="1"];q0->q1[label="0"];q1->q1[label="0"];q1->q2[label="1"];q2->q1[label="0"];q2->q0[label="1"];})

1. 增加新的空转移开始状态和结束状态

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point];s[shape=circle,label="s"];q0[shape=circle,label="q0"];q1[shape=circle,label="q1"];q2[shape=circle,label="q2"];f[shape=doublecircle,label="f"];start->s[label="start"];s->q0[label="ε"];q0->q0[label="1"];q0->q1[label="0"];q1->q1[label="0"];q1->q2[label="1"];q2->q1[label="0"];q2->q0[label="1"];q2->f[label="ε"];})

2. 消除 $q_1$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point];s[shape=circle,label="s"];q0[shape=circle,label="q0"];q2[shape=circle,label="q2"];f[shape=doublecircle,label="f"];start->s[label="start"];s->q0[label="ε"];q0->q0[label="1"];q0->q2[label="00*1"];q2->q2[label="00*1"];q2->q0[label="1"];q2->f[label="ε"];})

3. 消除 $q_0$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point];s[shape=circle,label="s"];q2[shape=circle,label="q2"];f[shape=doublecircle,label="f"];start->s[label="start"];s->q2[label="1*00*1"];q2->q2[label="00*1%2B11*00*1"];q2->f[label="ε"];})

4. 消除 $q_2$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point];s[shape=circle,label="s"];f[shape=doublecircle,label="f"];start->s[label="start"];s->f[label="1*00*1%2800*1%2B11*00*1%29*"];})

该自动机的正则表达式为: $1^*00^*1(00^*1+11^*00^*1)^*$.

:::

### 正则表达式 --> DFA

每个正则表达式定义的语言, 都存在一个与其等价的 $\epsilon$-NFA.

#### 归纳法

1. $r+s$ 的 $\epsilon$-NFA

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point,label=""];split[shape=circle,label=""];end[shape=doublecircle,label=""];start->split[label="start"];split->r_in[label="ε"];split->s_in[label="ε"];r_out->end[label="ε"];s_out->end[label="ε"];subgraph%20clusterR%20{label="R";color=lightgrey;r_in[shape=circle,label=""];r_out[shape=circle,label=""];r_in->r_out[style=invis];};subgraph%20clusterS%20{label="S";color=lightgrey;s_in[shape=circle,label=""];s_out[shape=circle,label=""];s_in->s_out[style=invis];};})

2. $rs$ 的 $\epsilon$-NFA

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point,label=""];subgraph%20clusterR%20{label="R";color=lightgrey;r_in[shape=circle,label=""];r_out[shape=circle,label=""];r_in->r_out[style=invis];};subgraph%20clusterS%20{label="S";color=lightgrey;s_in[shape=circle,label=""];s_out[shape=doublecircle,label=""];s_in->s_out[style=invis];};start->r_in[label="start"];r_out->s_in[label="ε"];})

3. $r^*$ 的 $\epsilon$-NFA

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start[shape=point,label=""];i0[shape=circle,label=""];f0[shape=doublecircle,label=""];subgraph%20clusterR%20{label="R";color=lightgrey;r_in[shape=circle,label=""];r_out[shape=circle,label=""];r_in->r_out[style=invis];};start->i0[label="start"];i0->r_in[label="ε"];r_out->f0[label="ε"];i0->f0[label="ε"];r_out->r_in[label="ε"];f0[shape=doublecircle,label=""];})

:::details Example: 正则表达式 $(0+1)^*1(0+1)$ 构造为 $\varepsilon$-NFA.

1. 构造 $(0+1)$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;q0[shape=circle,label=""];q1[shape=circle,label=""];q2[shape=circle,label=""];q3[shape=circle,label=""];q4[shape=circle,label=""];qf[shape=circle,label=""];q0->q1[label="ε"];q0->q3[label="ε"];q1->q2[label="0"];q2->qf[label="ε"];q3->q4[label="1"];q4->qf[label="ε"];})

2. 构造 $(0+1)^*$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;a[shape=circle,label=""];b[shape=circle,label=""];c1[shape=circle,label=""];c2[shape=circle,label=""];d1[shape=circle,label=""];d2[shape=circle,label=""];e[shape=circle,label=""];f[shape=circle,label=""];a->b[label="ε"];b->c1[label="ε"];b->d1[label="ε"];c1->c2[label="0"];c2->e[label="ε"];d1->d2[label="1"];d2->e[label="ε"];e->f[label="ε"];f->a[label="ε"];b->e[label="ε"];})

3. 构造 $(0+1)^*1$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;a[shape=circle,label=""];b[shape=circle,label=""];c1[shape=circle,label=""];c2[shape=circle,label=""];d1[shape=circle,label=""];d2[shape=circle,label=""];e[shape=circle,label=""];f[shape=circle,label=""];g[shape=circle,label=""];h[shape=circle,label=""];a->b[label="ε"];b->c1[label="ε"];b->d1[label="ε"];c1->c2[label="0"];c2->e[label="ε"];d1->d2[label="1"];d2->e[label="ε"];e->f[label="ε"];f->a[label="ε"];b->e[label="ε"];f->g[label="ε"];g->h[label="1"];})

4. 构造 $(0+1)^*1(0+1)$

    ![](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;a[shape=circle,label=""];b[shape=circle,label=""];c1[shape=circle,label=""];c2[shape=circle,label=""];d1[shape=circle,label=""];d2[shape=circle,label=""];e[shape=circle,label=""];f[shape=circle,label=""];g[shape=circle,label=""];h[shape=circle,label=""];rb[shape=circle,label=""];rc1[shape=circle,label=""];rc2[shape=circle,label=""];rd1[shape=circle,label=""];rd2[shape=circle,label=""];re[shape=circle,label=""];rg[shape=circle,label=""];rh[shape=circle,label=""];a->b[label="ε"];b->c1[label="ε"];b->d1[label="ε"];c1->c2[label="0"];c2->e[label="ε"];d1->d2[label="1"];d2->e[label="ε"];e->f[label="ε"];f->a[label="ε"];b->e[label="ε"];f->g[label="ε"];g->h[label="1"];h->rb[label="ε"];rb->rc1[label="ε"];rb->rd1[label="ε"];rc1->rc2[label="0"];rc2->re[label="ε"];rd1->rd2[label="1"];rd2->re[label="ε"];re->rg[label="ε"];rg->rh[label="1"];})
:::

## 正则表达式的代数定律

1. 结合律和交换律

    - $L + M = M + L$ 并的交换律 
    - $(L + M) + N = L + (M + N)$ 并的结合律
    - $(LM)N = L(MN)$ 连接的结合律 
    - 连接不满足交换律 $LM \neq ML$

2. 单位元 

    - $\emptyset + L = L + \emptyset = L$ 并运算的单位元 $\emptyset$
    - $\epsilon L = L\epsilon = L$ 连接运算的单位元 $\epsilon$

3. 零元

    - $\emptyset L = L\emptyset = \emptyset$ 连接运算的零元

4. 分配律

    - $L(M+N) = LM + LN$ 连接对并满足左分配律
    - $(M+N)L = ML + NL$ 连接对并满足右分配律 

    > $0+01^*=0\epsilon+01^*=0(\epsilon+1^*)=01^*$ 

5. 幂等律

    - $L+L=L$ 并的幂等律

6. 有关闭包的定律 

    - $(L^*)^* = L^*$, 对某语言的闭包再取闭包 
    - $\emptyset^* = \epsilon$ 
    - $\epsilon^* = \epsilon$ 空串的闭包仍然是空串 

7. 发现正则表达式的定律 

    - $L^*L^* = L^*$
    - $(L+M)^* = (L^*M^*)^*$
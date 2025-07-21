---
title: 0x1_有穷状态自动机
published: 2025-05-08
lang: zh
subject: 形式语言与自动机
tags:
  - 形式语言与自动机
  - DFA
  - NFA
description: 形式语言理论与自动机原理
---

## 有穷自动机 FA

### 有穷状态系统  

在系统的运行过程中, 系统的状态在**有限状态**间不断变化, 每个状态可以**迁移到零个或多个状态**, 系统的**输入决定**执行哪个**状态的迁移**.  

> $电视开 \xleftrightharpoons[关闭]{开启} 电视关$  
> $红灯 \leftrightharpoons 黄灯 \leftrightharpoons 绿灯 \leftrightharpoons 红灯$

### 确定型有穷自动机 DFA

#### 定义  

确定的有穷自动机 (DFA, Deterministic Finite Automaton).  

> `确定` 是指输入一个字符, 有明确的一个状态转移.

$A$为五元组$(Q, \Sigma, \delta, q_0, F)$.  

1. $Q$: **有穷**状态集  
2. $\Sigma$: **有穷**输入符号集或字母表；(a finite set of input symbols/alphabet)  
3. $\delta: Q \times \Sigma \to Q$: 状态转移函数(a transition function)  
   > 通过当前状态 $q$ 和输入符号 $\Sigma$ 来确定, 状态该如何切换. 所以要做一个笛卡尔积.
4. $q_0 \in Q$: **初始状态**(a start state)  
   > 系统状态从 $q_0$ 开始.
5. $F \subseteq Q$: 终结状态集或**接受状态**集(a set of accepting states)
   > <u>自动机可以没有接受状态.</u>

#### 表示方式

设计DFA, 在任何由 `0` 和 `1` 构成的串中, 接受含有`01`子串的全部串.  

- 字母表 $\Sigma = \{0,1\}$  
- 有穷状态集 $Q$:  
  - 没发现 `01` 子串, 且 0 也还没出现 ($q_0$-初始状态)  
  - 没发现 `01` 子串, 但刚刚已经读入了一个 `0`, 只需再读入一个 `1` 就符合条件了 ($q_1$)  
  - 已经发现 `01` 子串, 不再关心串的其余部分 ($q_2$-终止)  
- 状态转换函数 $\delta$：
$$ \begin{aligned} & \delta(q_0, 0) = q_1, \, \delta(q_1, 0) = q_1, \, \delta(q_2, 0) = q_2 \\ & \delta(q_0, 1) = q_0, \, \delta(q_1, 1) = q_2, \, \delta(q_2, 1) = q_2 \end{aligned} $$

##### 状态转移图

![有限状态自动机](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node[shape=circle];start[shape=point,label="start"];q0[label="q0"];q1[label="q1"];q2[label="q2",peripheries=2];start->q0[label="start"];q0->q1[label="0"];q1->q2[label="1"];q0->q0[label="1"];q1->q1[label="0"];q2->q2[label="0,1"];})

每个状态 $q$ 对应一个**节点**, 用圆圈表示  
状态转移 $\delta(q, a) = p$ 为一条从 $q$ 到 $p$ 且标记为输入字符 $a$ 的**有向边**.  
**开始状态** $q_0$ 用一个标有 $start$ 的箭头表示.  
**接受状态**的节点, 用双圆圈表示.  

##### 状态转移表

|       |  $0$  | $1$   |
|:-----:|:-----:|:-----:|
| $\rightarrow q_0$ | $q_1$ | $q_0$ |
| $q_1$ | $q_1$ | $q_2$ |
| $*q_2$ | $q_2$ | $q_2$ |

每个状态 $q$ 对应一行, 每个输入字符对应一列.  
若有 $\delta(q, a) = p$, 用第 $q$ 行第 $a$ 列中填入的 $p$ 表示.  
$\rightarrow q$ 表示**初始状态**.  
$* q$ 表示**接受状态**.

##### Examples

1. $\Sigma = \{0, 1\}$, 给出接受全部以 $1$ 结尾的串的 DFA
![给出接受全部以1结尾的串的DFA](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node[shape=circle];start[shape=point,label="start"];q0[label="q0"];q1[label="q1",peripheries=2];start->q0[label="start"];q0->q1[label="1",];q0->q0[label="0"];q1->q0[label="0"];q1->q1[label="1"];})

2. $\Sigma = \{0, 1\}$, 给出接受 $\Sigma^*$ 的 DFA  
![给出接受Sigma*的串的DFA](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node[shape=circle];start[shape=point,label="start"];q0[label="q0",peripheries=2];start->q0[label="start"];q0->q0[label="0,1"];})

3. $\Sigma = \{0, 1\}$, 给出接受 $\{ \epsilon \}$ 结尾的串的 DFA
![给出接受全部的空串的DFA](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node[shape=circle];start[shape=point,label="start"];q0[label="q0",peripheries=2];q1[label="q1"];start->q0[label="start"];q0->q1[label="0,1",];q1->q1[label="0,1"];})

#### 扩展转移函数

扩展状态转移函数 $\delta$ 到字符串, (递归)定义扩展转移函数 $\hat{\delta}$ (delta-hat):

$$
\hat{\delta}(q, w) = \begin{cases}
q, & w = \epsilon \\
\delta(\hat{\delta}(q, x), a), & w = xa
\end{cases}
$$

判断读取字符串最后一个字符的状态, 需要根据前面的字串进行判断. 所以这是一个递归定义, 依次读取字符串中的字符.

> $a$ 是一个字符, $w$ 和 $x$ 是字符串.  
> 当$w = a_0a_1a_2 \dots a_n$, 则有 $\hat{\delta}(q, w) = \delta(\hat{\delta}(q, a_0a_1 \dots a_{n-1}), a_n)$  

#### DFA的语言与正则语言

1. **DFA的语言**: 若 $D = (Q, \Sigma, \delta, q_0, F)$ 是一个DFA, 则 $D$ 识别的语言为:  
   $$L(D) = \{w \in \Sigma^* | \hat{\delta}(q_0, w) \in F\}$$
   即所有能使 DFA 从**开始状态**到达**接受状态**的符号串集合.

2. **正则语言**: 如果语言 $L$ 是某个 DFA $D$ 识别的语言, 则称其为正则语言.
   > $\emptyset$, $\{ \epsilon \}$ 都是正则语言.

### 非确定型有穷自动机 NFA

> `非确定` 是指输入一个字符, 可以跳转到多个状态.  
> NFA 可以简化 DFA. 避免复杂的 DFA.  

NFA 可以在同一状态下, 相同输入可以有多个转移状态.  
> 所以状态转移函数的输出应该是一个**状态集**.  

定义: 

$$A = (Q, \Sigma, \delta, q_0, F)$$

1. $Q$: **有穷**状态集  
2. $\Sigma$: **有穷**输入符号集或字母表
3. $\delta: Q \times (\Sigma \cup \epsilon) \to 2^Q$: 状态转移函数
4. $q_0 \in Q$: **初始状态**
5. $F \subseteq Q$: 终结状态集或**接受状态**集

**Example**: 接受全部以 `01` 结尾的串.  

1. **DFA**  

   |       |  $0$  | $1$   |  
   |:-----:|:-----:|:-----:|  
   | $\rightarrow q_0$ | $q_1$ | $q_0$ |  
   | $q_1$ | $q_1$ | $q_2$ |  
   | $*q_2$ | $q_2$ | $q_2$ |  

2. **NFA**  

   |       |  $0$  | $1$   |  
   |:-----:|:-----:|:-----:|  
   | $\rightarrow q_0$ | $\{ q_0,q_1 \}$ | $\{ q_0 \}$ |  
   | $q_1$ | $\emptyset$ | $\{ q_2 \}$ |  
   | $*q_2$ | \emptyset$ | $\emptyset$ |  

**定理**: 如果语言 $L$ 被 NFA 接受, 当且仅当 $L$ 被 DFA 接受.

#### 子集构造法 Subset Construction

**NFA** $N = (Q_N, \Sigma, \delta_N, q_0, F_N)$ 构造 $D = (Q_D, \Sigma, \delta_D, \{q_0\}, F_D)$, 且 $L(N) = L(D)$.

- 状态集: $Q_D = 2^{Q_N} = \{ \epsilon, \{q_0\}, \{ q_2\}, \{q_3\}, \dots, \{q_1, q_2, q_3\} \}$

   > $Q_N$ 的每个**子集**都是 $Q_D 的一个状态.

- 接受状态集: $F_D = \{ S | S \in Q_N, S \cap F_N \not = \emptyset\}$

   > e.g. $F_N = {q_4,q_5}$, D 有以下几个状态: $A: $\{q_0, q_1\}$, $B: \{q_1,q_4\}$, $C: \{q_4, q_5\}$.  
   > $A \cap F_N = \emptyset$, 所以 A 不是 DFA 的接受状态.  
   > $B \cap F_N = \{q_4\}$, 所以 B 是 DFA 的接受状态.  
   > $C \cap F_N = \{q_4, q_5\}$, 所以 C 是 DFA 的接受状态.  

- 状态转移函数: $\forall S \subset Q_N, \forall a \in \Sigma, \delta_D(S,a) = \cup_{p \in S} \delta_N(p,a)$

   > $\delta_D(S,a)$: $S$ 中的状态 $q_i$ 在 NFA 中能到达的新状态的集合.  
   > $S = \{ q_1, q_2, q_3\}$  
   > $q_1 \rightarrow \{q_4,q_5\}$  
   > $q_2 \rightarrow \{q_3\}$  
   > $q_3 \rightarrow \{q_3,q_4\}$  
   > $\delta_D(S,a) = \{q_3,q_4,q_5\}$  

**Example**:  

NFA:  

|       |  $0$  | $1$   |  
|:-----:|:-----:|:-----:|  
| $\rightarrow q_0$ | $\{ q_0,q_1 \}$ | $\{ q_0 \}$ |  
| $q_1$ | $\emptyset$ | $\{ q_2 \}$ |  
| $*q_2$ | $\emptyset$ | $\emptyset$ |  

构造 DFA:  

|       |  $0$  | $1$   |  
|:-----:|:-----:|:-----:|  
| $\epsilon$ | $\emptyset$ | $\emptyset$ |  
| $\rightarrow \{q_0\}$ | $\{ q_0,q_1 \}$ | $\{ q_0 \}$ |  
| $\{q_1\}$ | $\emptyset$ | $\{ q_2 \}$ |  
| $\{q_2\}$ | $\emptyset$ | $\emptyset$ |
| $\{q_0,q_1\}$ | $\{q_0,q_1\}$ | $\{q_0,q_2\}$ |  
| $\{q_0,q_2\}$ | $\{q_0,q_1\}$ | $\{ q_0 \}$ |  
| $\{q_1,q_2\}$ | $\emptyset$ | $\{ q_2 \}$ |  
| $\{q_0,q_1,q_2\}$ | $\{q_0,q_1\}$| $\{q_0,q_2\}$ |

删除**含有 $\emptyset$的状态**, 删除不能从开始状态到达的状态:  

|       |  $0$  | $1$   |  
|:-----:|:-----:|:-----:|  
| $\rightarrow \{q_0\}$ | $\{ q_0,q_1 \}$ | $\{ q_0 \}$ |  
| $\{q_0,q_1\}$ | $\{q_0,q_1\}$ | $\{q_0,q_2\}$ |  
| $*\{q_0,q_2\}$ | $\{q_0,q_1\}$ | $\{ q_0 \}$ |  

> $\{q_0\} \rightarrow \{q_0,q_1\} \rightarrow \{q_0,q_1\} \rightarrow \{q_0,q_2\}$.  
> 所以能只有这几个是能从初始状态到达的状态.  

### 带空转移的 NFA ($\epsilon$-NFA)  

在不输入任何字符(即输入空串 $\epsilon$)的情况下, 可以**自发的**发生状态转移.

定义:  

$$A = (Q, \Sigma, \delta, q_0, F)$$

1. $Q$: **有穷**状态集  
2. $\Sigma$: **有穷**输入符号集或字母表
3. $\delta: Q \times (\Sigma \cup \epsilon) \to 2^Q$: 状态转移函数
4. $q_0 \in Q$: **初始状态**(a start state)  
5. $F \subseteq Q$: 终结状态集或**接受状态**集

$\epsilon$-闭包($\epsilon$-Closure), 记为 `ECLOSE(q)`. 表示从 q 经过 $\epsilon\epsilon\epsilon\dots\epsilon$序列可到达的全部状态集合, 即经过大于等于 0 个空转移到达的状态集合.

![ECLOSE](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;start_point[shape=plaintext,label="start"];s1[shape=circle,label="1"];s2[shape=circle,label="2"];s3[shape=circle,label="3"];s4[shape=circle,label="4"];s5[shape=circle,label="5"];s6[shape=circle,label="6"];s7[shape=circle,label="7"];start_point->s1;s1->s2[label="%CE%B5"];s1->s5[label="%CE%B5"];s2->s3[label="%CE%B5"];s3->s4[label="%CE%B5"];s5->s6[label="a"];s6->s4[label="b"];s6->s7[label="%CE%B5"];})

$ECLOSE(1) = \{1,2,3,4,5\}$  
$ECLOSE(2) = \{2,3,4\}$

状态集 $S$ 的 $\epsilon$-闭包为:  

$$ECLOSE(S) = \cup_{q \in S} ECLOSE(q)$$

即状态集中元素的 $\epsilon$-闭包并集.

![ECLOSE](https://quickchart.io/graphviz?graph=digraph{rankdir=LR;node[shape=circle];start[shape=plaintext,label="start"];q0[label="q0"];q1[label="q1"];q2[label="q2",color=red];q3[label="q3",shape=doublecircle];start->q0;q0->q0[label="0,1"];q0->q1[label="1"];q1->q2[label="0,1,%CE%B5"];q2->q3[label="0,1,%CE%B5"];})


|       |  $0$  | $1$   | $\epsilon$ | ECLOSE( ) |
|:-----:|:-----:|:-----:|:-----:|:-----:|  
|$\rightarrow q_0$ | $\{q_0\}$ | $\{q_0, q_1\}$ | $\emptyset$ | $\{q_0\}$ |
| $q_1$ | $\{q_2\}$ | $\{q_2\}$ | $\{q_2\}$ | $\{q_1, q_2, q_3\}$ |
| $q_2$ | $\{q_3\}$ | $\{q_3\}$ | $\{q_3\}$ | $\{q_2, q_3\}$ |
| $*q_3$ | $\emptyset$ | $\emptyset$ | $\emptyset$ | $\{q_3\}$ |

扩展转移函数 $\hat{\delta}: Q \times \Sigma^* \rightarrow 2^Q$: 
$$
\hat{\delta}(q, w) = \begin{cases}
ECLOSE(q), & w = \epsilon \\
ECLOSE(\cup_{p \in \hat{\delta}(q,x)}\delta(p, a)), & w = xa
\end{cases}
$$

**定理**: 如果语言 $L$ 被 $\epsilon$-NFA 接受, 当且仅当 $L$ 被 DFA 接受.

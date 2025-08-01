---
title: 0x1_物理层
published: 2025-07-20
lang: zh
subject: 计算机网络
tags:
  - 计算机网络
  - 物理层
---

## 物理接口与物理层设备

物理层负责完成传输媒体上透明地传输比特流.

### 传输介质/传输媒体

#### 导向传输媒体

电磁波沿着固体介质传播.

1. 同轴电缆

    (内) 内导体 $\rightarrow$ 绝缘层 $\rightarrow$ 外屏蔽层 $\rightarrow$ 外保护层 (外)

    > 外屏蔽层, 可以提供很好的抗干扰性.

    `基带信号(基本频带信号)`: 由信源发出的原始信号.  
    `宽度信号`: 调制完的信号.

    ![信号调制](https://imgbed.aberrrrrrr.space/file/1753014560582_20250720212910452.png)

2. 双绞线

    把两根相互绝缘的铜导线按一定密度相互绞合起来就构成了双绞线.

    > 信号在双绞线上的衰减, 会随着信号频率的升高而增大.  
    > 为了降低信号的衰减, 可以使用更粗的导线, 但这又增加了导线的重量和成本.

    双绞线电缆的价格便宜且性能优良, 广泛使用.

3. 光纤(光导纤维)

    (内) 纤芯 $\rightarrow$ 包层 (外)

    ![光纤传输](https://imgbed.aberrrrrrr.space/file/1753007597058_20250720193308296.png)

    1. 多模光纤: 光信号在光纤中使用不同的角度折射.
    2. 单模光纤: 适合长距离传输, 衰减小, 但需要更高的制作成本和更好的光源.

    ![多模光纤和单模光纤](https://imgbed.aberrrrrrr.space/file/1753007657226_20250720193407318.png)

#### 非导向传输媒体

1. 无线电波

    较强的穿透力, 传输距离长, 通信领域广泛使用.

2. 微波

    直线传播.

    - 地面微波接力
    - 卫星通话

3. 红外通信和激光通信

    点对点无线传输, 传输距离短, 传输速率也很低, 并且中间不能有障碍物. 

### 物理层设备

1. 中继器

    增加传输范围, 信号在中继器再次发送.

    输入/输出端口必须具有相同的速率和物理层协议, 传输介质可以不同.

2. 集线器

    相当于一个多端口的中继器.

## 通信基础

## 数据通信系统模型

|源系统(发送端)|传输系统|目的系统(接收端)|
|:----------:|:-----:|:-----------:|
|`信源` $\rightarrow$ `发送设备`|传输系统|`接收设备` $\rightarrow$ `信宿`|

`发送设备`: 信源生成的数字比特流一般要通过发送设备处理后才能够在传输系统中进行传输, 比如调制器(数字信号 $\rightarrow$ 模拟信号).

`接收设备`: 接收传输系统传送过来的信号，并把它转换为能够被目的设备处理的信息。

### 信道

|通信方式|通信过程|信道|
|:-----:|:----:|:--:|
|单工通信(单向通信)|只有一个方向的通信, 没有反方向的交互.|一条信道|
|半双工通信(双向交替通信)|通信双方都可发送信息, 但不能同时发送.|一条信道|
|全双工通信(双向同时通信)|通信双方都可发送和接收信息.|两条信道|

### 数据传输

|传输方式|传输过程|适用场景|
|:-----:|:----:|:-----:|
|串行传输|逐比特按序传输|长距离, 计算机网络|
|并行传输|若干比特同时在多个信道传输|计算机内部, CPU-主存|

### 编码与调制

#### 基带信号与调制

1. `编码(基带调制)`: 基带信号 $\rightarrow$ 数字信号.
2. `带通调制`: 基带信号 $\rightarrow$ 模拟信号.

![信号调制](https://imgbed.aberrrrrrr.space/file/1753014560582_20250720212910452.png)

**调制方法**:

1. 调幅(AM): 即载波的振幅随基带数字信号而变化. (载波一般指被调制以传输信号的波形, 一般为正弦波)
2. 调频(FM): 即载波的频率随基带数字信号而变化. 例如, 0 或 1 分别对应于频率 $f1$ 或 $f2$.
3. 调相(PM): 即载波的初始相位随基带数字信号而变化. 例如, 0 或 1 分别对应于相位 0 度或 180 度.

#### 码元

数据传输的单位.

模拟信号中, 一个波形就是一个码元.

- 若一个码元对应$2$种基本波形 (离散值), 则称二进制码元, 代表$1$比特信息.
- 若一个码元对应$8$种基本波形 (离散值), 则称八进制码元, 代表$3$比特信息.

![模拟信号码元](https://imgbed.aberrrrrrr.space/file/1753015099903_20250720213806924.png)

#### 速率

1. 码元传输速率/波特率: 表示单位时间内传输的码元数或信号变化次数, 单位是波特 (Baud), 1 波特表示每秒传输 1 个码元.

2. 信息传输速率/比特率: 表示单位时间内传输的比特数, 单位是比特/秒 (bps).

> 若一个码元对应 $N$ 个比特, 则比特率是波特率的 $N$ 倍。若一个比特对应 $N$ 个码元, 则码元率是比特率的 $N$ 倍.

#### 正交振幅调制

载波的`相位`和`振幅`结合起来调制.

例如, 若采用 4 种相位, 每个相位具有 4 种幅度的 QAM 调制技术, 则代表每个相位对应 4 种振幅的基本波形, 总共有 16 种基本波形, 因此一个码元可以代表 16 种不同信号, 即 16 进制码元.

#### 常见编码

![常见编码](https://imgbed.aberrrrrrr.space/file/1753016938731_20250720220845132.png)

| 二进制 | 非归零编码 (NRZ) | 归零编码<br />(RZ) | 反向非归零编码 (NRZI) | 曼彻斯特编码 | 差分曼彻斯特编码 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0| 保持低电平 | 开始: 低电平<br />结束: 归零 | 电平跳变 | 高 $\rightarrow$ 低 | 开始: 电平跳变 |
| 1 | 保持高电平 | 开始: 高电平<br />结束: 归零 | 电平不变 | 低 $\rightarrow$ 高 | 开始: 电平不变 |

### 信道的极限容量

信息在信道的极限传输速度.

#### 频率范围

信道能通过的频率范围是有限的. 信号中的许多高频分量往往不能通过信道, 否则在传输中就会衰减, 导致接收端收到的信号波形失去码元之间的清晰界限, 这种现象称为**码间串扰**.

奈氏准则: 在带宽为 $W(Hz)$ 的低通信道中, 若不考虑噪声影响, 则码元传输的最高速率是 $2W$ (码元/秒). 若传输速率超过此上限, 就会出现严重的码间串扰, 使接收端无法正确接收码元.

$理想低通信道下的极限数据传输速率=2W\log_2 V$, 用 $V$ 表示每个码元的离散值数目.

单位: b/s

> 由于码元传输速率受奈氏准则制约, 所以要提高数据传输速率, 就要设法使每个码元携带更多比特的信息量, 此时需要采用多元制的调制方法.

#### 信噪比

1. $信噪比 = \dfrac{信号平均功率}{噪声平均功率} = S/N$  
    单位: 分贝 dB

2. 香农公式  
    信道的极限信息传输速率 $C=W\log_2(1+S/N)$  
    单位: bit/s

信噪比越大, 信息的极限传输速率就越高.


## 模拟信号与数字信号的转换

Pulse Code Modulation, **PCM** 技术通过对模拟信号进行采样, 量化, 编码, 将**连续的模拟信号**转换为**离散的数字信号**.

`采样`:  对模拟信号进行周期性的扫描.  
`采样率`: 单位事件内的采样次数.  
`量化`: 将采样得到的电平幅值按照一定的分级标度转换为对应的数值并取整.  

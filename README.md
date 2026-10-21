# JKeyboard

JKeyboard 是一款开源的 **7 列 × 5 行分体式人体工学机械键盘**。PCB 轮廓、定位板与键位均由 [Ergogen](https://github.com/ergogen/ergogen) 通过 YAML 参数化生成，主控使用 nice!nano，固件基于 [ZMK](https://zmk.dev/)。

> 项目仍在整理重构，部分目录与文档尚不完善。

## 特性

- 7 × 5 分体布局，左右手镜像
- MX 轴，支持热插拔，混合 1U / 1.25U / 1.5U 键帽
- nice!nano 无线主控，ZMK 固件
- Ergogen 参数化设计，修改 `config.yaml` 即可调整布局
- 规划包含 PCB、定位板、外壳与 3D 打印模型（部分仍在整理）

## 仓库结构

| 路径 | 说明 |
| --- | --- |
| `000_doc/` | 设计文档、原理说明与图片 |
| `001_ref/` | 第三方参考项目，以 git submodule 引入 |
| `002_config/` | Ergogen 配置、自定义封装与构建脚本 |
| `002_config/config.yaml` | 键盘主配置 |
| `002_config/footprints/` | 自定义封装（MX 轴、nice!nano 等） |
| `002_config/utils/` | 构建、预览脚本 |
| `003_output/` | Ergogen 生成结果（不入库） |
| `004_ZMK/` | ZMK 固件配置 |
| `005_3Dmodel/` | 外壳 / 3D 打印模型 |

## 快速开始

### 依赖

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20 及以上（Ergogen 运行环境）
- [mise](https://mise.jdx.dev/)（可选，用于统一构建命令）
- Python 3（仅用于本地预览生成结果）

### 获取代码

```bash
git clone --recurse-submodules https://github.com/WangsanAndWangcai/JKeyboard.git
cd JKeyboard
```

如果已经克隆但未拉取子模块：

```bash
git submodule update --init --recursive
```

### 生成 PCB 与轮廓文件

```bash
# 首次使用先安装 Ergogen 依赖
(cd 001_ref/ergogen && npm install)

# 方式一：mise
mise run build

# 方式二：直接执行脚本
zsh 002_config/utils/build.zsh
```

生成结果位于 `003_output/`。

### 本地预览

```bash
mise run server          # 默认 http://localhost:8000
zsh 002_config/utils/server.zsh 8080   # 指定端口
```

## 已知问题

1. **蓝牙稳定性**：部分国产蓝牙芯片兼容性较差。主控没有板载蓝牙时需外接 USB 蓝牙模块，个别型号容易丢帧，导致输入错误。临时方案是改用 USB 有线连接。
2. **PCB 未做双面复用**：左右手目前使用两块独立 PCB，没有设计成双面可用。若想节省打样成本，可以改为正反复用设计，省去一次打板费用。
3. **外壳电源开孔位置偏差**：装上外壳后，电源开关被包在壳体内部，操作不便。因此目前未使用外壳，后续可能会调整开孔位置。

## 许可证

本项目采用 **MIT License** 发布。

```
Copyright (c) 2026 WangsanAndWangcai
```

你可以自由使用、修改、分发本项目，包括商业使用，只需保留版权声明和许可证文本。完整条款见 [LICENSE](LICENSE)。

### 第三方组件

`001_ref/` 下的项目通过 git submodule 引入，**各自保留原有许可证**（当前均为 MIT）：

| 项目 | 许可证 | 用途 |
| --- | --- | --- |
| [ergogen](https://github.com/ergogen/ergogen) | MIT | 参数化生成 PCB / 轮廓 |
| [redox-keyboard](https://github.com/mattdibi/redox-keyboard) | MIT | 7 × 5 列错位布局参考 |
| [caldera-keyboard](https://github.com/christianselig/caldera-keyboard) | MIT | 分体键盘结构参考 |

再分发时请保留各项目原始的版权与许可证声明。

## 项目来源与致谢

JKeyboard 的 **7 × 5 列错位布局参考自 Mattia Dal Ben 的 [Redox](https://github.com/mattdibi/redox-keyboard) 项目**（MIT License，Copyright © 2018 Mattia Dal Ben）。

本项目不是 Redox 的官方分支，而是在其布局思路基础上，使用 Ergogen 重新实现，并针对 nice!nano 主控、MX 热插拔、1.25U / 1.5U 混合键位、螺丝孔与外壳等做了调整。Redox 的原始许可证见 `001_ref/redox-keyboard/LICENSE`。

同时感谢 Ergogen、ZMK 以及所有参考项目的作者。若本项目使用了你的设计或代码，欢迎联系补充署名。


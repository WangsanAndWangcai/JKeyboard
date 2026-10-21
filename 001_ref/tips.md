这个文件夹下的项目对本项目的启发很大，感谢前人的开源。
其中，caldera-keyboard 是本项目的火种，自己做一个键盘的想法就来源于此, 但是 caldera-keyboard 使用的是 ch1350 系列的矮轴，价格偏贵，所以复刻到一般才重头开始做jkeyboard
ergogen 是个很好的工具，几乎串联了jekyboard的所有工作，原理图连接，pcb生成，外壳轮廓绘制，都可以使用ergogen一次配好。
相比较与 caldera-keyboard 的键盘布局,redox-keyboard 的键盘布局对我来说更完美一点


# 参考项目

本目录下的第三方项目均以 **git submodule** 引入，不会把对方源码混入主仓库。

## 清单

| 目录 | 项目 | 用途 | 许可证 |
| --- | --- | --- | --- |
| `ergogen/` | [ergogen](https://github.com/ergogen/ergogen) | 参数化生成键盘 PCB / 定位板 | MIT |
| `redox-keyboard/` | [redox-keyboard](https://github.com/mattdibi/redox-keyboard) | 7 × 5 列错位布局参考（本项目布局来源） | MIT |
| `caldera-keyboard/` | [caldera-keyboard](https://github.com/christianselig/caldera-keyboard) | 分体键盘结构参考 | MIT |

## 常用命令

```bash
# 首次克隆时连同子模块一起拉取
git clone --recurse-submodules <repo-url>

# 已克隆的项目补拉子模块
git submodule update --init --recursive

# 更新子模块到各自记录的版本
git submodule update --remote --merge
```

## 许可证说明

- 主项目采用 **MIT License**，完整条款见仓库根目录 `LICENSE`。
- `redox-keyboard/` 的版权归 Mattia Dal Ben（Copyright © 2018），本项目参考其 7 × 5 列错位布局，并保留原始 MIT 声明。
- 本目录中的子模块**各自保留原有许可证**（当前均为 MIT）。
- 再分发时请保留各项目原始的版权与许可证声明。
- 新增参考项目时，请在此表中登记来源与许可证。

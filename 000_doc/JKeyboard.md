# JKeyboard 设计文档

本文档记录 JKeyboard 的整体设计、目录职责与后续计划。

## 项目定位

JKeyboard 是一款 7 列 × 5 行的分体式人体工学机械键盘：

- 左右手分体设计，键位互为镜像
- MX 轴热插拔，混合 1U / 1.25U / 1.5U 键帽
- nice!nano 主控，ZMK 无线固件
- Ergogen 参数化生成 PCB 与定位板
- 布局参考 Redox（MIT），针对 nice!nano、热插拔与混合键帽重新实现

## 目录说明

```
P000_JKeyBoard/
├── 000_doc/            设计文档与图片
├── 001_ref/            第三方参考项目（git submodule）
├── 002_config/         配置与脚本
│   ├── config.yaml     Ergogen 主配置
│   ├── footprints/     自定义封装
│   └── utils/          构建、预览脚本
├── 003_output/         Ergogen 生成结果（不入库）
├── 004_ZMK/            ZMK 固件配置
└── 005_3Dmodel/        外壳 / 3D 打印模型
```

## 设计流程

1. 在 `002_config/config.yaml` 中定义单位、点位、轮廓与 PCB。
2. 运行 `zsh 002_config/utils/build.zsh`（或 `mise run build`），由 Ergogen 生成到 `003_output/`。
3. 将生成的 KiCad 工程送入 PCB 打样流程。
4. 在 `004_ZMK/` 中维护固件配置与键位映射。
5. 在 `005_3Dmodel/` 中维护外壳与 3D 打印文件。

## 设计要点

> 待补充：键位布局图、列错位（stagger）设计依据、主控与电池仓位置、螺丝孔与定位板厚度等。

## 待办

- [ ] 补充键盘配列图与键位说明
- [ ] 补充 PCB 层叠、板厚与打样参数
- [ ] 补充外壳结构与装配说明
- [ ] 补充物料清单（BOM）
- [ ] 补充固件烧录与键位修改教程

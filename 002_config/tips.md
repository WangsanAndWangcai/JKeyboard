# Ergogen 配置说明

本目录存放 JKeyboard 的 Ergogen 配置、自定义封装与构建脚本。

## 目录内容

| 路径 | 说明 |
| --- | --- |
| `config.yaml` | 键盘主配置：units / points / outlines / pcbs |
| `footprints/` | 自定义封装，如 MX 轴、nice!nano、螺丝孔 |
| `utils/` | 构建与本地预览脚本 |

## Ergogen 来源

Ergogen 通过 git submodule 放在 `001_ref/ergogen/`，不复制到本目录。
首次使用需要初始化子模块并安装依赖：

```bash
git submodule update --init --recursive
(cd 001_ref/ergogen && npm install)
```

## 生成

```bash
# 仓库根目录执行
mise run build

# 或
zsh 002_config/utils/build.zsh
```

生成结果写入 `003_output/`。模板变量、锚点、轮廓等 Ergogen 语法可参考 `001_ref/ergogen/` 内的文档，或 <https://docs.ergogen.xyz/>。

## 许可证

本目录中的原创配置同样采用 **MIT License**，版权归 WangsanAndWangcai 所有。
Ergogen 本身为 MIT，详见 `001_ref/ergogen/LICENSE`。

> 注意：`footprints/` 中部分封装可能改编自 Ergogen 内置封装或其他 MIT 项目。
> 开源发布前建议逐个确认来源，并在文件顶部保留原作者版权声明；无法确认来源的封装不要直接当作自己的作品重新授权。

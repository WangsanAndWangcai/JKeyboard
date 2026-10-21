#!/usr/bin/env zsh
# SPDX-License-Identifier: MIT
# Copyright (C) 2026 WangsanAndWangcai
#
# 使用 Ergogen 生成 PCB 轮廓、定位板等输出。
# 额外参数会原样传给 Ergogen CLI，例如：build.zsh --debug

set -euo pipefail

ROOT=${0:A:h:h:h}
ERGOGEN="$ROOT/001_ref/ergogen/src/cli.js"
# 传入目录而不是单个文件，Ergogen 才会一并加载 footprints/
CONFIG_DIR="$ROOT/002_config"
OUTPUT="$ROOT/003_output"

if [[ ! -f "$ERGOGEN" ]]; then
  print -u2 "找不到 Ergogen：$ERGOGEN"
  print -u2 "请先执行：git submodule update --init --recursive"
  exit 1
fi

if [[ ! -d "$ROOT/001_ref/ergogen/node_modules" ]]; then
  print -u2 "Ergogen 依赖尚未安装，请先执行："
  print -u2 "  (cd $ROOT/001_ref/ergogen && npm install)"
  exit 1
fi

node "$ERGOGEN" "$CONFIG_DIR" --output "$OUTPUT" --clean "$@"

# --clean 会清空输出目录，重新保留占位文件
touch "$OUTPUT/.gitkeep"

print "构建完成，输出目录：$OUTPUT"

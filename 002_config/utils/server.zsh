#!/usr/bin/env zsh
# SPDX-License-Identifier: MIT
# Copyright (C) 2026 WangsanAndWangcai
#
# 在本地启动静态服务器，预览 003_output/ 中的生成结果。
# 用法：server.zsh [端口]，默认 8000

set -euo pipefail

ROOT=${0:A:h:h:h}
OUTPUT="$ROOT/003_output"
PORT=${1:-8000}

if [[ ! -d "$OUTPUT" ]]; then
  print -u2 "输出目录不存在：$OUTPUT，请先运行 build.zsh"
  exit 1
fi

print "预览地址：http://localhost:$PORT"
cd "$OUTPUT"
exec python3 -m http.server "$PORT"

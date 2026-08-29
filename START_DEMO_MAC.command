#!/bin/bash

cd "$(dirname "$0")" || exit 1

clear
echo "========================================"
echo "  澳洲大冒险 MVP 正在启动"
echo "========================================"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "没有检测到 Node.js。"
  echo "请先安装 Node.js LTS: https://nodejs.org/"
  echo
  echo "安装后，再双击 START_DEMO_MAC.command。"
  read -r -p "按回车键关闭窗口..."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "没有检测到 npm，请重新安装 Node.js LTS。"
  echo
  read -r -p "按回车键关闭窗口..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "第一次运行需要安装依赖，可能需要几分钟。"
  echo
  npm install --no-audit --no-fund
  if [ $? -ne 0 ]; then
    echo
    echo "依赖安装失败。请检查网络后再双击本文件。"
    read -r -p "按回车键关闭窗口..."
    exit 1
  fi
fi

echo
echo "稍后会自动打开网页。"
echo "如果没有自动打开，请手动访问: http://localhost:3000"
echo
echo "这个窗口不要关闭；关闭窗口，服务器就会停止。"
echo

(sleep 4 && open "http://localhost:3000") &
npm run dev

echo
echo "服务器已停止。"
read -r -p "按回车键关闭窗口..."

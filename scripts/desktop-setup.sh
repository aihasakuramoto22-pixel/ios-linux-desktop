#!/bin/sh
# iSH内で実行: 軽量デスクトップ(Xvfb + fluxbox + x11vnc)を起動。パッケージは同梱済み（オフライン可）
set -e
need=""
for c in Xvfb x11vnc fluxbox xterm; do command -v $c >/dev/null || need=1; done
[ -n "$need" ] && apk add xvfb x11vnc fluxbox xterm   # 未同梱の場合のみ（要ネット）
pgrep Xvfb >/dev/null || { Xvfb :0 -screen 0 1024x640x16 -nolisten tcp & sleep 3; }
export DISPLAY=:0
pgrep fluxbox >/dev/null || { fluxbox >/dev/null 2>&1 & }
pgrep x11vnc >/dev/null || x11vnc -display :0 -localhost -forever -nopw -shared -bg -o /tmp/x11vnc.log
echo "VNCビューアで 127.0.0.1:5900 に接続してください"

#!/bin/sh
# iSH内で実行: 軽量デスクトップ(Xvfb + fluxbox + x11vnc)を導入・起動
set -e
apk add xvfb x11vnc fluxbox xterm
Xvfb :0 -screen 0 1024x640x16 &
sleep 2; DISPLAY=:0 fluxbox &
x11vnc -display :0 -localhost -forever -nopw -bg
echo "VNCビューアで 127.0.0.1:5900 に接続してください"

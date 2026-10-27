# ios-linux-desktop

iPhone上でオフライン動作するLinuxデスクトップ（自分用・サイドロード）。
エンジンは [iSH](https://github.com/ish-app/ish)（GPL-3.0、JIT不要のx86エミュレータ「asbestos」）。無料Apple IDではJIT/Hypervisorが使えないため、純粋エミュレーション方式を採用。本リポジトリもGPL-3.0。

## 現在のマイルストーン
- ✅ GitHub ActionsでiSHベースの署名なしIPAをビルド → Alpine Linuxのシェルが起動
- ✅ デスクトップ部品（Xvfb / fluxbox / xterm / x11vnc）をLinux環境に同梱済み → **完全オフライン**で起動可能

## デスクトップの起動
アプリを開いてシェルで `desktop` と入力 → App Storeの無料VNCビューア（例: RealVNC Viewer）で `127.0.0.1:5900` に接続。
※同梱環境は初回起動時に展開されます。以前のバージョンを入れていた場合はアプリを削除してから入れ直してください。
- 🔜 アプリ内VNCビューア・タッチ→マウス操作（それまではApp Storeの無料VNCビューアで127.0.0.1:5900に接続）

## インストール手順（Windows）
1. GitHubの「Actions」タブ → 最新の緑の実行 → `LinuxDesktop-unsigned-ipa` をダウンロードして解凍
2. Windowsに [iTunes(Apple公式サイト版)](https://www.apple.com/itunes/) と [Sideloadly](https://sideloadly.io/) をインストール
3. iPhoneをUSB接続 → Sideloadlyに `.ipa` をドラッグ → 無料Apple IDを入力 → Start
4. iPhone: 設定 → 一般 → VPNとデバイス管理 → 自分のApple IDを「信頼」
5. iOS 16以降は 設定 → プライバシーとセキュリティ → デベロッパモード をオン

## 7日ごとの再署名
無料Apple IDの証明書は7日で失効します。手順3をもう一度実行すればデータを残したまま更新できます（SideloadlyのAuto-refreshも可）。

## 性能と制限
- JITなしのエミュレーションのため、ネイティブの数十分の一程度の速度。fluxbox+xtermは実用、Xfceやブラウザは重い
- 無料アカウントは同時に3アプリまで・App Store公開不可

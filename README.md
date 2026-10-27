# ios-linux-desktop

## 🌐 Webアプリ版（USBケーブル不要・おすすめ）
**https://aihasakuramoto22-pixel.github.io/ios-linux-desktop/**

1. iPhoneのSafariで上のURLを開く
2. 共有ボタン → 「ホーム画面に追加」
3. **最初の1回はネットにつないだまま**ホーム画面のアイコンから開き、「起動」を押す（約25MBを保存。完了までそのまま待つ）
4. 2回目以降は**機内モードでも動きます**

操作: タップ=クリック、指でなぞる=マウス移動、2本指タップ=右クリック、「⌨ キーボード」で文字入力、「状態を保存／保存から再開」で続きから。
中身: [v86](https://github.com/copy/v86)（BSD-2、WebAssemblyのx86エミュレータ）＋ [Tiny Core Linux 11.1](http://tinycorelinux.net)（GPL-2、FLWMデスクトップ）＋ SeaBIOS（LGPL-3）。各ソースは各リンク先で入手できます。
制限: 起動まで30〜90秒。エミュレーションなので動作は遅め。保存した内容は再起動で消えます（「状態を保存」を使ってください）。Safariのデータを消すとキャッシュも消えます。

---
## iOSアプリ版（Sideloadly・USB接続が必要）

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

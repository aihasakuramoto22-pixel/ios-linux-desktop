#!/bin/sh
# Downloads third-party binaries (not committed): v86 (BSD-2), SeaBIOS/VGABIOS (LGPL-3), Tiny Core Linux (GPL-2)
set -e; cd "$(dirname "$0")"; mkdir -p v86 img
curl -fsSL https://registry.npmjs.org/v86/-/v86-0.5.472.tgz | tar xz
cp package/build/libv86.js package/build/v86.wasm package/LICENSE v86/ && rm -rf package
for b in seabios.bin vgabios.bin; do curl -fsSL https://github.com/copy/v86/raw/master/bios/$b -o v86/$b; done
curl -fsSL https://distro.ibiblio.org/tinycorelinux/11.x/x86/release/TinyCore-11.1.iso -o img/linux.iso

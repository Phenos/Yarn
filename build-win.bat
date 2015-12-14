electron-packager ./build Yarn --platform=win32 --arch=ia32 --version=0.36.0
rem electron-builder ./build --platform=win --out=./release --config=electronconfig.json
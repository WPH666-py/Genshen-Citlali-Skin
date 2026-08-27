@echo off
rem 打包茜特拉莉皮肤扩展为 .vsix（需要 Node.js / npm）
cd /d "%~dp0"
where vsce >nul 2>nul || call npm install -g @vscode/vsce
call vsce package
pause

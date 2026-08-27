@echo off
rem 茜特拉莉（Citlali）桌面皮肤启动器
rem 右键本文件 -> 发送到 -> 桌面快捷方式，即可一键启动
start "" powershell.exe -NoProfile -STA -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0茜特拉莉皮肤.ps1"
exit /b 0

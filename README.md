# Favicon Extractor Chrome插件

这个Chrome插件可以提取当前网页的所有图标(favicon)，支持复制图标链接或直接下载图标。

## 准备工作

在使用此插件之前，你需要将SVG格式的图标转换为PNG格式：

1. 转换图标文件：
   - 将 `images/icon16.svg` 转换为 `images/icon16.png`
   - 将 `images/icon48.svg` 转换为 `images/icon48.png`
   - 将 `images/icon128.svg` 转换为 `images/icon128.png`
   - 将 `images/broken.svg` 转换为 `images/broken.png`

   可以使用在线SVG到PNG转换工具，如 https://svgtopng.com/

## 安装插件

1. 打开Chrome浏览器，进入扩展程序页面：`chrome://extensions/`
2. 开启右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"按钮
4. 选择本插件的文件夹

## 使用方法

1. 访问任意网页
2. 点击浏览器工具栏中的插件图标
3. 插件将自动提取当前网页的所有图标并显示
4. 可以复制图标链接或下载图标

## 功能特点

- 自动提取当前网页的所有图标
- 显示图标类型和尺寸信息
- 支持复制图标链接
- 支持下载图标文件
- 如果网页没有明确指定图标，会尝试获取默认的favicon.ico

## 文件结构

- `manifest.json`：插件配置文件
- `popup.html`：弹出窗口HTML
- `popup.css`：弹出窗口样式
- `popup.js`：弹出窗口逻辑
- `images/`：插件图标
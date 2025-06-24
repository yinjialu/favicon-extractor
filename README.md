# Favicon Extractor - 国际化 Chrome 扩展

这个 Chrome 扩展可以提取当前网页的所有图标(favicon)，支持复制图标链接或直接下载图标。现已支持多语言界面，自动适配浏览器语言设置。

## 🌍 国际化功能

扩展支持以下语言：

- **English (en)**: 英文界面
- **简体中文 (zh_CN)**: 中文界面

扩展会自动检测您的浏览器语言设置并显示对应的界面语言。如果您的浏览器语言不在支持列表中，将默认显示英文界面。

## 🚀 功能特性

- ✨ **快速响应**: 点击图标立即显示弹窗，loading 状态流畅
- 🌍 **多语言支持**: 自动适配浏览器语言，支持中文和英文
- 📦 **全面提取**: 支持 favicon、Apple Touch Icon、Web Manifest 等多种图标类型
- 💾 **便捷操作**: 一键复制链接或下载图标
- 🎨 **现代界面**: 支持明暗主题切换

## 准备工作

在使用此插件之前，你需要将 SVG 格式的图标转换为 PNG 格式：

1. 转换图标文件：

   - 将 `images/icon16.svg` 转换为 `images/icon16.png`
   - 将 `images/icon48.svg` 转换为 `images/icon48.png`
   - 将 `images/icon128.svg` 转换为 `images/icon128.png`
   - 将 `images/broken.svg` 转换为 `images/broken.png`

   可以使用在线 SVG 到 PNG 转换工具，如 <https://svgtopng.com/>

## 安装插件

1. 打开 Chrome 浏览器，进入扩展程序页面：`chrome://extensions/`
2. 开启右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"按钮
4. 选择本插件的文件夹

## 🔧 语言切换测试

要测试不同语言界面：

1. **切换到中文**:

   - 打开 Chrome 设置 (`chrome://settings/`)
   - 搜索"语言"
   - 将中文设置为首选语言
   - 重新加载扩展

2. **切换到英文**:
   - 打开 Chrome 设置
   - 搜索"Language"
   - 将 English 设置为首选语言
   - 重新加载扩展

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
- 多语言界面支持
- 立即响应的用户体验
- 如果网页没有明确指定图标，会尝试获取默认的 favicon.ico

## 文件结构

- `manifest.json`：插件配置文件
- `popup.html`：弹出窗口 HTML
- `popup.css`：弹出窗口样式
- `popup.js`：弹出窗口逻辑
- `images/`：插件图标
- `_locales/`：国际化语言文件
  - `en/messages.json`：英文语言包
  - `zh_CN/messages.json`：中文语言包

## 开发说明

### 添加新语言

如需添加新语言支持：

1. 在 `_locales/` 目录下创建新语言文件夹
2. 创建对应的 `messages.json` 文件
3. 参考现有语言文件的格式进行翻译

### 主要国际化键

- `appName`: 应用名称
- `title`: 标题
- `extracting`: 正在提取...
- `noIconsFound`: 未找到图标
- `copyLink`: 复制链接
- `download`: 下载
- 等等...

# 淑皎的生日祝福 🎂

一个用 HTML/CSS/JS 制作的互动生日祝福网页，包含完整的动画叙事流程。

**线上访问：** https://17iii.github.io/shujiao-birthday/

## 效果流程

1. 开场问候 + 3-2-1 倒计时
2. 生日宣告 + 聊天框祝福
3. 逐行文字（「第一次以恋人的身份……」）
4. 对话气泡（「我们要一直在一起！」）
5. 星空、气球、烟花、彩带
6. 结尾信封：爱心封口翻开 → 信纸抽出 → 展开 → 祝福逐字浮现
7. 背景音乐：特别的人（方大同）

## 自定义

所有内容都在 **`config.js`** 中修改，无需改动其他文件：

- `name` — 收件人名字
- `sections` — 各段落的文案、顺序（可增删调序）
- `letter.paragraphs` — 信纸内容（数组，每项一个段落）
- `music` — 背景音乐文件路径
- `colors` — 主题颜色（支持深色/浅色切换）

## 本地运行

直接双击 `index.html` 即可，或起个本地服务：

```bash
npx serve .
```

## 部署

GitHub Pages 已启用（main 分支根目录）。修改后提交推送，约 1 分钟自动生效：

```bash
git add -A
git commit -m "更新内容"
git push
```

## 目录结构

```
├── index.html          # 入口
├── config.js           # ✏️ 内容配置（唯一需要改的文件）
├── style/main.css      # 样式
├── script/main.js      # 引擎（时间轴 / 主题 / 音乐）
├── script/components/  # 各段落组件（greeting、letter、dialog…）
├── img/                # 图片资源
└── music/              # 背景音乐
```

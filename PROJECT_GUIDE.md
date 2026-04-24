# 国筑万象 - 项目代码介绍与使用说明

## 📋 项目简介

**国筑万象**是一个展示中国古代建筑成就（1911年以前）的信息可视化网站，涵盖民居、官府、皇宫、桥梁四大类型建筑，通过交互式图表、数据可视化和多媒体展示，呈现中国古代建筑的营造智慧。

**在线访问地址：** https://dong147258369.github.io/-/

---

## 🏗️ 项目结构

```
/
├── index.html              # 首页（自动跳转到四大专题）
├── topics.html             # 四大专题主页面（树形图展示）
├── topic-minju.html        # 民居专题详情页
├── topic-guanfu.html       # 官府专题详情页
├── topic-huangong.html     # 皇宫专题详情页
├── topic-qiaoliang.html    # 桥梁专题详情页
├── dashboard.html          # 数据大屏（地图、图表统计）
├── craft.html              # 建筑工艺词云展示
├── craft-detail.html       # 工艺详情介绍
├── timeline.html           # 朝代时间轴
├── overview.html           # 营造拾趣（故事、文学、知识）
├── ai-chat.html            # 营造助手（智能问答）
├── detail.html             # 单个建筑详情页
│
├── css/                    # 样式文件
│   ├── style.css          # 全局样式（含古建筑风格配色）
│   ├── home.css           # 首页样式
│   └── ai-chat.css        # 聊天界面样式
│
├── js/                     # JavaScript逻辑文件
│   ├── data.js            # 建筑数据集合
│   ├── topics.js          # 四大专题树形图逻辑
│   ├── main.js            # 数据大屏主逻辑
│   ├── home.js            # 首页交互逻辑
│   ├── timeline.js        # 时间轴逻辑
│   ├── overview.js        # 营造拾趣逻辑
│   ├── ai-chat.js         # 问答系统逻辑
│   ├── detail.js          # 详情页逻辑
│   ├── craft.js           # 工艺词云逻辑
│   └── craft-detail.js    # 工艺详情逻辑
│
├── data/                   # 数据文件
│   └── china.json         # 中国地图GeoJSON数据
│
└── images/                 # 图片资源
    ├── detailed_images/   # 建筑详细图片
    │   ├── icon_minju.png      # 民居图标
    │   ├── icon_guanfu.png     # 官府图标
    │   ├── icon_huangong.png   # 皇宫图标
    │   ├── icon_qiaoliang.png  # 桥梁图标
    │   └── background.png      # 页面背景图
    └── featured/          # 精选建筑图片
```

---

## 🎨 核心技术栈

### 1. 前端基础
- **HTML5** - 语义化页面结构
- **CSS3** - 样式与动画效果
- **原生 JavaScript** - IIFE模块化编程

### 2. 可视化库
- **ECharts 5** - 树形图、地图散点、柱状图、饼图等数据可视化
- **TagCloud** - 3D球形词云展示

### 3. 特色样式设计
- **古建筑风格配色方案**
  - 主色调：朱砂红 `#8B0000`（官府建筑）
  - 强调色：金黄色 `#DAA520`（皇宫屋顶）
  - 背景色：深棕褐 `#1a1510`（木质建筑）
  - 文字色：米黄色 `#F5E6C8`（宣纸质感）

---

## 📱 页面功能详解

### 1. 四大专题页面 (topics.html)

**核心功能：**
- **交互式树形图**：使用ECharts radial布局展示建筑层级关系
- **分类图标**：民居、官府、皇宫、桥梁四大类使用独立图标
- **建筑节点**：统一使用菱形（◊）标记，按类型着色
- **悬浮窗**：点击建筑节点弹出详情弹窗，含建筑介绍+词云

**代码关键部分：**
```javascript
// js/topics.js - 树形图配置
const TYPE_CONFIG = {
  minju: { name: '民居', color: '#8B4513', icon: 'images/detailed_images/icon_minju.png' },
  guanfu: { name: '官府', color: '#8B0000', icon: 'images/detailed_images/icon_guanfu.png' },
  huangong: { name: '皇宫', color: '#DAA520', icon: 'images/detailed_images/icon_huangong.png' },
  qiaoliang: { name: '桥梁', color: '#4a5568', icon: 'images/detailed_images/icon_qiaoliang.png' }
};

// 建筑节点使用菱形形状
const TYPE_SHAPES = {
  minju: 'diamond', guanfu: 'diamond', 
  huangong: 'diamond', qiaoliang: 'diamond'
};
```

### 2. 数据大屏 (dashboard.html)

**核心功能：**
- **交互地图**：中国地图散点展示建筑分布
- **筛选功能**：按类型、朝代筛选建筑
- **对比模式**：支持两座建筑对比
- **统计图表**：类型占比饼图、朝代分布柱状图

### 3. 专题详情页 (topic-*.html)

**四个专题页面结构相同：**
- 顶部导航标题
- 专题介绍文字
- 数据图表（各专题展示不同维度的统计）
- 建筑列表卡片

### 4. 建筑工艺 (craft.html)

**核心功能：**
- **3D词云球体**：展示斗拱、榫卯、飞檐等传统工艺
- **点击交互**：点击工艺关键词进入详情介绍

### 5. 营造助手 (ai-chat.html)

**核心功能：**
- 基于本地 `data.js` 数据的规则匹配问答
- 支持查询建筑信息、工艺介绍等

---

## 🚀 本地运行指南

### 方式一：Python HTTP服务器（推荐）

```bash
# 进入项目目录
cd F:\github\Huaxia-Architecture---Ancient-Chinese-Architectural-Achievements-main

# 启动Python服务器
python -m http.server 8080

# 浏览器访问
http://localhost:8080
```

### 方式二：Node.js http-server

```bash
# 安装http-server（全局）
npm install -g http-server

# 启动服务器
http-server -p 8080

# 或直接使用npx
npx http-server -p 8080
```

### 方式三：VS Code Live Server插件

1. 安装VS Code插件 "Live Server"
2. 右键点击 `index.html` → "Open with Live Server"

**⚠️ 注意**：必须使用HTTP服务器打开，直接双击HTML文件会导致地图数据无法加载（浏览器会拦截本地fetch请求）。

---

## 📝 代码修改指南

### 1. 修改品牌名称

编辑所有HTML文件中的标题：
```html
<!-- 修改前 -->
<h1>华夏营造</h1>

<!-- 修改后 -->
<h1>你的品牌名</h1>
```

### 2. 修改配色方案

编辑 `css/style.css` 中的CSS变量：
```css
:root {
  --primary-red: #8B0000;    /* 主色调 */
  --gold: #DAA520;           /* 强调色 */
  --paper: #F5E6C8;          /* 文字色 */
  --border-color: rgba(139, 0, 0, 0.5);  /* 边框色 */
}
```

### 3. 添加新建筑数据

编辑 `js/data.js`，在对应类型数组中添加：
```javascript
const MINJU_DATA = [
  // ...现有数据
  {
    name: '新建筑名称',
    location: '所在地点',
    province: '省份',
    era: '朝代',
    subtype: '建筑子类',
    feature: '建筑特色描述',
    craft: '工艺1、工艺2、工艺3',
    imageUrl: 'images/detailed_images/新图片.jpg'
  }
];
```

### 4. 修改背景图片

替换 `images/detailed_images/background.png` 文件，或在 `css/style.css` 中修改路径：
```css
body {
  background: url('你的背景图片路径') no-repeat center center fixed;
  background-size: cover;
}
```

### 5. 修改专题图标

替换 `images/detailed_images/` 目录下的图标文件：
- `icon_minju.png` - 民居图标
- `icon_guanfu.png` - 官府图标
- `icon_huangong.png` - 皇宫图标
- `icon_qiaoliang.png` - 桥梁图标

---

## 🌐 部署到GitHub Pages

### 步骤1：创建GitHub仓库

1. 登录 https://github.com
2. 点击 New Repository
3. 仓库名：`Huaxia-Architecture`
4. 选择 Public
5. 点击 Create repository

### 步骤2：推送代码

```bash
# 在项目目录中执行
cd F:\github\Huaxia-Architecture---Ancient-Chinese-Architectural-Achievements-main

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/Huaxia-Architecture.git
git push -u origin main
```

### 步骤3：开启GitHub Pages

1. 打开GitHub仓库页面
2. 点击 Settings → Pages
3. Branch 选择 `main`，文件夹选 `/(root)`
4. 点击 Save
5. 等待1-2分钟，访问 `https://你的用户名.github.io/Huaxia-Architecture/`

---

## 🔧 常见问题

### Q1: 地图不显示，只有散点？
**原因**：直接双击HTML文件打开，浏览器拦截了本地fetch请求。
**解决**：使用HTTP服务器打开（Python、Node.js或Live Server）。

### Q2: 背景图片不显示？
**原因**：图片路径错误或图片不存在。
**解决**：检查 `images/detailed_images/background.png` 是否存在，或修改CSS中的路径。

### Q3: 如何修改建筑节点的形状？
**解决**：编辑 `js/topics.js` 中的 `TYPE_SHAPES`：
```javascript
const TYPE_SHAPES = {
  minju: 'circle',    // 圆形
  guanfu: 'rect',     // 方形
  huangong: 'triangle', // 三角形
  qiaoliang: 'diamond'  // 菱形
};
```

### Q4: 如何添加新的专题分类？
**解决**：
1. 在 `js/data.js` 添加新数据数组
2. 在 `js/topics.js` 的 `TYPE_CONFIG` 中添加配置
3. 创建新的专题HTML页面（复制现有专题页修改）
4. 更新导航链接

---

## 📄 数据来源与声明

- **数据来源**：《营造法式》《清式营造则例》及各地文物保护名录
- **地图数据**：阿里云 DataV 公开边界数据（`data/china.json`）
- **图片**：建筑示意图采用公开图片资源
- **审图号**：GS(2024)1158号（以官方最新公示为准）

---

## 🤝 技术交流

如有问题或建议，欢迎通过以下方式联系：
- GitHub Issues: https://github.com/dong147258369/-/issues

---

**项目版本**: v1.0  
**最后更新**: 2026年4月  
**开发工具**: Cursor IDE + VS Code

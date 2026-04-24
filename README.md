

## 如何运行

1. **本地开发（推荐）**：用 **HTTP** 打开整站，例如 VS Code **Live Server**、或在项目根目录执行 `npx serve`、`python -m http.server 8080`，再访问 `http://127.0.0.1:…/index.html`。  
   地图通过 `fetch('data/china.json')` 加载；若用 **`file://` 直接双击 HTML**，多数浏览器会拦截本地 `fetch`，导致**只有散点、没有省界底图**。
2. **在线演示**：[国筑万象](https://dong147258369.github.io/-/topics.html)
## 页面导览
                                                                          | 建筑详情（可通过 `?name=` 指定建筑名称）                    |
## 技术说明

- **前端**：HTML5、CSS3、原生 JavaScript（IIFE 模块化）。
- **可视化**：ECharts 5（地图散点、柱状图、饼图等）；部分实景预览使用 Pannellum（CDN）。
- **数据**：建筑与工艺等业务数据在 `js/data.js`；中国地图 **GeoJSON** 在 `data/china.json`（供 ECharts `registerMap`）。各页面逻辑见 `js/*.js`。

### 主要脚本


| 文件                                                                     | 作用        |
| ---------------------------------------------------------------------- | --------- |
| `js/home.js`                                                           | 首页交互      |
| `js/timeline.js`                                                       | 朝代时间轴页    |
| `js/overview.js`                                                       | 营造拾趣      |
| `js/ai-chat.js`                                                        | 营造助手问答逻辑  |
| `js/detail.js` / `js/craft.js` / `js/craft-detail.js` / `js/topics.js` | 详情与专题页    |


样式位于 `css/`（`style.css` 为全局，另有 `home.css`、`ai-chat.css` 等）。



## 浏览器建议

推荐使用 **Chrome** 或 **Edge** 等现代浏览器（较新版本），以获得完整地图与动画表现。
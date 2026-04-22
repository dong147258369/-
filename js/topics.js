/**
 * 四大专题 - 层级树形图
 * 根节点 → 民居/官府/皇宫/桥梁 → 具体建筑
 * 点击建筑节点弹出悬浮窗：左侧建筑介绍 + 右侧 3D 球形词云
 */
(function () {
  const TYPE_CONFIG = {
    minju: { name: '民居', data: MINJU_DATA, color: '#8B4513', sub: '民间智慧', icon: 'images/detailed_images/icon_minju.png' },
    guanfu: { name: '官府', data: GUANFU_DATA, color: '#8B0000', sub: '行政规制', icon: 'images/detailed_images/icon_guanfu.png' },
    huangong: { name: '皇宫', data: HUANGONG_DATA, color: '#DAA520', sub: '最高营造', icon: 'images/detailed_images/icon_huangong.png' },
    qiaoliang: { name: '桥梁', data: QIAOLIANG_DATA, color: '#4a5568', sub: '工程智慧', icon: 'images/detailed_images/icon_qiaoliang.png' }
  };

  const ALL_BUILDINGS = [
    ...MINJU_DATA.map(d => ({ ...d, type: 'minju' })),
    ...GUANFU_DATA.map(d => ({ ...d, type: 'guanfu' })),
    ...HUANGONG_DATA.map(d => ({ ...d, type: 'huangong' })),
    ...QIAOLIANG_DATA.map(d => ({ ...d, type: 'qiaoliang' }))
  ];

  let chartInstance = null;
  let tagCloudInstance = null;

  function getBuildingKeywords(b) {
    const kw = new Set();
    if (b.subtype) kw.add(b.subtype);
    if (b.structure) kw.add(b.structure);
    if (b.location) kw.add(b.location);
    if (b.province) kw.add(b.province);
    if (b.era) kw.add(b.era);
    if (b.craft) b.craft.split(/[、，,]/).forEach(s => { const t = s.trim(); if (t) kw.add(t); });
    if (b.feature) b.feature.split(/[，,]/).forEach(s => { const t = s.trim(); if (t && t.length <= 8) kw.add(t); });
    return Array.from(kw);
  }

  // 建筑节点统一使用菱形
  const TYPE_SHAPES = {
    minju: 'diamond',   // 民居 - 菱形
    guanfu: 'diamond',  // 官府 - 菱形
    huangong: 'diamond', // 皇宫 - 菱形
    qiaoliang: 'diamond'  // 桥梁 - 菱形
  };

  function buildTreeData() {
    const children = ['minju', 'guanfu', 'huangong', 'qiaoliang'].map(type => {
      const config = TYPE_CONFIG[type];
      const leaves = config.data.map(d => ({
        name: d.name,
        building: d,
        type: type,
        // 使用不同形状和大小
        symbol: TYPE_SHAPES[type],
        symbolSize: [14, 14],
        itemStyle: {
          color: config.color,
          borderColor: '#fff',
          borderWidth: 1,
          shadowBlur: 4,
          shadowColor: config.color
        },
        // 建筑节点标签样式
        label: {
          backgroundColor: 'rgba(26, 21, 16, 0.85)',
          padding: [4, 8],
          borderRadius: 3,
          borderWidth: 1,
          borderColor: config.color
        }
      }));
      return {
        name: config.name + '（' + config.data.length + '）',
        children: leaves,
        symbol: 'image://' + config.icon,
        symbolSize: [50, 50],
        itemStyle: { color: config.color, borderColor: 'rgba(255,255,255,0.4)', borderWidth: 2 },
        lineStyle: { color: config.color, opacity: 0.5 }
      };
    });
    return [{
      name: '国筑万象',
      children: children,
      itemStyle: { color: '#8B0000', borderColor: 'rgba(218,165,32,0.8)', borderWidth: 3 },
      label: { rotate: 0, fontSize: 20, position: 'bottom', distance: 12, color: '#DAA520', fontWeight: 'bold' }
    }];
  }

  function renderTree() {
    const el = document.getElementById('topicTreeChart');
    if (!el || typeof echarts === 'undefined') return;

    if (chartInstance) chartInstance.dispose();
    chartInstance = echarts.init(el);

    const treeData = buildTreeData();

    chartInstance.setOption({
      animation: true,
      animationDuration: 1200,
      animationEasing: 'cubicOut',
      animationDurationUpdate: 500,
      animationEasingUpdate: 'cubicInOut',
      animationDelay: function (idx) { return idx * 30; },
      tooltip: {
        trigger: 'item',
        formatter: params => {
          if (params.data.building) {
            const b = params.data.building;
            return '<b>' + b.name + '</b><br/>' + (b.subtype || '') + (b.location ? ' · ' + b.location : '') + '<br/><span style="color:#a08060;font-size:11px">点击查看详情</span>';
          }
          return params.name + '<br/><span style="color:#a08060;font-size:11px">点击展开/收起</span>';
        }
      },
      series: [{
        type: 'tree',
        data: treeData,
        top: '5%',
        left: '5%',
        bottom: '5%',
        right: '5%',
        orient: 'TB',
        layout: 'radial',
        edgeShape: 'curve',
        edgeForkPosition: '50%',
        initialTreeDepth: 2,
        roam: true,
        expandAndCollapse: true,
        symbol: 'circle',
        symbolSize: function (value, params) {
          if (params.data.name === '国筑万象') return [36, 36];
          if (params.data.symbol && params.data.symbol.startsWith('image://')) return [50, 50];
          return params.data.children ? [24, 24] : [12, 12];
        },
        itemStyle: {
          color: 'rgba(139, 69, 19, 0.3)',
          borderColor: 'rgba(218, 165, 32, 0.5)',
          borderWidth: 1,
          shadowBlur: 8,
          shadowColor: 'rgba(218, 165, 32, 0.2)',
          shadowOffsetY: 2
        },
        lineStyle: {
          color: 'rgba(218, 165, 32, 0.35)',
          width: 1.5,
          curveness: 0.2,
          shadowBlur: 4,
          shadowColor: 'rgba(218, 165, 32, 0.15)'
        },
        label: {
          color: '#F5E6C8',
          fontSize: 13,
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
          distance: 8
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            fontSize: 11,
            distance: 6
          },
          itemStyle: {
            borderWidth: 1
          },
          lineStyle: {
            color: 'rgba(218, 165, 32, 0.3)',
            width: 1
          }
        },
        emphasis: {
          scale: 1.15,
          itemStyle: {
            borderColor: '#DAA520',
            borderWidth: 2,
            shadowBlur: 14,
            shadowColor: 'rgba(218, 165, 32, 0.5)'
          },
          lineStyle: {
            width: 2,
            color: 'rgba(212,168,75,0.6)'
          },
          label: {
            fontWeight: 'bold',
            color: '#fff'
          }
        }
      }]
    });

    chartInstance.off('click');
    chartInstance.on('click', params => {
      if (params.data && params.data.building) {
        const building = params.data.building;
        showBuildingModal(building);
      }
    });

    window.addEventListener('resize', () => chartInstance && chartInstance.resize());
  }

  function showBuildingModal(building) {
    const modal = document.getElementById('topicModal');
    const imgEl = document.getElementById('modalImage');
    const subtitleEl = document.getElementById('modalSubtitle');
    const introEl = document.getElementById('modalIntro');
    const detailEl = document.getElementById('modalDetail');
    const detailLink = document.getElementById('modalDetailLink');
    const container = document.getElementById('tagCloudContainer');

    if (!modal || !container) return;

    document.getElementById('modalTitle').textContent = building.name + ' 简要介绍';

    if (imgEl) {
      if (building.imageUrl) {
        imgEl.innerHTML = `<img src="${building.imageUrl}" alt="${building.name}" />`;
        const img = imgEl.querySelector('img');
        if (img) img.onerror = function () { imgEl.innerHTML = '<span class="modal-image-placeholder">暂无图片</span>'; };
      } else {
        imgEl.innerHTML = '<span class="modal-image-placeholder">暂无图片</span>';
      }
    }

    const desc = typeof BUILDING_DESCRIPTIONS !== 'undefined' && BUILDING_DESCRIPTIONS[building.name];
    const history = typeof BUILDING_HISTORY !== 'undefined' && BUILDING_HISTORY[building.name];

    if (subtitleEl) subtitleEl.textContent = (building.subtype || '') + (building.location ? ' · ' + building.location : '');
    if (introEl) introEl.textContent = desc || history || building.feature || building.craft || '';
    if (detailEl) {
      detailEl.textContent = desc && history ? history : '';
      detailEl.style.display = desc && history ? 'block' : 'none';
    }

    if (detailLink) {
      detailLink.href = 'detail.html?name=' + encodeURIComponent(building.name);
      detailLink.style.display = 'block';
    }

    container.innerHTML = '';
    const keywords = getBuildingKeywords(building);
    if (keywords.length > 0 && typeof TagCloud !== 'undefined') {
      tagCloudInstance = TagCloud(container, keywords, {
        radius: 120,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true
      });
    }

    modal.classList.add('is-open');
  }

  function hideModal() {
    const modal = document.getElementById('topicModal');
    if (modal) modal.classList.remove('is-open');
  }

  function init() {
    const closeBtn = document.getElementById('modalClose');
    const backdrop = document.getElementById('modalBackdrop');
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (backdrop) backdrop.addEventListener('click', hideModal);

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });

    renderTree();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

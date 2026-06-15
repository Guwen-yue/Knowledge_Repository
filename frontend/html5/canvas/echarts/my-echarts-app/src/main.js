import * as echarts from 'echarts'

// 初始化 ECharts 实例
const chartDom = document.getElementById('chart-container')
const myChart = echarts.init(chartDom)

// 配置选项
const option = {
  title: {
    text: '月度销售数据',
    subtext: '2024年度',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['销售额', '利润'],
    bottom: '0'
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value',
    name: '金额 (万元)',
    axisLabel: {
      formatter: '{value}'
    }
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130, 160, 180, 200, 220, 250],
      itemStyle: {
        color: '#5470c6'
      }
    },
    {
      name: '利润',
      type: 'line',
      data: [20, 50, 30, 15, 10, 25, 35, 45, 55, 60, 70, 80],
      itemStyle: {
        color: '#91cc75'
      },
      smooth: true
    }
  ]
}

// 使用配置项显示图表
myChart.setOption(option)

// 自适应窗口大小
window.addEventListener('resize', () => {
  myChart.resize()
})

console.log('ECharts 示例已加载！')

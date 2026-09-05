# 3列布局
- PC 端常见的布局方案
- 左右两列指定宽度，中间自适应宽度
- main最先加载  中间的先渲染，最快看到最有效的内容
左右两侧往往广告，导航，可以晚一点 
Flex & grid & float

## BFC
Block Formatting Context
html开始 开启了第一个格式化上下文 BFC 
块级元素从上到下，行内元素从左到右排列

一个块，加上多列？ inline 不适合做盒子（容器）
局部部署方案，可以开启一个新的BFC 不是Bloock 元素
block元素 + display： flex| grid | table ...float：left 
pisition ，overflow：hidden开启一个新的BFC
新的格式化u上下文，有自己的主义（格式化）
外层BFC 格式化上下文不会影响到内部的新的格式化上下文
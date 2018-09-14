# iVue

### IVueAffix 图钉

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。

API

Affix props     

| 属性                   | 说明                     | 类型     | 默认值 |
| ---------------------- | :----------------------|:-----   |:----- |   
| offset-top    | 距离窗口顶部达到指定偏移量后触发       |Number   | 0      |   
| offset-bottom | 距离窗口底部达到指定偏移量后触发       |Number   | -      |   
           
Affix events      
  
| 事件                   | 说明                     | 类型     | 返回值 |    
| ---------------------- | :----------------------|:-----   |:----- |        
| on-change    | 在固定状态发生改变时触发       |Boolean   | false  |      
    

### IVueElevation 深度

从一个表面的前面到另一个表面的前面测量，元素的高度表示表面之间的距离和阴影的深度。

elevation等级从0px到24px深度。您可以在任何HTML标记上添加此类。

API

elevation props        

| 名称                   | 说明                     |       
| ---------------------- | :----------------------|           
| ivue-elevation- [size]    | 向目标元素添加elevation,大小可以是1到24.例如：ivue-elevation-4       |    
    

### IVueContent 内容

构成应用程序的内容表面在本规范中称为材料或材料表。内容组件通常用于类似一张纸。主题任意内容将是有用的。

API

IVueContent props
| 名称    | 说明                                                | 类型   | 默认 |
| ------- | :-------------------------------------------------- | ------ | :--- |
| iVueTag | 输出标签。例如，当你想创建一个部分而不是div时很有用 | String | div  |


### IVueLayout 布局

布局系统使用行和列的概念。您可以创建大小的列。您将能够为每个列设置大小，即使在嵌套列上也是如此。

API

ivue-layout

以下类可以应用于任何HTML元素：
| 名称                   | 说明                                                                                                                                                                                   |    
| ---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |      
| ivue-gutter            | 在布局项之间启用自动装订线空间                                                                                                                                                         |   
| ivue-layout-nowrap     | 默认情况下，布局项将始终包装在父布局下。如果要禁用此行为，请使用此类，但响应性将不起作用                                                                                               |    
| ivue-alignment-[x]-[y] | 根据每个坐标的值设置所有子项的对齐方式。只有当x和y都存在时，对齐才有效ivue-alignment-top-center。可能的值是：```top```  ```center``` ```left``` ```space-around``` ```space-between``` |      

ivue-layout-item

以下类可以应用于以下任何HTML元素直接子级 ivue-layout：

| 名称                            | 说明                                                                                                                |     
| ------------------------------- | :------------------------------------------------------------------------------------------------------------------ |    
| ivue-size-[amount]              | 设置特定item的大小。数量可以是五的倍数，例如ivue-size-25。还可以接受33,66和100以便于原型设计                        |    
| ivue-[breakpoint]-size-[amount] | 将大小设置为特定 breakpoint 上的特定项。可能的值是：```xsmall```  ```small``` ```medium``` ```large``` ```xlarge``` |    


ivue-hide

以下类可以应用于任何HTML元素：

| 名称                   | 说明                                                                                                          |    
| ---------------------- | :------------------------------------------------------------------------------------------------------------ |    
| ivue-[breakpoint]-hide | 隐藏特定 breakpoint 上的特定元素。可能的值是：```xsmall```  ```small``` ```medium``` ```large``` ```xlarge``` |     



### IVueButton 按钮

按钮传达用户触摸它们时将发生的操作。它们可以是平坦的，凸起的，任何色彩辅助类都可以用来改变背景或文字的颜色。



API

IVueButton props

| 名称        | 说明                                                          | 类型    | 默认   |   
| ----------- | :------------------------------------------------------------ | ------- | :----- |    
| href        | 在按钮上创建一个锚点。在这种情况下，生成的标签将是 ```<a> ``` | String  | null   |   
| type        | 将类型应用于按钮 - 它不会影响链接                             | String  | button |   
| disabled    | 禁用该按钮并阻止其操作                                        | Boolean | false  |   
| ivue-ripple | 启用/禁用涟漪效应                                             | Boolean | false  |   
| to          | router-link                                                   | String | null   |   

IVueButton class

| 名称                    | 说明                                 |   
| ----------------------- | :----------------------------------- |   
| ivue-raised             | 创建 raised buttons 设置 elevation   |   
| ivue-raised-noElevation | 创建 raised buttons 不设置 elevation |   
| ivue-icon-button        | 启用圆角形图标按钮                   |   

IVueButton event

| 名称  | 说明           |   
| ----- | :------------- |   
| click | 单击鼠标后触发 |    
  

IVueButton slot

| 名称      | 说明     |   
| --------- | :------- |   
| ivue-icon | 添加图标 |   


### IVueIcon 图标字体

标可以使用图标字体或外部SVG。此外，可以接受一些大小尺寸，如 2x, 3x, 4x and 5x.
默认情况下, ```IVueIcon``` 使用的是 [material io](https://material.io/tools/icons/?icon=mood_bad&style=baseline)图标,您必须使用下划线而不是空格来传递图标的名称。例如：```<IVueIcon>thumb_up</IVueIcon>```

API

IVueIcon props
| 名称   | 说明                                                                  | value |   
| ------ | :-------------------------------------------------------------------- | :---- |   
| svgSrc | svg图标的来源。请注意，对于外部domais上的图标，cors可能会影响其功能。 | null  |   


IVueIcon class
| 名称                  | 说明                                 | 例子         |   
| --------------------- | :----------------------------------- | :----------- |   
| ivue-size-[dimension] | 增加图标的大小。它接受2x，3x，4x或5x | ivue-size-3x |    

IVueIcon events
| 名称        | 说明                    | value |   
| ----------- | :---------------------- | :---- |   
| ivue-loaded | 在获取SVG图标后立即触发 | null  |   


### IVueList 列表

组件用于显示信息，它可以包含一个头像、内容、操作、列表组标题等等。列表也可以包含子元素并在侧边栏（sidebar）使用。     

列表项可以包含交互事件，例如click和mousedown事件。

API

IVueList props
| 名称             | 说明                                                                                                                          | 类型    | 默认  |
| ---------------- | :---------------------------------------------------------------------------------------------------------------------------- | ------- | :---- |   
| ivueExpandSingle | 如果设置为true,则一次最多可扩展一个扩展列表项。扩展后的列表将在展开另一个列表时折叠，前提是 IVueListItem 开启了 ivue-expand | Boolean | false |   


### IVueListItem 列表项

列表项将根据给定的交互类型呈现不同的标记。      

如果您传递其中一个事件，该项目将自动呈现button：
* click   
* dblclick   
* mousedown   
* mouseup    

如果传递```href```属性，该项将自动呈现```a```标记。    

```router-link```可以在这里使用。这将呈现一个```a``标签。

API

IVueList props
| 名称          | 说明                                                   | 类型    | 默认  |   
| ------------- | :----------------------------------------------------- | ------- | :---- |   
| ivue-expand   | 启用扩展面板                                          | Boolean | false |   
| ivue-expanded | 显示/隐藏扩展面板的道具。应与```.sync```修饰符一起使用 | Boolean | false |    

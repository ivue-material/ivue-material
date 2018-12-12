# iVue


# UI 元素
### IVueElevation 深度

从一个表面的前面到另一个表面的前面测量，元素的高度表示表面之间的距离和阴影的深度。

elevation等级从0px到24px深度。您可以在任何HTML标记上添加此类。

##### 例子

```javascript

<template>
      <div class="elevation-demo">
            <IVueContent :class="`ivue-elevation-${index}`" 
                        v-for="(item,index) in length"
                        :key="index">
                  {{index}}
            </IVueContent>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  length: 25
            }
      }

}
</script>

<style  lass="scss"> 
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}
.ivue-content {
  width: 100px;
  height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```     

API

##### props        

| 名称                   | 说明                                                           |
| ---------------------- | :------------------------------------------------------------- |
| ivue-elevation- [size] | 向目标元素添加elevation,大小可以是1到24.例如：ivue-elevation-4 |

### IVueLayout 布局

布局系统使用行和列的概念。您可以创建大小的列。您将能够为每个列设置大小，即使在嵌套列上也是如此。


##### 例子

```javascript
<template>
      <div>
            <h1>列布局</h1>
            <p>要开始使用布局，您需要做的是创建一个ivue-layout父元素，它将包含一个列表ivue-layout-item。您可以设置所需的列数：</p>
            <div class="ivue-layout">
                  <div class="ivue-layout-item layout"></div>
                  <div class="ivue-layout-item layout"></div>
                  <div class="ivue-layout-item layout"></div>
            </div>

            <h1>排水沟</h1>
            <p>默认情况下，布局之间没有空格，这对于常规布局有点不好，例如卡牌,
                  您可以使用 ivue-gutter 为自动计算元素之间的空间，这些空间基于屏幕宽度：</p>
            <div class="ivue-layout ivue-gutter">
                  <div class="ivue-layout-item gutter-item"></div>
                  <div class="ivue-layout-item gutter-item"></div>
                  <div class="ivue-layout-item gutter-item"></div>
            </div>

            <h1>嵌套布局</h1>
            <p>列布局也适用于嵌套布局</p>
            <div class="ivue-layout ivue-gutter ">
                  <div class="ivue-layout-item ivue-layout ivue-gutter ">
                         <div class="ivue-layout-item"></div>
                         <div class="ivue-layout-item"></div>
                         <div class="ivue-layout-item"></div>
                  </div>
                  <div class="ivue-layout-item ivue-layout ivue-gutter ">
                         <div class="ivue-layout-item"></div>
                         <div class="ivue-layout-item"></div>
                         <div class="ivue-layout-item"></div>
                  </div>
                   <div class="ivue-layout-item ivue-layout ivue-gutter ">
                         <div class="ivue-layout-item"></div>
                         <div class="ivue-layout-item"></div>
                         <div class="ivue-layout-item"></div>
                  </div>
            </div>

            <h1>对齐</h1>
            <p>使用ivue-alignment-[horizontal]-[vertical]类，例如ivue-alignment-top-center。对齐适用于父元素，并将影响所有子项的位置</p>
            <div class="example">
                  <div class="ivue-layout ivue-gutter ivue-alignment-top-center">
                        <div class="ivue-layout-item ivue-size-25">
                              <span>Lorem ipsum dolor sit amet.</span>
                        </div>
                         <div class="ivue-layout-item ivue-size-25">
                              <span>Lorem ipsum dolor sit amet.</span>
                        </div>
                         <div class="ivue-layout-item ivue-size-25">
                              <span>Lorem ipsum dolor sit amet.</span>
                        </div>
                  </div>
            </div>

            <h1>尺寸</h1>
            <p>布局系统根据项目数量计算子项大小。但是如果你想为每个项目设置尺寸？您只需ivue-size-[amount]在项目中设置一个，例如ivue-size-30。总是以％表示的大小可以是5的倍数，也可以接受值33和66。</p>
            <div class="ivue-layout ivue-gutter">
                  <div class="ivue-layout-item ivue-size-15 size" ></div>
                  <div class="ivue-layout-item size"></div>
                  <div class="ivue-layout-item size"></div>
                  <div class="ivue-layout-item ivue-size-15 size"></div>
            </div>
            
            <h1>响应</h1>
            <p>加入类 ivue-[breakpoint]-size-[amount] 布局引擎将发挥神奇作用。尝试调整浏览器的大小</p>
            <div class="ivue-layout ivue-gutter ivue-alignment-center response">
                  <div class="ivue-layout-item  ivue-medium-size-33  ivue-small-size-50 ivue-xsmall-size-100"></div>
                  <div class="ivue-layout-item  ivue-medium-size-33  ivue-small-size-50 ivue-xsmall-size-100"></div>
                  <div class="ivue-layout-item  ivue-medium-size-33  ivue-small-size-50 ivue-xsmall-size-100"></div>
                  <div class="ivue-layout-item  ivue-medium-size-33  ivue-small-size-50 ivue-xsmall-size-100"></div>
                  <div class="ivue-layout-item  ivue-medium-size-33  ivue-small-size-50 ivue-xsmall-size-100"></div>
                  <div class="ivue-layout-item  ivue-medium-size-33  ivue-small-size-50 ivue-xsmall-size-100"></div>
            </div>

            <h1>隐藏元素</h1>
            <p>在较小的屏幕上隐藏元素的需求是相当普遍的。你可以使用这些ivue-[breakpoint]-hide类来做到这一点</p>
            <div class="ivue-layout ivue-gutter ivue-alignment-center hide">
                  <div class="ivue-layout-item ivue-medium-size-33 ivue-small-size-50 ivue-xsmall-size-100">
                        <span>Always Show</span>
                  </div>

                  <div class="ivue-layout-item ivue-medium-size-33 ivue-small-size-50 ivue-xsmall-size-100">
                        <span>Always Show</span>
                  </div>

                  <div class="ivue-layout-item ivue-medium-size-33 ivue-small-size-50 ivue-xsmall-size-100">
                        <span>Always Show</span>
                  </div>

                  <div class="ivue-layout-item ivue-medium-size-50 ivue-small-size-50 ivue-xsmall-hide">
                        <span>Hide Xsmall</span>
                  </div>

                  <div class="ivue-layout-item ivue-medium-size-50 ivue-small-hide">
                        <span>Hide Small</span>
                  </div>
                  <div class="ivue-layout-item ivue-medium-hide">
                        <span>Hide Medium</span>
                  </div>
            </div>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.layout {
  height: 40px;

  &:nth-child(1) {
    background: rgba(128, 128, 128, 0.3);
  }

  &:nth-child(2) {
    background: rgba(128, 128, 128, 0.4);
  }

  &:nth-child(3) {
    background: rgba(128, 128, 128, 0.5);
  }
}

.gutter-item {
  height: 40px;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    background: rgba(255, 0, 0, 0.2);
    content: " ";
  }
}

.ivue-layout-item {
  height: 72px;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    content: " ";
  }

  &.ivue-layout {
    &:after {
      transform: translateY(-100%);
      background: rgba(255, 255, 0, 0.2);
    }

    .ivue-layout-item:after {
      height: 40px;
      margin-top: 16px;
      position: relative;
      z-index: 1;
      background: rgb(255, 164, 255);
    }
  }
}

.example .ivue-layout-item {
  min-height: 40px;

  span {
    width: 100%;
    height: 100%;
    padding: 8px;
    display: block;
    background: rgba(0, 0, 255, 0.2);
  }
}

.size {
  height: 40px;
  &:after {
    width: 100%;
    height: 100%;
    display: block;
    background: rgb(0, 118, 0);
    opacity: 0.2;
    content: " ";
  }
}

.response .ivue-layout-item {
  height: 40px;
  margin-top: 8px;
  margin-bottom: 8px;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    background-color: purple;
    content: " ";
  }
}

.hide .ivue-layout-item {
  height: 40px;
  margin-top: 8px;
  margin-bottom: 8px;

  span {
    width: 100%;
    height: 100%;
    padding: 8px;
    display: block;
    background: rgba(rgb(0, 128, 128), 0.2);
  }
}
</style>
```     

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

| 名称                                                                        | 说明                                     |
| --------------------------------------------------------------------------- | :--------------------------------------- |
| ivue-size-[amount]                                                          | 设置特定item的大小。数量可以是五的倍数， 例如ivue-size-25。还可以接受33,66和100以便于原型设计                        |
| ivue-[breakpoint]-size-[amount]                                             | 将大小设置为特定 breakpoint 上的特定项。可能的值是：```xsmall```  ```small``` ```medium``` ```large``` ```xlarge``` |


ivue-hide

以下类可以应用于任何HTML元素：

| 名称                   | 说明                                                                                                          |
| ---------------------- | :------------------------------------------------------------------------------------------------------------ |
| ivue-[breakpoint]-hide | 隐藏特定 breakpoint 上的特定元素。可能的值是：```xsmall```  ```small``` ```medium``` ```large``` ```xlarge``` |


# 组件    

### IVueContent 内容

构成应用程序的内容表面在本规范中称为材料或材料表。内容组件通常用于类似一张纸。主题任意内容将是有用的。

##### 例子
```javascript
 <IVueContent>hello</IVueContent>    
```    
   
API

##### props    

| 名称    | 说明                                                | 类型   | 默认 |
| ------- | :-------------------------------------------------- | ------ | :--- |
| iVueTag | 输出标签。例如，当你想创建一个部分而不是div时很有用 | String | div  |
 

### IVueButton 按钮

按钮传达用户触摸它们时将发生的操作。它们可以是平坦的，凸起的，任何色彩辅助类都可以用来改变背景或文字的颜色。

##### 例子

```javascript
<template>
      <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div>
          <span>Flat</span>
          <IVueButton @click="clickBtn">默认效果</IVueButton>
          <IVueButton :ivueRipple="false">波纹效果关闭</IVueButton>
          <IVueButton class="red-accent-4">Accent</IVueButton>
          <IVueButton class="blue">Primary</IVueButton>
          <IVueButton disabled>disabled</IVueButton>
        </div>
        <div>
          <span>Raised</span>
          <IVueButton class="ivue-raised" >默认效果</IVueButton>
          <IVueButton class="ivue-raised" :ivueRipple="false">波纹效果关闭</IVueButton>
          <IVueButton class="ivue-raised blue">Primary</IVueButton>
          <IVueButton class="ivue-raised red-accent-4">Accent</IVueButton>
          <IVueButton class="ivue-raised" disabled>disabled</IVueButton>
        </div>
        <div>
          <span>no elevation</span>
          <IVueButton class="ivue-raised-noElevation">默认效果</IVueButton>
          <IVueButton class="ivue-raised-noElevation red-accent-4">Accent</IVueButton>
          <IVueButton class="ivue-raised-noElevation blue">Primary</IVueButton>
        </div>
        <div>
          <span>link</span>
          <IVueButton :href="pageUrl">默认效果</IVueButton>
          <IVueButton :href="pageUrl" class="blue">Primary</IVueButton>
          <IVueButton :href="pageUrl" class="red-accent-4">Accent</IVueButton>
          <IVueButton :href="pageUrl" class="ivue-raised blue">Primary</IVueButton>
        </div>
         <div>
          <span>router link</span>
          <IVueButton to="Layout">默认效果</IVueButton>
          <IVueButton to="Layout" class="blue">Primary</IVueButton>
          <IVueButton to="Layout" class="red-accent-4">Accent</IVueButton>
        </div>
        <div>
          <span>icon</span>
          <IVueButton class="ivue-icon-button">
            <IVueIcon>menu</IVueIcon>
          </IVueButton>

           <IVueButton class="ivue-icon-button ivue-raised ">
            <IVueIcon>menu</IVueIcon>
          </IVueButton>

          <IVueButton class="ivue-icon-button ivue-raised  red-accent-4">
            <IVueIcon>menu</IVueIcon>
          </IVueButton>
        </div>
      </div>
</template>

<script>
export default {
  computed: {
    pageUrl () {
      return window.location.href
    }
  },
  methods: {
    clickBtn () {
      console.log("click")
    }
  }
}
</script>

<style lang="scss">
body {
  background: #eee;
}
</style>
```     

API

##### props   

| 名称        | 说明                                                          | 类型    | 默认   |
| ----------- | :------------------------------------------------------------ | ------- | :----- |
| href        | 在按钮上创建一个锚点。在这种情况下，生成的标签将是 ```<a> ``` | String  | null   |
| type        | 将类型应用于按钮 - 它不会影响链接                             | String  | button |
| disabled    | 禁用该按钮并阻止其操作                                        | Boolean | false  |
| ivue-ripple | 启用/禁用涟漪效应                                             | Boolean | false  |
| to          | router-link                                                   | String | null   |

##### class

| 名称                    | 说明                                 |
| ----------------------- | :----------------------------------- |
| ivue-raised             | 创建 raised buttons 设置 elevation   |
| ivue-raised-noElevation | 创建 raised buttons 不设置 elevation |
| ivue-icon-button        | 启用圆角形图标按钮                   |

##### event

| 名称  | 说明           |
| ----- | :------------- |
| click | 单击鼠标后触发 |
  

##### slot

| 名称      | 说明     |
| --------- | :------- |
| ivue-icon | 添加图标 |


### IVueIcon 图标字体

标可以使用图标字体或外部SVG。此外，可以接受一些大小尺寸，如 2x, 3x, 4x and 5x.
默认情况下, ```IVueIcon``` 使用的是 [material io](https://material.io/tools/icons/?icon=mood_bad&style=baseline)图标,您必须使用下划线而不是空格来传递图标的名称。例如：```<IVueIcon>thumb_up</IVueIcon>```

##### 例子
```javascript
<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p> 图标可以使用图标字体或外部SVG。此外，可以接受一些大小尺寸，如 2x, 3x, 4x and 5x。默认情况下，IVueIcon 将假定你使用的是 <a target="_black" href="https://material.io/tools/icons/?icon=mood_bad&style=baseline">material icon</a></p>

            <div>
                  <IVueIcon>menu</IVueIcon>
                  <IVueIcon>add</IVueIcon>
                  <IVueIcon>thumb_up</IVueIcon>
                  <IVueIcon>verified_user</IVueIcon>
                  <IVueIcon>home</IVueIcon>
            </div>

             <div>
                  <IVueIcon>menu</IVueIcon>
                  <IVueIcon class="ivue-size-2x">add</IVueIcon>
                  <IVueIcon class="ivue-size-3x">thumb_up</IVueIcon>
                  <IVueIcon class="ivue-size-4x">verified_user</IVueIcon>
                  <IVueIcon class="ivue-size-5x">home</IVueIcon>
            </div>
      </div>
</template>
```      

API

##### props    

| 名称   | 说明                                                                  | value |
| ------ | :-------------------------------------------------------------------- | :---- |
| svgSrc | svg图标的来源。请注意，对于外部domais上的图标，cors可能会影响其功能。 | null  |


##### class

| 名称                  | 说明                                 | 例子         |
| --------------------- | :----------------------------------- | :----------- |
| ivue-size-[dimension] | 增加图标的大小。它接受2x，3x，4x或5x | ivue-size-3x |

##### events    

| 名称        | 说明                    | value |
| ----------- | :---------------------- | :---- |
| ivue-loaded | 在获取SVG图标后立即触发 | null  |


### IVueList 列表

组件用于显示信息，它可以包含一个头像、内容、操作、列表组标题等等。列表也可以包含子元素并在侧边栏（sidebar）使用。     

列表项可以包含交互事件，例如click和mousedown事件。

##### 例子     

```javascript
<template>
      <div>
            <IVueList>
                  <IVueListItem>Plain Text</IVueListItem>
                  <IVueListItem :disabled="true">button</IVueListItem>
                  <IVueListItem @click="">button</IVueListItem>
                  <IVueListItem href="'www.baidu.com'">link</IVueListItem>
                  <IVueListItem to="/icon">routerLink</IVueListItem>
            </IVueList>

            <p>expand</p>
             <IVueList :ivueExpandSingle="expandSingle">
                  <IVueListItem ivue-expand :ivue-expanded.sync="expandNews">
                       <span class="ivue-list-item-text">News</span>

                       <IVueList slot="ivue-expand">
                              <IVueListItem class="ivue-inset">World</IVueListItem>
                              <IVueListItem class="ivue-inset">World</IVueListItem>
                        </IVueList>
                  </IVueListItem>
            </IVueList>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  expandNews: false,
                  expandSingle: false
            }
      }
}
</script>
```     

API

##### props    

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

##### props      

| 名称          | 说明                                                   | 类型    | 默认  |
| ------------- | :----------------------------------------------------- | ------- | :---- |
| ivue-expand   | 启用扩展面板                                          | Boolean | false |
| ivue-expanded | 显示/隐藏扩展面板的道具。应与```.sync```修饰符一起使用 | Boolean | false |


### IVueCarousel 走马灯

常用于一组图片或卡片轮播，当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。

##### 例子           

```javascript
<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p>基础用法</p>
            <IVueCarousel v-model="value1" loop>
                  <IVueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IVueCarouselItem>
                  <IVueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IVueCarouselItem>
                    <IVueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IVueCarouselItem>
            </IVueCarousel>

            <p>自动切换</p>
            <IVueCarousel v-model="value1" loop autoplay>
                  <IVueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IVueCarouselItem>
                  <IVueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IVueCarouselItem>
                    <IVueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IVueCarouselItem>
            </IVueCarousel>

            <p>综合设置</p>
            <IVueCarousel  v-model="value1" 
                           :autoplay="autoplay"
                           :autoplaySpeed="autoplaySpeed"
                           :dots="dots"
                           :radiusDot="radiusDot"
                           :trigger="trigger"
                           :arrow="arrow"
            >
                  <IVueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IVueCarouselItem>
                  <IVueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IVueCarouselItem>
                    <IVueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IVueCarouselItem>
            </IVueCarousel>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  value1: 0,
                  autoplay: true,
                  autoplaySpeed: 10000,
                  dots: 'inside',
                  radiusDot: true,
                  trigger: 'click',
                  arrow: 'always'
            }
      }
}
</script>

<style>
.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>
```      

API

##### props      

| 名称  | 说明                                                                          | 类型    | 默认  |
| ----- | :---------------------------------------------------------------------------- | ------- | :---- |
| arrow | 切换箭头显示时机，可选值为 hover（悬停），always（一直显示），never（不显示） | String | hover |      
| leftArrow | 用于改变←左切换箭头图片，通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用 | String | keyboard_arrow_left |         
| rightArrow | 用于改变→右切换箭头图片，通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用  | String | keyboard_arrow_right |       
| easing | 改变走马灯切换的动画效果 | String | ease |      
| loop |是否开启循环,用于无缝循环 | Boolean | false |      
| height | 走马灯高度，可填 auto 或具体高度数值，单位 px | String | auto |      
| value | 幻灯片的索引 |  Number | 0 |      
| autoplay | 是否自动切换 |  Boolean | false |      
| autoplaySpeed | 自动切换的时间间隔，单位为毫秒 |  Number | 2000 |      
| dots |  指示器(dots)的位置，可选值为 inside （内部），outside（外部），none（不显示） |  String | inside |      
| radiusDot |  是否显示圆形指示器(dots) |  Boolean | false |       
| trigger | 指示器(dots)的触发方式，可选值为 click（点击），hover（悬停） |  Str | ingclick |        


##### events      

| 事件名称          | 说明                                                   | 返回值    |       
| ------------- | :----------------------------------------------------- | ------- |      
| onChange   | 幻灯片切换时触发，目前激活的幻灯片的索引，原幻灯片的索引           | oldValue, value |         
| currentIndex   | 当前激活的幻灯片的索引          | currentIndex |       



### IVueSwitch 开关

开/关切换可切换单个设置选项的状态。    

##### 例子    

```javascript
<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          
            <p>基础</p>
            <IVueSwitch class="red-accent-4"></IVueSwitch>

            <p>大小</p>
            <IVueSwitch size="large"></IVueSwitch>
            <IVueSwitch></IVueSwitch>
            <IVueSwitch size="small"></IVueSwitch>

            <p>文字图标</p>
            <IVueSwitch>
                  <span slot="open">开</span>
                  <span slot="close">关</span>
            </IVueSwitch>

            <IVueSwitch >
                  <span slot="open"><IVueIcon>check</IVueIcon></span>
                  <span slot="close"><IVueIcon>close</IVueIcon></span>
            </IVueSwitch>

            <p>不可用</p>
            <IVueSwitch :disabled="true" class="red-accent-4"></IVueSwitch>

            <p>loading</p>
            <IVueSwitch loading :value="true" class="red-accent-4"></IVueSwitch>
            <IVueSwitch loading :value="true" size="large" class="red-accent-4"></IVueSwitch>
            <IVueSwitch loading :value="true" size="small" class="red-accent-4"></IVueSwitch>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.ivue-icon {
      font-size: 12px;
      min-width: 12px;
      font-weight: bold;
}
</style>
```     
 

API     

##### props      

| 名称          | 说明                                                   | 类型    | 默认  |      
| ------------- | :----------------------------------------------------- | ------- | :---- |     
| disabled   | 是否禁用开关                                          | Boolean | false |     
| loading   | 加载中的开关                                          | Boolean | false |     
| trueValue   | 选中时的值   | String,Number,Boolean | true |     
| falseValue   | 没有选中时的值  | String,Number,Boolean | false |  f  
| value   |  指定当前是否开启，可以使用 v-model 双向绑定数据  | String,Number,Boolean | false |    
| size   | 开关的尺寸，可选值为large、small、default或者不写。建议如果使用了2个汉字的文字，使用 large | String,Number,Boolean | - |      


##### events        

| 事件名称          | 说明                                                   | 返回值    |        
| ------------- | :----------------------------------------------------- | ------- |         
| onChange   | 开关变化时触发，返回当前的状态           | true or false |       

##### slot      

| 名称          | 说明                                                   |      
| ------------- | :----------------------------------------------------- |     
| open   | 自定义显示打开时的内容          |          
| close   | 自定义显示关闭时的内容          |   

### IVueBottomNav 底部导航

```IVueBottomNav```组件是一个侧边栏的替代方案。它主要用于移动端，并有两个变种，图标+文本和隐藏按钮文本直到被激活。    


##### 例子   

```javascript

<template>
     <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

           <p>有主题颜色</p>
            <IVueBottomNav :value="true"  :active.sync="bottomNav1" :color="color" key="theme">
                  <IVueButton class="shades-white">
                        <span>Recents</span>
                        <IVueIcon>history</IVueIcon>
                  </IVueButton>
                  <IVueButton class="shades-white">
                        <span>Recents</span>
                        <IVueIcon>history</IVueIcon>
                  </IVueButton>
            </IVueBottomNav>

           <p>基础</p>
           <IVueBottomNav :value="true" :active.sync="bottomNav2" key="base" :height="'100'">
                  <IVueButton class="red" key="base1">
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
                   <IVueButton class="buld" key="base2"  to="/">
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
           </IVueBottomNav>

           <p>不激活时隐藏按钮上的文字</p>
           <IVueBottomNav :value="true" :active.sync="bottomNav3" :shift="true" @onChange="onChange">
                  <IVueButton class="red">
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
                   <IVueButton class="buld">
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
           </IVueBottomNav>
           <br>
           <br>
     </div>
</template>

<script>
export default {
      data () {
            return {
                  bottomNav1: 0,
                  bottomNav2: 1,
                  bottomNav3: 0
            }
      },
      computed: {
            color () {
                  switch (this.bottomNav) {
                        case 0: return 'red'
                        case 1: return 'lime'
                  }
            }
      },
      methods: {
            onChange (data) {
                  console.log(data)
            }
      }
}
</script>
```      


API

##### props       
      
| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |     
| active    | 当前激活的导航 | Number, String | -      |     
| height | 底部导航栏高度 | Number, String | 56    |    
| value | 底部导航栏是否可见(注意：父级节点必须设置 overflow: hidden) | Boolean | false |      
| color | 底部导航栏背景颜色 | String | null |     
| position | 底部导航栏定位(```absolute``` ```fixed```) | String | null |      
| shift | 不是激活状态时隐藏按钮上的文字 | Boolean | false |      
        
##### slots       
      
| 属性          | 说明                             |
| ------------- | :------------------------------- | 
| default    | Vue默认原生插槽|

##### events       
      
| 属性          | 说明                             |用法   |     
| ------------- | :------------------------------- | :----- |      
| update:active    | 设置激活那个导航| this.$emit('update:active', item) |      
| onChange    | 获取当前激活那个导航 |  - |



### IVueBreadcrumbs面包屑

```IVueBreadcrumbsItem```组件是一个页面导航辅助器。它可以接受一个Material Icons图标或字符作为分隔符。一个包含字段href，text和disabled的对象数组可以被传递给组件items。此外，还有一个常规插槽用于更多地控制面包屑使用```IVueBreadcrumbsItem```      

##### 例子
```javascript
      <IVueBreadcrumbs>
            <IVueBreadcrumbsItem>
                  <IVueIcon>home</IVueIcon>
                  Home
            </IVueBreadcrumbsItem>
            <IVueBreadcrumbsItem>
                  home
            </IVueBreadcrumbsItem>
      </IVueBreadcrumbs>
```

API

##### props       
      
| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |      
| divider    | 分隔符 | String | /     |      
| justifyCenter    | 中间对齐面包屑 | Boolean | -     |       
| justifyEnd    | 尾部对齐面包屑 | Boolean | -     |      

##### slots       
      
| 属性          | 说明                             |      
| ------------- | :------------------------------- |     
| default    | Vue默认原生插槽|      


### IVueBreadcrumbsItem 面包屑子项

用于控制面包屑使用```IVueBreadcrumbsItem```        

API

##### props       
      
| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |       
| disabled    | 当前面包屑是否处于禁用状态 | Boolean | false     |     
| tag    | ```IVueBreadcrumbsItem```渲染的标签tag | String | a     |       
| to    | ```vue-router```导航 | String,Object | -     |       
| href    | ```a```标签链接跳转 | String,Object | -     |      
| target    | 用于设置```a``` 链接的 ```target``` 属性 | String | _self    |      
| replace    | 调用 ```router.replace()``` | Boolean | -    |      
| nuxt    | 启用nuxt.js的导航 (前提是使用了nuxt.js ) | Boolean | -    |      
| exactActiveClass    |  当链接被精确匹配的时候应该激活的```class``` | String | -    |       
| append    |  在当前 (相对) 路径前添加基路径 | Boolean | -    |       
| activeClass    | 链接激活时使用的 CSS 类名  | String | -    |       
| exact    | "是否激活" 默认类名的依据是 inclusive match (全包含匹配)。 举个例子，如果当前的路径是 /a 开头的，那么 ```<router-link to="/a">``` 也会被设置 CSS 类名。  | Boolean | -    |        

##### slots       
      
| 属性          | 说明                             |
| ------------- | :------------------------------- | 
| default    | Vue默认原生插槽|



### IVueSelect选择器


使用模拟的增强下拉选择器来代替浏览器原生的选择器。选择器支持单选、多选、搜索，以及键盘快捷操作。  ```IVueSelect```选择器应该与```IVueOption```或者```IVueOptionGroup```组件一起使用。选择将始终对```v-model``` ```prop```的变化做出反应。

##### 例子
```javascript
<template>
      <div>
            <p>普通</p>
            <IVueSelect :value="'Sydney'" clearable>
                  <IVueOption v-for="(item,index) in cityList1" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选中选项v-model中的内容 - 单选</p>
            <IVueSelect :value="model1" clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>是否将label和value一起返回 - 单选</p>
            <IVueSelect  labelAndValue clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>开启过滤筛选 - 单选</p>
            <IVueSelect  filterable :value="model1">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>

            <p>多选</p>
            <IVueSelect multiple clearable :value="['Sydney']">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选中选项v-model中的内容 - 多选</p>
            <IVueSelect multiple :value="['Sydney']">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>是否将label和value一起返回 - 多选</p>
            <IVueSelect  labelAndValue  multiple @on-change="_input">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>开启过滤筛选 - 多选</p>
            <IVueSelect multiple filterable :value="['Sydney']">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选择组件禁用</p>
            <IVueSelect disabled>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选择菜单选项禁用</p>
            <IVueSelect >
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>菜单选项 group - 单选</p>
            <IVueSelect filterable>
                  <IVueOptionGroup  :label="'one'" >
                        <IVueOption v-for="(item,index) in grop1" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
                  <IVueOptionGroup  :label="'two'" >
                        <IVueOption v-for="(item,index) in grop2" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
            </IVueSelect>
             <p>菜单选项 group - 多选</p>
            <IVueSelect  multiple filterable>
                  <IVueOptionGroup  :label="'one'" >
                        <IVueOption v-for="(item,index) in grop1" :value="item.value" :label="item.label" :key="item.value">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
                  <IVueOptionGroup  :label="'two'" >
                        <IVueOption v-for="(item,index) in grop2" :value="item.value" :label="item.label" :key="item.value">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
            </IVueSelect>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  cityList1: [
                        {
                              value: 'New York',
                              label: 'New'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'Sydney',
                              label: 'Sydney'
                        },
                        {
                              value: 'Ottawa',
                              label: 'Ottawa'
                        },
                        {
                              value: 'Paris',
                              label: 'Paris'
                        },
                        {
                              value: 'Canberra',
                              label: 'Canberra'
                        }
                  ],
                  cityList2: [
                        {
                              value: 'New York',
                              label: 'New York'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'Sydney',
                              label: 'Sydney'
                        },
                        {
                              value: 'Ottawa',
                              label: 'Ottawa'
                        },
                        {
                              value: 'Paris',
                              label: 'Paris'
                        },
                        {
                              value: 'Canberra',
                              label: 'Canberra'
                        }
                  ],
                  grop1: [
                        {
                              value: 'New York',
                              label: 'New York'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'Sydney',
                              label: 'Sydney'
                        }
                  ],
                  grop2: [
                        {
                              value: 'Ottawa',
                              label: 'Ottawa'
                        },
                        {
                              value: 'Paris',
                              label: 'Paris'
                        },
                        {
                              value: 'Canberra',
                              label: 'Canberra'
                        }
                  ],
                  model1: 'Canberra'
            }
      },
      methods: {
            _input (data) {
                  console.log(data)
            }
      }
}
</script>
```

API

##### props       
      
| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |      
| value    | 指定选中选项的```value```值，可以使用```v-modul```双向绑定数据。单项选择只接受 ```String```和```Number```,多选时只接受```Array``` | String, Number, Array | -     |      
|  multiple   | 是否开启多选 | Boolean | false    |       
|  labelAndValue   | 在返回选项时，是否将label和value一起返回，默认只返回 value | Boolean | false    |       
|  disabled   | 是否禁用该组件 | Boolean | false    |       
|  clearable   | 是否可以清空选项，只在单选时有效 | Boolean | false    |  
|  notFindText   | 选项列表没有找到数据时的提示 | String | 无匹配数据    |   
|  filterable   | 是否开启搜索 | Boolean | false    |         
|  arrowDownIcon   | 下拉选项图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用 | String | keyboard_arrow_down    |       
|  resetSelectIcon   | 重置选择选项图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用| String | cancel    |         
|  multipleCloseIcon   | 多项选择选项关闭图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用 | String | close    |        


##### events      
  
| 事件      | 说明                     | 类型    | 返回值 |
| --------- | :----------------------- | :------ | :----- |
| on-menu-open | 下拉框展开或收起时触发 | Boolean | -  |
| on-filter-query-change | 搜索词改变时触发 | String | -  |
| on-change | 选中的Option变化时触发,如需返回```label```,请设置```labelAndValue```选项 | String | -  |
| on-clear | 点击清空按钮时触发 | - | -  |


##### IVueOption

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |            
| disabledRipple    | 启用/禁用涟漪 | Booelan | true     |         
| value| 选项值，默认根据此属性值进行筛选，必填 | String, Number | -      |        
| label| 选择显示的内容，默认会读取 slot,无 slot 时，优先读取该 label 的值,无 label 时，读取 value。 | String, Number | -      |             
| disabled| 是否禁用当前选项 | Boolean | false      |        
 

##### IVueOptionGroup

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |            
| label| 分组的组名 | String | -      |        
 

### IVueAutoComplete 输入框自动完成功能

该```IVueAutoComplete```组件提供简单灵活的预先输入功能。这在搜索大型数据集或甚至从API动态请求信息时非常有用。

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| value    | 绑定的值，可使用 v-model 双向绑定 | String, Number | -      |           
| data    | 自动完成的数据源 | Array | -      |                  
| filterMethod    | 是否根据输入项进行筛选。当其为一个函数时，会接收 value 和 option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false | Function, Boolean | -      |                  
| placeholder    | 输入框占位文本	 | String | 请输入数据      |                  
| disabled    | 输入框禁用输入	 | Boolean | false      |                  
| clearable    | 是否显示清除按钮	 | Boolean | false      |                  
| clearIcon    | 输入框清除图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用	 | String | cancel      |                  

##### events      
  
| 事件      | 说明                     |  返回值 |
| --------- | :----------------------- | :----- |
| on-select | 被选中时调用，参数为选中项的 ```value``` 值 |  false  |
| on-focus| 获取焦点时触发 |  event  |
| on-blur| 失去焦点时触发 |  event  |
| on-search | 搜索补全项的时候调用 |  value  |
| on-change | 选中 ```option```，或 ```input``` 的 value 变化时，调用此函数 |  value  |
    

### IVueInput 基本表单组件

基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。

#### 例子

```javascript
<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p>基本用法，可以使用 v-model 实现数据的双向绑定。可以直接设置 style 来改变输入框的宽度，默认 100%。</p>
            <IVueInput v-model="baseInput" placeholder="someing messasge" @on-enter="enter"></IVueInput>
            <p>{{baseInput}}</p>
            <p>开启属性 clearable 可显示清空按钮。</p>
            <IVueInput v-model="clearableInput" placeholder="someing messasge" clearable></IVueInput>
            <p>{{clearableInput}}</p>
            <p>输入框图标 属性方式</p>
            <IVueInput  placeholder="someing messasge" prefix="face"  clearable></IVueInput>
            <IVueInput  placeholder="someing messasge"  suffix="visibility" clearable></IVueInput>
            <p>输入框图标 slot方式</p>
            <IVueInput  placeholder="someing messasge"  clearable number>
                        <IVueIcon slot="prefix">face</IVueIcon>
            </IVueInput>
            <IVueInput  placeholder="someing messasge"  clearable>
                        <IVueIcon slot="suffix">visibility</IVueIcon>
            </IVueInput>
            <p>input disabled</p>
            <IVueInput  placeholder="someing messasge"  disabled>
            </IVueInput>
            <p>textarea</p>
            <IVueInput  placeholder="someing messasge"  type="textarea" :autosize="{minRows: 2,maxRows: 5}">
            </IVueInput>
            <p>textarea disabled</p>
            <IVueInput  placeholder="someing messasge"  type="textarea" disabled>
            </IVueInput>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  baseInput: '',
                  clearableInput: ''
            }
      },
      methods:{
            enter (event) {
                  console.log(event)
            }
      }
}
</script>

```

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| type    | 输入框类型，可选值为 ```text、password、textarea、url、email、date``` | String | text  |    
| value| 绑定的值，可使用 v-model 双向绑定 |  String，Number  | -  |      
| placeholder | 占位文本	 |  String  | -  |       
| clearable | 是否显示清空按钮	 |  Boolean  | false  | 
| clearIcon  | 清空按钮图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用	 |  String  | cancel  |         
| disabled  | 设置输入框为禁用状态	 |  Boolean  | false  |         
| readonly  | 设置输入框为只读	 |  Boolean  | false  |         
| maxlength  | 设置输入框最大输入长度	 |  Number  | -  |         
| spellcheck  | 原生的 spellcheck 属性	 |  Boolean  | -  |         
| autocomplete  | 原生的自动完成功能，可选值为 off 和 on	 |  String  | off  |         
| autofocus  | 自动获取焦点	 |  Boolean  | false  |         
| number  | 将用户的输入转换为 Number 类型	 |  Boolean  | false  |         
| rows  | 文本域默认行数，仅在 textarea 类型下有效	 |  Number  | 2  |         
| prefix  | 输入框头部图标	 |  String  | -  |         
| suffix  | 输入框尾部图标	 |  String  | -  |         
| autosize  | 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }	|  Boolean , Object  | false  |         


##### events      
  
| 事件      | 说明                     |  返回值 |
| --------- | :----------------------- |  :----- |
| on-enter | 按下回车键时触发 | event   |
| on-keydown | 原生的 keydown 事件 | event   |
| on-keypress | 原生的 keypress 事件 | event   |
| on-keyup | 原生的 keyup 事件 | event   |
| on-focus | 输入框聚焦时触发 | event   |
| on-blur | 输入框失去焦点时触发 | event   |
| on-change | 数据改变时触发 | event   |
    

### IVueStepper 步骤条    

组件用于显示步骤进度，引导用户按流程完成任务。       

#### 例子     
```javascript
<template>
      <div>
            <IVueStepper :currentStep="0"  :direction="'vertical'">
                  <IVueStepperStep title="已完成" content="这里是该步骤的描述信息"></IVueStepperStep>
                  <IVueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IVueStepperStep>
                  <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
                  <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
            </IVueStepper>


            <IVueStepper :currentStep="current" >
                  <IVueStepperStep title="步骤1" icon="account_circle" editable></IVueStepperStep>
                  <IVueStepperStep title="步骤2" editable :status="'error'"></IVueStepperStep>
                  <IVueStepperStep title="步骤3" editable></IVueStepperStep>
                  <IVueStepperStep title="步骤4" editable></IVueStepperStep>
            </IVueStepper>
            <button @click="next">Next step</button>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  current: 0
            }
      },
      methods: {
            next () {
                  if (this.current == 3) {
                        this.current = 0;
                  } else {
                        this.current += 1;
                  }
            }
      }
}
</script>
```

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |         
| currentStep    | 当前步骤,从 0 开始计数 | Number | 0      |           
| direction    | 步骤条方向,可选值为```horizontal```（水平）或 ```vertical```（垂直） | String | horizontal      |           
| status    | 当前步骤的状态，可选值为 ```wait```、```process```、```finish```、```error``` | String | process      |           

### IVueStepperStep 步骤条子组件

通常与```IVueStepper```一起使用

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| status    | 当前步骤的状态，可选值为 ```wait```、```process```、```finish```、```error``` | String | process      |           
| title    | 标题 | String | -      |           
| content    | 内容 | String | -      |           
| icon    | 步骤图标 | String | -      |           
| editable    | 当前步骤是否是否可以通过点击进行下一步 | String | -      |           


### IVueUpLoad 上传

文件选择上传和拖拽上传控件。

#### 例子     
```javascript
<template>
      <div>
            <p>单选文件</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"  :accept="'image/jpeg'" :defaultFileList="defaultList">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>

            <p>多选文件</p>
            <IVueUpLoad multiple :uploadUrl="'//jsonplaceholder.typicode.com/posts/'">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>

            <p>手动上传</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" :beforeUpload="handleUpload">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>
            <div v-if="file !== null">Upload file: {{ file.name }} 
                   <IVueButton class="upload"  :ivueRipple="false" @click="upload" :loading="loadingStatus">
                        {{ loadingStatus ? 'Uploading' : 'Click to upload' }}
                  </IVueButton>
            </div>

            <p>拖拽上传</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" multiple type="drag">
                  <div style="padding: 20px 0">
                        <p>Click or drag files here to upload</p>
                  </div>
            </IVueUpLoad>

            <p>自定义上传列表</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" 
                        multiple 
                        :showUploadList="false"
                        :defaultFileList="defaultList"
                        :onSuccess="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :maxSize="20"
                        :onFormatError="handleFormatError"
                        :beforeUpload="handleBeforeUpload"
                        type="drag"
                        style="display: inline-block;width:58px;"
                        ref="upload"
            >
                  <div style="width: 58px;height:58px;line-height: 58px;">
                        <p>Click or drag files here to upload</p>
                  </div>
            </IVueUpLoad>
            <img v-for="item in uploadList" :src="item.url" :key="item.url" v-if="item.status === 'finished'"/>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  defaultList: [
                        {
                              'name': '1',
                              'url': 'https://cn.vuejs.org/images/logo.png'
                        },
                        {
                              'name': '2',
                              'url': 'https://cn.vuejs.org/images/logo.png'
                        }
                  ],
                  file: null,
                  loadingStatus: false,
                  imgName: '',
                  visible: false,
                  uploadList: []
            }
      },
      mounted () {
            this.uploadList = this.$refs.upload.fileList;
      },
      methods: {
            handleUpload (file) {
                  this.file = file;
                  return false;
            },
            upload () {
                  this.loadingStatus = true;
                  setTimeout(() => {
                        this.file = null;
                        this.loadingStatus = false;
                  }, 1500);
            },
            handleSuccess (res, file) {
                  file.url = 'https://cn.vuejs.org/images/logo.png';
                  file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                  console.error('File format of ' + file.name + ' is incorrect, please select jpg or png.');
            },
            handleBeforeUpload () {
                  const check = this.uploadList.length <= 5;
                  if (!check) {
                        console.error('Up to five pictures can be uploaded.');
                  }
                  return check;
            }
      }
}
</script>

<style lang="scss">
.upload {
  border: 1px solid #dcdee2;
}
</style>
```

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |       
| uploadUrl    | 文件上传地址,必填 | String | -      |                  
| showUploadList    | 是否显示文件已上传列表 | Boolean | true      |                  
| type    | 上传控件的类型，可选值为 ```select```（点击选择），```drag```（支持拖拽） | String | select      |                  
| name    | 上传文件字段名 | String | file      |                  
| multiple    | 是否支持多选文件 | Boolean | false      |                  
| accept    | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | String | -      |                  
| withCredentials    | 支持发送 cookie 凭证信息 | Boolean | false      |                  
| beforeUpload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 | Function | -      |   
| defaultFileList    | 默认已上传的文件列表 | Array | -      |                  
| maxSize    | 文件大小限制，单位 kb | Number | -      |       
| format    | 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用	 | Array | []      |       
| ajaxData    | 上传时附带的额外参数| Object | -      |       
| ajaxHeaders    | 设置上传的请求头部 | Object | {}      |       
| onProgress    | 文件上传时的钩子，返回字段为 event, file, fileList | Function | -      |                  
| onSuccess    | 文件上传成功时的钩子，返回字段为 response, file, fileList | Function | -      |                  
| onError    |文件上传失败时的钩子，返回字段为 error, file, fileList | Function | -      |                  
| onFileData    | 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据 | Function | -      |                  
| onRemove    | 文件列表移除文件时的钩子，返回字段为 file, fileList | Function | -      |                  
| onExceededSize    | 文件超出指定大小限制时的钩子，返回字段为 file, fileList  | Function | -      |       
| onFormatError    | 文件格式验证失败时的钩子，返回字段为 file, fileList | Function | -      |       
           

##### methods     

| 方法名          | 说明                             |  默认值 |          
| ------------- | :------------------------------- |  :----- |        
| clearFiles    | 清空已上传的文件列表 | -      |      
   


### IVueProgress 进度条

展示操作或任务的当前进度，比如上传文件。


#### 例子     
```javascript
<template>
      <div>
            <IVueProgressLinear :percent="40" class="red-accent-4" ></IVueProgressLinear>
            <IVueProgressLinear :percent="40"  status="active" ></IVueProgressLinear>
            <IVueProgressLinear :percent="65"  status="wrong"></IVueProgressLinear>
            <IVueProgressLinear :percent="100"  ></IVueProgressLinear>
            <IVueProgressLinear :percent="80"  hideText></IVueProgressLinear>
            <IVueProgressLinear :percent="100"  ><span>成功</span></IVueProgressLinear>

            <IVueProgressCircular :percent="20" class="red-accent-4"></IVueProgressCircular>
            <IVueProgressCircular :percent="value" :size="100" :width="15" :rotate="360" class="purple">{{value}}</IVueProgressCircular>
            <IVueProgressCircular :percent="60" status="wrong"></IVueProgressCircular>
            <IVueProgressCircular :percent="80"></IVueProgressCircular>
            <IVueProgressCircular :percent="100"></IVueProgressCircular>
            <IVueProgressCircular :percent="20" indeterminate></IVueProgressCircular>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  interval: {},
                  value: 0
            }
      },
      beforeDestroy () {
            clearInterval(this.interval)
      },
      mounted () {
            this.interval = setInterval(() => {
                  if (this.value === 100) {
                        return (this.value = 0)
                  }
                  this.value += 10
            }, 1000)
      }
}
</script>
```

#### IVueProgressLinear 线条

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| status    | 状态，可选值为normal、active、wrong、success | String | normal      |               
| height    | 进度条的高度，单位 px | Number | 10      |          
| percent    | 百分比 | Number | 0      |         
| successPercent    | 已完成的分段百分比 | Number | 0      |         
| hideText    | 隐藏文字 | Boolean | false      |           


#### IVueProgressCircular 圆形

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| status    | 状态，可选值为normal、active、wrong、success | String | normal      |               
| rotate    | 旋转角度 | Number | 0      |          
| size    | 圆圈大小，单位 px | Number | 50      |          
| width    | 圆圈的宽度 | Number | 4      |          
| percent    | 百分比 | Number | 0      |          
| hideText    | 隐藏文字 | Boolean | false      |           
| indeterminate    | 一个不确定的进度圆环永远循环动画 | Boolean | false      |           
           

#### IVueNotice 通知提醒

在界面右上角显示可关闭的全局通知，常用于以下场景：

* 通知内容带有描述信息
* 系统主动推送

#### 例子

```javascript
<template>
      <div>
            <Button type="primary" @click="time">Open notice</Button>
            <Button type="primary" @click="close">close</Button>
            <Button type="primary" @click="destroy">destroy</Button>
      </div>
</template>

<script>
const prefixCls = 'ivue-notice';
const title = 'title';
const desc = 'desc';

export default {
    data () {
        return {

        }
    },
    methods: {
        time () {
            this.$IVueNotice.config({
                top: 100,
                duration: 3
            });
            this.$IVueNotice.open({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.open({
                title: 'name : one',
                duration: 0,
                name: 'one'
            });
            this.$IVueNotice.success({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0,
                render: h => {
                    return h('span', [
                        'This is created by ',
                        h('a', 'render'),
                        ' function'
                    ])
                }
            });
            this.$IVueNotice.success({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.success({
                title: 'Notification title',
                duration: 0
            });
            this.$IVueNotice.info({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.info({
                title: 'Notification title',
                duration: 0
            });
            this.$IVueNotice.warning({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.warning({
                title: 'Notification title',
                duration: 0
            });
            this.$IVueNotice.error({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.error({
                title: 'Notification title',
                duration: 0
            });

        },
        close(){
             this.$IVueNotice.close('one');
        },
        destroy(){
             this.$IVueNotice.destroy();
        }
    }
}
</script>
```


API

##### instance     

通过直接调用以下方法来使用组件：

* ```this.$IVueNotice.open(config)```
* ```this.$IVueNotice.info(config)```
* ```this.$IVueNotice.success(config)```
* ```this.$IVueNotice.warning(config)```
* ```this.$IVueNotice.error(config)```      


参数 config 为对象，具体说明如下：     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| title    | 通知提醒的标题 | String | -      |          
| desc    | 通知提醒的内容，为空或不填时，自动应用仅标题模式下的样式 | String | -      |          
| render    | 自定义描述内容，使用 Vue 的 Render 函数，如果同时设置了 render 和 desc，则只显示 render 的内容 | Function | -      |          
| duration    | 自动关闭的延时，单位秒，不关闭可以写 0 | Number | 4.5      |          
| name    | 当前通知的唯一标识 | String | 自动      |            
| onClose    | 关闭时的回调 | Function | -      |              


另外提供了全局配置、全局关闭某个通知和全局销毁的方法：        

* ```this.$IVueNotice.config(options)```
* ```this.$IVueNotice.close(options)```
* ```this.$IVueNotice.destroy()```

```javascript
this.$Notice.config({
    top: 50,
    duration: 3
});
```     

  
| 属性      | 说明                     | 类型    | 默认值 |
| --------- | :----------------------- | :------ | :----- |       
| top | 通知组件距离顶端的距离，单位像素 | Number | 24  |      
| duration | 默认自动关闭的延时，单位秒 | Number | 4.5  |      


#### IVueMessage 全局提示

轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。

#### 例子

```javascript
<template>
      <div>
            <Button type="primary" @click="click">Open notice</Button>
            <Button type="primary" @click="destroy">Open notice</Button>
            
      </div>
</template>

<script>
export default {
      methods: {
            click () {
                  this.$IVueMessage.config({
                        top: 50,
                        duration: 0
                  });
                  this.$IVueMessage.success({
                        content: 'Tips for manual closing',
                        duration: 0,
                        closable: true
                  });
                  this.$IVueMessage.success({
                        content: 'Tips for manual closing',
                  });
                  this.$IVueMessage.loading({
                        content: 'Loading...',
                        duration: 0
                  });
                  this.$IVueMessage.success({
                        content: 'Tips for manual closing',
                        render: h => {
                              return h('span', [
                                    'This is created by ',
                                    h('a', 'render'),
                                    ' function'
                              ])
                        }
                  });
                  this.$IVueMessage.info('This is created by ');
                  this.$IVueMessage.warning('This is created by ');
                  this.$IVueMessage.error('This is created by ');
            },
            destroy () {
                  this.$IVueMessage.destroy();
            }
      }
}
</script>

```

API

##### instance     

通过直接调用以下方法来使用组件：

* ```this.$IVueMessage.info(config)```
* ```this.$IVueMessage.success(config)```
* ```this.$IVueMessage.warning(config)```
* ```this.$IVueMessage.error(config)```      
* ```this.$IVueMessage.loading(config)```      


参数 config 为对象，具体说明如下：     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| content    | 	提示内容 | String | -      |          
| render    | 自定义描述内容，使用 Vue 的 Render 函数 | Function | -      |          
| duration    | 自动关闭的延时，单位秒，不关闭可以写 0 | Number | 1.5      |          
| onClose    | 关闭时的回调 | Function | -      |              
| closable    | 是否显示关闭按钮	 | Boolean | false      |              


另外提供了全局配置和全局销毁的方法：        

* ```this.$IVueMessage.config(options)```
* ```this.$IVueMessage.destroy()```

```javascript
this.$Notice.config({
    top: 50,
    duration: 3
});
```     

  
| 属性      | 说明                     | 类型    | 默认值 |
| --------- | :----------------------- | :------ | :----- |       
| top | 通知组件距离顶端的距离，单位像素 | Number | 24  |      
| duration | 默认自动关闭的延时，单位秒 | Number | 1.5  |      
    


### Tabs 标签页

组件用于隐藏可选项目后面的内容。这也可以用作页面的伪导航     

#### 例子

```javascript
<template>
      <div>
            <IVueTabs color="#424242" v-model="active">
                  <IVueTab v-for="n in 10" :key="`item${n}`"  :disabled="n === 3" >Item {{ n }}</IVueTab>
                  <IVueTabItem  v-for="n in 10" :key="n">{{text}}{{n}}</IVueTabItem>
            </IVueTabs>

            <IVueTabs color="#424242" centered height="100">
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true"><IVueIcon>menu</IVueIcon></IVueTab>
            </IVueTabs>

             <IVueTabs color="#424242" right sliderColor="yellow" >
                  
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true"><IVueIcon>menu</IVueIcon></IVueTab>
            </IVueTabs>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  active: 5,
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
      }
}
</script>

```

API

##### IVueTabs props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| value    | 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据 | String,Number | 默认为第一项     |
| height   | 导航高度  | String,Number | -    |
| centered   | 导航内容居中  | Boolean | -    |
| right   | 导航内容向右  | Boolean | -    |
| sliderColor   | 滑动条颜色  | String | -    |
| hideSlider   | 滑动条隐藏  | Boolean | -    |
| showArrows   | 是否显示导航栏箭头  | Boolean | -    |
| nextIcon   | 导航栏箭头右边图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用  | String | chevron_right    |
| prevIcon   | 导航栏箭头左边图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用  | String | chevron_left    |


##### IVueTab props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| disabled    | 是否禁用当前项 | Boolean | false      |
| rippleDisabled    | 是否禁用涟漪效果 | Boolean | false      |
| rippleCentered    | 是否居中涟漪效果 | Boolean | false      |
        

##### IVueTabsSlider props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| color    | 滑动条颜色 | String | #fff      |
        
##### IVueTabItem props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| transition    | 滑动动画 | String | tab-transition      |
        


### IVueLoadingBar 加载进度条

全局创建一个显示页面加载、异步请求、文件上传等的加载进度条。

API

##### instance     

通过直接调用以下方法来使用组件：

* ```this.$IVueLoadingBar.start()```
* ```this.$IVueLoadingBar.finish()```
* ```this.$IVueLoadingBar.error()```
* ```this.$IVueLoadingBar.update(percent)```

具体说明如下：     

| 属性          | 说明                             | 参数   |
| ------------- | :------------------------------- | :----- | 
| start    | 	开始从 0 显示进度条，并自动加载进度 | 无 | 
| finish    | 	结束进度条，自动补全剩余进度 | 无 | 
| error    | 	以错误的类型结束进度条，自动补全剩余进度 | 无 | 
| update    | 	精确加载到指定的进度 | percent，指定的进度百分比 | 


另外提供了全局配置和全局销毁的方法：        

* ```this.$IVueLoadingBar.config(options)```
* ```this.$IVueLoadingBar.destroy()```

```javascript
this.$IVueLoadingBar.config({
    color: '#5cb85c',
    failedColor: '#f0ad4e',
    height: 5
});
```     
  
| 属性      | 说明                     | 类型    | 默认值 |
| --------- | :----------------------- | :------ | :----- |       
| color | 进度条的颜色 | String | primary  |      
| failedColor | 失败时的进度条颜色 | String | error  |      
| height | 进度条高度，单位 px | Number | 2  |      
    


### IVueBadge 图钉

主要用于通知未读数的角标，提醒用户点击。

#### 例子

```javascript
<template>
      <div>
            <IVueBadge :count="3" color="#ba68c8" :show="show">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

             <IVueBadge :count="0" color="purple" :showZero="true">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

            <IVueBadge  dot color="#ba68c8" :count="0">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

             <IVueBadge  text="123" :offset="[10,10]">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

            <IVueBadge dot>
                   <a href="#">可以是一个链接</a>
            </IVueBadge>

            <button @click="onShow">show</button>
      </div>
</template>

<script>
      export default {
            data() {
                  return {
                        show: false
                  }
            },
            methods:{
                  onShow(){
                        this.show = !this.show
                  }
            }
      }
</script>

<style scoped>
 .demo-badge{
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
    }
</style>
```

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| count    | 显示的数字，大于overflowCount时，显示${overflowCount}+，为 0 时隐藏 | Number | -      |
| overflowCount    | 展示封顶的数字值 | Number， String	 | 99      |
| dot    | 不展示数字，只有一个小红点，如需隐藏 dot ，需要设置count为 0 | Boolean	 | false      |
| offset    | 设置状态点的位置偏移，格式为 [x, y] |Array	 | -      |
| showZero    | 当数值为 0 时，是否展示 Badge  |Boolean	 | false     |
| text    | 自定义内容  | String	 | -     |
| color    | 设置badge的颜色  | String	 | #ed4014     |
| show    | 是否显示badge  | Boolean	 | true     |


### IVueDatePicker 日期/月份选择器

选择日期，支持年、月、日期类型，直观表示。
    

#### 例子

```javascript
<template>
  <div>
    <h1>日历变为横向 设置为多选 宽度百分百</h1>
    <IVueDatePicker v-model="dates" headerColor="red" color="blue" landscape fullWidth multiple></IVueDatePicker>

    <h1>一开始显示为月份</h1>
    <IVueDatePicker v-model="picker" type="month"></IVueDatePicker>

    <h1>语言</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH" :showCurrent="false"></IVueDatePicker>

    <h1>设置允许选择日期</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH" :allowedDates="allowedDates"></IVueDatePicker>

    <h1>便签</h1>
    <p>function</p>
    <IVueDatePicker
      v-model="picker"
      :note="arrayEvents"
      :noteColor="date => date[9] % 2 ? 'red' : 'yellow'"
    ></IVueDatePicker>
    <p>array</p>
    <IVueDatePicker v-model="picker" :note="['2018-12-10']" :noteColor="'red'"></IVueDatePicker>

    <h1>一周的第一天</h1>
    <IVueDatePicker :value="picker" firstDayOfWeek="0"></IVueDatePicker>
    <IVueDatePicker :value="picker" firstDayOfWeek="1"></IVueDatePicker>

    <h1>图标设置</h1>
    <IVueDatePicker
      :value="picker"
      nextIcon="arrow_right"
      prevIcon="arrow_left"
      yearIcon="event_note"
    ></IVueDatePicker>

    <h1>只读</h1>
    <IVueDatePicker v-model="picker" readonly></IVueDatePicker>
    <IVueDatePicker v-model="picker" type="month" readonly></IVueDatePicker>

    <h1>noTitle</h1>
    <IVueDatePicker v-model="picker" noTitle @input="handleInput"></IVueDatePicker>

    <h1>width</h1>
    <IVueDatePicker v-model="picker" width="500"></IVueDatePicker>

    <h1>multiple</h1>
    <IVueDatePicker v-model="months" type="month" multiple></IVueDatePicker>

    <h1>max min</h1>
    <IVueDatePicker v-model="picker" min="2016-06-15" max="2018-03-20"></IVueDatePicker>

    <h1>reactive</h1>
    <IVueDatePicker v-model="picker" reactive></IVueDatePicker>
    <IVueDatePicker v-model="picker" locale="zh-CH" reactive :showCurrent="false"></IVueDatePicker>

    <h1>pickerDate</h1>
    <IVueDatePicker v-model="picker" :pickerDate.sync="pickerDate"></IVueDatePicker>

    <h1>titleDateFormat</h1>
    <IVueDatePicker
      v-model="picker"
      :titleDateFormat="format('zh-CN',{ weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })"
    ></IVueDatePicker>

    <h1>titleYearFormat</h1>
    <IVueDatePicker
      v-model="picker"
      :titleYearFormat="titleYearFormat('zh-CN',{ year: 'numeric', timeZone: 'UTC' })"
    ></IVueDatePicker>

    <h1>dayFormat</h1>
    <IVueDatePicker
      v-model="picker"
      :dayFormat="format('zh-CN',{ day: 'numeric', timeZone: 'UTC' })"
    ></IVueDatePicker>

    <h1>monthFormat</h1>
    <IVueDatePicker
      v-model="picker"
      :monthFormat="format('zh-CN',{ month: 'short', timeZone: 'UTC' })"
    ></IVueDatePicker>

    <h1>headerDateFormat</h1>
    <IVueDatePicker
      v-model="picker"
      :headerDateFormat="format('zh-CN',{ month: 'long', year: 'numeric', timeZone: 'UTC' })"
    ></IVueDatePicker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      dates: ['2018-09-15', '2018-09-20'],
      arrayEvents: null,
      months: ['2018-09', '2018-10'],
      pickerDate: null
    }
  },
  mounted () {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
  },
  methods: {
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
    handleInput (value) {
      console.log(value)
    },
    titleDateFormat (locale, options, { start, length } = { start: 0, length: 0 }) {
      // 适配IOS
      const makeIsoString = (dateString) => {
        const [year, month, date] = dateString.trim().split(' ')[0].split('-');


        return [year, month, date].join('-');
      }
      // 初始化 根据语言来格式化日期和时间的对象
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);

      return (dateString) => {
        return '12月12日周三'
      }

    },
    titleYearFormat (locale, options) {
      // 适配IOS
      const makeIsoString = (dateString) => {
        const [year, month, date] = dateString.trim().split(' ')[0].split('-');


        return [year, month, date].join('-');
      }
      // 初始化 根据语言来格式化日期和时间的对象
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);

      return (dateString) => {
        return '12月12日周三'
      }

    },
    format (locale, options) {
      // 适配IOS
      const makeIsoString = (dateString) => {
        const [year, month, date] = dateString.trim().split(' ')[0].split('-');

        return [year, this.padStart(month || 1,2,0), this.padStart(date || 1,2,0)].join('-');
      }
      // 初始化 根据语言来格式化日期和时间的对象
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);

      return (dateString) => {
        return intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
      }

    },
    padStart (string, targetLength, padString) {
      targetLength = targetLength >> 0;
      string = String(string);
      padString = String(padString);
      if (string.length > targetLength) {
        return String(string);
      }

      targetLength = targetLength - string.length;

      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }

      return padString.slice(0, targetLength) + String(string);
    }
  },
  watch: {
    pickerDate (val) {
      console.log(val)
    }
  }
}
</script>

```

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| landscape    | 日历方向,纵向（默认）和 横向 | Boolean | false     |
| fullWidth    | 指定```IVueDatePicker```的宽度是否为 100% | Boolean | false     |
| width    | 指定```IVueDatePicker```的宽度 | Number, String | 290     |
| multiple    | 可以选择多个月或者多个日,使用```multiple```那么 ```v-modul``` 或者 ```value``` 必须为数组 | Boolean | false     |
| type    | 日历显示的类型,```date```(默认日期) 和 ```month```(月期)| String | date     |
| value    | 设置需要显示的日期或者月期 | Array, String | -     |
| locale    | 指定BCP 47语言标记 | String | en-us   |
| min    | 设置最小可选择日期 | String | -   |
| max    | 设置最大可选择日期 | String | -   |
| showCurrent    | 是否显示当前日期 | Boolean, String | true   |
| note    |用于标记需要注意的日期 | Array, Function | -   |
| noteColor    | 改变标记需要注意的日期的颜色 | String, Function, Object | warning   |
| firstDayOfWeek    | 设置日历一周的第一天 | String, Number | 0   |
| yearIcon    | 为年份标题添加图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用 | Strin | -   |
| prevIcon    | 为月份选择按钮(左侧按钮)设置图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用| String | chevron_left  |
| nextIcon    | 为月份选择按钮(右侧按钮)设置图标,通常与图标库 [material.io](https://material.io/tools/icons/?icon=keyboard_arrow_left&style=baseline)一起使用| String | chevron_right  |
| readonly    | 设置日历是否只读，设置后所有操作将禁用 | Boolean | -   |
| reactive    | 点击月份或者年份时月份或年份是否跟随改变 | Boolean | -   |
| pickerDate    | 您可以观察```pickerDate```，它是显示的月/年（取决于选择器类型和活动视图），以便在更改时执行某些操作 | String | -   |
| headerColor    | 设置头部标签颜色 | String | -   |
| color    | 设置其他区域(日期，月份，年份)选择颜色 | String | -   |
| noTitle    | 设置是否隐藏日历头部 | Boolean | -   |

##### events      
  
| 事件      | 说明                     | 类型    | 返回值 |
| --------- | :----------------------- | :------ | :----- |
| input | 日历日期改变时触发 | String | -  |
    
##### functions      
  
| 事件      | 说明                     | 类型    | 
| --------- | :----------------------- | :------ | 
| titleDateFormat | 自定义标题日期格式 | Function |
| titleYearFormat | 自定义标题年份格式 | Function |
| allowedDates    | 使用函数指定允许选择的日期 | Function | -   |
| dayFormat    | 自定义日期格式| Function | -   |
| headerDateFormat    | 自定义表头部日/月格式| Function | -   |

# 其他

### IVueAffix 图钉

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。

API

##### props     

| 属性          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | :----- |
| offset-top    | 距离窗口顶部达到指定偏移量后触发 | Number | 0      |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | Number | -      |
           
##### events      
  
| 事件      | 说明                     | 类型    | 返回值 |
| --------- | :----------------------- | :------ | :----- |
| on-change | 在固定状态发生改变时触发 | Boolean | false  |
    
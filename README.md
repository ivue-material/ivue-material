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
    
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

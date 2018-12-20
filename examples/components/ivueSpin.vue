<template>
      <div>
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

           <p>小</p>
           <IvueSpin size="small"></IvueSpin> 
           <p>中</p>
           <IvueSpin></IvueSpin> 
           <p>大</p>
           <IvueSpin size="large"></IvueSpin> 
           <p>居中固定</p>
           <div class="demo-spin-container">
                 <IvueSpin fix></IvueSpin> 
           </div>
            <p>自定义内容</p>
           <div class="demo-spin-col">
                 <IvueSpin fix>加载中...</IvueSpin> 
           </div>
           <div class="demo-spin-col">
                <IvueSpin fix>
                  <IvueIcon class="demo-spin-icon-load">donut_large</IvueIcon>
                  <div>Loading</div>
                </IvueSpin> 
           </div>
           <div class="demo-spin-col">
                <IvueSpin fix>
                  <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                  </div>
                </IvueSpin> 
           </div>
           <p>整页加载</p>
           <div>
                  <IvueButton @click="handleSpinShow">整页显示，3秒后关闭</IvueButton>
                  <IvueButton @click="handleSpinCustom">自定义显示内容</IvueButton>
           </div>
      </div>
</template>

<script>


export default {
      methods: {
            handleSpinShow () {
                  this.$IvueSpin.show();
                  setTimeout(() => {
                        this.$IvueSpin.hide();
                  }, 3000)
            },
            handleSpinCustom () {
                  this.$IvueSpin.show({
                        render: (h) => {
                              return h('div', [
                                    h('IvueIcon', {
                                          'class': 'demo-spin-icon-load',
                                    }, 'donut_large'),
                                    h('div', 'Loading')
                              ])
                        }
                  });

                  setTimeout(() => {
                        this.$IvueSpin.hide();
                  }, 3000);
            }
      }
}
</script>

<style lang="scss">
.demo-spin-container {
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #000;
}

.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

.loader {
  width: 30px;
  height: 30px;
  position: relative;
  margin: 0 auto;
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

@keyframes color {
  0%,
  100% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

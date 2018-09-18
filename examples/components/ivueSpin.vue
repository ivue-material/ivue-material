<template>
      <div>
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

           <p>小</p>
           <IVueSpin size="small"></IVueSpin> 
           <p>中</p>
           <IVueSpin></IVueSpin> 
           <p>大</p>
           <IVueSpin size="large"></IVueSpin> 
           <p>居中固定</p>
           <div class="demo-spin-container">
                 <IVueSpin fix></IVueSpin> 
           </div>
            <p>自定义内容</p>
           <div class="demo-spin-col">
                 <IVueSpin fix>加载中...</IVueSpin> 
           </div>
           <div class="demo-spin-col">
                <IVueSpin fix>
                  <IVueIcon class="demo-spin-icon-load">donut_large</IVueIcon>
                  <div>Loading</div>
                </IVueSpin> 
           </div>
           <div class="demo-spin-col">
                <IVueSpin fix>
                  <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                  </div>
                </IVueSpin> 
           </div>
           <p>整页加载</p>
           <div>
                  <IVueButton @click="handleSpinShow">整页显示，3秒后关闭</IVueButton>
                  <IVueButton @click="handleSpinCustom">自定义显示内容</IVueButton>
           </div>
      </div>
</template>

<script>


export default {
      methods: {
            handleSpinShow () {
                  this.$IVueSpin.show();
                  setTimeout(() => {
                        this.$IVueSpin.hide();
                  }, 3000)
            },
            handleSpinCustom () {
                  this.$IVueSpin.show({
                        render: (h) => {
                              return h('div', [
                                    h('IVueIcon', {
                                          'class': 'demo-spin-icon-load',
                                    }, 'donut_large'),
                                    h('div', 'Loading')
                              ])
                        }
                  });

                  setTimeout(() => {
                        this.$IVueSpin.hide();
                  }, 3000);
            }
      }
}
</script>

<style>
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

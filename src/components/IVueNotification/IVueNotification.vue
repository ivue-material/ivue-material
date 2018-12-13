<template>
      <div :class="classes" :style="styles">
            <IVueNotice v-for="notice in noticesList"
                        :key="notice.name"
                        :prefixCls="notice.prefixCls"
                        :content="notice.content"
                        :type="notice.type"
                        :styles="notice.styles"
                        :render="notice.render"
                        :transitionName="notice.transitionName"
                        :onClose="notice.onClose"
                        :duration="notice.duration"
                        :closable="notice.closable"
                        :name="notice.name"
                        :haveIcon="notice.haveIcon"

            ></IVueNotice>
      </div>
</template>

<script>
import IVueNotice from './IVueNotice';

let seed = 0;
const now = Date.now();
const prefixCls = 'ivue-notification';

function getUuid () {
      return 'IVueNotification' + now + '_' + (seed++);
}

export default {
      name: 'IVueNotification',
      props: {
            prefixCls: {
                  type: String,
                  default: prefixCls
            },
            styles: {
                  type: Object,
                  default: function () {
                        return {
                              top: '70px',
                              left: '50%'
                        }
                  }
            },
            content: {
                  type: String,
                  default: ''
            },
            className: {
                  type: String
            }
      },
      data () {
            return {
                  // 通知列表
                  noticesList: []
            }
      },
      computed: {
            classes () {
                  return [
                        this.prefixCls,
                        {
                              [`${this.className}`]: this.className
                        }
                  ]
            }
      },
      methods: {
            // 添加通知列表
            add (notice) {
                  const name = notice.name || getUuid();

                  let _notice = Object.assign({
                        styles: {
                              right: '50%'
                        },
                        content: '',
                        duration: 1.5,
                        closable: false,
                        name: name
                  }, notice);

                  this.noticesList.push(_notice);
            },
            // 清除
            close (name) {
                  const noticesList = this.noticesList;

                  for (let i = 0; i < noticesList.length; i++) {
                        if (noticesList[i].name === name) {
                              this.noticesList.splice(i, 1);
                              break;
                        }
                  }

            },
            // 清除所有
            closeAll () {
                  this.noticesList = [];
            }
      },
      components: {
            IVueNotice
      }
}
</script>

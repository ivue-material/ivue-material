<template>
      <i class="ivue-svg-loader" v-html="html"></i>
</template>

<script lang='ts'>
let ivueSVGStore = {};
import { defineComponent } from 'vue'

export default defineComponent({
      name: 'ivue-svg-loader',
      props: {
            /*
            * svg图标的来源
            */
            svgSrc: {
                  type: String,
                  required: true
            }
      },
      data () {
            return {
                  /**
                  * html
                  *
                  * @type {String}
                  */
                  html: null,
                  /**
                  * 错误提示
                  *
                  * @type {String}
                  */
                  error: null
            }
      },
      mounted () {
            // 加载svg图标
            this.loadSvg();
      },
      methods: {
            // 判断是否是svg
            isSvg (mimetype) {
                  return mimetype.indexOf('svg') >= 0;
            },
            // 设置html
            setHtml () {
                  ivueSVGStore[this.svgSrc].then((html) => {
                        this.html = html;

                        return this.$nextTick();
                  }).then(() => {
                        this.$emit('svg-loaded');
                  })

            },
            // 错误提示
            unexpectedError (reject) {
                  this.error = `Something bad happened trying to fetch ${this.svgSrc}`;
                  reject(this.error);
            },
            // 加载svg图标
            loadSvg () {
                  if (!ivueSVGStore.hasOwnProperty(this.svgSrc)) {
                        ivueSVGStore[this.svgSrc] = new Promise((resolve, reject) => {
                              const request = new window.XMLHttpRequest();

                              request.open('GET', this.svgSrc, true);

                              request.onload = () => {
                                    const mimetype = request.getResponseHeader('content-type');

                                    // 判断是否是svg
                                    if (request.status === 200) {
                                          if (this.isSvg(mimetype)) {
                                                resolve(request.response);

                                                this.setHtml();
                                          }
                                          else {
                                                this.error = `The file ${this.mdSrc} is not a valid SVG.`;
                                                reject(this.error);
                                          }
                                    }
                                    else if (request.status >= 400 && request.status < 500) {
                                          this.error = `The file ${this.mdSrc} do not exists.`;
                                          reject(this.error);
                                    }
                                    else {
                                          this.unexpectedError(reject);
                                    }
                              }


                              // 错误时发生
                              request.onerror = () => this.unexpectedError(reject);

                              // 中断时发生
                              request.onabort = () => this.unexpectedError(reject);

                              // 发送ajax
                              request.send();
                        });
                  }
                  else {
                        this.setHtml();
                  }

            }

      }
})
</script>

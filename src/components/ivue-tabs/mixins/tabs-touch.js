export default {
      methods: {
            newOffset (direction) {
                  const clientWidth = this.$refs.wrapper.clientWidth;

                  if (direction === 'prev') {
                        return Math.max(this.scrollOffset - clientWidth, 0);
                  }
                  else {
                        // const offset = Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);

                        // if (this.showArrows) {
                        //       this.scrollOffset -= offset - (this.arrowsMargin + additionalOffset);
                        // }
                        // else {
                        //       this.scrollOffset -= offset;
                        // }
                        return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);
                  }
            },
            onTouchStart (e) {
                  this.startX = this.scrollOffset + e.touchstartX;

                  this.$refs.container.style.transition = 'none';
                  this.$refs.container.style.willChange = 'transform';
            },
            onTouchMove (e) {
                  this.scrollOffset = this.startX - e.touchmoveX;
            },
            onTouchEnd () {
                  const container = this.$refs.container;
                  const wrapper = this.$refs.wrapper;

                  const maxScrollOffset = container.clientWidth - wrapper.clientWidth;
                  container.style.transition = null;
                  container.style.willChange = null;

                  if (this.scrollOffset < 0 || !this.isOverflowing) {
                        this.scrollOffset = 0;
                  }
                  else if (this.scrollOffset >= maxScrollOffset) {
                        this.scrollOffset = maxScrollOffset;
                  }
            }
      }
}
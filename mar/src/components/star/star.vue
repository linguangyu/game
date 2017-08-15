<template>
  <div class="star star-24">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const GLS_ON = 'on';
  const GLS_HALF = 'half';
  const GLS_OFF = 'off';

  export default {
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(GLS_ON);
        }
        if (hasDecimal) {
          result.push(GLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(GLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/min.scss";

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-24 {
      .star-item {
        width: pxTorem(22);
        height: pxTorem(22);
        margin-right: 3px;

        &:last-child {
          margin-right: 0;
        }
        &.on {
          background: url("./star24_on@3x.png") no-repeat left top;
          -webkit-background-size: pxTorem(22) pxTorem(22);
          background-size: pxTorem(22) pxTorem(22);
        }
        &.half {
          background: url("./star24_half@3x.png") no-repeat left top;
          -webkit-background-size: pxTorem(22) pxTorem(22);
          background-size: pxTorem(22) pxTorem(22);
        }
        &.off {
          background: url("./star24_off@3x.png") no-repeat left top;
          -webkit-background-size: pxTorem(22) pxTorem(22);
          background-size: pxTorem(22) pxTorem(22);

        }
      }
    }
  }

</style>

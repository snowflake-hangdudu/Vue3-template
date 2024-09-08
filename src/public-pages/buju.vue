<template>
  <div class="app-container">
    <div class="item">
      <h1 class="label">定位</h1>
      <div class="content">
        <div class="loc">
          <div class="abs">
            <div class="content1">我是相对定位</div>
          </div>
          <div class="rel">
            <div class="content2">我是绝对定位</div>
          </div>
          <div class="fix">
            <div class="content3">我是固定定位</div>
          </div>
          <div class="sticky">
            <span>
              我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容
              我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容
            </span>
            <div class="content4">我是粘性定位</div>
            <span>
              我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容
            </span>
            <span>
              我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容
              我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容我是填充的内容
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;

  .item {
    display: flex;

    .label {
      width: 100px;
      background-color: aqua;
    }

    .content {
      display: flex;
      flex: 1;
      background-color: aquamarine;
      .loc {
        display: flex;
        background-color: lightblue;

        .abs,
        .rel,
        .fix,
        .sticky {
          background-color: pink;
          margin: 0 100px;
          width: 25%;
          height: 500px;
          overflow: auto;
        }

        .rel {
          position: relative;
        }

        .content1 {
          position: relative;
          transform: translate(50px, 50px);
          background-color: blue;
        }

        .content2 {
          position: absolute;
          transform: translate(50px, 50px);
          background-color: green;
        }

        .content3 {
          position: fixed;
          transform: translate(50px, 50px);
          background-color: yellow;
        }

        .content4 {
          position: sticky;
          top: 30px;
          left: 30px;
          background-color: orange;
        }
      }
    }
  }
}
</style>

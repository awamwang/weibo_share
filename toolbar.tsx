import "@logseq/libs";

export function createModel() {
  return {
    openModel() {
      logseq.showMainUI();
    },
  };
}

export function toolbar() {
  logseq.setMainUIInlineStyle({
    position: "fixed",
    zIndex: 12,
  });

  const key = logseq.baseInfo.id;
  console.log("toolbar keys", key);

  logseq.provideStyle(`
    @import url("https://at.alicdn.com/t/font_2409735_haugsknp36e.css");

    div[data-injected-ui=open-calendar-${key}] {
      display: flex;
      align-items: center;
      font-weight: 500;
      position: relative;
      top: 0px;
    }

    div[data-injected-ui=open-calendar-${key}] a {
      opacity: 1;
      padding: 6px;
    }

    div[data-injected-ui=open-calendar-${key}] iconfont {
      font-size: 18px;
    }
  `);

  // external btns
  // logseq.App.registerUIItem('toolbar', {
  //   key: 'weibo-share-share',
  //   template: `
  //     <div>aaa</div>
  //   `,
  // })
  logseq.App.registerUIItem("toolbar", {
    key: "weibo-share",
    template: `
      <a class="button" data-on-click="openModel">
        <i class="iconfont icon-calendar"></i>
      </a>
    `,
  });
}

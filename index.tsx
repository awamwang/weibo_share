import "@logseq/libs";

import { createModel, toolbar } from "./toolbar";

async function main() {
  logseq.Editor.registerSlashCommand("weibo", async () => {
    //insertAtEditingCursor 这个函数是向logseq当前光标处插入传参的内容
    await logseq.Editor.insertAtEditingCursor(`{{renderer :weibo,Logseqs}}`);
  });

  logseq.provideModel({
    msg(e: any) {
      const { msg } = e.dataset;
      logseq.App.showMsg(`Hello! ${msg}`);
    },
  });

  logseq.App.onMacroRendererSlotted(({ slot, payload }) => {
    const [type, name] = payload.arguments;
    const { uuid } = payload;
    if (type !== ":weibo") return;
    logseq.provideUI({
      key: "h1-playground",
      slot,
      reset: true,
      template: `
      <div class="hello" data-msg="${name}" data-on-click="msg" >
        hello! ${name}
      </div>
      <wb-share-button>分享到微博</wb-share-button>
     `,
    });
  });

  logseq.provideModel({
    async update(e: any) {
      const { blockUuid } = e.dataset;
      const block = await logseq.Editor.getBlock(blockUuid);
      if (!block) return;

      let newContent = block?.content;
      if (block?.content?.indexOf("red") > -1) {
        newContent = block?.content?.replace(`red`, `green`);
      } else {
        newContent = block?.content?.replace(`green`, `red`);
      }
      await logseq.Editor.updateBlock(blockUuid, newContent);
    },
  });

  toolbar();
}

logseq
  .ready(createModel())
  .then(main)
  .catch((err) => {
    console.error(`[Logseq Weibo Share] error: ${err}`);
  });

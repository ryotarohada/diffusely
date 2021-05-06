export interface options {
  observation?: boolean;
  entryPoint?: any;
}

export default class Diffusely {
  private _root: Element | null = null;
  private _pageName: string | null = null;
  private _options: options | null = null;
  public pathMap: any;

  constructor(options?: options) {
    console.log(`[message] - diffusely.setup...🏃‍♂️`);
    this.init(options);
  }

  // 初期化
  private init(options?: options): void {

    // オプションがオブジェクトかチェック
    if (typeof options === "object") {
      this._options = options;
    };

    // entryPoint option
    if (this._options?.entryPoint) {

      const isElement = (node: any) => {
        return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
      };

      if (!isElement(options?.entryPoint)) {
        throw new Error("options.entryPointに渡す値はHTML要素である必要があります。");
      };

      this._root = this._options.entryPoint;

    }

      // Body要素とpage-name属性を取得
      if (!this._root) this._root = document.body;
      this._pageName = this._root.getAttribute("data-page-name");

      /*
      if (this._root.nodeType !== 1) {
        throw new Error("body要素の取得に失敗しました。");
      };
      */

      if (!this._pageName || typeof this._pageName !== "string" || this._pageName === "") {
        throw new Error("data-page-nameに値をセットする必要があります。" + "または" + "body要素にdata-page-nameをセットする必要があります。");
      };

      // pathMap用のオブジェクトを生成
      this.pathMap = new Object();
        
        // observation option
        if (this._options?.observation) {
            console.log('[message] - starting observe.');
  
            // body要素の変更を監視
            const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
  
                // page-name属性が変更された場合のみ動作（このif文いらない気がするけど一応お守り）
                if (mutations[0].type === 'attributes') {
                    console.log('[message] - data-page-name属性の変更を検知しました、diffuselyを再起動します');
                    this._pageName = this._root!.getAttribute("data-page-name");
                    this.start();
                }
            });
    
            // オブザーバーの設定
            const config = {
                attributes: true, // 属性変化の監視
                attributeOldValue: true, // 変化前の属性値を mutation.oldValue に格納する
                attributeFilter: ['data-page-name'] // data-page-name属性のみ検知
            };
    
            // body要素とオブザーバーの設定を渡す
            observer.observe(this._root, config);
        }
  }

  // pageNameに応じた関数を格納
  public createPathMap(map: string[]): void {
    for (let i = 0; i < map.length; i++) {
      this.pathMap[map[i]] = "a";
    }
    this.pathMap["common"] = "";
  }

  // DOM上のpageNameに該当する関数を動作させる
  public start(): void {
    for (const key in this.pathMap) {
      if (key === this._pageName) {

        // 共通関数
        if(typeof this.pathMap["common"] === "function"){
          console.log(`[message] - common.setup`);
          this.pathMap["common"]();
        }

          // 格納された値が関数の場合のみ動作
          if(typeof this.pathMap[key] === "function"){
            console.log(`[page] - ${key}.setup`);
            this.pathMap[key]();
          }

          // 指定のpage-nameに該当したためループ離脱
          break;
      }
    }
    console.log('[message] - Setup is now complete!🎉')
  }
}
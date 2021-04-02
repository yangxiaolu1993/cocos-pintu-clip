
import Utils from './Utils'
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab)
    private artworkRrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        const picture = {
            w: 980,
            h: 700,
            chipW: 140,
            chipH: 140,
            rowNum: 6,
            column: 8
        }
        // row 行数 column  列数

        for (let row = 1; row < picture.rowNum; row++) {
            for (let col = 1; col < picture.column; col++) {

                const item = cc.instantiate(this.artworkRrefab);
                this.node.addChild(item);

                item.width = picture.chipW
                item.height = picture.chipH


                let graphics = item.getComponent(cc.Mask)['_graphics']

                graphics.clear(false);


                // 碎片 top  bottom
                let t = 0
                if (row % 2 == 0) {
                    t = col % 2 == 0 ? 1 : -1
                } else {
                    t = col % 2 == 0 ? -1 : 1
                }
                // 碎片 right  left
                let r = 0

                if (row % 2 == 0) {
                    r = col % 2 == 0 ? -1 : 1
                } else {
                    r = col % 2 == 0 ? 1 : -1
                }


                Utils.createMask(graphics, {
                    start: {
                        x: picture.chipW * (col - 1), y: -picture.chipH * (row - 1)
                    },
                    w: picture.chipW,
                    // 碎片的高
                    h: picture.chipH,
                    circleStatus: [row == 1 ? 0 : t, col == picture.column - 1 ? 0 : r, row == picture.rowNum - 1 ? 0 : t, col == 1 ? 0 : r],
                    space:2
                })

            }
        }




    }

    /**
     * 是否是奇数
     */
    isOddNum(count) {
        return count % 2 !== 0
    }

    // update (dt) {}
}

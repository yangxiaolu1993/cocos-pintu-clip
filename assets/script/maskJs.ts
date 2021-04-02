
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // onLoad () {}

    start() {

        let graphics = this.node.getComponent(cc.Mask)['_graphics']
        graphics.clear(false);
       
        this.createMask(graphics)
    }
    /**
     * 创建碎片
     * 使用 三阶贝塞尔曲线创建半圆
     * @param ctx 
     */
    createMask(ctx) {

        ctx.strokeColor = cc.Color.WHITE
        ctx.lineJoin = cc.Graphics.LineJoin.ROUND;


        const chip = {
            start: {x:-100,y:0,border:1},
            // 碎片的宽
            w: 150,
            // 碎片的高
            h: 150,
            // 碎片的半径
            r: 25,
            // 四个方向圆的状态  0 无  -1 内  1 外
            circleStatus: [0, 0, 1, 1],

            // 三阶贝塞尔曲线 两个控制点的偏移量  决定曲线的弧度
            offset:32 
        }

        const lineW = chip.w / 2 - chip.r
        const lineH = chip.h / 2 - chip.r

        const { start ,offset }  = chip

        // 设置起始点
        ctx.moveTo(start.x, start.y)
        /**
         * 上
         */
        ctx.lineTo(start.x + lineW, start.y);


        // 顺时针 第一个半圆 

        if (chip.circleStatus[0]) {

            const CPS1 = { x: start.x + lineW, y: start.y + chip.circleStatus[0] * offset }

            const CPS2 = { x: start.x + chip.w - lineW, y: start.y + chip.circleStatus[0] * offset }

            const end = { x: start.x + chip.w - lineW, y: start.y }

            ctx.bezierCurveTo(CPS1.x, CPS1.y, CPS2.x, CPS2.y, end.x, end.y);
        }

        ctx.lineTo(start.x + chip.w, start.y)

        /**
         * 右
         */
        ctx.lineTo(start.x + chip.w, start.y - lineH)

        // 顺时针 第二个半圆

        if (chip.circleStatus[1]) {

            const CPS11 = { x: start.x + chip.w + chip.circleStatus[1] * offset, y: start.y - lineH }
            const CPS12 = { x: start.x + chip.w + chip.circleStatus[1] * offset, y: start.y - chip.h + lineH }
            const end1 = { x: start.x + chip.w, y: start.y - chip.h + lineH }

            ctx.bezierCurveTo(CPS11.x, CPS11.y, CPS12.x, CPS12.y, end1.x, end1.y);
        }

        ctx.lineTo(start.x + chip.w, start.y - chip.h)

        /**
         * 下
         */
        ctx.lineTo(start.x + chip.w - lineW, start.y - chip.h)

        // 顺时针 第三个半圆

        if (chip.circleStatus[2]) {
            const CPS21 = { x: start.x + chip.w - lineW, y: start.y - chip.h - chip.circleStatus[2] * offset }
            const CPS22 = { x: start.x + lineW, y: start.y - chip.h - chip.circleStatus[2] * offset }
            const end2 = { x: start.x + lineW, y: start.y - chip.h }

            ctx.bezierCurveTo(CPS21.x, CPS21.y, CPS22.x, CPS22.y, end2.x, end2.y);
        }

        ctx.lineTo(start.x, start.y - chip.h)

        /**
         * 左
         */
        ctx.lineTo(start.x, start.y - chip.h + lineH)

        // 顺时针 第四个半圆

        if (chip.circleStatus[3]) {

            const CPS31 = { x: start.x - chip.circleStatus[3] * offset, y: start.y - chip.h + lineH }
            const CPS32 = { x: start.x - chip.circleStatus[3] * offset, y: start.y - lineH }
            const end3 = { x: start.x, y: start.y - lineH }

            ctx.bezierCurveTo(CPS31.x, CPS31.y, CPS32.x, CPS32.y, end3.x, end3.y);
        }

        ctx.lineTo(start.x, start.y)
        ctx.close();
        ctx.stroke();

        ctx.fill();
    }
}

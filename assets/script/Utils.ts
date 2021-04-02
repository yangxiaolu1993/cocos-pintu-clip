
const { ccclass, property } = cc._decorator;

interface MaskOptions {
    start: { x: number, y: number },
    // 碎片的宽
    w?: number,
    // 碎片的高
    h?: number,
    // 碎片的半径
    r?: number,
    // 四个方向圆的状态  0 无  -1 内  1 外
    circleStatus?: number[],
    // 三阶贝塞尔曲线 两个控制点的偏移量  决定曲线的弧度
    offset?: number,
    space?:number
}
@ccclass
export default class Utils {


    /**
      * 创建碎片
      * 使用 三阶贝塞尔曲线创建半圆
      * @param ctx 
      */
    public static createMask(ctx, options: MaskOptions) {

        // ctx.strokeColor = cc.Color.WHITE
        // ctx.lineJoin = cc.Graphics.LineJoin.ROUND;

        const defaultChip = {
            start: { x: -100, y: 0 },
            // 碎片的宽
            w: 150,
            // 碎片的高
            h: 150,
            // 碎片的半径
            r: 25,
            // 四个方向圆的状态  0 无  -1 内  1 外
            circleStatus: [0, 0, 1, 1],
            // 三阶贝塞尔曲线 两个控制点的偏移量  决定曲线的弧度
            offset: 32,
            // 碎片之间的空隙
            space:0

        }
        const chip = Object.assign(defaultChip, options)

        chip.w = chip.w - chip.space
        chip.h = chip.h - chip.space

        let lineW = chip.w / 2 - chip.r
        let lineH = chip.h / 2 - chip.r

        let lineWN = chip.w / 2 - chip.r + chip.space
        let lineHN = chip.h / 2 - chip.r + chip.space 

        // console.log(lineWN,lineHN)

        const { start, offset, circleStatus } = chip

        // 设置起始点
        ctx.moveTo(start.x, start.y)
        /**
         * 上
         */
        ctx.lineTo(start.x + (circleStatus[0] == 1 ? lineWN : lineW), start.y);


        // 顺时针 第一个半圆 如果是凸起，半圆需要减去间距 space ;如果是 凹陷 不需要要处理

        if (chip.circleStatus[0]) {

            const CPS1 = { x: start.x + (circleStatus[0] == 1 ? lineWN : lineW) , y: start.y + circleStatus[0] * offset }

            const CPS2 = { x: start.x + chip.w - (circleStatus[0] == 1 ? lineWN : lineW) , y: start.y + circleStatus[0] * offset }

            const end = { x: start.x + chip.w - (circleStatus[0] == 1 ? lineWN : lineW) , y: start.y }

            ctx.bezierCurveTo(CPS1.x, CPS1.y, CPS2.x, CPS2.y, end.x, end.y);
        }

        ctx.lineTo(start.x + chip.w, start.y)

        /**
         * 右
         */
         
        ctx.lineTo(start.x + chip.w, start.y - (circleStatus[1] == 1 ? lineHN : lineH))

        // 顺时针 第二个半圆

        if (chip.circleStatus[1]) {
            
            const CPS11 = { x: start.x + chip.w + chip.circleStatus[1] * offset, y: start.y - (circleStatus[1] == 1 ? lineHN : lineH) }
            const CPS12 = { x: start.x + chip.w + chip.circleStatus[1] * offset, y: start.y - chip.h + (circleStatus[1] == 1 ? lineHN : lineH) }
            const end1 = { x: start.x + chip.w, y: start.y - chip.h + (circleStatus[1] == 1 ? lineHN : lineH) }

            ctx.bezierCurveTo(CPS11.x, CPS11.y, CPS12.x, CPS12.y, end1.x, end1.y);
        }

        ctx.lineTo(start.x + chip.w, start.y - chip.h)

        /**
         * 下
         */

       
        ctx.lineTo(start.x + chip.w - (circleStatus[2] == 1 ? lineWN : lineW), start.y - chip.h)

        // 顺时针 第三个半圆

        if (chip.circleStatus[2]) {
            const CPS21 = { x: start.x + chip.w - (circleStatus[2] == 1 ? lineWN : lineW), y: start.y - chip.h - chip.circleStatus[2] * offset }
            const CPS22 = { x: start.x + (circleStatus[2] == 1 ? lineWN : lineW), y: start.y - chip.h - chip.circleStatus[2] * offset }
            const end2 = { x: start.x + (circleStatus[2] == 1 ? lineWN : lineW), y: start.y - chip.h }

            ctx.bezierCurveTo(CPS21.x, CPS21.y, CPS22.x, CPS22.y, end2.x, end2.y);
        }

        ctx.lineTo(start.x, start.y - chip.h)

        /**
         * 左
         */
        ctx.lineTo(start.x, start.y - chip.h + (circleStatus[3] == 1 ? lineHN : lineH))

        // 顺时针 第四个半圆

        if (chip.circleStatus[3]) {

            const CPS31 = { x: start.x - chip.circleStatus[3] * offset, y: start.y - chip.h + (circleStatus[3] == 1 ? lineHN : lineH) }
            const CPS32 = { x: start.x - chip.circleStatus[3] * offset, y: start.y - (circleStatus[3] == 1 ? lineHN : lineH) }
            const end3 = { x: start.x, y: start.y - (circleStatus[3] == 1 ? lineHN : lineH) }

            ctx.bezierCurveTo(CPS31.x, CPS31.y, CPS32.x, CPS32.y, end3.x, end3.y);
        }

        ctx.lineTo(start.x, start.y)
        ctx.close();
        ctx.stroke();

        ctx.fill();
    }
}

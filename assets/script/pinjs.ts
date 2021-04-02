// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // let graphicsPosArr = this.node.getComponent(cc.PolygonCollider).points;
        const graphicsPosArr = [
            {
                "x": 26.5,
                "y": 208,
                "z": 0
            },
            {
                "x": 8.5,
                "y": 202,
                "z": 0
            },
            {
                "x": -13.5,
                "y": 184,
                "z": 0
            },
            {
                "x": -24.5,
                "y": 160,
                "z": 0
            },
            {
                "x": -24.5,
                "y": 132,
                "z": 0
            },
            {
                "x": -132.5,
                "y": 132,
                "z": 0
            },
            {
                "x": -132.5,
                "y": 24,
                "z": 0
            },
            {
                "x": -161.5,
                "y": 24,
                "z": 0
            },
            {
                "x": -183.5,
                "y": 13,
                "z": 0
            },
            {
                "x": -201.5,
                "y": -9,
                "z": 0
            },
            {
                "x": -206.5,
                "y": -28,
                "z": 0
            },
            {
                "x": -206.5,
                "y": -47,
                "z": 0
            },
            {
                "x": -202.5,
                "y": -63,
                "z": 0
            },
            {
                "x": -182.5,
                "y": -88,
                "z": 0
            },
            {
                "x": -157.5,
                "y": -99,
                "z": 0
            },
            {
                "x": -132.5,
                "y": -99,
                "z": 0
            },
            {
                "x": -130.5,
                "y": -208,
                "z": 0
            },
            {
                "x": -23.5,
                "y": -207,
                "z": 0
            },
            {
                "x": -23.5,
                "y": -181,
                "z": 0
            },
            {
                "x": -11.5,
                "y": -155,
                "z": 0
            },
            {
                "x": 9.5,
                "y": -138,
                "z": 0
            },
            {
                "x": 33.5,
                "y": -132,
                "z": 0
            },
            {
                "x": 44.5,
                "y": -132,
                "z": 0
            },
            {
                "x": 64.5,
                "y": -138,
                "z": 0
            },
            {
                "x": 86.5,
                "y": -156,
                "z": 0
            },
            {
                "x": 97.5,
                "y": -181,
                "z": 0
            },
            {
                "x": 98.5,
                "y": -207,
                "z": 0
            },
            {
                "x": 206.5,
                "y": -206,
                "z": 0
            },
            {
                "x": 205.5,
                "y": -97,
                "z": 0
            },
            {
                "x": 180.5,
                "y": -97,
                "z": 0
            },
            {
                "x": 155.5,
                "y": -86,
                "z": 0
            },
            {
                "x": 140.5,
                "y": -70,
                "z": 0
            },
            {
                "x": 132.5,
                "y": -49,
                "z": 0
            },
            {
                "x": 134.5,
                "y": -17,
                "z": 0
            },
            {
                "x": 144.5,
                "y": -2,
                "z": 0
            },
            {
                "x": 143.5,
                "y": 1,
                "z": 0
            },
            {
                "x": 155.5,
                "y": 13,
                "z": 0
            },
            {
                "x": 158.5,
                "y": 12,
                "z": 0
            },
            {
                "x": 162.5,
                "y": 17,
                "z": 0
            },
            {
                "x": 174.5,
                "y": 22,
                "z": 0
            },
            {
                "x": 205.5,
                "y": 23,
                "z": 0
            },
            {
                "x": 205.5,
                "y": 132,
                "z": 0
            },
            {
                "x": 96.5,
                "y": 132,
                "z": 0
            },
            {
                "x": 97.5,
                "y": 157,
                "z": 0
            },
            {
                "x": 85.5,
                "y": 184,
                "z": 0
            },
            {
                "x": 74.5,
                "y": 195,
                "z": 0
            },
            {
                "x": 58.5,
                "y": 204,
                "z": 0
            },
            {
                "x": 44.5,
                "y": 208,
                "z": 0
            }
        ]

        // let graphicsPosArr = this.node.getComponent(cc.PolygonCollider).points;
        console.log(graphicsPosArr)

        let graphics = this.node.getComponent(cc.Mask)['_graphics']

        graphics.clear(false);

        graphics.moveTo(graphicsPosArr[0].x, graphicsPosArr[0].y);        
        
        for (let i = 1; i < graphicsPosArr.length; i++) {            
            graphics.lineTo(graphicsPosArr[i].x, graphicsPosArr[i].y);        
        }        
        
        graphics.close();        
        graphics.stroke();        
        graphics.fill();   

        // console.log(graphics)
    }

    // update (dt) {}
}

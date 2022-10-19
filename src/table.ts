import { shapes } from 'jointjs';

export function CreateTable(name: string): shapes.standard.Rectangle {
    let rect = new shapes.standard.Rectangle({
        ports: {
            groups: {
                'tableGroup': tablePort
            },
            items: [
            {
                group: 'tableGroup'
            }
        ]
        }    
    });

    rect.position(100, 30);
    rect.resize(150, 60);
    rect.attr({
        body: {
            fill: '#2C3E50',
            rx: 5,
            ry: 5,
            strokeWidth: 2
        },
        label: {
            text: name,
            fill: 'white',
        }
    });

    rect.attr('label/fontSize', 18)
    rect.attr('label/fontWeight', 'bold')
    rect.attr('label/fontVariant', 'small-caps')
    rect.attr("label/style", "-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");

    return rect
}


const tablePort = {
    position: {
        name: 'right'
    },
    attrs: {
        portBody: {
            magnet: true,
            r: 8,
            fill: 'grey',
            stroke: '#023047'
        }
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
    }]
};
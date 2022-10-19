import { shapes } from "jointjs";

export function CreateJoin(): shapes.standard.Polygon {
    let rect = new shapes.standard.Rectangle({
        ports: {
            groups: {
                'functionGroupIn': functionInPort,
                'functionGroupOut': functionOutPort
            },
            items: [
            {
                group: 'functionGroupIn'                  
            },
            {
                group: 'functionGroupIn'                  
            },
            {
                group: 'functionGroupOut'
            }
        ]
        }    
    });

    rect.position(300, 30);
    rect.resize(150, 150);
    rect.attr({
        body: {
            fill: '#feb236',
        },
        label: {
            text: 'Join',
            fill: 'black',
        }
    });

    rect.attr('label/fontSize', 18)
    rect.attr('label/fontWeight', 'bold')
    rect.attr('label/fontVariant', 'small-caps')
    rect.attr("label/style", "-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");

    return rect
}

const functionInPort = {
    position: {
        name: 'left'
    },
    attrs: {
        portBody: {
            magnet: 'passive',
            r: 8,
            fill: 'white',
            stroke: '#023047'
        }
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
    }]
};

const functionOutPort = {
    position: {
        name: 'right'
    },
    attrs: {
        portBody: {
            magnet: true,
            r: 8,
            fill: 'white',
            stroke: '#023047'
        }
    },
    label: {
        position: {
            name: 'right',
            args: { y: 6 }
        },
        markup: [{
            tagName: 'text',
            selector: 'label',
            className: 'label-text'
        }]
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
    }]
};

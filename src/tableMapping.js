let xPosition = 50;

var namespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1200,
    height: 600,
    gridSize: 1,
    cellViewNamespace: namespace,
    linkPinning: false,
    defaultLink: () => new joint.shapes.standard.Link(
        {
            attrs: {
                line: {
                    stroke: '#222138',
                    sourceMarker: {
                        'fill': 'black',
                        'stroke': 'none',
                        'd': 'M 3 -6 L -9 0 L 3 6 Z'
                    },
                    targetMarker: {
                        'fill': 'black',
                        'stroke': 'none',
                        'd': 'M 3 -6 L -9 0 L 3 6 Z'
                    }
                }
            }
        }
    ),
    background: {
        color: '#c5d5c5'
    },
    defaultConnectionPoint: { name: 'boundary' },
    validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {             
        if (cellViewS === cellViewT) return false; // Prevent linking element to self  
        return magnetT && magnetT.getAttribute('port-group') === 'tableGroup'             
    },
    restrictTranslate: true 
});

// Register events
paper.on('link:mouseenter', (linkView) => {
    showLinkTools(linkView);
});

paper.on('link:mouseleave', (linkView) => {
    linkView.removeTools();
});


function CreateTableBlock(tablename, fields)
{
    

    let tablePort = {
        attrs: {
            portBody: {
                magnet: 'active',
                width: 'calc(w)',
                height: 'calc(h)',
                fill: '#e0e2e4'
            },
            label: {
                style: "user-select: none;"
            }       
        },
        position: {
            name: 'line',
            args: {
                start: { x: 1, y: 16 },
                end: { x: 1, y: 37* fields.length-1}
            }
        },
        label: {
            position: {
                name: 'right',
                args: { y: 15 }
            },
            markup: [{
                tagName: 'text',
                selector: 'label'
            }],
            
        },
        size: {
            width: 148,
            height: 30
        },
        markup: [{
            tagName: 'rect',
            selector: 'portBody'
        }]
    };

    var rect = new joint.shapes.standard.HeaderedRectangle({
        ports: {
            groups: {
                'tableGroup': tablePort
            }
        }    
    });
    
    rect.position(xPosition, 30);

    rect.resize(150, 15 + 37 * fields.length);
    
    rect.attr('header/fill', 'white');
    rect.attr('body/fill', 'white');
    rect.attr('headerText/text', tablename);
    rect.attr('headerText/fontSize', 16)
    rect.attr('headerText/fontWeight', 'bold')
    rect.attr('headerText/fontVariant', 'small-caps')
    rect.attr("headerText/style", "-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;");

    rect.attr('magnet', false);

    fields.forEach( item => rect.addPorts([{group: 'tableGroup', attrs: { label: { text: item }}}]) );

    rect.addTo(graph)

    xPosition += 200;
}

// Actions
function showLinkTools(linkView) {
    var tools = new joint.dia.ToolsView({
        tools: [
            new joint.linkTools.Remove({
                distance: '50%',
                markup: [{
                    tagName: 'circle',
                    selector: 'button',
                    attributes: {
                        'r': 7,
                        'fill': '#f6f6f6',
                        'stroke': '#ff5148',
                        'stroke-width': 2,
                        'cursor': 'pointer'
                    }
                }, {
                    tagName: 'path',
                    selector: 'icon',
                    attributes: {
                        'd': 'M -3 -3 3 3 M -3 3 3 -3',
                        'fill': 'none',
                        'stroke': '#ff5148',
                        'stroke-width': 2,
                        'pointer-events': 'none'
                    }
                }]
            })
        ]
    });
    linkView.addTools(tools);
};

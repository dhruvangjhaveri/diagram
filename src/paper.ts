import {dia, shapes, linkTools, elementTools} from'jointjs'

const graph = new dia.Graph({}, { cellNamespace: shapes }); 

let paper: dia.Paper;

function CreatePaper(dotNetHelper: any) {
    paper = new dia.Paper({
        el: document.querySelector('#myholder') as HTMLElement,
        model: graph,
        width: 1200,
        height: 600,
        gridSize: 1,
        cellViewNamespace: shapes,
        linkPinning: false,
        defaultLink: () => new shapes.standard.Link(),
        defaultConnectionPoint: { name: 'boundary' },
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {             
            if (cellViewS === cellViewT) return false; // Prevent linking element to self               
            return magnetT && magnetT.getAttribute('port-group') === 'functionGroupIn'; // Prevent linking to output ports
        },
        snapLinks: { radius: 30 }, // Enable link snapping within 30px lookup radius
        restrictTranslate: true 
    });

    // Register events
    paper.on('link:mouseenter', (linkView) => {
        showLinkTools(linkView);
    });

    paper.on('link:mouseleave', (linkView) => {
        linkView.removeTools();
    });

    paper.on('element:mouseenter', (elementView) => {
        showElementTools(elementView)
    });

    paper.on('element:mouseleave', (elementView) => {
        elementView.removeTools();
    });

    paper.on('cell:pointerdblclick', async function (cellView) {
        var isElement = cellView.model.isElement();
        let tableName: string = '';

        if (isElement)
            tableName = cellView.model.attributes?.attrs?.label?.text as string

        await dotNetHelper.invokeMethodAsync('DisplayFields', tableName);
    });
}



// Actions
function showLinkTools(linkView: dia.LinkView): void {
    var tools = new dia.ToolsView({
        tools: [
            new linkTools.Remove({
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

function showElementTools(elementView: dia.ElementView): void {
    var tools = new dia.ToolsView({
        tools: [
            new elementTools.Remove()
            ]
    });

    elementView.addTools(tools);
};


export {graph, paper, CreatePaper}
import { graph, CreatePaper } from './paper';
import { CreateTable } from './table';
import { CreateFunction } from './functions';
import { CreateJoin } from './join';


export function init(dotNetHelper: any) {
    CreatePaper(dotNetHelper)
}

export function AddTable(name: string): void {
    let table = CreateTable(name)
    table.addTo(graph)

    let x = table.id.toString()
}

export function AddJoin(): void {
    let join = CreateJoin()
    join.addTo(graph)
}

export function AddTransform(): void {
    let transform = CreateFunction('Transform')
    transform.addTo(graph)
}

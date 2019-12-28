export interface ProductWatch {
    id: string,
    productName: string,
    url: string,
    keyword: string,
    email: string,
    startWatchDate: Date,
    endWatchDate: Date,
}

export const ProductWatchTableColumns = [
    { title: 'Product Name', field: 'productName' },
    { title: 'URL', field: 'url' },
    { title: 'Keyword', field: 'keyword' },
    { title: 'Email', field: 'email' },
    { title: 'Start Watch Date', field: 'startWatchDate', type:'date' },
    { title: 'End Watch Date', field: 'endWatchDate', type:'date' },
];

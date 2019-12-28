export interface ProductWatch {
    id: string,
    productName: string,
    url: string,
    keyword: string,
    email: string,
    startWatchDate: string,
    endWatchDate: string,
}

export const ProductWatchTableColumns = [
    { title: 'Product Name', field: 'productName' },
    { title: 'URL', field: 'url' },
    { title: 'Keyword', field: 'keyword' },
    { title: 'Email', field: 'email' },
    { title: 'Start Watch Date', field: 'startWatchDate' },
    { title: 'End Watch Date', field: 'endWatchDate' },
];

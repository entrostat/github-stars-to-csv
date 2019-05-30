export function sortObjectKeys(obj: any): any {
    const result: any = {};
    Object.keys(obj)
        .sort((a, b) => {
            if (a === b) {
                return 0;
            }
            return a < b ? -1 : 1;
        })
        .forEach(key => {
            result[key] = obj[key];
        });
    return result;
}

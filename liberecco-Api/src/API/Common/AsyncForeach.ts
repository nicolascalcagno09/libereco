export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}


export async function asyncForEachData(array, callback) {
    let rt: any = [];
    for (let index = 0; index < array.length; index++) {
        rt[index] = await callback(array[index], index, array);
    }
    return rt;
}

export default asyncForEach;

import * as _ from 'lodash';

export function cloneDeep(value) {
    return _.cloneDeep(value);
}

export function addItem(array, item) {
    const clone = array.slice();
    if (clone.indexOf(item) === -1) {
        clone.push(item);
    }
    return clone;
}

export function removeItem(array, item) {
    const clone = array.slice();
    if (clone.indexOf(item) > -1) {
        clone.splice(clone.indexOf(item), 1);
    }
    return clone;
}

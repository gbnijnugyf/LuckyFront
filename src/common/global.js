export function formatTime(time) {
    if (!time) return ""
    time = time.slice(0, 10) + " " + time.slice(11, 16)
    return time
}

export function randomSortArray(arr) {
    var stack = [];
    while (arr.length) {
        //Math.random()：返回 [0,1) 之间的一个随机数
        var index = parseInt(Math.random() * arr.length);  // 利用数组长度生成随机索引值
        stack.push(arr[index]);  // 将随机索引对应的数组元素添加到新的数组中
        arr.splice(index, 1);  // 删除原数组中随机生成的元素
    }
    return stack;
}
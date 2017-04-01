[TOC]
##冒泡排序
每次比较相邻的两个数，如果后一个比前一个小，换位置。
时间复杂度：O(n^2)
```
<script>
    var arr = [3, 1, 4, 6, 5, 7, 2];

    function bubbleSort(arr) {
        for (var i = 0; i < arr.length; i++) {
            for(var j = 0; j < arr.length - 1; j++) {
                if(arr[j + 1] < arr[j]) {
                    var temp;
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    console.log(bubbleSort(arr));
</script>
```
##快速排序
采用二分法，取出中间数，数组每次和中间数比较，小的放到左边，大的放到右边。
时间复杂度：O(nlog2(n))
```
<script>
    var arr = [3, 1, 4, 6, 5, 7, 2];

    function quickSort(arr) {
        if(arr.length == 0) {
            return [];    // 返回空数组
        }

        var cIndex = Math.floor(arr.length / 2);
        var c = arr.splice(cIndex, 1);
        var l = [];
        var r = [];

        for (var i = 0; i < arr.length; i++) {
            if(arr[i] < c) {
                l.push(arr[i]);
            } else {
                r.push(arr[i]);
            }
        }

        return quickSort(l).concat(c, quickSort(r));
    }

    console.log(quickSort(arr));
</script>
```
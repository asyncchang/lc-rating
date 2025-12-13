import ProblemCategory from "@components/ProblemCatetory";

export default{
    "title": "分享丨【算法題單】二分算法（二分答案/最小化最大值/最大化最小值/第K小）",
    "summary": "",
    "src": "",
    "original_src": "https://leetcode.cn/circle/discuss/SqopEo",
    "sort": 0,
    "isLeaf": false,
    "solution": "",
    "score": 0,
    "leafChild": [],
    "nonLeafChild": [
        {
            "title": "介紹",
            "summary": "<img src=\"https://pic.leetcode.cn/1711713491-SoiQWc-t2.png\" alt=\"二分題單 二分查找 二分算法 二分入門 二分題目 力扣二分 leetcode 二分\" style=\"width: 100%;\"><br>> 圖：閉區間二分循環結束時的左右指針位置（查找第一個 $8$）<br>**刷題建議**：初次刷題可以只刷難度低於 $1700$ 分的題目。難度更高的題目常常結合其他算法（數據結構、圖論等），等學會其他算法再來刷本題單。<br>",
            "src": "",
            "original_src": "",
            "sort": 0,
            "isLeaf": false,
            "solution": "",
            "score": 0,
            "leafChild": [],
            "nonLeafChild": [
                {
                    "title": "一、二分查找",
                    "summary": "講解：<a href=\"https://www.bilibili.com/video/BV1AP41137w7/\">二分查找 紅藍染色法【基礎算法精講 04】</a><br>設 $\\textit{nums}$ 為遞增（非遞減）數組，長為 $n$。<br>| **需求**  | **寫法**  |  **如果不存在** |<br>|---|---|---|<br>| $\\ge x$ 的第一個元素的下標  | $\\texttt{lowerBound}(\\textit{nums},x)$  | 結果為 $n$ |<br>| $> x$ 的第一個元素的下標 | $\\texttt{lowerBound}(\\textit{nums},x+1)$  | 結果為 $n$ |<br>| $< x$ 的最後一個元素的下標  | $\\texttt{lowerBound}(\\textit{nums},x)-1$  | 結果為 $-1$ |<br>| $\\le x$ 的最後一個元素的下標  | $\\texttt{lowerBound}(\\textit{nums},x+1)-1$  | 結果為 $-1$ |<br>| **需求**  | **寫法**  |<br>|---|---|<br>| $< x$ 的元素個數  | $\\texttt{lowerBound}(\\textit{nums},x)$  |<br>| $\\le x$ 的元素個數 | $\\texttt{lowerBound}(\\textit{nums},x+1)$  |<br>| $\\ge x$ 的元素個數  | $n - \\texttt{lowerBound}(\\textit{nums},x)$  |<br>| $> x$ 的元素個數  | $n - \\texttt{lowerBound}(\\textit{nums},x+1)$  |<br>注意 $< x$ 和 $\\ge x$ 互為補集，二者之和為 $n$。$\\le x$ 和 $> x$ 同理。<br>",
                    "src": "",
                    "original_src": "",
                    "sort": 0,
                    "isLeaf": false,
                    "solution": "",
                    "score": 0,
                    "leafChild": [],
                    "nonLeafChild": [
                        {
                            "title": "§1.1 基礎",
                            "summary": "",
                            "src": "",
                            "original_src": "",
                            "sort": 0,
                            "isLeaf": false,
                            "solution": "",
                            "score": 0,
                            "leafChild": [
                                {
                                    "title": "34. 在排序數組中查找元素的第一個和最後一個位置",
                                    "summary": "",
                                    "src": "/find-first-and-last-position-of-element-in-sorted-array/",
                                    "original_src": "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "35. 搜索插入位置",
                                    "summary": "",
                                    "src": "/search-insert-position/",
                                    "original_src": "https://leetcode.cn/problems/search-insert-position/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "704. 二分查找",
                                    "summary": "",
                                    "src": "/binary-search/",
                                    "original_src": "https://leetcode.cn/problems/binary-search/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "744. 尋找比目標字母大的最小字母",
                                    "summary": "",
                                    "src": "/find-smallest-letter-greater-than-target/",
                                    "original_src": "https://leetcode.cn/problems/find-smallest-letter-greater-than-target/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                            "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2529. 正整數和負整數的最大計數",
                                    "summary": "",
                                    "src": "/maximum-count-of-positive-integer-and-negative-integer/",
                                    "original_src": "https://leetcode.cn/problems/maximum-count-of-positive-integer-and-negative-integer/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1195.9731842298,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                }
                            ],
                            "nonLeafChild": [],
                            "isPremium": false,
                            "last_update": ""
                        },
                        {
                            "title": "§1.2 進階",
                            "summary": "部分題目需要先排序，然後在有序數組上二分查找。<br>**思維擴展**：<br>",
                            "src": "",
                            "original_src": "",
                            "sort": 0,
                            "isLeaf": false,
                            "solution": "",
                            "score": 0,
                            "leafChild": [
                                {
                                    "title": "2300. 咒語和藥水的成功對數",
                                    "summary": "",
                                    "src": "/successful-pairs-of-spells-and-potions/",
                                    "original_src": "https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1476.9062320302,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1385. 兩個數組間的距離值",
                                    "summary": "",
                                    "src": "/find-the-distance-value-between-two-arrays/",
                                    "original_src": "https://leetcode.cn/problems/find-the-distance-value-between-two-arrays/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1234.8049089605,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2389. 和有限的最長子序列",
                                    "summary": "",
                                    "src": "/longest-subsequence-with-limited-sum/",
                                    "original_src": "https://leetcode.cn/problems/longest-subsequence-with-limited-sum/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1387.7347071166,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1170. 比較字符串最小字母出現頻次",
                                    "summary": "",
                                    "src": "/compare-strings-by-frequency-of-the-smallest-character/",
                                    "original_src": "https://leetcode.cn/problems/compare-strings-by-frequency-of-the-smallest-character/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1431.6864980883,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2080. 區間內查詢數字的頻率",
                                    "summary": "",
                                    "src": "/range-frequency-queries/",
                                    "original_src": "https://leetcode.cn/problems/range-frequency-queries/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1702.4387527636,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "3488. 距離最小相等元素查詢",
                                    "summary": "",
                                    "src": "/closest-equal-element-queries/",
                                    "original_src": "https://leetcode.cn/problems/closest-equal-element-queries/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1699.1071481616,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2563. 統計公平數對的數目",
                                    "summary": "",
                                    "src": "/count-the-number-of-fair-pairs/",
                                    "original_src": "https://leetcode.cn/problems/count-the-number-of-fair-pairs/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1720.7470612766,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2070. 每一個查詢的最大美麗值",
                                    "summary": "",
                                    "src": "/most-beautiful-item-for-each-query/",
                                    "original_src": "https://leetcode.cn/problems/most-beautiful-item-for-each-query/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1724.1545485476,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1146. 快照數組",
                                    "summary": "",
                                    "src": "/snapshot-array/",
                                    "original_src": "https://leetcode.cn/problems/snapshot-array/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1770.8924569497,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "981. 基於時間的鍵值存儲",
                                    "summary": "",
                                    "src": "/time-based-key-value-store/",
                                    "original_src": "https://leetcode.cn/problems/time-based-key-value-store/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1574.7542247682,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "3508. 設計路由器",
                                    "summary": "",
                                    "src": "/implement-router/",
                                    "original_src": "https://leetcode.cn/problems/implement-router/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1851.1720518145,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "658. 找到 K 個最接近的元素",
                                    "summary": "",
                                    "src": "/find-k-closest-elements/",
                                    "original_src": "https://leetcode.cn/problems/find-k-closest-elements/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1818. 絕對差值和",
                                    "summary": "",
                                    "src": "/minimum-absolute-sum-difference/",
                                    "original_src": "https://leetcode.cn/problems/minimum-absolute-sum-difference/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1934.3556201811,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "911. 在線選舉",
                                    "summary": "",
                                    "src": "/online-election/",
                                    "original_src": "https://leetcode.cn/problems/online-election/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 2000.8021428612,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "LCP 08. 劇情觸發時間",
                                    "summary": "",
                                    "src": "/ju-qing-hong-fa-shi-jian/",
                                    "original_src": "https://leetcode.cn/problems/ju-qing-hong-fa-shi-jian/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1182. 與目標顏色間的最短距離",
                                    "summary": "",
                                    "src": "/shortest-distance-to-target-color/",
                                    "original_src": "https://leetcode.cn/problems/shortest-distance-to-target-color/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1626.6740430119,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                },
                                {
                                    "title": "2819. 購買巧克力後的最小相對損失",
                                    "summary": "",
                                    "src": "/minimum-relative-loss-after-buying-chocolates/",
                                    "original_src": "https://leetcode.cn/problems/minimum-relative-loss-after-buying-chocolates/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                },
                                {
                                    "title": "1287. 有序數組中出現次數超過 25% 的元素",
                                    "summary": "",
                                    "src": "/element-appearing-more-than-25-in-sorted-array/",
                                    "original_src": "https://leetcode.cn/problems/element-appearing-more-than-25-in-sorted-array/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1179.1495967491,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2476. 二叉搜索樹最近節點查詢",
                                    "summary": "",
                                    "src": "/closest-nodes-queries-in-a-binary-search-tree/",
                                    "original_src": "https://leetcode.cn/problems/closest-nodes-queries-in-a-binary-search-tree/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1596.9852244916,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1150. 檢查一個數是否在數組中占絕大多數",
                                    "summary": "",
                                    "src": "/check-if-a-number-is-majority-element-in-a-sorted-array/",
                                    "original_src": "https://leetcode.cn/problems/check-if-a-number-is-majority-element-in-a-sorted-array/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1249.9947800752,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                }
                            ],
                            "nonLeafChild": [],
                            "isPremium": false,
                            "last_update": ""
                        }
                    ],
                    "isPremium": false,
                    "last_update": ""
                },
                {
                    "title": "二、二分答案",
                    "summary": "> 「花費一個 $\\log$ 的時間，增加了一個條件。」 —— 二分答案<br>",
                    "src": "",
                    "original_src": "",
                    "sort": 0,
                    "isLeaf": false,
                    "solution": "",
                    "score": 0,
                    "leafChild": [],
                    "nonLeafChild": [
                        {
                            "title": "§2.1 求最小",
                            "summary": "題目求什麼，就二分什麼。<br>",
                            "src": "",
                            "original_src": "",
                            "sort": 0,
                            "isLeaf": false,
                            "solution": "",
                            "score": 0,
                            "leafChild": [],
                            "nonLeafChild": [
                                {
                                    "title": "所以 right 就是最小的滿足 check 的值",
                                    "summary": "**問**：如何把二分答案與數組上的二分查找聯繫起來？<br>**答**：假設答案在區間 $[2,5]$ 中，我們相當於在一個**虛擬數組** $[\\texttt{check}(2),\\texttt{check}(3),\\texttt{check}(4),\\texttt{check}(5)]$ 中二分找第一個（或者最後一個）值為 $\\texttt{true}$ 的 $\\texttt{check}(x)$。這同樣可以用紅藍染色法思考。<br>**問**：有些題目，明明 $m$ 可以是答案，但卻不在初始二分區間中。比如閉區間二分初始化 $\\textit{right}=m-1$（或者開區間 $\\textit{right}=m$），這不會算錯嗎？<br>**答**：不會算錯。注意「答案所在區間」和「二分區間」是兩個概念。想一想，如果二分的 $\\texttt{while}$ 循環每次更新的都是 $\\textit{left}$，那麼最終答案是什麼？正好就是 $m$。一般地，如果一開始就能確定 $m$ 一定可以滿足題目要求，那麼 $m$ 是不需要在二分區間中的。換句話說，二分區間是「尚未確定是否滿足題目要求」的數的範圍。那些在區間外面的數，都是已確定的滿足（不滿足）題目要求的數。<br>**問**：什麼是循環不變量？<br>**答**：想一想，對於求最小的題目，**開區間二分**的寫法，為什麼最終返回的是 $\\textit{right}$，而不是別的數？在初始化（循環之前）、循環中、循環結束後，都時時刻刻保證 `check(right) == true` 和 `check(left) == false`，這就叫**循環不變量**。根據循環不變量，循環結束時 $\\textit{left}+1=\\textit{right}$，那麼 $\\textit{right}$ 就是最小的滿足要求的數（因為再 $-1$ 就不滿足要求了），所以答案是 $\\textit{right}$。<br>**注**：部分題目可以優化二分邊界，減少二分次數，從而減少代碼運行時間。對於初次接觸二分答案的同學，無需強求自己寫出最優的代碼，設定一個比較大的二分上界也是可以的。<br>開區間二分模板（求最小）：<br>```py [sol-Python3]<br>class Solution:<br>def binarySearchMin(self, nums: List[int]) -> int:<br>def check(mid: int) -> bool:<br>left =   # 循環不變量：check(left) 恆為 False<br>right =   # 循環不變量：check(right) 恆為 True<br>while left + 1 < right:  # 開區間不為空<br>mid = (left + right) // 2<br>if check(mid):  # 說明 check(>= mid 的數) 均為 True<br>right = mid  # 接下來在 (left, mid) 中二分答案<br>else:  # 說明 check(<= mid 的數) 均為 False<br>left = mid  # 接下來在 (mid, right) 中二分答案<br>return right<br>```<br>```java [sol-Java]<br>class Solution {<br>// 計算滿足 check(x) == true 的最小整數 x<br>public int binarySearchMin(int[] nums) {<br>int left = ; // 循環不變量：check(left) 恆為 false<br>int right = ; // 循環不變量：check(right) 恆為 true<br>while (left + 1 < right) { // 開區間不為空<br>int mid = left + (right - left) / 2;<br>if (check(mid, nums)) { // 說明 check(>= mid 的數) 均為 true<br>right = mid; // 接下來在 (left, mid) 中二分答案<br>} else { // 說明 check(<= mid 的數) 均為 false<br>left = mid; // 接下來在 (mid, right) 中二分答案<br>}<br>}<br>// 循環結束後 left+1 = right<br>// 此時 check(left) == false 而 check(left+1) == check(right) == true<br>// 所以 right 就是最小的滿足 check 的值<br>return right; // 循環不變量：right 恆為 true<br>}<br>// 二分猜答案：判斷 mid 是否滿足題目要求<br>private boolean check(int mid, int[] nums) {<br>}<br>}<br>```<br>```cpp [sol-C++]<br>class Solution {<br>public:<br>// 計算滿足 check(x) == true 的最小整數 x<br>int binarySearchMin(vector<int>& nums) {<br>// 二分猜答案：判斷 mid 是否滿足題目要求<br>auto check = [&](int mid) -> bool {<br>};

int left = ; // 循環不變量：check(left) 恆為 false
int right = ; // 循環不變量：check(right) 恆為 true
while (left + 1 < right) { // 開區間不為空
int mid = left + (right - left) / 2;
if (check(mid)) { // 說明 check(>= mid 的數) 均為 true
right = mid; // 接下來在 (left, mid) 中二分答案
} else { // 說明 check(<= mid 的數) 均為 false
left = mid; // 接下來在 (mid, right) 中二分答案
}
}
// 循環結束後 left+1 = right
// 此時 check(left) == false 而 check(left+1) == check(right) == true
// 所以 right 就是最小的滿足 check 的值
return right; // 循環不變量：right 恆為 true
}
};
```<br>```go [sol-Go]<br>func binarySearchMin(nums []int) int {
// 二分猜答案：判斷 mid 是否滿足題目要求
check := func(mid int) bool {

}

left :=  // 循環不變量：check(left) 恆為 false
right :=  // 循環不變量：check(right) 恆為 true
for left + 1 < right { // 開區間不為空
mid := (left + right) / 2
if check(mid) { // 說明 check(>= mid 的數) 均為 true
right = mid // 接下來在 (left, mid) 中二分答案
} else { // 說明 check(<= mid 的數) 均為 false
left = mid // 接下來在 (mid, right) 中二分答案
}
}
// 循環結束後 left+1 = right
// 此時 check(left) == false 而 check(left+1) == check(right) == true
// 所以 right 就是最小的滿足 check 的值
return right // 循環不變量：right 恆為 true
}<br>```<br>",
                                    "src": "",
                                    "original_src": "",
                                    "sort": 0,
                                    "isLeaf": false,
                                    "solution": "",
                                    "score": 0,
                                    "leafChild": [
                                        {
                                            "title": "1283. 使結果不超過閾值的最小除數",
                                            "summary": "",
                                            "src": "/find-the-smallest-divisor-given-a-threshold/",
                                            "original_src": "https://leetcode.cn/problems/find-the-smallest-divisor-given-a-threshold/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1541.7840320661,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "2187. 完成旅途的最少時間",
                                            "summary": "",
                                            "src": "/minimum-time-to-complete-trips/",
                                            "original_src": "https://leetcode.cn/problems/minimum-time-to-complete-trips/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1640.9591585343,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "1011. 在 D 天內送達包裹的能力",
                                            "summary": "",
                                            "src": "/capacity-to-ship-packages-within-d-days/",
                                            "original_src": "https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1725.4481937307,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "875. 愛吃香蕉的珂珂",
                                            "summary": "",
                                            "src": "/koko-eating-bananas/",
                                            "original_src": "https://leetcode.cn/problems/koko-eating-bananas/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1765.5654059263,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "3296. 移山所需的最少秒數",
                                            "summary": "",
                                            "src": "/minimum-number-of-seconds-to-make-mountain-height-zero/",
                                            "original_src": "https://leetcode.cn/problems/minimum-number-of-seconds-to-make-mountain-height-zero/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1694.7320914942,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "3639. 變為活躍狀態的最小時間",
                                            "summary": "",
                                            "src": "/minimum-time-to-activate-string/",
                                            "original_src": "https://leetcode.cn/problems/minimum-time-to-activate-string/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1853.2804713723,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "475. 供暖器",
                                            "summary": "",
                                            "src": "/heaters/",
                                            "original_src": "https://leetcode.cn/problems/heaters/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": null,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "2594. 修車的最少時間",
                                            "summary": "",
                                            "src": "/minimum-time-to-repair-cars/",
                                            "original_src": "https://leetcode.cn/problems/minimum-time-to-repair-cars/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1915.2628132733,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "1482. 製作 m 束花所需的最少天數",
                                            "summary": "",
                                            "src": "/minimum-number-of-days-to-make-m-bouquets/",
                                            "original_src": "https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1945.5095833982,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "3048. 標記所有下標的最早秒數 I",
                                            "summary": "",
                                            "src": "/earliest-second-to-mark-indices-i/",
                                            "original_src": "https://leetcode.cn/problems/earliest-second-to-mark-indices-i/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 2262.5641910108,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "2604. 吃掉所有穀子的最短時間",
                                            "summary": "",
                                            "src": "/minimum-time-to-eat-all-grains/",
                                            "original_src": "https://leetcode.cn/problems/minimum-time-to-eat-all-grains/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": null,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": true,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "2702. 使數字變為非正數的最小操作次數",
                                            "summary": "",
                                            "src": "/minimum-operations-to-make-numbers-non-positive/",
                                            "original_src": "https://leetcode.cn/problems/minimum-operations-to-make-numbers-non-positive/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": null,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": true,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "1870. 準時到達的列車最小時速",
                                            "summary": "",
                                            "src": "/minimum-speed-to-arrive-on-time/",
                                            "original_src": "https://leetcode.cn/problems/minimum-speed-to-arrive-on-time/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1675.761234741,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        },
                                        {
                                            "title": "3453. 分割正方形 I",
                                            "summary": "",
                                            "src": "/separate-squares-i/",
                                            "original_src": "https://leetcode.cn/problems/separate-squares-i/",
                                            "sort": 0,
                                            "isLeaf": true,
                                            "solution": null,
                                            "score": 1735.4106121238,
                                            "leafChild": [],
                                            "nonLeafChild": [],
                                            "isPremium": false,
                                            "last_update": ""
                                        }
                                    ],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                }
                            ],
                            "nonLeafChild": [],
                            "isPremium": false,
                            "last_update": ""
                        },
                        {
                            "title": "所以 left 就是最大的滿足 check 的值",
                            "summary": "<a href=\"https://leetcode.cn/problems/h-index-ii/solution/tu-jie-yi-tu-zhang-wo-er-fen-da-an-si-ch-d15k/\">一圖掌握二分答案！四種寫法！</a><br>在練習時，請注意「求最小」和「求最大」的二分寫法上的區別。<br>前面的「求最小」和二分查找求「排序數組中某元素的第一個位置」是類似的，按照紅藍染色法，左邊是不滿足要求的（紅色），右邊則是滿足要求的（藍色）。<br>「求最大」的題目則相反，左邊是滿足要求的（藍色），右邊是不滿足要求的（紅色）。這會導致二分寫法和上面的「求最小」有一些區別。<br>以開區間二分為例：<br>- 求最小：`check(mid) == true` 時更新 `right = mid`，反之更新 `left = mid`，最後返回 `right`。<br>- 求最大：`check(mid) == true` 時更新 `left = mid`，反之更新 `right = mid`，最後返回 `left`。<br>對於開區間寫法，簡單來說 `check(mid) == true` 時更新的是誰，最後就返回誰。相比其他二分寫法，開區間寫法不需要思考加一減一等細節，**推薦使用開區間寫二分**。<br>開區間二分模板（求最大）：<br>```py [sol-Python3]<br>class Solution:<br>def binarySearchMax(self, nums: List[int]) -> int:<br>def check(mid: int) -> bool:<nleft =   # 循環不變量：check(left) 恆為 True<br>right =   # 循環不變量：check(right) 恆為 False<br>while left + 1 < right:<br>mid = (left + right) // 2<br>if check(mid):<br>left = mid  # 注意這裡更新的是 left，和上面的模板反過來<br>else:<br>right = mid<br>return left  # check 更新的是誰，最終就返回誰<br>```<br>```java [sol-Java]<br>class Solution {<br>// 計算滿足 check(x) == true 的最大整數 x<br>public int binarySearchMax(int[] nums) {<br>int left = ; // 循環不變量：check(left) 恆為 true<br>int right = ; // 循環不變量：check(right) 恆為 false<br>while (left + 1 < right) {<br>int mid = left + (right - left) / 2;<br>if (check(mid, nums)) {<br>left = mid; // 注意這裡更新的是 left，和上面的模板反過來<br>} else {<br>right = mid;<br>}<br>}<br>// 循環結束後 left+1 = right<br>// 此時 check(left) == true 而 check(left+1) == check(right) == false<br>// 所以 left 就是最大的滿足 check 的值<br>return left; // check 更新的是誰，最終就返回誰<br>}<br>// 二分猜答案：判斷 mid 是否滿足題目要求<br>private boolean check(int mid, int[] nums) {<br>}<br>}<br>```<br>```cpp [sol-C++]<br>class Solution {<br>public:<br>// 計算滿足 check(x) == true 的最大整數 x<br>int binarySearchMax(vector<int>& nums) {<br>// 二分猜答案：判斷 mid 是否滿足題目要求<br>auto check = [&](int mid) -> bool {<br>};

int left = ; // 循環不變量：check(left) 恆為 true
int right = ; // 循環不變量：check(right) 恆為 false
while (left + 1 < right) {
int mid = left + (right - left) / 2;
if (check(mid)) {
left = mid; // 注意這裡更新的是 left，和上面的模板反過來
} else {
right = mid;
}
}
// 循環結束後 left+1 = right
// 此時 check(left) == true 而 check(left+1) == check(right) == false
// 所以 left 就是最大的滿足 check 的值
return left; // check 更新的是誰，最終就返回誰
}
};
```<br>```go [sol-Go]<br>func binarySearchMax(nums []int) int {
// 二分猜答案：判斷 mid 是否滿足題目要求
check := func(mid int) bool {

}

left :=  // 循環不變量：check(left) 恆為 true
right :=  // 循環不變量：check(right) 恆為 false
for left + 1 < right {
mid := (left + right) / 2
if check(mid) {
left = mid // 注意這裡更新的是 left，和上面的模板反過來
} else {
right = mid
}
}
// 循環結束後 left+1 = right
// 此時 check(left) == true 而 check(left+1) == check(right) == false
// 所以 left 就是最大的滿足 check 的值
return left // check 更新的是誰，最終就返回誰
}<br>```<br>",
                            "src": "",
                            "original_src": "",
                            "sort": 0,
                            "isLeaf": false,
                            "solution": "",
                            "score": 0,
                            "leafChild": [
                                {
                                    "title": "275. H 指數 II",
                                    "summary": "",
                                    "src": "/h-index-ii/",
                                    "original_src": "https://leetcode.cn/problems/h-index-ii/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2226. 每個小孩最多能分到多少糖果",
                                    "summary": "",
                                    "src": "/maximum-candies-allocated-to-k-children/",
                                    "original_src": "https://leetcode.cn/problems/maximum-candies-allocated-to-k-children/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1646.1765343383,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2982. 找出出現至少三次的最長特殊子字符串 II",
                                    "summary": "",
                                    "src": "/find-longest-special-substring-that-occurs-thrice-ii/",
                                    "original_src": "https://leetcode.cn/problems/find-longest-special-substring-that-occurs-thrice-ii/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1772.9528456848,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2576. 求出最多標記下標",
                                    "summary": "",
                                    "src": "/find-the-maximum-number-of-marked-indices/",
                                    "original_src": "https://leetcode.cn/problems/find-the-maximum-number-of-marked-indices/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1843.2383664194,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1898. 可移除字符的最大數目",
                                    "summary": "",
                                    "src": "/maximum-number-of-removable-characters/",
                                    "original_src": "https://leetcode.cn/problems/maximum-number-of-removable-characters/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1912.8440554296,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1802. 有界數組中指定下標處的最大值",
                                    "summary": "",
                                    "src": "/maximum-value-at-a-given-index-in-a-bounded-array/",
                                    "original_src": "https://leetcode.cn/problems/maximum-value-at-a-given-index-in-a-bounded-array/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1929.3184180196,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1642. 可以到達的最遠建築",
                                    "summary": "",
                                    "src": "/furthest-building-you-can-reach/",
                                    "original_src": "https://leetcode.cn/problems/furthest-building-you-can-reach/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1962.2005269503,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2861. 最大合金數",
                                    "summary": "",
                                    "src": "/maximum-number-of-alloys/",
                                    "original_src": "https://leetcode.cn/problems/maximum-number-of-alloys/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1981.3072959787,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "3007. 價值和小於等於 K 的最大數字",
                                    "summary": "",
                                    "src": "/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/",
                                    "original_src": "https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 2258.0069047781,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2141. 同時運行 N 台電腦的最長時間",
                                    "summary": "",
                                    "src": "/maximum-running-time-of-n-computers/",
                                    "original_src": "https://leetcode.cn/problems/maximum-running-time-of-n-computers/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 2265.2118886972,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2258. 逃離火災",
                                    "summary": "",
                                    "src": "/escape-the-spreading-fire/",
                                    "original_src": "https://leetcode.cn/problems/escape-the-spreading-fire/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 2346.5717839654,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2071. 你可以安排的最多任務數目",
                                    "summary": "",
                                    "src": "/maximum-number-of-tasks-you-can-assign/",
                                    "original_src": "https://leetcode.cn/problems/maximum-number-of-tasks-you-can-assign/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 2648.1748409542,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "LCP 78. 城牆防線",
                                    "summary": "",
                                    "src": "/Nsibyl/",
                                    "original_src": "https://leetcode.cn/problems/Nsibyl/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1618. 找出適應屏幕的最大字號",
                                    "summary": "",
                                    "src": "/maximum-font-to-fit-a-sentence-in-a-screen/",
                                    "original_src": "https://leetcode.cn/problems/maximum-font-to-fit-a-sentence-in-a-screen/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                },
                                {
                                    "title": "1891. 割繩子",
                                    "summary": "",
                                    "src": "/cutting-ribbons/",
                                    "original_src": "https://leetcode.cn/problems/cutting-ribbons/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                },
                                {
                                    "title": "2137. 通過倒水操作讓所有的水桶所含水量相等",
                                    "summary": "",
                                    "src": "/pour-water-between-buckets-to-make-water-levels-equal/",
                                    "original_src": "https://leetcode.cn/problems/pour-water-between-buckets-to-make-water-levels-equal/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                },
                                {
                                    "title": "3344. 最大尺寸數組",
                                    "summary": "",
                                    "src": "/maximum-sized-array/",
                                    "original_src": "https://leetcode.cn/problems/maximum-sized-array/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                },
                                {
                                    "title": "644. 子數組最大平均數 II",
                                    "summary": "",
                                    "src": "/maximum-average-subarray-ii/",
                                    "original_src": "https://leetcode.cn/problems/maximum-average-subarray-ii/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": true,
                                    "last_update": ""
                                }
                            ],
                            "nonLeafChild": [],
                            "isPremium": false,
                            "last_update": ""
                        },
                        {
                            "title": "§2.3 二分間接值",
                            "summary": "二分的不是答案，而是一個和答案有關的值（間接值）。<br>",
                            "src": "",
                            "original_src": "",
                            "sort": 0,
                            "isLeaf": false,
                            "solution": "",
                            "score": 0,
                            "leafChild": [
                                {
                                    "title": "3143. 正方形中的最多點數",
                                    "summary": "",
                                    "src": "/maximum-points-inside-the-square/",
                                    "original_src": "https://leetcode.cn/problems/maximum-points-inside-the-square/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1696.9464414997,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "1648. 銷售價值減少的顏色球",
                                    "summary": "",
                                    "src": "/sell-diminishing-valued-colored-balls/",
                                    "original_src": "https://leetcode.cn/problems/sell-diminishing-valued-colored-balls/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 2050.2553211463,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                }
                            ],
                            "nonLeafChild": [],
                            "isPremium": false,
                            "last_update": ""
                        },
                        {
                            "title": "§2.4 最小化最大值",
                            "summary": "本質是二分答案求最小。二分的 $\\textit{mid}$ 表示上界。<br>好比用一個蓋子（上界）去壓住最大值，看看能否壓住（$\\texttt{check}$ 函數）。<br>",
                            "src": "",
                            "original_src": "",
                            "sort": 0,
                            "isLeaf": false,
                            "solution": "",
                            "score": 0,
                            "leafChild": [
                                {
                                    "title": "410. 分割數組的最大值",
                                    "summary": "",
                                    "src": "/split-array-largest-sum/",
                                    "original_src": "https://leetcode.cn/problems/split-array-largest-sum/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": null,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                },
                                {
                                    "title": "2064. 分配給商店的最多商品的最小值",
                                    "summary": "",
                                    "src": "/minimized-maximum-of-products-distributed-to-any-store/",
                                    "original_src": "https://leetcode.cn/problems/minimized-maximum-of-products-distributed-to-any-store/",
                                    "sort": 0,
                                    "isLeaf": true,
                                    "solution": null,
                                    "score": 1885.9015646531,
                                    "leafChild": [],
                                    "nonLeafChild": [],
                                    "isPremium": false,
                                    "last_update": ""
                                }
                            ],
                            "nonLeafChild": [],
                            "isPremium": false,
                            "last_update": ""
                        }
                    ],
                    "isPremium": false,
                    "last_update": ""
                }
            ],
            "isPremium": false,
            "last_update": ""
        }
    ]
}
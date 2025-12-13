# 靈茶山題單製作工具
1. 從力扣頁面 複製Cookie 替換 hds.txt 中的 Cookie 值
2. 安裝依賴：`pip install -r requirements.txt` (如拋出異常 "No module named 'pip'", 可先執行 python -m ensurepip)
3. 執行：`python main.py`

## 使用靈茶山艾府的題單生成對應網頁

1. 安裝依賴：`pip install -r requirements.txt` (如拋出異常 "No module named 'pip'", 可先執行 python -m ensurepip)
2. 執行：`python 0x3f_discuss.py [--uuid xxxx] [--o yourpath/yourfilename] [--f path/to/discussionlist]`
    - 此處xxxx為尾uuid, 例如對於討論頁面https://leetcode-cn.com/circle/discuss/123456/，此處123456是這個討論頁面的uuid
    - `yourpath/yourfilename`為輸出檔案路徑, 預設輸出在當前目錄下
    - `path/to/discussionlist`為討論列表檔案路徑，該檔案遵守以下格式:
    - ```
        uuid1 output/path/for/uuid1
        uuid2 output/path/for/uuid2
        ...
      ```
3. 如果生成的ts檔案不在`components/containers/List/data`中，將其拖入，並在`components/containers/List/`下建立對應的資料夾以及`index.tsx`檔案, 並在`app/(lc)/list`下建立對應的檔案以啟用
4. 同時在`components/layouts/Navbar/index.tsx`中添加對應的導航連結
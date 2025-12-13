import time
from leetcode_api import LeetCodeApi

def load_headers():
    hds = {}
    with open("hds.txt", 'r', encoding="utf-8") as r:
        for line in r.readlines():
            sep = line.find(":")
            if sep != -1:
                hds[line[:sep]] = line[sep+1:].strip()
    return hds

def load_list_as_dict():
    with open("list.json", 'r', encoding="utf-8") as r:
        import json
        return json.load(r)
    
def deleteAllFavs(lc: LeetCodeApi):
    # 刪除個人所有收藏夾
    for fav in lc.getMyFav()["favoriteMyFavorites"]["favorites"]:
        print(lc.delFav(fav["idHash"]))

'''
創建題單 需要先提供 list.json
'''
def createList(lc: LeetCodeApi):
    pb = load_list_as_dict()
    cnt = 0
    for k, v in pb.items():
        hash = ""
        for i, q in enumerate(v):
            slug = q["src"][29:-1]
            cnt += 1
            try:
                id = lc.queryByTitleSlug(slug)["question"]["questionId"]
                if i == 0:
                    hash = lc.addFav(k, id, True)["addQuestionToNewFavorite"]["favoriteIdHash"]
                else:
                    print(lc.addQuestionToFav(id, hash))
            except:
                print("錯誤: ", slug)
                pass
            if cnt % 50 == 0: # 防機器人識別
                time.sleep(5)    


'''
打印我的題單列表 （markdown 格式）
'''
def printList():
    links = [ (fav['name'], 'https://leetcode.cn/problem-list/%s' % fav['idHash']) for fav in lc.getMyFav()["favoriteMyFavorites"]["favorites"] ]
    print("\n".join( '[%s](%s)' % (title, link) for title, link in links ))

if __name__ == "__main__":
    hds = load_headers()
    lc = LeetCodeApi(headers=hds)
    # createList(lc)
    printList()

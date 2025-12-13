# LC-Rating
<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/huxulm/lc-rating">
  <img alt="GitHub commit activity (branch)" src="https://img.shields.io/github/commit-activity/m/huxulm/lc-rating?label=commit&labelColor=purple&color=grey">
  <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/huxulm/lc-rating/main?label=version&labelColor=blue">
  <img alt="GitHub Workflow Status (with event)" src="https://img.shields.io/github/actions/workflow/status/huxulm/lc-rating/workflow.yml">
</p>

## 介紹
本專案基於[靈茶山艾府](https://leetcode.cn/u/endlesscheng/)的文章[如何科學刷題？](https://leetcode.cn/circle/discuss/RvFUtj/)而建構的一個刷題用網站。 主要使用 **[React](https://react.dev/)** + **[NextJS](https://nextjs.org/)** 建構。

## 特性和使用方法
本專案有4種使用方法:
1. 力扣競賽題目列表，含分數展示，可以讓想自己mock contest的使用者快速直達並了解題目的難度
2. 難度訓練，對不同難度的題目進行了劃分，讓使用者更好的了解自己的水準。演算法新手和老手想在力扣周賽上分的都可以使用此功能。此外還添加了進度標註，並可以對進度進行同步。 同時使用者可以在設定中選擇自己想刷的tag，也可以隱藏tag, 以及選擇自己的進度。
3. 題解搜尋, 支援根據題目、題解標題、演算法模板名稱、標籤等過濾，純本地化+快取優化，速度飛快。題解連結（來源：[@靈茶山艾府](https://space.bilibili.com/206214)）
4. 整合了靈茶山艾府列出的題單，標註了分數同時也添加了進度標註。用於突擊訓練特定知識點，掌握常用演算法套路。

## Screenshot
<div style="text-align: center;dispaly: grid;gap: 2rem;">
  <img style="max-width: 400px;" src="./screenshot0.png"></img>
  <img style="max-width: 400px;" src="./screenshot1.png"></img>
</div>

## 資料來源
- 基礎 - 【[leetcode.cn](https://leetcode.cn/)】
- 題目難度 - 【[leetcode_problem_rating](https://raw.githubusercontent.com/zerotrac/leetcode_problem_rating/main/data.json)】
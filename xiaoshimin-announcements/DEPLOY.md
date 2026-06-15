# 部署到 Vercel 教學

## 前置需求
- GitHub 帳號（免費）
- Vercel 帳號（免費，用 GitHub 登入）

---

## Step 1：把專案上傳到 GitHub

### 1-1 安裝 Git（如果還沒裝）
前往 https://git-scm.com/download/win 下載安裝。

### 1-2 在 GitHub 建立新 Repository
1. 前往 https://github.com/new
2. Repository name 填：`taipei-xinshimin-announcements`
3. 選 **Private**（私人，只有你看得到）
4. 按 **Create repository**

### 1-3 在 cmd 上傳專案
```cmd
cd D:\tapp\xiaoshimin-announcements
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/taipei-xinshimin-announcements.git
git push -u origin main
```

---

## Step 2：部署到 Vercel

1. 前往 https://vercel.com
2. 用 **GitHub 帳號登入**
3. 按 **Add New Project**
4. 選擇剛才建立的 repository
5. Framework 會自動偵測為 **Next.js**
6. 直接按 **Deploy**
7. 等待約 1~2 分鐘

部署完成後，Vercel 會給你一個網址，例如：
```
https://taipei-xinshimin-announcements.vercel.app
```

---

## Step 3：設定自訂網域（可選）

如果你有購買網域（例如 xinshimin.com.tw）：
1. Vercel 後台 → Settings → Domains
2. 加入你的網域
3. 到網域商設定 DNS CNAME 指向 Vercel

---

## 之後更新內容怎麼辦？

每次你修改程式碼後，在 cmd 執行：
```cmd
git add .
git commit -m "更新公告資料"
git push
```

Vercel 會自動偵測到 GitHub 有更新，**自動重新部署**，約 1~2 分鐘後網站更新完成。

---

## 後台管理網址

部署後，後台管理介面位於：
```
https://你的網址.vercel.app/admin
```

建議：後台網址只告訴管理員，不要公開給住戶。


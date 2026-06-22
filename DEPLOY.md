# 🚀 部署教程（零基础版）

## 你需要准备
- 一个邮箱（注册 GitHub 和 Vercel 用）
- 大约 10-15 分钟

---

## 第一步：注册 GitHub

1. 打开 https://github.com
2. 点右上角 **Sign up**
3. 用邮箱注册，设置用户名和密码
4. 完成邮箱验证

---

## 第二步：创建仓库并上传代码

1. 登录 GitHub 后，点右上角 **+** → **New repository**

2. 填写：
   - Repository name: `ai-tools-hub`
   - 选 **Public**
   - **不要勾选**任何其他选项（不要 Add README、不要 .gitignore）
   - 点 **Create repository**

3. 看到一个页面，找到 **"uploading an existing file"** 链接，点它

4. 把项目文件夹 `ai-tools-site` 里的**所有文件和文件夹**拖进上传区域
   - 重要：上传的是 `ai-tools-site/` 里面的内容，不是整个 `ai-tools-site` 文件夹
   - 你应该能看到：`src/`、`package.json`、`README.md` 等文件

5. 等文件全部上传完，点底部绿色按钮 **Commit changes**

---

## 第三步：部署到 Vercel

1. 打开 https://vercel.com
2. 点 **Sign Up** → 选 **Continue with GitHub**（用刚注册的 GitHub 账号登录）

3. 登录后，在首页找到你的 `ai-tools-hub` 仓库
   - 如果没看到，点 **Add New...** → **Project** → 找到 `ai-tools-hub`

4. 点仓库旁边的 **Import** 按钮

5. 在配置页面：
   - **什么都不要改**
   - 直接点底部的 **Deploy** 按钮

6. 等待 1-2 分钟，看到 ✅ **Congratulations** 就成功了！

7. 点 **Visit** 按钮，你的网站就上线了！

---

## 🎉 完成！

你的网站地址是：`https://ai-tools-hub.vercel.app`

把这个链接发给任何人，他们都能用！

---

## 📌 后续优化（可选）

### 绑定自己的域名（推荐）
1. 在 Namesilo / 阿里云 / Cloudflare 买一个域名（约 ¥50-100/年）
2. 在 Vercel 项目设置 → Domains → 添加你的域名
3. 按提示配置 DNS 解析
4. 完成后用你自己的域名访问，更专业

### 申请 Google AdSense（赚钱）
1. 网站运营一段时间，有一些访问量后
2. 去 https://adsense.google.com 申请
3. 通过后在代码里加广告代码（我可以帮你加）

---

## ❓ 常见问题

**Q: 部署失败怎么办？**
A: 在 Vercel 点进项目 → Deployments → 点失败的那次 → 看 Logs，截图发给我。

**Q: 怎么更新网站？**
A: 在 GitHub 仓库里直接编辑文件，Vercel 会自动重新部署。

**Q: 需要花钱吗？**
A: GitHub 免费，Vercel 免费额度足够个人使用。只有买域名需要花钱（可选）。

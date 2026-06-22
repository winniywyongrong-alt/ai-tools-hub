# 🤖 AI Tools Hub

免费 AI 工具站 — 自带 API Key，零成本运营。

## 功能

- ✍️ **AI 写作** — 文章、邮件、社交媒体文案、产品描述
- 🌐 **AI 翻译** — 50+ 语言互译，自然流畅
- 📝 **AI 摘要** — 长文一键提炼核心要点
- 💡 **AI 灵感** — 创业点子、内容选题、起名品牌

## 特色

- 🆓 完全免费（用户自带 API Key）
- 🔒 隐私优先（Key 仅存浏览器本地）
- 🌍 中英双语界面
- ⚡ 流式输出，实时显示
- 📱 响应式设计，手机可用

---

## 🚀 部署到 Vercel（零成本，5分钟）

### 第一步：上传代码到 GitHub

1. 去 [github.com](https://github.com) 注册/登录
2. 点击右上角 `+` → `New repository`
3. 仓库名填 `ai-tools-hub`，选 `Public`
4. 不要勾选任何初始化选项，点击 `Create repository`
5. 把这个文件夹的所有文件上传到仓库

### 第二步：部署到 Vercel

1. 去 [vercel.com](https://vercel.com) 用 GitHub 账号登录
2. 点击 `Add New...` → `Project`
3. 找到你刚创建的 `ai-tools-hub` 仓库，点击 `Import`
4. 什么都不要改，直接点 `Deploy`
5. 等待 1-2 分钟，部署完成！

### 第三步：访问你的网站

Vercel 会给你一个免费域名，类似：`ai-tools-hub.vercel.app`

你可以：
- 直接用这个域名
- 在 Vercel 设置里绑定你自己的域名（需要买域名，约 ¥50/年）

---

## 💰 怎么赚钱？

### 方案一：Google AdSense（广告）
1. 网站有了一些流量后，去 [adsense.google.com](https://adsense.google.com) 申请
2. 通过后在页面上放广告代码
3. 每次有人看广告/点击广告，你就有收入

### 方案二：卖 API Key 套餐
1. 买一批便宜的 API Key（如 DeepSeek，极便宜）
2. 在网站上加一个"不想自己注册？购买套餐"的入口
3. 用第三方收款（如 Stripe、支付宝当面付）
4. 成本几毛钱的 Key，卖 10-30 元

### 方案三：Premium 会员
1. 免费用户每天限用 5 次
2. 付费会员无限使用 + 更多功能
3. 用 Stripe/LemonSqueezy 收款

---

## 📁 项目结构

```
ai-tools-site/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页
│   │   ├── layout.tsx        # 全局布局
│   │   ├── globals.css       # 全局样式
│   │   ├── settings/page.tsx # API Key 设置
│   │   ├── write/page.tsx    # AI 写作
│   │   ├── translate/page.tsx # AI 翻译
│   │   ├── summarize/page.tsx # AI 摘要
│   │   ├── ideas/page.tsx    # AI 灵感
│   │   └── api/
│   │       ├── ai/route.ts       # AI 接口
│   │       └── ai-stream/route.ts # 流式接口
│   ├── components/
│   │   └── ApiKeyGuard.tsx   # API Key 检查组件
│   └── lib/
│       └── ai.ts             # AI 调用工具函数
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🔧 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问
# http://localhost:3000
```

---

## ⚡ 支持的 API

任何 OpenAI 兼容的 API 都支持：

| 服务商 | Base URL | 推荐模型 | 价格 |
|--------|----------|---------|------|
| OpenAI | https://api.openai.com/v1 | gpt-3.5-turbo | $0.5/1M tokens |
| DeepSeek | https://api.deepseek.com/v1 | deepseek-chat | ¥1/1M tokens |
| Moonshot | https://api.moonshot.cn/v1 | moonshot-v1-8k | ¥12/1M tokens |
| 零一万物 | https://api.lingyiwanwu.com/v1 | yi-34b-chat | ¥2.5/1M tokens |

**推荐**：DeepSeek 最便宜，适合中国用户；OpenAI GPT-3.5 海外用户最熟悉。

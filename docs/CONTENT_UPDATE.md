# 主页更新与待补充材料

本次内容依据工作目录中的 `田雪昀-28届-简历.pdf`（2026 年 9 月版本）、原主页，以及本人指定的桌面 `sync_paper`、`script_paper` 中的稿件和图片更新。导师按本人要求列为 Yuanzhuo Wang、Bingbing Xu、Huawei Shen。头像已换为本人于 2026 年 10 月 6 日提供的照片，原图保存在 `images/xueyun-tian-sunset.jpg`，通过 CSS 调整圆形头像取景。保留 Google Scholar、GitHub 及较早的研究经历。

## 内容维护

- `_pages/includes/intro.md`：个人简介、导师、研究方向。
- `_pages/includes/experiences.md`：阿里与字节实习经历。
- `_pages/includes/educations.md`、`honers.md`、`news.md`：教育、荣誉、动态。
- `_data/publications.yml`：论文标题、作者、状态、简述、图片与链接。
- `_includes/publication.html`：论文展示模板。
- `_sass/_profile.scss`：论文图片、占位与移动端样式。

每篇论文使用独立卡片，将展示图、会议或投稿状态、标题、作者、简介和链接放在同一边框内；卡片之间留有间距。一作论文缩略图宽度上限为 200px，合作论文使用纯文字卡片。

论文按一作、合作和早期论文展示。SyncPro、RARE 合并在一作列表中，保留 Under review 标记，不再单设 Work in Progress 分组。一作论文显示图片；合作及早期论文使用通栏文字列表，不显示图片或占位。论文链接只在有实际地址时显示。已录用、技术报告和在投状态按简历区分。GLOW 的共同一作标记来自公开 PDF。AVA-Encoder 与 DiffImaginE 的 `Tian Xueyun` 保留公开论文中的署名顺序。

## 待补充

| 项目 | 当前处理 | 可补充材料 |
| --- | --- | --- |
| SyncPro | 已使用本地稿件的正式标题和模型图；稿件未列完整作者，作者处保留一作说明 | 完整作者列表、可公开的论文/项目/代码链接 |
| RARE | 已按最新本地稿件更新为 Reinforcement Learning with Adaptive Rubric Evolution for Open-Ended Generation，并更新训练流程图；稿件未列完整作者，作者处保留一作说明 | 完整作者列表、可公开的论文/项目/代码链接 |
| 其余四篇 ICLR 合作投稿 | 简历未提供正式标题，尚未创建论文条目 | 标题、作者顺序、公开状态与可公开素材 |

当前 13 个论文条目中，5 篇一作显示图片，8 篇合作及早期论文仅显示文字。已收集的合作论文图片仍保留为素材。以后替换一作图片时，把图放入 `images/papers/`，更新对应条目的 `image` 和说明图片内容的 `image_alt`。一作论文没有图片时模板自动显示占位，无需改 HTML。可选链接字段为 `paper`、`project`、`code`。本地匿名稿件的完整 PDF 和匿名代码地址未复制到主页。

## 人物信息来源

- [Yuanzhuo Wang / 王元卓](https://people.ucas.ac.cn/~0017125)
- [Bingbing Xu / 徐冰冰](https://bingbing-x.github.io/)
- [Huawei Shen / 沈华伟](https://klais.ict.ac.cn/yjdw/yjy/202404/t20240407_210246.html)
- [Jiaming Liu / Google Scholar](https://scholar.google.com/citations?user=SmL7oMQAAAAJ&hl=en)：按本人指定，简介及阿里实习中的 Jiaming Liu 均链接到此 Google Scholar 页面。阿里实习显示 “Work with Jiaming Liu”。

## 论文展示图来源

公开论文展示图均取自原论文或作者项目页。图片本地保存，点击可查看完整尺寸。

| 本地文件 | 来源 |
| --- | --- |
| `images/papers/glow.png` | [GLOW PDF](https://arxiv.org/pdf/2601.04992)，第 2 页 Figure 1，提取图形区域 |
| `images/papers/roma.png` | [ROMA Figure 2](https://arxiv.org/html/2601.10323v1/model.png) |
| `images/papers/mige.png` | [MIGE Figure 1](https://arxiv.org/html/2502.21291v4/show.png) |
| `images/papers/robix.jpg` | [Robix 项目页展示图](https://robix-seed.github.io/robix/static/images/online_images/demo-cases.jpg) |
| `images/papers/com.png` | [Chain-of-Memory Figure 2](https://arxiv.org/html/2601.14287v2/main.png) |
| `images/papers/tdp.png` | [TDP PDF](https://arxiv.org/pdf/2601.07577)，第 4 页 Figure 2，提取图形区域 |
| `images/papers/prm.png` | [Process Reward Modeling Figure 3](https://arxiv.org/html/2601.12748v1/figures/fig3v2.png) |
| `images/papers/ava.png` | [AVA-Encoder Figure 1](https://arxiv.org/html/2608.12313v2/figures/AVAE-pipeline.png) |
| `images/papers/diffimagine.png` | [DiffImaginE Figure 2](https://arxiv.org/html/2608.03025v4/framework.png) |
| `images/papers/gift.png` | [GIFT Figure 1](https://arxiv.org/html/2601.05633v2/intro-cst2.png) |
| `images/papers/syncpro.png` | 桌面 `sync_paper/6a7064fe1ef54a7a16d31e67/images/model_tight.pdf`，完整图转 PNG |
| `images/papers/rare.png` | 桌面 `script_paper/6a705db74c202bfb9cdff1a1/figures/train_pipeline.pdf`，完整图转 PNG |
| `images/Journal of Sensors.png` | 原主页已有图片 |

## 本地运行

标准 Jekyll 环境下，在仓库目录运行：

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

然后打开 `http://127.0.0.1:4000`。原项目锁文件的 Ruby 依赖较旧，新平台可能需要执行 `bundle lock --add-platform ruby`，或在独立环境中安装匹配版本。

`docs/` 已在 Jekyll 配置中排除，不会显示为公开页面。

## 本次验证

- 使用锁文件对应的 Jekyll 3.9.0 与相关插件成功构建。验证依赖安装在 `/tmp/maggie-homepage-runtime`，未改动项目依赖版本。
- Chrome 已检查图片点击放大、桌面和手机导航、320px/390px 页面无横向溢出、无浏览器脚本或 HTTP 错误。最新排版仅展示 5 张一作论文图，合作论文采用文字列表。
- 所有导航锚点存在且 ID 唯一；本地资源存在；`git diff --check` 通过。
- 本机复用验证环境可执行 `GEM_HOME=/tmp/maggie-homepage-runtime GEM_PATH=/tmp/maggie-homepage-runtime JEKYLL_NO_BUNDLER_REQUIRE=true ruby /tmp/maggie-homepage-runtime/bin/jekyll build`。

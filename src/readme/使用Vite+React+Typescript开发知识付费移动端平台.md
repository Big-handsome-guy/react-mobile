代码仓库：https://gitee.com/yooyeLearning/react-client-ts2204.git

# 1. 使用 vite 项目搭建

> 参考代码：step01-vite-antmobile-router 分支

> create-react-app 基于 webpack，启动速度较慢
> vite 基于 ESbuild，启动速度较快

## 1.1 基本使用流程

1. 创建项目

```
yarn create vite
填项目名
选React
选Typescript
```

2. 安装依赖

```
cd react-client-ts2204
yarn
```

3. 启动项目

```
yarn dev
```

## 1.2 vite自定义配置

> 路径别名、本地代理

1. 修改 vite.config.ts 配置

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",  //1. 打包资源路径配置
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 2. 路径别名
    },
  },
  server: {  //3. 本地服务配置
    proxy: { //3.1 本地代理配置
      
      "/wzj": {
        target: "https://m.wzj.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wzj/, ""), //路径重写
        // 不加重写
        //https://m.wzj.com/wzj/proxy/products/${id}?latitude=&longitude=&network_type=wifi
        //加重写
        //https://m.wzj.com/proxy/products/${id}?latitude=&longitude=&network_type=wifi
      },
    },
  },
});
```

2. 安装@types/node 模块，让 ts 能识别 path

```bash
yarn add @types/node --dev
```

3. 在根目录下新建 tsconfig.path.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["node"]
  }
}
```

4. 修改 tsconfig.json，引入 tsconfig.path.json 拓展配置

> 目的是让Typescript环境能够识别@路径别名语法

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }],
  "extends": "./tsconfig.path.json" //引入拓展配置
}
```

# 2. antd-mobile

[文档](http://ant-design-mobile.antgroup.com/zh)

1. 安装

```
yarn add antd-mobile
```

2. 引入使用

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Button } from "antd-mobile";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button color="primary" fill="solid">
        Solid
      </Button>
    </div>
  );
}
export default App;
```

3. 底部菜单组件封装

> 不同业务项目中的布局逻辑是不一样的，TabBar 本身是不含定位和外层布局相关的逻辑的，需要业务项目中自己写 CSS 来控制。

- TabBottom/index.tsx

```tsx
import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import "./index.css";
import explore from "../../assets/img/tab_explore_normal.png";
import explore1 from "../../assets/img/tab_explore_selected.png";
import tody from "../../assets/img/tab_today_normal.png";
import tody1 from "../../assets/img/tab_today_selected.png";
import mine from "../../assets/img/tab_mine_normal.png";
import mine1 from "../../assets/img/tab_mine_selected.png";

export default () => {
  const tabs = [
    {
      key: "1",
      title: "今日",
      icon: (active: boolean) => {
        return <img src={active ? tody1 : tody} className="tab-icon" alt="" />;
      },
    },
    {
      key: "2",
      title: "探索",
      icon: (active: boolean) => {
        return (
          <img src={active ? explore1 : explore} className="tab-icon" alt="" />
        );
      },
    },
    {
      key: "3",
      title: "我的",
      icon: (active: boolean) => {
        return <img src={active ? mine1 : mine} className="tab-icon" alt="" />;
      },
    },
  ];

  const [activeKey, setActiveKey] = useState("todo");

  return (
    <TabBar className="tab-bottom">
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
```

- TabBottom/index.css

```css
.tab-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.tab-icon {
  height: 20px;
}
```

# 3. 路由配置

1. 安装

```
yarn add react-router-dom
```

2. 注入

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initRem } from "./utils/rem";
import { HashRouter } from "react-router-dom";
initRem(); //初始化rem配置
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
```

3. 配置，新建组件并在 App.tsx 中配置路由

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import { Button } from "antd-mobile";
import "./App.css";
import "normalize.css";
import TabBottom from "./components/TabBottom/index";
import { Routes, Route } from "react-router-dom";
import Tody from "./views/today";
import Explore from "./views/explore";
import Mine from "./views/mine";
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      {/* <Button color="primary" fill="solid">
        Solid
      </Button> */}
      <Routes>
        <Route path="/" element={<Tody />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/mine" element={<Mine />} />
      </Routes>
      <TabBottom />
    </div>
  );
}

export default App;
```

4. 跳转，底部菜单跟路由结合

```tsx
import React, { useEffect, useState } from "react";
import { TabBar } from "antd-mobile";
import "./index.css";
import explore from "../../assets/img/tab_explore_normal.png";
import explore1 from "../../assets/img/tab_explore_selected.png";
import tody from "../../assets/img/tab_today_normal.png";
import tody1 from "../../assets/img/tab_today_selected.png";
import mine from "../../assets/img/tab_mine_normal.png";
import mine1 from "../../assets/img/tab_mine_selected.png";
import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const tabs = [
    {
      key: "/",
      title: "今日",
      icon: (active: boolean) => {
        return <img src={active ? tody1 : tody} className="tab-icon" alt="" />;
      },
    },
    {
      key: "/explore",
      title: "探索",
      icon: (active: boolean) => {
        return (
          <img src={active ? explore1 : explore} className="tab-icon" alt="" />
        );
      },
    },
    {
      key: "/mine",
      title: "我的",
      icon: (active: boolean) => {
        return <img src={active ? mine1 : mine} className="tab-icon" alt="" />;
      },
    },
  ];

  const [activeKey, setActiveKey] = useState("/mine");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveKey(pathname); //2. 刷新后保持正确的菜单激活状态
  }, []);
  const handleChange = (key: string) => {
    //1. 编程式导航触发路由切换
    navigate(key);
    setActiveKey(key);
  };

  return (
    <TabBar
      className="tab-bottom"
      onChange={handleChange}
      activeKey={activeKey}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
```

# 4. rem 适配

[reset 样式](https://www.npmjs.com/package/reset-css)

1. 在 utils 中放入 rem.ts，并在 main.ts 中引入完成适配

```tsx
import { initRem } from "./utils/rem";
initRem(); //初始化rem配置
```

2. 适配原则

- 对标还原的 UI 设计图需要是 750
- 100px = 10rem

3. 使用在线 ps 工具进行测量

[【在线 PS】PS 软件网页版，ps 在线图片处理工具 photopea-稿定设计 PS (gaoding.com)](https://ps.gaoding.com/#/)

4. 完成【探索页】部分结构的像素级还原

- 布局

```tsx
import React from "react";
import "./index.css";
import { Tag } from "antd-mobile";
type Props = {};

export default function Explore({}: Props) {
  return (
    <div>
      <div className="course-list">
        {[1, 2, 3, 4].map((item) => {
          return (
            <div className="course" key={item}>
              <div className="poster">
                <img
                  src="https://file2204.h5project.cn/NjCRH3M9nmpBvCA0Dffl79DgYcitXqL9/picture.png"
                  alt=""
                />
                <Tag className="tag" color="rgba(0,0,0,0.4)">
                  免费
                </Tag>
              </div>
              <h3>课程名称</h3>
              <p>课程基本信息</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- 样式

```css
.course-list {
  padding: 3.6rem;
  display: flex;
  flex-wrap: wrap;
}
.course {
  width: 32.1rem;
  margin-right: 3.6rem;
}
.course:nth-of-type(2n) {
  margin-right: 0;
}
.poster {
  position: relative;
}
.poster .tag {
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;
}
.poster img {
  width: 32.1rem;
  height: 22.1rem;
}
```

# 5. sass 环境及主题配置

1. 主题配置

> 在全局 index.css 中加入主题变量

```
:root:root {
  --adm-color-primary: #4a6bd0;
}
```

2. sass 解析包

```
yarn add sass sass-loader --dev
```

# 6. axios 配置

## 6.1 新增 config 配置文件

```typescript
// config/index.ts 集中管理常量配置
export const ID = "自己LeanCloud的应用ID";
export const KEY = "自己LeanCloud的应用Key";
export const BASE = "自己LeanCloud的应用域名";
```

## 6.2 封装 axios

```typescript
import axios from "axios";
import { BASE, ID, KEY } from "../config/index";
const instance = axios.create({
  baseURL: BASE + "/1.1",
  headers: {
    "X-LC-Id": ID,
    "X-LC-Key": KEY,
    "Content-Type": "application/json",
  },
});
export default instance;
```

## 6.3 封装 API

```typescript
// 课程列表
export const courseGet = () => {
  return request.get(`/classes/ReactAricle`);
};
```

# 7. 课程组件封装

1. 定义课程相关的类型约束文件

```typescript
// types/course.d.ts

//课程
export interface CourseType {
  objectId: string;
  name: string;
  info: string;
  poster: string;
  desc: string;
  isvip: boolean;
  catelv1: string;
  catelv2: string;
}

//分类
export interface CategoryType {
  objectId: string;
  cateName: string;
  fatherId: string;
  status: boolean;
  children: Array<CategoryType>;
}
```

2. 封装课程组件并约定 Props 参数格式

```tsx
// components/course/index.tsx
import React from "react";
import "./index.scss";
import { Tag, Ellipsis } from "antd-mobile";
import { CourseType } from "../../types/course";
type Props = {
  list: Array<CourseType>;
};
export default function Course({ list }: Props) {
  return (
    <div className="course-list">
      {list.map((item) => {
        return (
          <div className="course" key={item.objectId}>
            <div className="poster">
              <img src={item.poster} alt="" />
              <Tag className="tag" color="rgba(0,0,0,0.4)">
                {item.isvip ? "VIP尊享" : "免费"}
              </Tag>
            </div>
            <h3>
              <Ellipsis direction="end" content={item.name} />
            </h3>
            <p>
              <Ellipsis direction="end" rows={2} content={item.info} />
            </p>
          </div>
        );
      })}
    </div>
  );
}
```

3. 在课程列表页调用课程组件，并传递列表数据

```tsx
// views/explore/index.tsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { CapsuleTabs, Tabs } from "antd-mobile";
import { courseGet } from "../../api/course";
import Course from "../../components/course";
type Props = {};

export default function Explore({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  useEffect(() => {
    //课程列表
    courseGet().then((res) => {
      setCourseList(res.data.results);
    });
  }, []);
  return (
    <div>
      <Course list={courseList} />
    </div>
  );
}
```

# 8. 列表交互

> 参考代码：step02-course-list  分支

## 8.1 分类筛选

1. 封装加载分类的 api 接口

```typescript
//课程分类
export const categoryGet = () => {
  return request.get("/classes/ReactCategory");
};
```

2. 调整课程加载 api 接口，支持按照主分类 catelv1、子分类 catelv2 请求不同数据

```typescript
// 课程列表
export interface ICourseParams {
  catelv1: string; //主类别
  catelv2?: string; //子类别
}
export const courseGet = (
  condition: ICourseParams = { catelv1: "63743fa51d35662164b31ad1" }
) => {
  let search = JSON.stringify(condition);
  console.log(search);
  return request.get(`/classes/ReactAricle?where=${search}`);
};
```

3. 调整 explore 页面逻辑，支持按类目加载数据

```tsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { CapsuleTabs, Tabs } from "antd-mobile";
import { courseGet, categoryGet, ICourseParams } from "../../api/course";
import Course from "../../components/course";
import "./index.scss";
import { CategoryType, CourseType } from "../../types/course";
type Props = {};

export default function Explore({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const [cateList, setCateList] = useState<Array<CategoryType>>([]);
  const [activeLv1, setActiveLv1] = useState<string>("0");
  useEffect(() => {
    console.log(activeLv1, parseInt(activeLv1));

    //课程分类
    categoryGet().then((res) => {
      let { results } = res.data;
      let arrLv1 = results.filter(
        (item: CategoryType) => item.fatherId === "0-0"
      );
      arrLv1.forEach((lv1: CategoryType) => {
        lv1.children = results.filter(
          (child: CategoryType) => child.fatherId === lv1.objectId
        );
      });
      // console.log(arrLv1);
      setCateList(arrLv1);
    });
    //课程列表
    courseGet().then((res) => {
      setCourseList(res.data.results);
    });
  }, []);
  //主菜单
  const handleCapsuleTabs = (key: string) => {
    setActiveLv1(key);
    let { objectId } = cateList[parseInt(key)];
    courseGet({ catelv1: objectId }).then((res) => {
      setCourseList(res.data.results);
    });
  };
  //子菜单
  const handleTabs = (key: string) => {
    let lv1 = cateList[parseInt(activeLv1)];
    let obj: ICourseParams = {
      catelv1: lv1.objectId,
    };
    if (key !== "0") {
      obj.catelv2 = lv1.children[parseInt(key) - 1].objectId;
    }
    courseGet(obj).then((res) => {
      setCourseList(res.data.results);
    });
  };
  return (
    <div>
      <h1 className="title">探索</h1>
      <CapsuleTabs activeKey={activeLv1} onChange={handleCapsuleTabs}>
        {cateList.map((item, index) => {
          return <CapsuleTabs.Tab title={item.cateName} key={index} />;
        })}
      </CapsuleTabs>
      <Tabs
        defaultActiveKey="0"
        stretch={false}
        activeLineMode="fixed"
        onChange={handleTabs}
      >
        <Tabs.Tab title="全部" key={0} />;
        {cateList.length
          ? cateList[parseInt(activeLv1)].children.map((item, index) => {
              return <Tabs.Tab title={item.cateName} key={index + 1} />;
            })
          : ""}
      </Tabs>
      <Course list={courseList} />
    </div>
  );
}
```

## 8.2 吸顶效果

> 通过 css 来实现

```scss
.my-stick {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 2;
}
```

## 8.3 分页加载

> 参考代码：step03-pagination-stick 分支

[无限滚动](http://ant-design-mobile.antgroup.com/zh/components/infinite-scroll)

1. 无限滚动组件使用
   > 用户想看到新的数据时，可以上滑页面自动加载数据。

当 hasMore 属性为 true 时，用户页面滚动到底部 threshold (默认为 250px)时无限滚动组件会调用定义的 loadMore 函数。

```tsx
<>
  <List>
    {data.map((item, index) => (
      <List.Item key={index}>{item}</List.Item>
    ))}
  </List>
  <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
</>
```

2. 看懂 LeanCloud 分页接口
   [参考文档](https://leancloud.cn/docs/rest_api.html#hash827796182)

```
curl -X GET \
  -H "X-LC-Id: PhooC2pGuFn5MkTPdTRn7O99-gzGzoHsz" \
  -H "X-LC-Key: 4x587AuiHPH0eZspQnvR5qaH" \
  -G \
  --data-urlencode 'limit=200' \
  --data-urlencode 'skip=400' \
  https://API_BASE_URL/1.1/classes/Post
```

3. 调整课程列表的 api 方法

```typescript
// 课程列表
export interface ICourseParams {
  catelv1: string; //主类别
  catelv2?: string; //子类别
}
export const courseGet = (
  condition: ICourseParams = { catelv1: "63743fa51d35662164b31ad1" },
  page: number = 1
) => {
  let search = JSON.stringify(condition);
  let skip = (page - 1) * 8;
  return request.get(
    `/classes/ReactAricle?where=${search}&limit=8&skip=${skip}`
  );
};
```

4. 调整 explore 探索页逻辑代码，实现分页

```tsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { CapsuleTabs, Tabs, InfiniteScroll } from "antd-mobile";
import { courseGet, categoryGet, ICourseParams } from "../../api/course";
import Course from "../../components/course";
import "./index.scss";
import { CategoryType, CourseType } from "../../types/course";
type Props = {};

let page = 2;
let obj: ICourseParams = {
  //列表查询条件数据包
  catelv1: `63743fa51d35662164b31ad1`,
};
export default function Explore({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const [cateList, setCateList] = useState<Array<CategoryType>>([]);
  const [activeLv1, setActiveLv1] = useState<string>("0");
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    console.log(activeLv1, parseInt(activeLv1));

    //课程分类
    categoryGet().then((res) => {
      let { results } = res.data;
      let arrLv1 = results.filter(
        (item: CategoryType) => item.fatherId === "0-0"
      );
      arrLv1.forEach((lv1: CategoryType) => {
        lv1.children = results.filter(
          (child: CategoryType) => child.fatherId === lv1.objectId
        );
      });
      // console.log(arrLv1);
      setCateList(arrLv1);
    });
    //课程列表
    courseGet().then((res) => {
      setCourseList(res.data.results);
      setHasMore(true);
    });
  }, []);
  //主菜单
  const handleCapsuleTabs = (key: string) => {
    setActiveLv1(key);
    let { objectId } = cateList[parseInt(key)];
    obj.catelv1 = objectId;
    page = 2;
    document.documentElement.scrollTop = 0;
    courseGet({ catelv1: objectId }).then((res) => {
      let { results } = res.data;
      setCourseList(results);
      if (results.length >= 8) {
        setHasMore(true);
      }
    });
  };
  //子菜单
  const handleTabs = (key: string) => {
    let lv1 = cateList[parseInt(activeLv1)]; //主分类id
    if (key !== "0") {
      obj.catelv2 = lv1.children[parseInt(key) - 1].objectId;
    }
    page = 2;
    document.documentElement.scrollTop = 0;
    courseGet(obj).then((res) => {
      let { results } = res.data;
      setCourseList(results);
      if (results.length >= 8) {
        setHasMore(true);
      }
    });
  };
  const loadMore = async () => {
    console.log("触底了");
    courseGet(obj, page).then((res) => {
      let { results } = res.data;
      if (results.length) {
        let list = [...courseList, ...results];
        setCourseList(list);
        page++;
      }
      if (results.length < 8) {
        setHasMore(false);
      }
    });
  };
  return (
    <div className="foot-padding">
      <h1 className="title">探索</h1>
      <div className="my-stick">
        <CapsuleTabs activeKey={activeLv1} onChange={handleCapsuleTabs}>
          {cateList.map((item, index) => {
            return <CapsuleTabs.Tab title={item.cateName} key={index} />;
          })}
        </CapsuleTabs>
        <Tabs
          defaultActiveKey="0"
          stretch={false}
          activeLineMode="fixed"
          onChange={handleTabs}
        >
          <Tabs.Tab title="全部" key={0} />;
          {cateList.length
            ? cateList[parseInt(activeLv1)].children.map((item, index) => {
                return <Tabs.Tab title={item.cateName} key={index + 1} />;
              })
            : ""}
        </Tabs>
      </div>
      <Course list={courseList} />
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0} />
    </div>
  );
}

```

5. explore 页的代码封装

```tsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { CapsuleTabs, Tabs, InfiniteScroll } from "antd-mobile";
import { courseGet, categoryGet, ICourseParams } from "../../api/course";
import Course from "../../components/course";
import "./index.scss";
import { CategoryType, CourseType } from "../../types/course";
type Props = {};

let page = 2;
let obj: ICourseParams = {
  //列表查询条件数据包
  catelv1: `63743fa51d35662164b31ad1`,
};
export default function Explore({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const [cateList, setCateList] = useState<Array<CategoryType>>([]);
  const [activeLv1, setActiveLv1] = useState<string>("0");
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    console.log(activeLv1, parseInt(activeLv1));

    //课程分类
    categoryGet().then((res) => {
      let { results } = res.data;
      let arrLv1 = results.filter(
        (item: CategoryType) => item.fatherId === "0-0"
      );
      arrLv1.forEach((lv1: CategoryType) => {
        lv1.children = results.filter(
          (child: CategoryType) => child.fatherId === lv1.objectId
        );
      });
      // console.log(arrLv1);
      setCateList(arrLv1);
    });
    //课程列表
    loadData();
  }, []);
  //封装通用的数据请求方法
  const loadData = () => {
    page = 2;
    document.documentElement.scrollTop = 0;
    courseGet(obj).then((res) => {
      let { results } = res.data;
      setCourseList(results);
      if (results.length >= 8) {
        setHasMore(true);
      }
    });
  };
  //主菜单
  const handleCapsuleTabs = (key: string) => {
    setActiveLv1(key);
    let { objectId } = cateList[parseInt(key)];
    obj.catelv1 = objectId;
    loadData();
  };
  //子菜单
  const handleTabs = (key: string) => {
    let lv1 = cateList[parseInt(activeLv1)]; //主分类id
    if (key !== "0") {
      obj.catelv2 = lv1.children[parseInt(key) - 1].objectId;
    }
    loadData();
  };
  const loadMore = async () => {
    console.log("触底了");
    courseGet(obj, page).then((res) => {
      let { results } = res.data;
      if (results.length) {
        let list = [...courseList, ...results];
        setCourseList(list);
        page++;
      }
      if (results.length < 8) {
        setHasMore(false);
      }
    });
  };
  return (
    <div className="foot-padding">
      <h1 className="title">探索</h1>
      <div className="my-stick">
        <CapsuleTabs activeKey={activeLv1} onChange={handleCapsuleTabs}>
          {cateList.map((item, index) => {
            return <CapsuleTabs.Tab title={item.cateName} key={index} />;
          })}
        </CapsuleTabs>
        <Tabs
          defaultActiveKey="0"
          stretch={false}
          activeLineMode="fixed"
          onChange={handleTabs}
        >
          <Tabs.Tab title="全部" key={0} />;
          {cateList.length
            ? cateList[parseInt(activeLv1)].children.map((item, index) => {
                return <Tabs.Tab title={item.cateName} key={index + 1} />;
              })
            : ""}
        </Tabs>
      </div>
      <Course list={courseList} />
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0} />
    </div>
  );
}

```

# 9. 详情页交互

## 9.1 详情页 UI 搭建

## 9.2 列表页跳转详情并路由传参

1. 设置形参

```
<Route path="/detail/:id" element={<Detail />} />
```

2. 传递实参

```
<Link to={`/detail/${item.objectId}`}>
  <h3>
    <Ellipsis direction="end" content={item.name} />
  </h3>
  <p>
    <Ellipsis direction="end" rows={2} content={item.info} />
  </p>
</Link>
```

3. 提取使用

```
const params = useParams();
```

4. 完成详情页基本渲染

```
import React, { useEffect, useState } from "react";
import { NavBar } from "antd-mobile";
import "./index.scss";
import { useParams } from "react-router-dom";
import { courseDetailGet } from "../../api/course";
import { CourseType } from "../../types/course";
type Props = {};

export default function Detail({}: Props) {
  const params = useParams();
  const [detail, setDetail] = useState<CourseType>();
  // console.log(params);
  useEffect(() => {
    courseDetailGet(params.id as string).then((res) => {
      // console.log(res);
      setDetail(res.data);
    });
  }, []);

  const handleBack = () => {};
  return (
    <div className="detail-cont">
      <NavBar onBack={handleBack}></NavBar>
      {detail ? (
        <>
          <img src={detail.poster} alt="" />
          <h2>{detail.name}</h2>
          <p>{detail.info}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

```

## 9.3 iconfont 使用

1. 在iconfont收集图标并完成下载
2. 将下载后的font文件放入assets
3. 在App.css中全局引入iconfont.css

```css
@import url("./assets/font/iconfont.css");
```

4. 在组件中使用图标

```tsx
const right = (
    <>
    	<i className={`iconfont ${collect ? "jushoucanggift" : "jushoucang"}`}></i>
    </>
);
```

## 9.4 在React中渲染富文本

```tsx
<div dangerouslySetInnerHTML={{ __html: detail.desc }}></div>
```



# 10. Swiper轮播库使用

> 参考代码：step04-swiper-bs 分支

## 1. 基本使用流程

1. 安装

```
yarn add swiper
```

2. 在项目页面中引入使用

```tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

type Props = {};

export default function Tody({}: Props) {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
}
```

## 2.Swiper拓展使用

1. 参考拓展案例，并获取其对应配置

   对标案例：[Swiper Demos (swiperjs.com)](https://swiperjs.com/demos#effect-cards)

   案例代码：[CodeSandbox](https://codesandbox.io/s/y6dn3i?file=/src/App.jsx)

2. 调整Swiper配置

```tsx
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 1. 新案例需要额外引入下面模块
import "swiper/css/effect-cards";
import "./styles.css";
import { EffectCards } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
    </>
  );
}

```

3. 调整swiper样式

```css
.swiper {
  width: 95%;
  height: 320px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  img {
    width: 100%;
    height: auto;
  }
}
```

# 12. BetterScroll使用

[BetterScroll 2.0 (better-scroll.github.io)](https://better-scroll.github.io/docs/zh-CN/)

## 12.1. 基本使用流程

1. 准备容器

> 要求：
>
> 1. wrapper容器一定要有固定高度（如果是横向滚动需要有固定宽度）
> 2. content内容高度一定要超过wrapper（如果是横向滚动需要宽度超过wrapper）
> 3. wrapper需要设置overflow:hidden

```tsx
<div className="wrapper">
	<div className="content"></div>
</div>
```

2. 安装

```bash
yarn add @better-scroll/core
```

3. 初始化

> 需要注意，只有等到better-scroll内部元素全部渲染完毕后，再new BScroll才能保证滚动交互正常

```tsx
useEffect(() => {
    bannerGet().then((res) => {
        setBanner(res.data.results); //此处setBanner所引发的视图更新，是异步的
        // 如何等到setBanner执行渲染完毕后再初始化betterScroll ?
        setTimeout(() => { // 临时用定时器做处理，验证setBanner的异步特征
            let wrapper = wrapRef!.current as HTMLDivElement;
            let bs = new BScroll(wrapper, {
                probeType: 3, //控制scroll事件的派发时机
            });
            bs.on("scroll", (position: any) => {
                console.log(position.x, position.y);
            });
        }, 300);
    });
```

## 12.2实现顶部导航栏动态透明渐变

```tsx
// views/tody/index.tsx  完整代码
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Avatar, Grid, SearchBar } from "antd-mobile";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.scss";
// import required modules
import { EffectCards } from "swiper";
import { bannerGet, IBannerType } from "@/api/home";
import { courseGet } from "@/api/course";
import { CourseType } from "@/types/course";
import Course from "@/components/course";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(MouseWheel);
type Props = {};
function getImageUrl(index: number) {
  return new URL(`../../assets/img/ic_today_${index + 1}.png`, import.meta.url)
    .href;
}
export default function Tody({}: Props) {
  const [courseList, setCourseList] = useState<Array<CourseType>>([]);
  const [banner, setBanner] = useState<Array<IBannerType>>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridData = ["专注闹钟", "呼吸训练", "睡眠助手", "解压木鱼"];
  const [opacity, setOpacity] = useState<number>(0);
  useEffect(() => {
    bannerGet().then((res) => {
      setBanner(res.data.results);
      //如何等到setBanner执行渲染完毕后再初始化betterScroll
      setTimeout(() => {
        let wrapper = wrapRef!.current as HTMLDivElement;
        let bs = new BScroll(wrapper, {
          probeType: 3, //控制scroll事件的派发时机
          click: true, //开启内容点击
          mouseWheel: {
            //开启鼠标滚轮
            speed: 20,
            invert: false,
            easeTime: 300,
          },
        });
        bs.on("scroll", (position: any) => {
          // console.log(position.x, position.y);
          let y = Math.abs(position.y);
          if (y < 290) {
            setOpacity(y / 300);
          }
        });
      }, 300);
    });
    loadMore();
  }, []);
  const loadMore = async () => {
    courseGet().then((res) => {
      let { results } = res.data;
      setCourseList(results);
    });
  };
  return (
    <div className="today-cont">
      <div className="header" style={{ opacity }}>
        Have a NiceDay!
      </div>
      <div className="wapper" ref={wrapRef}>
        <div className="content">
          <div className="user">
            <div>
              <h1>加入NiceDay</h1>
              <p>注册或登录账号</p>
            </div>
            <Avatar src="" />
          </div>
          <div className="search-cont">
            <SearchBar placeholder="冥想课程、大自然音、睡眠助手等" />
          </div>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {banner.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item.img} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Grid columns={4} gap={8}>
            {gridData.map((item, index) => {
              return (
                <Grid.Item className="my-grid-item" key={index}>
                  <img src={getImageUrl(index)} alt="" />
                  <h3>{item}</h3>
                </Grid.Item>
              );
            })}
          </Grid>
          <Course list={courseList} />
        </div>
      </div>
    </div>
  );
}

```



# 13. vite 中动态引入本地图片

[参考文档](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)

1. 封装获取本地图片绝对路径的方法

```typescript
function getImageUrl(index: number) {
  return new URL(`../../assets/img/ic_today_${index + 1}.png`, import.meta.url)
    .href;
}
```

2. 使用方法函数获取图片路径并使用

```tsx
export default function Tody({}: Props) {
  const gridData = ["专注闹钟", "呼吸训练", "睡眠助手", "解压木鱼"];
  return (
    <div className="today-cont">
      <div className="wapper" ref={wrapRef}>
        <div className="content">
          <Grid columns={4} gap={8}>
            {gridData.map((item, index) => {
              return (
                <Grid.Item className="my-grid-item" key={index}>
                  <img src={getImageUrl(index)} alt="" />
                  <h3>{item}</h3>
                </Grid.Item>
              );
            })}
          </Grid>
          <Course list={courseList} />
        </div>
      </div>
    </div>
  );
}
```

# 14. Mobx

> 对于 React 类组件的支持较好
> 在类组件中可以采用【装饰器语法】
> [文档](https://www.mobxjs.com/)

# 15. Zustand 状态管理

>  Zustand 以简单被大家所知, 它使用 hooks 来管理状态无需样板代码
>
> [zustand - npm (npmjs.com)](https://www.npmjs.com/package/zustand)

**`"Zustand" 是德语的"state"`**

有很多的流行 React 状态管理工具, 但一下是您更喜欢使用 `Zustand` 的一些原因

- 更少的样板代码
- Zustand 只在 state 的值改变时渲染组件, 通常可以处理状态的改变而无需渲染代码
- 状态管理通过简单定义的操作进行集中和更新, 在这方面和 Redux 类似, 但是又和 Redux 不太类似, Redux 开发必须创建 reducer、action、dispatch 来处理状态, Zustand 让它变得更加容易
- 使用 hooks 来管理 states, Hooks 在 react 中很流行, 因此是一个很受欢迎的状态管理库
- Zustand 使用简单使用和简单实现的代码
- 通过消除使用 `Context Provides` 从而使代码更短、更易读

### 15.1 基本使用流程

1. 安装

```bash
yarn add zustand
```

2. 创建状态机模块

> create接收一个函数，函数的返回值对象，就是状态机模块的数据、方法

```javascript
import create from "zustand";

// define the store
const useCounter = create((set) => ({
  count: 0,
}));
```

3. 访问 Store

在我们的应用中使用这个 state, 我们可以将创建状态的值绑定到 DOM 元素

```javascript
const count = useCounter((state) => state.count);

return (
  <div className="App">
    <h1>{count}</h1>
  </div>
);
```

4. 更新 state

- 调整状态机模块逻辑

```typescript
// store/count.ts
import create from "zustand";
export interface CountState {
  count: number;
  increment: (n: number) => void;
}
export const useCounter = create<CountState>((set) => {
  return {
    count: 100,
    increment(n) {
      return set((state: CountState) => ({ count: state.count + n }));
    },
  };
});
```

- 在组件内触发数据更新

```javascript
import React from "react";
import { Button } from "antd-mobile";
import { useCounter } from "@/store/count";
type Props = {};

export default function Detail({}: Props) {
  let { count, increment } = useCounter((state) => state);
  return (
    <div>
      Detail{count}
      <Button
        onClick={() => {
          increment(100);
        }}
      >
        按钮
      </Button>
    </div>
  );
}
```

### 15.2 处理异步数据

`Zustand` 让存储异步数据变得容易, 这里, 我们只需要发出 `fetch` 请求和 `set()` 方法来设置我们的状态值

1. 新增一个管理课程内容的 store/coure.ts

```typescript
// store/banner.ts
import { bannerGet, IBannerType } from "@/api/home";
import create from "zustand";
interface BannerState {
  banner: Array<IBannerType>;
  fetchBanner: () => void;
}
export const useBanner = create<BannerState>((set, get) => ({
  banner: [],
  //带有异步请求方法
  fetchBanner: async () => {
    let res = await bannerGet();
    return set({ banner: res.data.results });
  }
}));
```

2. 在CompA组件中获取并渲染banner

```tsx
// // views/zustand/comp-a.tsx
import React from "react";
import { useCounter } from "@/store/count";
import { Button } from "antd-mobile";
import { useBanner } from "@/store/banner";
type Props = {};

export default function CompA({}: Props) {
  const counter = useCounter((state) => state);
  const { banner, addBanner } = useBanner((state) => state);
  return (
    <div className="box">
      CompA,{counter.count}
      <Button color="primary" onClick={counter.increment}>
        数字+
      </Button>
      {banner.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.img} alt="" style={{ height: "50px" }} />
          </div>
        );
      })}
    </div>
  );
}

```



3. 在compB组件中触发该异步方法测试效果

```tsx
// views/zustand/comp-b.tsx
import React from "react";
import { useCounter } from "@/store/count";
import { Button } from "antd-mobile";
import { useBanner } from "@/store/banner";
type Props = {};

export default function CompB({}: Props) {
  let { fetchBanner } = useBanner((state) => state);
  return (
    <div className="box">
      <Button color="primary" onClick={fetchBanner}>
        获取banner数据
      </Button>
    </div>
  );
}

```

### 15.3 get访问存储状态

当我们定义上面的状态时, 我们使用 `set()` 方法, 假设我们在一个程序里, 我们需要存储 `其他地方` 的值添加到我们的状态, 为此, 我们将使用 `Zustand` 提供的方法 `get()` 代替, 此方法允许多个状态使用相同的值

1. 调整状态机逻辑代码

```typescript
//store/banner.ts
import { persist } from "zustand/middleware";
import { bannerGet, IBannerType } from "@/api/home";
import create from "zustand";
interface BannerState {
  banner: Array<IBannerType>;
  fetchBanner: () => void;
  addBanner: (obj: IBannerType) => void;
}
export const useBanner = create<BannerState>((set, get) => ({
  banner: [],
  //带有异步请求方法
  fetchBanner: async () => {
    let res = await bannerGet();
    return set({ banner: res.data.results });
  },
  addBanner: (obj) => {
    let arr = get().banner; //使用get方法获取状态机原来的数据包
    arr.push(obj);
    return set({
      banner: arr,
    });
  },
}));
```

2. 在组件中触发 addBanner执行相关逻辑

```tsx
// views/zustand/comp-a.tsx
import React from "react";
import { useCounter } from "@/store/count";
import { Button } from "antd-mobile";
import { useBanner } from "@/store/banner";
type Props = {};

export default function CompA({}: Props) {
  const counter = useCounter((state) => state);
  const { banner, addBanner } = useBanner((state) => state);
  return (
    <div className="box">
      CompA,{counter.count}
      <Button color="primary" onClick={counter.increment}>
        数字+
      </Button>
      <Button
        color="primary"
        onClick={() => {
          addBanner({
            img: "https://file2204.h5project.cn/Ur0oGTsgNEdy29UaPnrYDhkPyLqzXFWB/picture.png",
            name: "新数据包",
          });
        }}
      >
        向banner新增数据包
      </Button>
      {banner.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.img} alt="" style={{ height: "50px" }} />
          </div>
        );
      })}
    </div>
  );
}

```

### 15.4 persist 状态持久化

状态管理库的一个共同特点是持久化状态, 例如: 在有 `form` 的网站中, 你希望保存用户信息, 如果用户不小心刷新了页面, 你会丢失所有数据记录. 在我们的应用中, 刷新时, 添加到状态的数据会丢失

`Zustand` 提供了持久化状态以防止数据丢失的功能, 这个功能, 我们将使用 `Zustand` 提供的名为 `persist` 的中间件, 该中间件通过 `localStorage` 来持久化来自应用程序的数据, 这样, 当我们刷新页面或者完全关闭页面时, 状态不会重置

[zustand/persisting-store-data.md at main · pmndrs/zustand (github.com)](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md)

> How do I use with TypeScript?
> Basic typescript usage doesn't require anything special except for writing create<State>()(...) instead of create(...).

1. 在 Typescript 中使用 persist 的语法示例

```typescript
// 添加持久化能力前
export const useBanner = create<BannerState>((set, get) => ({}));

// 添加持久化能力后
export const useBanner = create<BannerState>()(persist(
  (set, get) => ({}),  //1. persist第一个参数，为原来的状态机逻辑函数
  {   //本地存储配置
    name:'banner-list' //2. persist第二个参数是persist的行为配置
  }
));
```

2. 将自己的状态机模块改为持久化存储

```typescript
import { persist } from "zustand/middleware";
import { bannerGet, IBannerType } from "@/api/home";
import create from "zustand";
interface BannerState {
  banner: Array<IBannerType>;
  fetchBanner: () => void;
  addBanner: (obj: IBannerType) => void;
}
export const useBanner = create<BannerState>()(
  persist(
    (set, get) => ({
      banner: [],
      //带有异步请求方法
      fetchBanner: async () => {
        let res = await bannerGet();
        return set({ banner: res.data.results });
      },
      addBanner: (obj) => {
        let arr = get().banner; //获取状态机原来的数据包
        arr.push(obj);
        return set({
          banner: arr,
        });
      },
    }),
    {
      name: "banner-list",
      getStorage: () => sessionStorage, //可选配置，指定存储位置，默认存在localStorage中
    }
  )
);
```

3. 清除持久化状态

```tsx
// // views/zustand/comp-b.tsx
<Button
  onClick={() => {
    useCourse.persist.clearStorage();
  }}
>
  清除persist本地存储
</Button>
```

# 16. 登录功能

## 16.1使用状态机完成登录

1. 使用ant-mobile的Form组件快速搭建登录页
2. 封装登录请求api

```typescript
// api/user.ts
import request from "../utils/request";
export interface IUserParams {
  username: string;
  password: string;
  avatar: string;
}
export const userLogin = (params: IUserParams) => {
  return request.post("/login", params);
};

```

3. 定义管理用户信息及异步登录的状态机模块

```typescript
import { IUserParams, userLogin } from "@/api/user";
import create from "zustand";
//登录成功后下发的数据格式
interface UserInfoType {
  objectId: string;
  sessionToken: string;
  shortId: string;
  username: string;
  avatar: string;
}
interface UserState {
  userInfo: UserInfoType | null;
  isLoading: boolean;
  loginFetch: (params: IUserParams) => void;
}
export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  isLoading: false,
  loginFetch: async (params) => {
    set({ isLoading: true });
    let res = await userLogin(params);
    setTimeout(() => { //为了更明显的体验出loading效果
      set({ isLoading: false, userInfo: res.data });
    }, 1000);
  },
}));

```

4. 在组件中触发状态机封装的额登陆请求

```tsx
import React from "react";
import { Form, Input, Button, DotLoading, NavBar } from "antd-mobile";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router-dom";

export default () => {
  const { loginFetch, isLoading } = useUserStore((state) => state);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log(values);
    loginFetch(values, navigate);
  };
  let initialValues = {
    username: "翠山",
    password: "123",
  };
  return (
    <>
      <NavBar>登录</NavBar>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        initialValues={initialValues}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? <DotLoading /> : "提交"}
          </Button>
        }
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: "账号不能为空" }]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  );
};

```



## 16.2为用户状态机模块添加持久化

```typescript
import { persist } from "zustand/middleware";
import { IUserParams, userLogin } from "@/api/user";
import create from "zustand";
import { NavigateFunction } from "react-router-dom";
//登录成功后下发的数据格式
interface UserInfoType {
  objectId: string;
  sessionToken: string;
  shortId: string;
  username: string;
  avatar: string;
}
interface UserState {
  userInfo: UserInfoType | null;
  isLoading: boolean;
  loginFetch: (params: IUserParams, navigate: NavigateFunction) => void;
  logout: () => void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoading: false,
      //登录
      loginFetch: async (params, navigate) => {
        set({ isLoading: true });
        let res = await userLogin(params);
        setTimeout(() => {
          set({ isLoading: false, userInfo: res.data });
          navigate("/mine");
        }, 1000);
      },
      //退出登录
      logout() {
        set({ userInfo: null });
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "react-client-user-info",
    }
  )
);

```

## 16.3 在首页、详情页中使用状态机用户信息做显示判断

1. 首页

```tsx
// ...其他代码保留
import { useUserStore } from "@/store/user";
export default function Tody({}: Props) {
  const { userInfo } = useUserStore((state) => state);  //1. 获取状态机用户信息
  return (
    <div className="today-cont">
      <div className="header" style={{ opacity }}>
        Have a NiceDay!
      </div>
      <div className="wapper" ref={wrapRef}>
        <div className="content">
          <div className="user">
            <div>
              <h1>加入NiceDay</h1>
              // 2. 根据用户的登录情况，控制渲染的内容
              <p>
                {userInfo
                  ? `正在访问账号:${userInfo.username}`
                  : "注册或登录账号"}
              </p>
            </div>
            <Avatar src="" />
          </div>
        </div>
      </div>
    </div>
  );
}

```

2. 详情页

```tsx
// ...其他代码保留
import { useUserStore } from "@/store/user";
export default function Detail({}: Props) {
  const { userInfo } = useUserStore((state) => state); //1. 获取状态机用户信息
  return (
    <div className="detail-cont">
      <NavBar onBack={handleBack} right={right}>
        课程详情
      </NavBar>
      <div className="detail">
        {detail ? (
          <>
            <img src={detail.poster} alt="" />
            <h2>{detail.name}</h2>
              {/* 2. 根据用户的登录情况，控制渲染的内容 */}
            {userInfo ? (
              <div dangerouslySetInnerHTML={{ __html: detail.desc }}></div>
            ) : (
              <p>{detail.info}</p>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

```

# 17.路由调整与路由守卫

## 17.1 路由调整

> 目的：只让三个主页面显示底部菜单，其他页面不显示底部菜单

1. 新建main/index.tsx组件，作为主页面容器

```tsx
// main/index.tsx
import React from "react";
import TabBottom from "@/components/TabBottom/index";
import { Outlet } from "react-router-dom";

export default function Main({}: Props) {
  return (
    <>
      <Outlet/>
      <TabBottom />
    </>
  );
}

```

2. 调整App.tsx中的路由映射关系

> 让三个主页面变为Main组件的子路由

```tsx
// App.tsx
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Tody />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/mine" element={<Mine />} />
        </Route>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zustand" element={<TestZustand />} />
      </Routes>
    </div>
  );
}

export default App;

```

## 17.2 路由守卫

> 就目前的项目需求来说，暂时只有个人中心有必要使用路由进行守卫，所以考虑将守卫逻辑添加到main/index.tsx中，未来如果需求发生变动，守卫的位置可能需要做灵活变动。

```tsx
// main/index.tsx
import React from "react";
import TabBottom from "@/components/TabBottom/index";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/user";
type Props = {};

export default function Main({}: Props) {
  let { pathname } = useLocation();
  let { userInfo } = useUserStore((state) => state);
  const guard = () => { //1. 自定义守卫函数
    if (userInfo || pathname.indexOf("mine") == -1) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <>
      {guard()}
      <TabBottom />
    </>
  );
}

```

# 18. 收藏功能

## 18.1 收藏功能分析

1. 跟收藏类似功能

   - 购物车
   - 评论
   - 点赞

2. 收藏表的字段设置

   > 收藏的数据需要一张独立的表
   > 不能跟商品表混在一起（为商品加一个字段）

   - userid 用户的 objectId
   - courseid 收藏的目标课程的 objectId
   - name 冗余字段，用空间换时间
   - poster
   - isvip
   - info

3. 数据库的查询效率

   - 时间复杂度
     - 查询一条数据，所需要花的时间
   - 空间复杂度
     - 存储一条数据，所需要占用的数据库空间

4. 收藏的业务流程
   - 新增收藏
   - 初始化收藏状态
   - 移出收藏

## 18.2 新增收藏

1. 封装异步请求api

```typescript
// api/user.ts
export interface ICollectParams {
  userid: string;
  courseid: string;
  name: string;
  poster: string;
  isvip: boolean;
  info: string;
}
//收藏
export const userCollect = (params: ICollectParams) => {
  return request.post("/classes/ReactCollect", params);
};
```

2. 收藏按钮逻辑

```tsx
// views/detail/index.tsx
const handleCollect = () => {
    if (!userInfo) {
        navigate("/login");
    } else {
        let { name, poster, isvip, info, objectId } = detail as CourseType;
        let userid = userInfo.objectId;
        let courseid = objectId;
        userCollect({ name, poster, isvip, info, userid, courseid }).then(
            (res) => {
                console.log(res);
                setCollect(true);
                let { objectId } = res.data;
                setCollectId(objectId); //记录收藏id
            }
        );
    }
};
```

## 18.3 初始化课程收藏状态

1. 通过请求收藏表，判断收藏状态

```typescript
// api/user.ts
export interface ICollectSearchParams {
  userid: string | undefined;
  courseid?: string;
}
export const userCollectGet = (params: ICollectSearchParams) => {
  let search = JSON.stringify(params);
  return request.get(`/classes/ReactCollect?where=${search}`);
};
```

2. 组件内逻辑

```tsx
// views/detail/index.tsx
useEffect(() => {
    // 获取详情
    courseDetailGet(params.id as string).then((res) => {
        // console.log(res);
        setDetail(res.data);
    });

    //获取收藏状态
    let courseid = params.id;
    let userid = userInfo?.objectId;
    userCollectGet({ courseid, userid }).then((res) => {
        // console.log(res);
        if (res.data.results.length) {
            setCollect(true);
            let { objectId } = res.data.results[0];
            setCollectId(objectId); //记录收藏id
        }
    });
}, []);
```

## 18.4 移出收藏

1. 封装异步请求api

```typescript
// api/user.ts
// 移除收藏
// 需要携带什么条件？ 收藏表的唯一objectId
export const userCollectDel = (collectid: string) => {
  return request.delete(`/classes/ReactCollect/${collectid}`);
};
```

2. 组件内逻辑

```tsx
// views/detail/index.tsx
const handleRemove = () => {
    console.log("取消收藏");
    userCollectDel(collectId).then((res) => {
        setCollect(false);
    });
};
```

## 18.5 封装路由守卫组件

> 前面所写的路由守卫方法，只能保证用户进入Main组件的时候进行守卫判断，如果用户进入别的组件，就无法执行守卫判断，所以需要对路由守卫方式进行升级改造

1. 独立封装guard/index.tsx守卫组件

```tsx
// src/guard/index.tsx
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/user";
type IGuardProps = {
  children: ReactNode;
};

export default function Guard(props: IGuardProps) {
  let { pathname } = useLocation();
  let { userInfo } = useUserStore((state) => state);
  const guard = () => {
    if (userInfo || pathname.indexOf("mine") == -1) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return <>{guard()}</>;
}
```

2. 在需要拦截的组件路由映射中，调用Guard组件

```tsx
// App.tsx
import Guard from "./guard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Tody />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/mine"
            element={
              <Guard>
                <Mine />
              </Guard>
            }
          />
        </Route>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mine/collect"
          element={
            <Guard>
              <Collect />
            </Guard>
          }
        />
        <Route path="/zustand" element={<TestZustand />} />
      </Routes>
    </div>
  );
}

export default App;

```

3. Main组件内的守卫逻辑将不再需要

```tsx
// views/main/index.tsx
import React from "react";
import TabBottom from "@/components/TabBottom/index";
import { Navigate, Outlet, useLocation } from "react-router-dom";
type Props = {};
export default function Main({}: Props) {
  return (
    <>
      <Outlet />
      <TabBottom />
    </>
  );
}

```

## 18.6 渲染收藏列表

1. 对antd-mobile提供的导航栏组件进行二次封装

```tsx
// components/custom-nav/index.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "antd-mobile";
type Props = {
  title: string;
};

export default function CustomNavBar({ title }: Props) {
  let navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return <NavBar onBack={back}>{title}</NavBar>;
}

```

2. 完成收藏列表的搭建与渲染

```tsx
// views/collect/index.tsx
import { userCollectGet } from "@/api/user";
import Course from "@/components/course";
import CustomNavBar from "@/components/custom-nav";
import { useUserStore } from "@/store/user";
import React, { useState, useEffect } from "react";
type Props = {};
export default function Collect({}: Props) {
  const { userInfo } = useUserStore((state) => state);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (userInfo) {
      let userid = userInfo.objectId;
      userCollectGet({ userid }).then((res) => {
        setList(res.data.results);
      });
    }
  }, []);
  return (
    <div>
      <CustomNavBar title="我的收藏" />
      <Course list={list} />
    </div>
  );
}

```

# 19. 头像上传

## 19.1 前端封装图片上传组件

1. 头像上传组件封装，并获取图片文件的base64编码

```tsx
import React from "react";
import { ImageUploader, Avatar } from "antd-mobile";
import "./index.scss";
type Props = {};
//将本地资源对象转换为base64编码
const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
export default function ImgUpload({}: Props) {
  const handleUpload: any = async (file: File) => {
    console.log(file);
    getBase64(file, (base64) => {
      console.log(base64);
    });
    return {
      url: "img.png",
    };
  };
  return (
    <div>
      <ImageUploader upload={handleUpload}>
        <Avatar className="avatar" src="" />
      </ImageUploader>
    </div>
  );
}
```

2. 对原本antd-mobile提供的组件做局部样式调整

> 目的是隐藏其默认上传成功后的预览列表，组件本身没有提供相关隐藏的配置项

```scss
.adm-space-item {
  display: none;
  &:last-of-type {
    display: block;
  }
}
```

## 19.2 后端图片上传逻辑

>  使用LeanCloud的SDK接收前端的base64完成上传

[SDK 的安装与初始化](https://leancloud.cn/docs/sdk_setup-js.html#hash117588)
[SDK 构建 leancloud 文件资源](https://leancloud.cn/docs/leanstorage_guide-js.html#hash813653189)

1. 安装

   ```
   yarn add leancloud-storage
   ```

2. 封装 config/index.ts 存储公共配置常量

   ```typescript
   // 集中管理常量配置
   export const ID = "自己的LeanCloud空间ID";
   export const KEY = "自己的LeanCloud空间Key";
   export const BASE = "https://api2204.h5project.cn"; //自己的LeanCloud域名，可以是LeanCloud分配的临时域名
   ```

3. 在入口文件 main.tsx 中初始化 LeanCloud 的 SDK

   ```tsx
   import { ID, KEY, BASE } from "@/config/index"; //此文件需要自己定义
   // 初始化LeanCloud的SDK
   AV.init({
     appId: ID,
     appKey: KEY,
     serverURL: BASE,
   });
   ```

4. 在 img-upload/index.tsx 组件中使用 SDK 提供的方法，实现图片的上传

```tsx
import React, { useState, useEffect } from "react";
import { ImageUploader, Avatar } from "antd-mobile";
import "./index.scss";
import Cloud from "leancloud-storage";
import { userUpdate } from "@/api/user";
import { useUserStore } from "@/store/user";
type Props = {};
//1. 将本地资源对象转换为base64编码，需要将上面的回调函数写法，改造为Promise写法
const getBase64 = (img: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(img);
  });
};
export default function ImgUpload({}: Props) {
  const [avatar, setAvatar] = useState<string>("");
  const { userInfo, updateInfo } = useUserStore((state) => state);
  useEffect(() => {
    if (userInfo && userInfo.avatar) {
      setAvatar(userInfo.avatar);
    }
  }, []);
  const handleUpload: any = async (file: File) => {
    // console.log(file);
    // 2. 获取文件资源的base64编码
    let base64 = await getBase64(file);
    // 3. 构建LeanCloud资源
    let res: any = await new Cloud.File("client.png", { base64 }).save();
    let { url } = res.attributes;
    console.log("图片路径", url);
    setAvatar(url); // 4. 设置头像预览
    let { objectId, sessionToken } = userInfo!;
    userUpdate(objectId, sessionToken, { avatar: url }).then((res) => {
      userInfo!.avatar = url; //替换状态机中的头像
      updateInfo(userInfo!);
    });
    return {
      url,
    };
  };
  return (
    <div>
      <ImageUploader upload={handleUpload}>
        <Avatar className="avatar" src={avatar} />
      </ImageUploader>
    </div>
  );
}

```

## 19.3 更新用户表与状态机

1. 更新数据库用户头像的api

> 注意，更新用户表的时候，需要携带登录成功后，后端下发的sessionToken进行验证，否则无法更新成功

```typescript
//更新用户信息
interface IUserUpdateParams {
  avatar: string;
}
export const userUpdate = (
  objectId: string,
  token: string,
  params: IUserUpdateParams
) => {
  // return request.put(`/users/${objectId}`, params);
  return request({
    url: `/users/${objectId}`,
    method: "PUT",
    headers: {
      "X-LC-Session": token,
    },
    data: params,
  });
};

```

2. 在状态机store/user.ts中，添加修改用户信息的方法

```typescript
import { persist } from "zustand/middleware";
import { IUserParams, userLogin } from "@/api/user";
import create from "zustand";
import { NavigateFunction } from "react-router-dom";
//登录成功后下发的数据格式
interface UserInfoType {
  objectId: string;
  sessionToken: string;
  shortId: string;
  username: string;
  avatar: string;
}
interface UserState {
  userInfo: UserInfoType | null;
  isLoading: boolean;
  loginFetch: (params: IUserParams, navigate: NavigateFunction) => void;
  logout: () => void;
  updateInfo: (info: UserInfoType) => void;  //1. 新增类型约束
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoading: false,
      //... 此处省略了部分原有交互代码
      //更新用户信息
      updateInfo(info) {  // 2. 添加更新用户信息的方法
        set({ userInfo: info }); 
      },
    }),
    {
      name: "react-client-user-info",
    }
  )
);

```



# 20. 播放器

## 20.1 播放器功能基本准备

1. 播放器弹出面板的布局

```tsx
import React, { useState } from "react";
import "./index.scss";
import { Tag, Popup } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import { usePlayerStore } from "@/store/player";
type Props = {};

export default function AudioPlay({}: Props) {
  const { popShow, togglePopShow } = usePlayerStore((state) => state);
  return (
    <Popup
      visible={popShow}
      onMaskClick={() => {
        togglePopShow(false);
      }}
      bodyStyle={{ height: "100vh" }}
    >
      <div className="audio-play">
        <div className="drop-cont">
          <DownOutline
            fontSize={20}
            onClick={() => {
              togglePopShow(false);
            }}
          />
          <Tag color="default">耀眼的播放器</Tag>
          <span></span>
        </div>
        <div className="play-btn stop">
          <i className="iconfont bofang_bg"></i>
          <i className="iconfont zanting1_bg"></i>
          <i className="iconfont zanting_bg"></i>
        </div>
        <div className="audio-control">
          <audio src="https://file2204.h5project.cn/Fexvm9Jd4mL3u0ekcncD5BrRLz32wam4/5c89e8089afc150810.mp3"></audio>
          <div className="icon-cont">
            <i className="iconfont jushoucang"></i>
            <i className="iconfont fenxiang"></i>
          </div>
          <div className="bar">
            <div className="inner">
              <div className="dot"></div>
            </div>
          </div>
        </div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </Popup>
  );
}

```



2. 样式

```scss
.audio-play {
  height: 100vh;
  background-color: #e0e5f8;
  position: fixed;
  z-index: 11;
  left: 0;
  bottom: 0;
  width: 100%;
  .drop-cont {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50px;
    width: 50px;
    transform: translate(-50%, -50%);
    z-index: 6;
    // border: 1px solid red;
    .iconfont {
      font-size: 50px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 7;
      transition: all 0.5s;
    }
    .bofang_bg {
      opacity: 0;
      z-index: 6;
    }
    .zanting_bg {
      opacity: 0;
      z-index: 6;
    }
    &.stop {
      .zanting1_bg {
        display: none;
      }
      .bofang_bg {
        opacity: 1;
        transform: translateX(-100%);
      }
      .zanting_bg {
        opacity: 1;
        transform: translateX(100%);
      }
    }
  }
  .audio-control {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6;
  }
  .icon-cont {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 90%;
    .iconfont {
      font-size: 20px;
    }
  }
  .bar {
    height: 5px;
    width: 90%;
    margin: 30px auto 60px;
    background-color: #d8d8d8;
    border-radius: 10px;
  }
  .inner {
    height: 100%;
    width: 0;
    background-color: #333;
    position: relative;
    border-radius: 10px;
  }
  .dot {
    height: 20px;
    width: 20px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    background-color: #333;
    border-radius: 50%;
  }
  .circle {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: absolute;
    bottom: -200px;
    left: 50%;
  }
  .circle1 {
    transform: translate(-50%, -250%) scale(10);
    background-color: #cdd4f3;
    animation: circle1 5s infinite alternate-reverse linear;
  }
  .circle2 {
    transform: translate(-50%, -150%) scale(10);
    background-color: #dadff6;
    z-index: 3;
    animation: circle2 5s infinite alternate-reverse linear;
  }
  .circle3 {
    transform: translate(-50%, -50%) scale(10);
    background-color: #c1c8ef;
    z-index: 4;
    animation: circle3 5s infinite alternate-reverse linear;
  }
  @keyframes circle1 {
    0% {
      transform: translate(-50%, -250%) scale(10);
    }
    100% {
      transform: translate(-50%, -180%) scale(10);
    }
  }
  @keyframes circle2 {
    0% {
      transform: translate(-50%, -150%) scale(10);
    }
    100% {
      transform: translate(-50%, -50%) scale(10);
    }
  }
  @keyframes circle3 {
    0% {
      transform: translate(-50%, 0) scale(10);
    }
    100% {
      transform: translate(-50%, 30%) scale(10);
    }
  }
}

```

3. 需要在状态机中新增播放器控制模块

> 播放器的显示隐藏、播放状态、播放进度等信息需要跨组件共享

```typescript
// store/player.ts
import create from "zustand";
interface PlayerState {
  popShow: boolean;
  togglePopShow: (bool: boolean) => void;
}
export const usePlayerStore = create<PlayerState>((set) => ({
  popShow: false,
  togglePopShow(bool) {
    set({ popShow: bool });
  },
}));

```

## 20.2播放器的缩放胶囊组件

1. 胶囊组件封装

```tsx
import React from "react";
import { FloatingBubble, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import "./index.scss";
export default () => {
  const onClick = () => {
    Toast.show("你点击了气泡");
  };
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50vh 32px 0",
      }}
    >
      <FloatingBubble
        className="bubble"
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
        onClick={onClick}
      >
        <div className="bubble-cont">
          <i className="iconfont zanting1_bg"></i>
          <i className="iconfont bofang_bg"></i>
          <img src="https://file2204.h5project.cn/sEHqreOKSBTx2IiaFIRHfilzae7vw9cb/banner2.webp" />
          <CloseOutline fontSize={18} />
        </div>
      </FloatingBubble>
    </div>
  );
};

```

2. 自定义胶囊组件样式

```scss
.adm-floating-bubble-button {
  height: 40px;
  width: 120px;
  border-radius: 30px;
  // background-color: green;
}
.bubble-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  // padding: 10px;
  .bofang_bg {
    display: none;
  }
  img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }
  .iconfont {
    font-size: 24px;
  }
  &.play {
    .zanting1_bg {
      display: none;
    }
  }
}

```



核心代码

```tsx
import React, { TouchEventHandler, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Slider, Tag } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
type Props = {};
let barWidth: number = 0;
let beginX: number = 0;
let beginW = 0;
let duration = 0;
export default function AudioPlay({}: Props) {
  let audioRef = useRef<HTMLAudioElement>(null);
  let [playState, setPlayState] = useState(false);
  let barRef = useRef<HTMLDivElement>(null);
  let [innerWidth, setInnerWidth] = useState<number>(0);
  useEffect(() => {
    let ele = audioRef.current as HTMLAudioElement;
    barWidth = barRef.current!.offsetWidth;
    ele.oncanplay = () => {
      duration = ele.duration;
      ele.ontimeupdate = audioUpdate;
    };
  }, []);
  const audioUpdate = (ev: Event) => {
    let ele = audioRef.current as HTMLAudioElement;
    let move = (ele.currentTime / duration) * (barWidth as number);
    console.log(move);
    setInnerWidth(move);
  };
  const handlePlay = () => {
    let ele = audioRef.current as HTMLAudioElement;
    playState ? ele.pause() : ele.play();
    setPlayState(!playState);
  };
  const start: TouchEventHandler<HTMLDivElement> = (ev) => {
    // console.log("开始", ev);
    beginX = ev.changedTouches[0].clientX;
    beginW = innerWidth;
  };
  const move: TouchEventHandler<HTMLDivElement> = (ev) => {
    // console.log("move", ev);
    let ele = audioRef.current as HTMLAudioElement;
    let moveX = ev.changedTouches[0].clientX;
    let w = beginW + (moveX - beginX);
    let currentT = (w / barWidth) * duration;
    console.log(currentT);

    if (w < barWidth) {
      setInnerWidth(w);
      ele.currentTime = currentT;
    }
  };
  const end: TouchEventHandler<HTMLDivElement> = (ev) => {
    console.log("end", ev);
  };
  return (
    <div className="audio-play">
      {/* <button onClick={handlePlay}>播放暂停</button> */}
      <div className="drop-cont">
        <DownOutline fontSize={20} />
        <Tag color="default">耀眼的播放器</Tag>
        <span></span>
      </div>
      <div className="play-btn stop">
        <i className="iconfont bofang_bg"></i>
        <i className="iconfont zanting1_bg"></i>
        <i className="iconfont zanting_bg"></i>
      </div>
      <div className="audio-control">
        <audio
          ref={audioRef}
          src="https://file2204.h5project.cn/Fexvm9Jd4mL3u0ekcncD5BrRLz32wam4/5c89e8089afc150810.mp3"
        ></audio>
        <div className="icon-cont">
          <i className="iconfont jushoucang"></i>
          <i className="iconfont fenxiang"></i>
        </div>
        <div className="bar" ref={barRef}>
          <div className="inner" style={{ width: `${innerWidth}px` }}>
            <div
              className="dot"
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
            ></div>
          </div>
        </div>
      </div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  );
}

```

## 20.3 播放器功能预备知识

1. 对于音频的操作

[HTMLMediaElement.pause() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/pause)

+ currentTime     获取音频当前的播放时间       【可读可写】
+ duration      获取音频总时长
+ play()       触发播放  方法
+ pause()   触发暂停   方法
+ oncanplay     音频资源准备好后会触发
+ ontimeupdate      音频播放时间发生变化时，会实时触发

2. 移动端的触摸事件

+ onTouchStart     手指按下后触发
+ onTouchMove    手指按下并移动时触发
+ onTouchEnd      手指抬起后触发

3. 管理平台的图片上传组件可以直接用来上传音频

+ 可以结合图文课程的发布流程，实现音频课程的发布

## 20.4 播放器数据及播放状态存入状态机

> 考虑到后期需要使用胶囊组件控制播放状态，会产生跨组件的需求，所以将播放器数据放入状态机是比较好的选择

1. 在store/player.ts状态机模块中定义相关数据

```tsx
import { persist } from "zustand/middleware";
import { IBannerType } from "@/api/home";
import create from "zustand";
interface PlayerState {
  popShow: boolean;
  popData: IBannerType | null;
  isPlay: boolean;
  togglePopShow: (bool: boolean) => void;
  changePopData: (data: IBannerType) => void;
  togglePlay: (bool: boolean) => void;
}
export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      popShow: false, //播放弹窗显示控制
      popData: null, //播放数据包
      isPlay: false, //播放状态
      togglePopShow(bool) {
        set({ popShow: bool });
      },
      changePopData(popData) {
        set({ popData });
      },
      togglePlay(isPlay) {
        set({ isPlay });
      },
    }),
    {
      name: "music-player-store",
    }
  )
);

```

2. 调整banner表中的数据，让每个banner数据中携带音频链接

```typescript
// 轮播数据包需要满足如下格式
export interface IBannerType {
  name: string;
  img: string;
  music: string;
}
```

3. 点击首页Swiper组件的时候，设置popData

```tsx
// views/tody/index.tsx
<Swiper
    effect={"cards"}
    grabCursor={true}
    modules={[EffectCards]}
    className="mySwiper"
    >
    {banner.map((item, index) => {
        return (
            <SwiperSlide
                key={index}
                onClick={() => {
                    changePopData(item);  //1. 修改popData
                    togglePopShow(true); //2. 显示播放弹窗
                }}
                >
                <img src={item.img} alt="" />
            </SwiperSlide>
        );
    })}
</Swiper>
```

4. 在播放器组件中使用popData及isPlay 控制音频相关元素

```tsx
// components/audio/index.tsx

{/* 播放暂停按钮 */}
<div className={`play-btn ${isPlay ? "" : "stop"}`}>
    <i
        className="iconfont bofang_bg"
        onClick={() => {
            handlePlay(true);
        }}
        ></i>
    <i
        className="iconfont zanting1_bg"
        onClick={() => {
            handlePlay(false);
        }}
        ></i>
    <i className="iconfont zanting_bg"></i>
</div>

{/* 音频元素 */}
<audio ref={audioRef} src={popData.music}></audio>
```

5. 封装控制播放暂停的方法函数

```tsx
const handlePlay = (bool: boolean) => {
    let ele = audioRef.current as HTMLAudioElement;
    togglePlay(bool); //修改按钮的播放状态
    if (bool) {
        ele.play(); //音频元素播放
    } else {
        ele.pause(); //音频元素暂停
    }
};
```

## 20.5 音乐控制进度条

1. 原理分析

```
已知条件:
1. 获取音频的总时长  duration
2. 获取音频的实时播放时间  currentTime
3. 获取进度条最大长度    barWidth = ele.offsetWidth

求：
进度条的实时宽度 move ？

公式：
move / barWidth = currentTime / duration
```



2. 实现运算逻辑代码

```tsx
let duration = 0; //音频总时长
let barWidth = 0; //进度条可以走的最大距离
export default function AudioPlay({}: Props) {
    const { popShow, togglePopShow, popData, isPlay, togglePlay } =
          usePlayerStore((state) => state);
    const audioRef = useRef<HTMLAudioElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const [move, setMove] = useState<number>(0); //进度条实时移动距离
    useEffect(() => {
        let ele = audioRef.current as HTMLAudioElement;
        let bar = barRef.current as HTMLDivElement;
        barWidth = bar.offsetWidth; //获取进度条容器宽度
        console.log("进度条最大宽度", barWidth);

        // 等待音频资源准备好后再提取时长
        ele.oncanplay = () => {
            duration = ele.duration;
            console.log("音频总时长", duration);
        };
        ele.ontimeupdate = () => {
            console.log("音乐播放中", ele.currentTime);
            let w = (ele.currentTime / duration) * barWidth;
            setMove(w);
        };
    }, []);
}
```

3. 为进度条绑定响应式的宽度

```tsx
{/* 进度条 */}
<div className="bar" ref={barRef}>
    <div className="inner" style={{ width: `${move}px` }}>
        <div className="dot"></div>
    </div>
</div>
```

## 20.6 进度条控制音乐

1. 拖拽原理分析

```
已知条件：
1. 手指按下的瞬间，进度条的原宽度   beginW
2. 手指按下的瞬间，手指跟屏幕左侧的距离   beginX = onTouchStart事件的ev获取的clientX
3. 手指移动的时候，手指跟屏幕左侧的距离   moveX = onTouchMove事件的ev获取的clientX

求：
手指移动时，应该给进度条设置多少宽度？

公式：
move = beginW + (moveX-beginX)
```

2. 封装手指拖拽相关事件函数

```tsx
let duration = 0; //音频总时长
let barWidth = 0; //进度条可以走的最大距离
let beginW = 0; //按下dot时，当前innter的宽度
let beginX = 0; //按下dot时，手指与左侧屏幕边缘距离


const handleStart: TouchEventHandler<HTMLDivElement> = (ev) => {
    // console.log("手指按下", ev);
    beginW = move;
    beginX = ev.changedTouches[0].clientX;
};
const handleMove: TouchEventHandler<HTMLDivElement> = (ev) => {
    // console.log("手指移动", ev);
    let ele = audioRef.current as HTMLAudioElement;
    let moveX = ev.changedTouches[0].clientX;
    let w = beginW + (moveX - beginX); //获取到的进度条宽度
    if (w <= barWidth) {
        setMove(w); //控制进度条
        // 控制音频  currentTime / duration = w / barWidth
        let current = (w / barWidth) * duration;
        ele.currentTime = current;
    }
};
const handleEnd: TouchEventHandler<HTMLDivElement> = () => {
    console.log("手指抬起");
};
```

3. 为进度条绑定拖拽事件

```tsx
{/* 进度条 */}
<div className="bar" ref={barRef}>
    <div className="inner" style={{ width: `${move}px` }}>
        <div
            className="dot"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            ></div>
    </div>
</div>
```

## 20.7 播放时间的同步变化

1. 封装一个处理时间格式的方法函数

> 将【秒】为单位的时间数字，处理为00:00这种格式

```typescript
const timeHandler = (second: number) => {
  let m = Math.floor(second / 60); //从秒数中提取分钟
  let s = Math.round(second % 60);
  let mStr = "";
  let sStr = "";
  if (m < 10) {
    mStr = "0";
  }
  if (s < 10) {
    sStr = "0";
  }
  return `${mStr}${m}:${sStr}${s}`;
};
```

2. 在音频初始化及时间变化是响应式更新时间字符串

```tsx
const [timeNow, setTimeNow] = useState<string>("00:00");  // 1. 当前时间
const [timeMax, setTimeMax] = useState<string>("00:00"); //2. 总时长
useLayoutEffect(() => {
    let ele = audioRef.current as HTMLAudioElement;
    let bar = barRef.current as HTMLDivElement;
    if (bar) {
        barWidth = bar.offsetWidth; //获取进度条容器宽度
        // console.log("进度条最大宽度", barWidth);
    }

    // 等待音频资源准备好后再提取时长
    if (ele) {
        ele.oncanplay = () => {
            duration = ele.duration;
            // console.log("音频总时长", duration);
            setTimeMax(timeHandler(duration));  // 3. 响应式显示总时长
        };
        ele.ontimeupdate = () => {
            // console.log("音乐播放中", ele.currentTime);
            let w = (ele.currentTime / duration) * barWidth;
            setMove(w);
            setTimeNow(timeHandler(ele.currentTime)); // 4. 响应式显示当前播放时间
        };
    }
}, []);
```

3. 在视图中绑定并显示时间字符串

```tsx
{/* 进度条 */}
<div className="bar" ref={barRef}>
    ...
</div>
{/* 播放时间 */}
<div className="time-cont">
    <span>{timeNow}</span>
    <span>{timeMax}</span>
</div>
```

# 21. 胶囊组件交互

## 21.1 胶囊控制音频播放

1. 在胶囊元素中触发状态机isPlay的变化

```tsx
// comoponents/bubble/index.tsx
import React from "react";
import { FloatingBubble, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import "./index.scss";
import { usePlayerStore } from "@/store/player";
export default () => {
  const { isPlay, togglePlay, popData, toggleBubbleShow } = usePlayerStore(
    (state) => state
  );
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50vh 32px 0",
      }}
    >
      <FloatingBubble
        className="bubble"
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
      >
        <div className={`bubble-cont ${isPlay ? "play" : ""}`}>
          <i
            className="iconfont zanting1_bg"
            onClick={() => {
              togglePlay(false);
            }}
          ></i>
          <i
            className="iconfont bofang_bg"
            onClick={() => {
              togglePlay(true);
            }}
          ></i>
          <img
            className={`poster ${isPlay ? "" : "pause"}`}
            src={popData?.img}
          />
          <CloseOutline
            fontSize={18}
            onClick={() => {
              toggleBubbleShow(false);
              togglePlay(false);
            }}
          />
        </div>
      </FloatingBubble>
    </div>
  );
};

```

2. 在播放器组件中使用useEffect检测isPlay的变化

```tsx
// 检测isPlay的变化，同步修改播放状态
useEffect(() => {
    console.log("检测到了isPlay的变化");
    let ele = audioRef.current as HTMLAudioElement;
    if (!ele) return;
    if (isPlay) {
        ele.play(); //音频元素播放
    } else {
        ele.pause(); //音频元素暂停
    }
}, [isPlay]);
```

## 21.2 胶囊组件显示隐藏控制

1. 在状态机中新增bubbleShow

```typescript
import { persist } from "zustand/middleware";
import { IBannerType } from "@/api/home";
import create from "zustand";
interface PlayerState {
  ...
  bubbleShow: boolean;
  ...
  toggleBubbleShow: (bool: boolean) => void;
}
export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      ...
      bubbleShow: false, //胶囊组件显示控制
      ...
      toggleBubbleShow(bubbleShow) {
        set({ bubbleShow });
      },
    }),
    {
      name: "music-player-store",
    }
  )
);

```

2. 在播放器组件中触发胶囊显示

```tsx
{/* 播放器顶部 */}
<div className="drop-cont">
    <DownOutline
        fontSize={20}
        onClick={() => {
            togglePopShow(false);
            toggleBubbleShow(true);
        }}
        />
    <Tag color="default">耀眼的播放器</Tag>
    <span></span>
</div>
```

3. 在胶囊组件中触发隐藏，同时关闭音频

```tsx
<CloseOutline
    fontSize={18}
    onClick={() => {
        toggleBubbleShow(false);
        togglePlay(false);
    }}
/>
```

4. 在App.tsx中控制胶囊条件渲染

```tsx
...
import AudioPlay from "./components/audio";
import Bubble from "./components/bubble";
import { usePlayerStore } from "./store/player";
function App() {
  const { bubbleShow } = usePlayerStore((state) => state);
  return (
    <div className="App">
      ...
      <AudioPlay />
      {bubbleShow ? <Bubble /> : ""}
    </div>
  );
}
export default App;
```

# 22. 拓展思考

1. 目前音频播放器的进度条通过width控制，滑动性能较差

```tsx
<div className="bar" ref={barRef}>
    <div className="inner" style={{ width: `${move}px` }}>
        <div
            className="dot"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            ></div>
    </div>
</div>
```



2. 如何使用transform:translate实现进度条控制，触发GPU渲染，提高滑动性能

> 需要对进度条样式做部分调整，然后可以使用transform

```tsx
<div className="bar" ref={barRef}>
    <div className="inner" style={{ transform: `translateX:${move}px` }}>
        <div
            className="dot"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            ></div>
    </div>
</div>
```


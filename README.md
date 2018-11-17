# node-crawler
一个基于node的简单的网络爬虫/A simple web crawler written in node

### 运行项目 start
``` bash
node index or npm run start
```
主要是利用原生node的http以及https模块，创建请求，去目的网站拉取信息，再利用正则把图片地址分离出来，再把图片以二进制的形式写进Buffer缓存中，在转化成base64位，写成图片文件，存入文件夹。原生js撸起来比较难看，网上也有很多封装好的库比如request等等，想学玩点有趣的同学，可以去看看。  
#### 更多功能正在更新中。。。

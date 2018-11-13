const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const protocolType = {
    http: http,
    https: https
}
const path = require('path');
const saveImg = require('./src/saveImg');

const url = `https://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gb18030&word=%C3%C0%C5%AE&fr=ala&ala=1&alatpl=adress&pos=0&hs=2&xthttps=111111`;
const nowProtocolType = url.split(':')[0];

protocolType[nowProtocolType].get(url, async (res) => {
    res.setEncoding("utf8");
    let html =''
    res.on('data', (data) => {
        html += data;
    })
    res.on('end', async () => {
        const imgReg = /https.*?(?:jpg|png|jpeg|gif)/gi;
        const imgArr = html.match(imgReg);
        const imgSet = new Set([...imgArr]);
        const imgArray = Array.from(imgSet);
        await Promise.all(imgArray.map( async (i) => {
            await https.get(i, (res) => {
                const imgTypeReg = /(jpg|png|jpeg|gif)$/gi;
                const imgType = i.match(imgTypeReg);
                let chunks = [];
                res.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                res.on('end', async () => {
                    const imgBuffer = Buffer.concat(chunks);
                    const base64Img = imgBuffer.toString('base64');
                    await saveImg(base64Img, imgType);
                });
            }).on('error', (err) => {
                console.log(`请求图片地址出错，错误为${err}`);
            });
        }));
    })
}).on('error', (err) => {
    console.log(`请求抓取地址出错，错误为${err}`);
});

app.use('/static', express.static(path.join(__dirname, '/src/public')));

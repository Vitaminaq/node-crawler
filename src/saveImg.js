const fs = require('fs');
const uuidv5 = require('uuid/v5');

const saveImg = (data, imgType) => {
    return new Promise((resolve, reject) => {
        const name = Math.random();
        const path = `./src/public/images/${name}.${imgType}`;//从app.js级开始找--在我的项目工程里是这样的
        const base64 = data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        const dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
        console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
        fs.writeFile(path, dataBuffer, 'base64', function(err){//用fs写入文件
            if(err) {
                console.log(`图片${name}写入失败,错误为${err}`);
                return reject(err);
            }else{
                console.log(`图片${name}写入成功！`);
                return resolve('ok');
            }
        })
    });
}

module.exports = saveImg;

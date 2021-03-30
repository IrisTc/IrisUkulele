import Cos from "cos-js-sdk-v5";

const cos = new Cos({
    SecretId: "AKID2yVkjaEMJ0b25XqZ3HlynLbbOuhEcyrT",
    SecretKey: "1mHVUCLMzNUKl2SbLpBk3wZpojES9Zrj"
});

var uploadImg = async function(file, type) {
    return new Promise((res,rej)=>{
        let filename = Date.now() + ".jpg";
        cos.putObject(
            {
                Bucket: "ukulele-1301593316" /* 必须 */,
                Region: "ap-nanjing" /* 必须 */,
                Key: type + "/" + filename /* 必须 */,
                StorageClass: "STANDARD",
                Body: file // 上传文件对象
            },
            function (err, data) {
                if(err) {
                    rej(err)
                }
                let imgUrl = "https://" + data.Location;
                // callback(imgUrl);
                res(imgUrl)
            });
    })
    // let filename = Date.now() + ".jpg";
    // cos.putObject(
    //     {
    //         Bucket: "ukulele-1301593316" /* 必须 */,
    //         Region: "ap-nanjing" /* 必须 */,
    //         Key: type + "/" + filename /* 必须 */,
    //         StorageClass: "STANDARD",
    //         Body: file // 上传文件对象
    //     },
    //     function (err, data) {
    //         let imgUrl = "https://" + data.Location;
    //         callback(imgUrl);
    //     });
}

export { uploadImg }
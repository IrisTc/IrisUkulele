import Cos from "cos-js-sdk-v5";

var uploadImg = async function(file, type, callback) {
    const cos = new Cos({
        SecretId: "******************",
        SecretKey: "*******************"
    });
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
            let imgUrl = "https://" + data.Location;
            callback(imgUrl);
        });
}

export { uploadImg }
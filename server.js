const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Thiết lập storage cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';
        
        // Kiểm tra nếu thư mục chưa tồn tại thì tạo mới
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, 'uploads'); // Đường dẫn thư mục lưu trữ file
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname; // Lấy tên file gốc
        let newFileName = fileName; // Có thể thay đổi tên file nếu cần
        
        cb(null, newFileName); // Lưu file với tên mới
    }
});

// Cấu hình multer với storage đã thiết lập
const upload = multer({ storage: storage });

// Lắng nghe cổng 3000
app.listen(port, () => {
    console.log('Server đang chạy tại cổng: ' + port);
});

// Đường dẫn tải trang HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Định nghĩa route upload file
app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    let file = req.file;
    
    // Kiểm tra nếu không có file
    if (!file) {
        var error = new Error('Bạn chưa chọn file');
        error.httpStatusCode = 400;
        return next(error);
    }
   
    // Trả lại thông tin file đã tải lên


    let pathFileInServer = file.path;
    console.log(pathFileInServer);
    
    res.send(file);
});

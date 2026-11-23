# Music Web

Đây là một dự án web nghe nhạc được xây dựng bằng HTML, CSS và JavaScript (Vanilla JS), không sử dụng framework hay thư viện bên ngoài. Dự án được thực hiện nhằm mục đích học tập và làm phong phú thêm CV cá nhân.

## Tính năng chính
- Giao diện hiện đại, hỗ trợ 3 chế độ màu (Theme) khác nhau.
- Điều hướng không tải lại trang (Single Page Application) bằng Hash Routing.
- Trình phát nhạc giả lập (Simulated Player) với thanh tiến trình, play/pause.
- Chức năng tìm kiếm bài hát, playlist.
- Chức năng thả tim (Lưu trữ bằng LocalStorage).
- Trang thông tin bản quyền (Credits).
- Hỗ trợ Responsive cơ bản cho thiết bị di động.

## Cấu trúc thư mục
- `spotifyclone.html`: File giao diện chính.
- `spotifyclone.css`: Chứa toàn bộ style, biến CSS và media queries.
- `data.js`: Chứa dữ liệu mẫu (bài hát, album, playlist).
- `app.js`: Chứa logic xử lý UI, router và player.

## Hướng dẫn thêm bài hát mới
1. Tải file âm thanh (mp3) của bạn vào thư mục `media/audio/`.
2. Tải ảnh bìa vào thư mục `media/images/`.
3. Mở file `data.js`, thêm một đối tượng mới vào mảng `songsData` với cấu trúc sau:
```javascript
{
    id: 's11', // ID không trùng với các bài trước
    title: 'Tên bài hát mới',
    artist: 'Tên ca sĩ',
    cover: 'media/images/anh-bia.jpg',
    src: 'media/audio/bai-hat.mp3',
    duration: '3:45',
    license: 'Creative Commons',
    source: 'Tên nguồn tải'
}

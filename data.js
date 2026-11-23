/**
 * data.js
 * Chứa toàn bộ dữ liệu mẫu cho ứng dụng.
 * Nhạc sử dụng từ SoundHelix (Miễn phí bản quyền để test).
 * Ảnh sử dụng từ Picsum (Placeholder).
 */

// 1. Danh sách Bài hát
const songsData = [
    {
        id: 's1',
        title: 'Những Ngày Nắng Đẹp',
        artist: 'Mây Lang Thang',
        cover: 'https://picsum.photos/seed/song1/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: '6:12',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's2',
        title: 'Gió Về Miền Xuôi',
        artist: 'Mây Lang Thang',
        cover: 'https://picsum.photos/seed/song2/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: '7:05',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's3',
        title: 'Đêm Thành Phố',
        artist: 'Vũ Trụ Cấp 2',
        cover: 'https://picsum.photos/seed/song3/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: '5:45',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's4',
        title: 'Mưa Rơi Trên Phố',
        artist: 'Vũ Trụ Cấp 2',
        cover: 'https://picsum.photos/seed/song4/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: '6:30',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's5',
        title: 'Ký Ức Mùa Hạ',
        artist: 'The Chill',
        cover: 'https://picsum.photos/seed/song5/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: '8:15',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's6',
        title: 'Bình Yên Nơi Đâu',
        artist: 'The Chill',
        cover: 'https://picsum.photos/seed/song6/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        duration: '7:20',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's7',
        title: 'Chạy Trốn Thực Tại',
        artist: 'Lofi Chill',
        cover: 'https://picsum.photos/seed/song7/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        duration: '6:50',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's8',
        title: 'Hòa Mình Vào Đêm',
        artist: 'Lofi Chill',
        cover: 'https://picsum.photos/seed/song8/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        duration: '5:55',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's9',
        title: 'Tĩnh Lặng',
        artist: 'Mây Lang Thang',
        cover: 'https://picsum.photos/seed/song9/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        duration: '6:05',
        license: 'CC0',
        source: 'SoundHelix'
    },
    {
        id: 's10',
        title: 'Vệt Nắng Cuối Ngày',
        artist: 'The Chill',
        cover: 'https://picsum.photos/seed/song10/300/300',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        duration: '7:10',
        license: 'CC0',
        source: 'SoundHelix'
    }
];

// 2. Danh sách Album
const albumsData = [
    {
        id: 'al1',
        title: 'Góc Trời Bình Yên',
        artist: 'Mây Lang Thang',
        cover: 'https://picsum.photos/seed/album1/300/300',
        songIds: ['s1', 's2', 's9']
    },
    {
        id: 'al2',
        title: 'Ánh Đèn Thành Thị',
        artist: 'Vũ Trụ Cấp 2',
        cover: 'https://picsum.photos/seed/album2/300/300',
        songIds: ['s3', 's4']
    },
    {
        id: 'al3',
        title: 'Chill Cùng Tôi',
        artist: 'The Chill',
        cover: 'https://picsum.photos/seed/album3/300/300',
        songIds: ['s5', 's6', 's10']
    }
];

// 3. Danh sách Playlist
const playlistsData = [
    {
        id: 'pl1',
        title: 'Dreamy Vibes',
        description: 'Nhạc thư giãn cho những ngày mưa.',
        cover: 'https://picsum.photos/seed/pl1/300/300',
        songIds: ['s1', 's3', 's5', 's7', 's9']
    },
    {
        id: 'pl2',
        title: 'Lofi Để Học Bài',
        description: 'Tập trung cao độ với Lofi Chill.',
        cover: 'https://picsum.photos/seed/pl2/300/300',
        songIds: ['s2', 's4', 's6', 's8', 's10']
    }
];

// (Tuỳ chọn) Export ra ngoài nếu sau này bạn dùng module, 
// nhưng với JS thuần không module, các biến này sẽ tự động có phạm vi toàn cục (global)
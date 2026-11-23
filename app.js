// ==========================================
// 1. BIẾN TOÀN CỤC & TRẠNG THÁI
// ==========================================
const appContent = document.getElementById('app-content');
const tabBtns = document.querySelectorAll('.tab-btn');
const searchInput = document.getElementById('search-input');

// Các phần tử của Player
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const playerCover = document.getElementById('player-cover');
const btnPlayPause = document.getElementById('btn-play-pause');
const progressFill = document.getElementById('progress-fill');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');

// Trạng thái phát nhạc (Giả lập)
let isPlaying = false;
let playInterval = null;
let currentSeconds = 0;
let maxSeconds = 225;

// Biến quản lý dữ liệu bài hát đã thích (Lưu trong localStorage)
let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];

// ==========================================
// 2. ĐIỀU HƯỚNG (HASH ROUTER)
// ==========================================
function handleRouting() {
    // Lấy hash, VD: "#/playlist/pl1"
    let hash = window.location.hash || '#/playlists';
    let parts = hash.replace('#/', '').split('/'); // Tách thành mảng: ["playlist", "pl1"]
    let route = parts[0]; // "playlist"
    let id = parts[1];    // "pl1"

    // Cập nhật active cho Tab
    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === route) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    appContent.innerHTML = ''; // Xóa nội dung cũ

    // Điều hướng
    if (route === 'playlists') {
        renderPlaylistsGrid();
    } else if (route === 'playlist' && id) {
        renderDetailPage('playlist', id);
    } else if (route === 'album' && id) {
        renderDetailPage('album', id);
    } else if (route === 'liked') {
        renderLikedSongsPage();
    } else if (route === 'search') {
        renderSearchPage();
    } else if (route === 'podcasts' || route === 'artists' || route === 'albums') {
        appContent.innerHTML = `<h2>${route.charAt(0).toUpperCase() + route.slice(1)}</h2><p style="color:gray; margin-top:20px;">Tính năng đang được xây dựng...</p>`;
    } else if (route === 'credits') {
        renderCreditsPage();
    } else if (route === 'library') {
        renderLibraryPage();
    } else {
        window.location.hash = '#/playlists';
    }
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);

// ==========================================
// 3. RENDER CÁC TRANG
// ==========================================

// Render lưới Playlists (Trang chủ)
function renderPlaylistsGrid() {
    let html = `<h2 style="margin-bottom: 20px;">Playlists</h2><div class="grid-cards">`;
    playlistsData.forEach(playlist => {
        html += `
            <div class="card" onclick="window.location.hash = '#/playlist/${playlist.id}'">
                <div class="card-img" style="background-image: url('${playlist.cover}'); background-size: cover;"></div>
                <div class="card-title">${playlist.title}</div>
                <div class="card-desc">${playlist.description}</div>
            </div>
        `;
    });
    html += `</div>`;
    appContent.innerHTML = html;
}

// Render trang Chi tiết (Playlist hoặc Album)
function renderDetailPage(type, id) {
    let data, title, desc, cover, songIds;

    if (type === 'playlist') {
        data = playlistsData.find(p => p.id === id);
        if (!data) return;
        title = data.title; desc = data.description; cover = data.cover; songIds = data.songIds;
    } else {
        data = albumsData.find(a => a.id === id);
        if (!data) return;
        title = data.title; desc = data.artist; cover = data.cover; songIds = data.songIds;
    }

    // Tạo Header
    let html = `
        <div class="detail-header">
            <div class="detail-cover" style="background-image: url('${cover}');"></div>
            <div class="detail-info">
                <div class="detail-type">${type === 'playlist' ? 'PLAYLIST' : 'ALBUM'}</div>
                <h1 class="detail-title">${title}</h1>
                <div class="detail-meta">${desc} • ${songIds.length} bài hát</div>
            </div>
        </div>
        
        <div class="detail-actions">
            <button class="play-big-btn" onclick="playSong('${songIds[0]}')">▶</button>
            <select class="sort-select" id="sort-tracklist">
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="name-asc">Tên (A-Z)</option>
                <option value="artist-asc">Nghệ sĩ (A-Z)</option>
            </select>
        </div>

        <table class="tracklist">
            <thead>
                <tr>
                    <th width="50">#</th>
                    <th>TIÊU ĐỀ</th>
                    <th width="50"></th>
                </tr>
            </thead>
            <tbody id="tracklist-body">
    `;

    // Render danh sách bài hát
    html += renderTrackRows(songIds);
    html += `</tbody></table>`;

    appContent.innerHTML = html;

    // Gắn sự kiện cho Dropdown Sắp xếp
    document.getElementById('sort-tracklist').addEventListener('change', (e) => {
        let sortedIds = [...songIds];
        if (e.target.value === 'name-asc') {
            sortedIds.sort((a, b) => songsData.find(s=>s.id===a).title.localeCompare(songsData.find(s=>s.id===b).title));
        } else if (e.target.value === 'artist-asc') {
            sortedIds.sort((a, b) => songsData.find(s=>s.id===a).artist.localeCompare(songsData.find(s=>s.id===b).artist));
        }
        document.getElementById('tracklist-body').innerHTML = renderTrackRows(sortedIds);
    });
}

// Hàm phụ: Tạo các dòng HTML cho bài hát
function renderTrackRows(songIds) {
    let html = '';
    songIds.forEach((songId, index) => {
        const song = songsData.find(s => s.id === songId);
        if (!song) return;
        
        const isLiked = likedSongs.includes(song.id);
        
        html += `
            <tr class="track-row" onclick="playSong('${song.id}')">
                <td>${index + 1}</td>
                <td>
                    <div class="track-title-col">
                        <div class="track-mini-cover" style="background-image: url('${song.cover}'); background-size: cover;"></div>
                        <div>
                            <div class="track-name">${song.title}</div>
                            <div class="track-artist">${song.artist}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <button class="heart-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(event, '${song.id}')">
                        ${isLiked ? '❤️' : '🤍'}
                    </button>
                </td>
            </tr>
        `;
    });
    return html;
}

// Render trang Bài Hát Đã Thích (Liked Songs)
function renderLikedSongsPage() {
    if (likedSongs.length === 0) {
        appContent.innerHTML = `<h2>Bài hát đã thích</h2><p style="color:gray; margin-top:20px;">Bạn chưa thả tim bài hát nào.</p>`;
        return;
    }

    let html = `
        <div class="detail-header">
            <div class="detail-cover" style="background: linear-gradient(135deg, #450af5, #c4efd9); display: flex; align-items: center; justify-content: center; font-size: 80px;">❤️</div>
            <div class="detail-info">
                <div class="detail-type">PLAYLIST</div>
                <h1 class="detail-title">Bài hát đã thích</h1>
                <div class="detail-meta">${likedSongs.length} bài hát</div>
            </div>
        </div>
        <div class="detail-actions">
            <button class="play-big-btn" onclick="playSong('${likedSongs[0]}')">▶</button>
        </div>
        <table class="tracklist">
            <thead><tr><th width="50">#</th><th>TIÊU ĐỀ</th><th width="50"></th></tr></thead>
            <tbody>${renderTrackRows(likedSongs)}</tbody>
        </table>
    `;
    appContent.innerHTML = html;
}

// Render trang Tìm Kiếm
function renderSearchPage() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        appContent.innerHTML = `<h2>Tìm kiếm</h2><p style="color:gray; margin-top:20px;">Nhập từ khóa để tìm kiếm...</p>`;
        return;
    }

    // Lọc bài hát
    const filteredSongs = songsData.filter(s => s.title.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query));
    // Lọc playlist
    const filteredPlaylists = playlistsData.filter(p => p.title.toLowerCase().includes(query));

    let html = `<h2>Kết quả tìm kiếm cho: "${query}"</h2>`;

    if (filteredPlaylists.length > 0) {
        html += `<h3 style="margin-top: 30px; margin-bottom: 15px;">Playlists</h3><div class="grid-cards">`;
        filteredPlaylists.forEach(p => {
            html += `
                <div class="card" onclick="window.location.hash = '#/playlist/${p.id}'">
                    <div class="card-img" style="background-image: url('${p.cover}'); background-size: cover;"></div>
                    <div class="card-title">${p.title}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    if (filteredSongs.length > 0) {
        html += `<h3 style="margin-top: 30px; margin-bottom: 15px;">Bài hát</h3>
        <table class="tracklist">
            <tbody>`;
        filteredSongs.forEach((song, index) => {
            const isLiked = likedSongs.includes(song.id);
            html += `
                <tr class="track-row" onclick="playSong('${song.id}')">
                    <td>${index + 1}</td>
                    <td>
                        <div class="track-title-col">
                            <div class="track-mini-cover" style="background-image: url('${song.cover}'); background-size: cover;"></div>
                            <div>
                                <div class="track-name">${song.title}</div>
                                <div class="track-artist">${song.artist}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button class="heart-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(event, '${song.id}')">
                            ${isLiked ? '❤️' : '🤍'}
                        </button>
                    </td>
                </tr>
            `;
        });
        html += `</tbody></table>`;
    }

    if (filteredPlaylists.length === 0 && filteredSongs.length === 0) {
        html += `<p style="color:gray; margin-top:20px;">Không tìm thấy kết quả nào phù hợp.</p>`;
    }

    appContent.innerHTML = html;
}

// Lắng nghe sự kiện gõ phím vào ô tìm kiếm
searchInput.addEventListener('input', () => {
    // Chỉ chuyển sang trang search nếu đang không ở trang search để tránh spam hash
    if (!window.location.hash.includes('#/search')) {
        window.location.hash = '#/search';
    } else {
        // Nếu đang ở trang search rồi thì chỉ cần render lại nội dung
        renderSearchPage();
    }
});

// ==========================================
// 4. CHỨC NĂNG THẢ TIM (LIKE)
// ==========================================
function toggleLike(event, songId) {
    event.stopPropagation(); // Ngăn việc click vào nút Tim lại kích hoạt phát nhạc

    if (likedSongs.includes(songId)) {
        // Nếu đã thích -> Bỏ thích
        likedSongs = likedSongs.filter(id => id !== songId);
    } else {
        // Nếu chưa thích -> Thêm vào mảng
        likedSongs.push(songId);
    }

    // Lưu lại vào localStorage
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));

    // Cập nhật lại giao diện hiện tại (nếu đang ở trang Liked hoặc trang Chi tiết)
    handleRouting(); 
}

// ==========================================
// 5. LOGIC PLAYER GIẢ LẬP (Giữ nguyên)
// ==========================================
function playSong(songId) {
    const song = songsData.find(s => s.id === songId);
    if (!song) return;

    playerTitle.innerText = song.title;
    playerArtist.innerText = song.artist;
    playerCover.style.backgroundImage = `url('${song.cover}')`;
    playerCover.style.backgroundSize = 'cover';
    playerCover.style.backgroundPosition = 'center';

    currentSeconds = 0;
    timeCurrent.innerText = '0:00';
    timeTotal.innerText = song.duration; 
    progressFill.style.width = '0%';

    isPlaying = true;
    btnPlayPause.innerText = '⏸';
    
    if (playInterval) clearInterval(playInterval);

    playInterval = setInterval(() => {
        if (isPlaying) {
            currentSeconds++;
            let percent = (currentSeconds / maxSeconds) * 100;
            progressFill.style.width = percent + '%';
            timeCurrent.innerText = formatTime(currentSeconds);

            if (currentSeconds >= maxSeconds) {
                togglePlayPause(); 
                progressFill.style.width = '100%';
            }
        }
    }, 1000);
}

function togglePlayPause() {
    if (playerTitle.innerText === 'Chưa phát bài nào') {
        playSong(songsData[0].id);
        return;
    }
    isPlaying = !isPlaying;
    btnPlayPause.innerText = isPlaying ? '⏸' : '▶';
}

btnPlayPause.addEventListener('click', togglePlayPause);

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    if (s < 10) s = '0' + s;
    return `${m}:${s}`;
}
// ==========================================
// 6. HIỆU ỨNG Ô TÌM KIẾM TRƯỢT TỪ TRÁI SANG
// ==========================================
const sidebarSearchIcon = document.querySelector('.search-icon');
const searchInputElement = document.getElementById('search-input');

sidebarSearchIcon.addEventListener('click', () => {
    // Bật/tắt class 'active' mỗi khi click
    searchInputElement.classList.toggle('active');
    
    // Nếu ô tìm kiếm đang mở thì tự động focus (đặt con trỏ chuột vào) để gõ luôn
    if (searchInputElement.classList.contains('active')) {
        searchInputElement.focus();
    } else {
        // Nếu đóng ô tìm kiếm thì xoá luôn từ khoá và quay về trang chủ
        searchInputElement.value = '';
        window.location.hash = '#/playlists';
    }
})
// ==========================================
// 7. THEME & CREDITS (GIAI ĐOẠN 6)
// ==========================================

// --- Xử lý Đổi Theme ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Lấy theme đã lưu hoặc mặc định là 'default' (vàng chanh)
let currentTheme = localStorage.getItem('appTheme') || 'default';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener('click', () => {
    // Vòng lặp chuyển đổi: default -> red -> purple -> default
    if (currentTheme === 'default') {
        currentTheme = 'red';
    } else if (currentTheme === 'red') {
        currentTheme = 'purple';
    } else {
        currentTheme = 'default';
    }
    
    // Cập nhật thuộc tính HTML và lưu vào localStorage
    htmlElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('appTheme', currentTheme);
});

// --- Render trang Credits ---
// Cần thêm route 'credits' vào hàm handleRouting() ở trên
// (Bạn hãy tìm hàm handleRouting và thêm: else if (route === 'credits') { renderCreditsPage(); })

function renderCreditsPage() {
    let html = `
        <h2 style="margin-bottom: 10px;">Credits & Bản quyền</h2>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
            Dự án này được xây dựng cho mục đích học tập. Toàn bộ âm nhạc và hình ảnh sử dụng trong dự án đều tuân thủ giấy phép Creative Commons hoặc Miễn phí bản quyền.
        </p>
        <table class="credits-table">
            <thead>
                <tr>
                    <th>Bài hát</th>
                    <th>Nghệ sĩ</th>
                    <th>Giấy phép</th>
                    <th>Nguồn</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Lặp qua mảng songsData để lấy thông tin bản quyền
    songsData.forEach(song => {
        html += `
            <tr>
                <td style="font-weight: 600;">${song.title}</td>
                <td>${song.artist}</td>
                <td>${song.license}</td>
                <td><a href="https://www.soundhelix.com/" target="_blank" class="credits-link">${song.source}</a></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <p style="margin-top: 30px; color: var(--text-muted); font-size: 12px;">
            * Lưu ý: Giao diện lấy cảm hứng từ phong cách thiết kế hiện đại, không sao chép logo hay mã nguồn của bất kỳ nền tảng nào.
        </p>
    `;

    appContent.innerHTML = html;
}
// Render trang Thư viện (Library)
function renderLibraryPage() {
    let html = `<h2 style="margin-bottom: 20px;">Thư viện của bạn</h2>`;

    // 1. Phần Bài hát đã thích (Liked Songs)
    html += `<h3 style="margin-top: 30px; margin-bottom: 15px;">Đã thích</h3><div class="grid-cards">`;
    html += `
        <div class="card" onclick="window.location.hash = '#/liked'">
            <div class="card-img" style="background: linear-gradient(135deg, #450af5, #c4efd9); display: flex; align-items: center; justify-content: center; font-size: 50px;">❤️</div>
            <div class="card-title">Bài hát đã thích</div>
            <div class="card-desc">${likedSongs.length} bài hát</div>
        </div>
    `;
    html += `</div>`;

    // 2. Phần Playlists
    html += `<h3 style="margin-top: 30px; margin-bottom: 15px;">Playlists</h3><div class="grid-cards">`;
    playlistsData.forEach(playlist => {
        html += `
            <div class="card" onclick="window.location.hash = '#/playlist/${playlist.id}'">
                <div class="card-img" style="background-image: url('${playlist.cover}'); background-size: cover;"></div>
                <div class="card-title">${playlist.title}</div>
                <div class="card-desc">${playlist.description}</div>
            </div>
        `;
    });
    html += `</div>`;

    // 3. Phần Albums
    html += `<h3 style="margin-top: 30px; margin-bottom: 15px;">Albums</h3><div class="grid-cards">`;
    albumsData.forEach(album => {
        html += `
            <div class="card" onclick="window.location.hash = '#/album/${album.id}'">
                <div class="card-img" style="background-image: url('${album.cover}'); background-size: cover;"></div>
                <div class="card-title">${album.title}</div>
                <div class="card-desc">${album.artist}</div>
            </div>
        `;
    });
    html += `</div>`;

    appContent.innerHTML = html;
}
const mode = "production";
const HOST = mode==="production"?"14.241.231.87":"localhost";
const PORT = mode==="production"?"5001":"5000";

export const APIConfig = {
    'api': {
        'get_manga_info': `http://${HOST}:${PORT}/manga/get/info?mangaProviderID=`,
        'get_manga_chapters': `http://${HOST}:${PORT}/chapter/get?mangaProviderId=`,
        'get_manga_newest': `http://${HOST}:${PORT}/manga/get/latest`,
        'get_chapter_latest': `http://${HOST}:${PORT}/chapter/get_latest`,
        'get_chapter_details': `http://${HOST}:${PORT}/chapter/get_chapter_detail?chapterId=`,
        'get_next_chapter': `http://${HOST}:${PORT}/chapter/get_next?chapterId={chapterId}&mangaProviderId={mangaProviderId}`,
        'get_back_chapter': `http://${HOST}:${PORT}/chapter/get_back?chapterId={chapterId}&mangaProviderId={mangaProviderId}`,
    }
}

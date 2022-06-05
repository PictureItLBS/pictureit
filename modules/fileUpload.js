import multer from "multer"

const ALLOWED_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"]

export default multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 8 * 1024 * 1024 // 8 MB
    }
})

export function isValidImageMimetype(mimeType) {
    return ALLOWED_MIME_TYPES.includes(mimeType)
}
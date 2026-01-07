const typeMap = {
  images: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif"
  ],

  videos: [
    "video/mp4",
    "video/webm",
    "video/x-matroska",
    "video/avi"
  ],

  audios: [
    "audio/mpeg",
    "audio/wav",
    "audio/x-m4a",
    "audio/ogg"
  ],

  documents: [
    "application/pdf",

    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "text/plain"
  ]
};

module.exports = typeMap;

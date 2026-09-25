// Marks JS as available before first paint, so reveal styles only hide content that a script will show.
// Served as a file (not inline) because public/_headers sets script-src 'self'.
document.documentElement.classList.add("js");

export function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diffInMilliseconds = now - posted;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 6) {
    return posted.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  if (diffInDays > 0) return `${diffInDays} hari yang lalu`;
  if (diffInHours > 0) return `${diffInHours} jam yang lalu`;
  if (diffInMinutes > 0) return `${diffInMinutes} menit yang lalu`;
  if (diffInSeconds > 0) return `${diffInSeconds} detik yang lalu`;

  return 'baru saja';
}

export function getPostImages(post) {
  if (!post) return [];
  if (Array.isArray(post.images) && post.images.length > 0) return post.images;
  if (post.imageUrl) return [post.imageUrl];
  return [];
}

export function withPrimaryImage(post) {
  const [imageUrl = ""] = getPostImages(post);
  return { ...post, imageUrl };
}

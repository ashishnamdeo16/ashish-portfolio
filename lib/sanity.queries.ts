export const POSTS_QUERY = `*[_type=="post"]|order(publishedAt desc){
  _id,
  title,
  "metaDescription": metaDescription.value,
  "slug": slug.current,
  publishedAt,
  author->{
    name
  },
  mainImage{
    asset->{
      url
    },
    alt
  }
}`;

export const POST_BY_SLUG_QUERY = `
*[_type=="post" && slug.current == $slug][0]{
  _id, title, excerpt, publishedAt,
  author->{name},
  mainImage{asset->{url}, alt},
  body,
  tags[]->{title}
}`;

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {

  const articles = await getCollection('articles');

  const sortedArticles = articles.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Юрий Паламарчук — статьи',
    description: 'Статьи, заметки и эссе Юрия Паламарчука.',
    site: context.site,

    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: article.data.excerpt,
      link: `/articles/${article.id}/`,
    })),
  });
}

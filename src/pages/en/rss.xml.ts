import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../consts';
import { ui } from '../../i18n/ui';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('blog', ({ data }) => !data.draft && data.lang === 'en')
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: ui.en.site.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/blog/${post.id.replace(/^en\//, '')}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}

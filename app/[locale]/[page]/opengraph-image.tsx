import OpengraphImage from 'components/opengraph-image';
import { getPage } from '../../../lib/strapi';
import { useLocale } from 'next-intl';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const locale = useLocale();

  const page = await getPage(params.page, locale);
  const title = page?.seo?.metaTitle || page?.title;

  return await OpengraphImage({ title });
}

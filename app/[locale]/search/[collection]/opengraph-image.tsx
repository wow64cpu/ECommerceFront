import OpengraphImage from 'components/opengraph-image';
import { getCategory } from '../../../../lib/strapi';
import { useLocale } from 'next-intl';

export const runtime = 'edge';

export default async function Image({ params }: { params: { collection: string } }) {
  const locale = useLocale();

  const category = await getCategory(params.collection, locale);
  const title = category?.label;

  return await OpengraphImage({ title });
}

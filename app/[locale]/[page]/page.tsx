import type { Metadata } from 'next';

import Prose from 'components/prose';
import { notFound } from 'next/navigation';
import { getPage } from '../../../lib/strapi';
import { useFormatter, useTranslations } from 'next-intl';
import { Page } from '../../../lib/strapi/types';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string; locale: string };
}): Promise<Metadata> {
  // const page = await getPage(params.page);
  const page = await getPage(params.page, params.locale);

  if (!page) return notFound();

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

async function Page({ params }: { params: { page: string; locale: string } }) {
  const page = await getPage(params.page, params.locale);

  if (!page) return notFound();

  return <PageContent page={page} />;
}

function PageContent({ page }: { page: Page }) {
  const t = useTranslations('Page');
  const format = useFormatter();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {t('document_updated_at', {
          date: format.dateTime(new Date(page.updatedAt), {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        })}
      </p>
    </>
  );
}

export default Page;

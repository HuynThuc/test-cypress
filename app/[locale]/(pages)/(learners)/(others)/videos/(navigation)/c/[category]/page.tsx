import { getInitalCategoryVideos } from '@/modules/learners/services/list-video';
import { CategoryVideoList } from '@/modules/learners/components/other-page/list-video/CategoryVideoList';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

async function fetchInitialData(category: string, sortBy: string) {
  const response = await getInitalCategoryVideos({ category, sortBy });

  return {
    initialVideos: response.data?.data || [],
    initialMetadata: response.data?.metaData || null,
    initialCategoryInfo: response.data?.categoryInfo || null,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const { initialVideos, initialMetadata, initialCategoryInfo } =
    await fetchInitialData(category, 'publishedAt');

  return (
    <CategoryVideoList
      category={category}
      initialVideos={initialVideos}
      initialMetadata={initialMetadata}
      categoryInfo={initialCategoryInfo}
    />
  );
}

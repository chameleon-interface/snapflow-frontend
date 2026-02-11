// import { getTranslations } from 'next-intl/server';

import { MainPage } from '@/pages-layer/MainPage';

export const revalidate = 60;

// ===== MOCK DATA =====
const mockPosts = [
  {
    id: '1',
    author: 'Женя',
    avatarUrl: 'https://i.pravatar.cc/64?img=1',
    description: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor.',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    ],
    createdAt: '22 min ago',
  },
  {
    id: '2',
    author: 'Антон',
    avatarUrl: 'https://i.pravatar.cc/64?img=2',
    description: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor.',
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      'https://images.unsplash.com/photo-1439853949127-fa647821eba0',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1',
    ],
    createdAt: '12 min ago',
  },
  {
    id: '3',
    author: 'Дмитрий',
    avatarUrl: 'https://i.pravatar.cc/64?img=3',
    description: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor.',
    images: [
      'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    ],
    createdAt: '52 min ago',
  },
  {
    id: '4',
    author: 'Тёма',
    avatarUrl: 'https://i.pravatar.cc/64?img=4',
    description:
      'Lorem ipsum dolor sit amet, sed do eiusmod tempor.Lorem ipsum dolor sit amet, sed do eiusmod tempor.Lorem ipsum dolor sit amet, sed do eiusmod tempor.',
    images: ['https://images.unsplash.com/photo-1475924156734-496f6cac6ec1'],
    createdAt: '32 min ago',
  },
];

export default async function Home() {
  return <MainPage usersCount={129213} posts={mockPosts} />;
}

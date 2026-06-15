import { announcements, getAnnouncementById } from '@/data/mockData';
import { notFound } from 'next/navigation';
import EditAnnouncementClient from './EditAnnouncementClient';

export async function generateStaticParams() {
  return announcements.map((a) => ({ id: a.id }));
}

export default function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const ann = getAnnouncementById(params.id);
  if (!ann) notFound();
  return <EditAnnouncementClient ann={ann} />;
}

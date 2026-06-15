import { workProgressList, getWorkProgressById } from '@/data/mockData';
import { notFound } from 'next/navigation';
import EditProgressClient from './EditProgressClient';

export async function generateStaticParams() {
  return workProgressList.map((w) => ({ id: w.id }));
}

export default function EditProgressPage({ params }: { params: { id: string } }) {
  const wp = getWorkProgressById(params.id);
  if (!wp) notFound();
  return <EditProgressClient wp={wp} />;
}

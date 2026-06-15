import { regulations, getRegulationById } from '@/data/mockData';
import { notFound } from 'next/navigation';
import EditRegulationClient from './EditRegulationClient';

export async function generateStaticParams() {
  return regulations.map((r) => ({ id: r.id }));
}

export default function EditRegulationPage({ params }: { params: { id: string } }) {
  const reg = getRegulationById(params.id);
  if (!reg) notFound();
  return <EditRegulationClient reg={reg} />;
}

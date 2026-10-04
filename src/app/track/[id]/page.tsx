import React from 'react';
import TrackClientView from './TrackClientView';

export function generateStaticParams() {
  return [
    { id: 'FF-1000' },
    { id: 'FF-1010' },
    { id: 'FF-1015' },
    { id: 'FF-1020' },
    { id: 'FF-1026' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <TrackClientView initialOrderId={resolvedParams?.id} />;
}

import PrenumerationContent from '@/components/prenumeration/prenumerationContent';
import { getPrenumerationer } from '@/lib/Prenumerationer';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const prenumerationer = await getPrenumerationer();

  return (
    <>
      <PrenumerationContent prenumerationer={prenumerationer} />
      {/* <p>{typeof data}</p> */}
    </>
  );
}

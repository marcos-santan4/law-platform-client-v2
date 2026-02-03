import { notFound } from 'next/navigation';
import { Step1 } from '../pages/step1';
import { Step2 } from '../pages/step2';

type Props = {
  params: Promise<{ step?: string[] }>;
};

export default async function SignUpStepControllerPage({ params }: Props) {
  const { step } = await params;
  const slug = step?.[0];

  // /authentication/signUp  -> step1 (default)
  if (!slug || slug === 'step1') return <Step1 />;

  // /authentication/signUp/step2 -> step2
  if (slug === 'step2') return <Step2 />;

  return notFound();
}



import FormReset from '@/app/(auth)/reset-password/_components/form-reset';
import { searchParamsCache } from '@/app/(auth)/reset-password/searchParams';
import { SearchParams } from 'nuqs/server';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function ResetPassword({ searchParams }: PageProps) {
  const { token } = searchParamsCache.parse(await searchParams);
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
      <FormReset token={token} />
    </>
  );
}

export default ResetPassword;

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const name = 'Hey, Kan!';
export const siteTitle = 'hey, kan!';

export default function Layout({ children, home }) {
  return (
    <div className='px-4 max-w-xl mt-12 mb-24 mx-auto '>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className='flex flex-col items-center'>
        {home ? (
          <>
            <Image
                priority
                src="https://heykan-images-213453.s3.eu-central-1.amazonaws.com/profile.jpg"
                className={'rounded-full object-cover w-48 h-48'}
                height={200}
                width={200}
                alt="profile"
            />
            <h1 className='text-4xl mt-4 mb-8 font-bold'>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="https://heykan-images-213453.s3.eu-central-1.amazonaws.com/profile.jpg"
                className={'rounded-full object-cover w-24 h-24'}
                height={125}
                width={125}
                alt=""
              />
            </Link>
            <h2 className='text-2xl mt-4 mb-8 font-bold'>
              <Link href="/" className=''>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className='mt-8'>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}

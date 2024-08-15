import Logo from './Logo';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div>
      <header className="lg:container">
        <div className="flex justify-between items-center h-24 w-full px-4 lg:px-0">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="text-center my-40 mx-auto w-max">
          <h1 className="text-[4rem] md:text-[10rem] leading-[120px] md:leading-[200px] font-bold">
            404
          </h1>
          <h1 className="text-xl md:text-3xl leading-[0px] font-thin">
            Not Found
          </h1>
        </div>
      </main>
    </div>
  );
}

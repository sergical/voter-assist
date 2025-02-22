import type { Metadata } from 'next';
import { Header } from './components/header';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

const App = () => {
  return (
    <>
      <Header pages={['VoteAssist']} page="Home" />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <h1 className="col-span-3 mb-8 font-bold text-4xl">
            Your election dashboard
          </h1>
        </div>
      </div>
    </>
  );
};

export default App;

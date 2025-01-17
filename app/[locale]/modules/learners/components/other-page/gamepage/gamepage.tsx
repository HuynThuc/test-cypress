import GameData from '@/modules/learners/components/other-page/gamepage/data/GameData';
import CardGame from '@/modules/learners/components/other-page/gamepage/widget/CardGame';

const GamePage = () => {
  const renderCardItems = () =>
    GameData.map((game) => <CardGame key={game.id} game={game} />);
  return (
    <div className="w-full h-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 pb-5 relative place-items-center">
      {renderCardItems()}
    </div>
  );
};
export default GamePage;

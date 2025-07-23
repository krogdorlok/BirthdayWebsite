import { useParams } from "react-router-dom";
import realms from "../realms/Realmsdata";

const RealmReveal = () => {
  const { number } = useParams();
  const realm = realms.find((r) => r.number === parseInt(number));

  if (!realm) return <div className="text-white p-4">Realm not found!</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {realm.isSpecial && <Confetti />}
      <h1 className="text-4xl font-bold mb-4">
        {realm.isSpecial
          ? "🎉 Happy Birthday, Love! 🎉"
          : `Realm ${realm.number}`}
      </h1>
      <img
        src={realm.image}
        alt={`Realm ${realm.number}`}
        className="w-80 mb-4 rounded-xl"
      />
      <p className="text-xl mb-4">{realm.message}</p>
      <audio controls src={realm.audio} />
    </div>
  );
};

export default RealmReveal;

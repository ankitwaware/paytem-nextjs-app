import PersonToPerson from "../components/p2p/personToPerson";

export default function PersonToPersonPage() {
  return (
    <div className="w-full px-6 pt-4">
      <h1 className="mb-2 text-2xl font-bold text-blue-600">
        Transfer to Number
      </h1>

      <PersonToPerson />
    </div>
  );
}

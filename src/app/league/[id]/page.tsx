
import LeagueInfoDetail from "../LeagueInfoDetail";
import LeagueMenu from "../LeagueMenu";

export default function LeagueDetailPage() {
  return (
    <>
      <div className="w-3/4 mx-auto bg-gray-50 shadow-md p-4 rounded-xl border flex flex-col">
        <LeagueInfoDetail />

        {/* Menu bar */}
        <LeagueMenu />
      </div>
    </>
  )
}
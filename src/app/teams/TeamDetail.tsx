// "use client"

// import { useEffect, useState } from "react";
// import TeamCard from "./TeamCard";
// import TeamForm from "./TeamForm";
// import { Button } from "@/components/ui/button";

// interface Team {
//   id: string;
//   name: string;
//   coach: string;
// }

// export default function TeamsPage() {
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [editTeam, setEditTeam] = useState<Team | null>(null);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     fetch("http://localhost:8080/api/teams", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then(setTeams);
//   }, []);

//   const handleCreate = async (data: { name: string; coach: string }) => {
//     const res = await fetch("http://localhost:8080/api/teams", {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify(data),
//     });
//     if (res.ok) {
//       const newTeam = await res.json();
//       setTeams([...teams, newTeam]);
//     }
//   };

//   const handleUpdate = async (data: { name: string; coach: string }) => {
//     if (!editTeam) return;
//     const res = await fetch(`http://localhost:8080/api/teams/${editTeam.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify(data),
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setTeams(teams.map((t) => (t.id === updated.id ? updated : t)));
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const res = await fetch(`http://localhost:8080/api/teams/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) {
//       setTeams(teams.filter((t) => t.id !== id));
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-bold">Danh sách đội bóng</h1>
//         <Button onClick={() => { setEditTeam(null); setOpenForm(true); }}>+ Tạo đội bóng</Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {teams.map((team) => (
//           <TeamCard
//             key={team.id}
//             team={team}
//             onEdit={() => { setEditTeam(team); setOpenForm(true); }}
//             onDelete={() => handleDelete(team.id)}
//           />
//         ))}
//       </div>

//       {/* Form tạo/sửa đội bóng */}
//       <TeamForm
//         open={openForm}
//         onClose={() => setOpenForm(false)}
//         onSubmit={editTeam ? handleUpdate : handleCreate}
//         initialData={editTeam || undefined}
//       />
//     </div>
//   );
// }

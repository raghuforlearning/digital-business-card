import { PROFILE } from "../config";

export function Avatar({ p = PROFILE }) {
  return (
    <div className="avatar" data-testid="profile-avatar">
      {p.photo ? (
        <img src={p.photo} alt={p.fullName} />
      ) : (
        <span>{p.initials}</span>
      )}
    </div>
  );
}

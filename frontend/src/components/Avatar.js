import { PROFILE } from "../config";

export function Avatar() {
  return (
    <div className="avatar" data-testid="profile-avatar">
      {PROFILE.photo ? (
        <img src={PROFILE.photo} alt={PROFILE.fullName} />
      ) : (
        <span>{PROFILE.initials}</span>
      )}
    </div>
  );
}

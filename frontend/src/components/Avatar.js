export function Avatar({ p }) {
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

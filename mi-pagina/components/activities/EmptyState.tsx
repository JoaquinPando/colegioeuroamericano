export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-institucional/30 bg-hueso px-6 py-12 text-center text-texto/70">
      {message}
    </div>
  );
}

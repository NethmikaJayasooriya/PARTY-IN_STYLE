export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <div className="w-24 h-24 skeleton rounded-full" />
      <div className="w-64 h-6 skeleton" />
      <div className="w-48 h-4 skeleton" />
      <div className="flex gap-4 mt-4">
        <div className="w-32 h-10 skeleton rounded-sm" />
        <div className="w-32 h-10 skeleton rounded-sm" />
      </div>
    </div>
  );
}

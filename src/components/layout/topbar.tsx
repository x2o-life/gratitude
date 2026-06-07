'use client'

export default function Topbar() {
  const handleClick = () => {
    document
      .getElementById("waiting-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-transparent p-4">
      <p className="font-bodoni-moda text-xl font-medium">Gratitude</p>
      <button
        type="button"
        className="cursor-pointer font-bodoni-moda text-xl font-medium transition-opacity hover:opacity-70"
        onClick={handleClick}
      >
        / waiting-list
      </button>
    </div>
  );
}

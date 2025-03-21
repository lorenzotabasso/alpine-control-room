import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center p-4 sticky top-0 bg-sky-500 overflow-hidden text-white">
      <h3>Alpine Control Room</h3>
      <div className="flex justify-between items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/webcams">Webcams</Link>
      </div>
    </div>
  );
}

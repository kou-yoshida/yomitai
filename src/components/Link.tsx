import Link from "next/link";

export default function _Link({
  label,
  path,
}: {
  label: string;
  path: string;
}) {
  return (
    <div>
      <Link href={path}>{label}</Link>
    </div>
  );
}

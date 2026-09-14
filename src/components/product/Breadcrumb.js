import Link from "next/link";
import { slugifyCategory } from "@/lib/data/categories";

export default function Breadcrumb({ category, productName }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-screen-2xl px-4 pt-3 text-xs text-gray-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-primary">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href={`/category/${slugifyCategory(category)}`} className="hover:text-primary">{category}</Link>
        </li>
        {productName !== category && (
          <>
            <li aria-hidden="true">/</li>
            <li className="max-w-xs truncate text-gray-700" aria-current="page">{productName}</li>
          </>
        )}
      </ol>
    </nav>
  );
}

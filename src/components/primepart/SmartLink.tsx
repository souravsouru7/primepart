import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * A link that navigates without reloading the page whenever it can.
 * Site routes (anything starting with `/`, including `/#section`) go
 * through next/link, so they are prefetched and swap in instantly;
 * in-page anchors, `tel:`, `mailto:` and external URLs stay plain.
 */
export default function SmartLink({ href, ...rest }: ComponentProps<"a"> & { href: string }) {
  return href.startsWith("/") ? <Link href={href} {...rest} /> : <a href={href} {...rest} />;
}

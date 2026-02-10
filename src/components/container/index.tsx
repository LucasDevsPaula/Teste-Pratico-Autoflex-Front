import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-x-7xl mx-auto mb-10 w-full px-4">{children}</div>;
}

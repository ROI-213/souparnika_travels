import * as Icons from "lucide-react";

export function DynamicIcon({
  name,
  className,
  size,
}: {
  name?: string | null;
  className?: string;
  size?: number;
}) {
  const key = (name || "Circle") as keyof typeof Icons;
  const Cmp = (Icons[key] as React.ComponentType<{ className?: string; size?: number }>) || Icons.Circle;
  return <Cmp className={className} size={size} />;
}

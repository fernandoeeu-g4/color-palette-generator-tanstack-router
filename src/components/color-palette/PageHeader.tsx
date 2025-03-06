import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { colorsAtom } from "./store";
import { useAtomValue } from "jotai";

type PageHeaderProps = {
  onShare: () => void;
};

export function PageHeader({ onShare }: PageHeaderProps) {
  const colors = useAtomValue(colorsAtom);
  return (
    <div className="flex items-start gap-4 w-full">
      <h1 className="text-3xl font-bold">Gerador de Paleta de Cores HSL</h1>
      <Link to="/" className="text-sm" search={{ colors }}>
        <Button variant="outline" onClick={onShare} title="Compartilhar paleta">
          <span className="text-sm">compartilhar paleta</span>
        </Button>
      </Link>
    </div>
  );
}

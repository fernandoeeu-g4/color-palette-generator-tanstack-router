import { Button } from "../ui/button";

type PageHeaderProps = {
  onShare: () => void;
};

export function PageHeader({ onShare }: PageHeaderProps) {
  return (
    <div className="flex items-start gap-4 w-full">
      <h1 className="text-3xl font-bold">Gerador de Paleta de Cores HSL</h1>
      <Button variant="outline" onClick={onShare} title="Compartilhar paleta">
        <span className="text-sm">share 2</span>
      </Button>
    </div>
  );
}

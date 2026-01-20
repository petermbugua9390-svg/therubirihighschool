import { cn } from "@/lib/utils";

interface LayoutPreviewProps {
  layout: {
    id: string;
    name: string;
    description: string;
    icon: string;
    primaryColor: [number, number, number];
    secondaryColor: [number, number, number];
    accentColor: [number, number, number];
    headerStyle: "centered" | "left" | "boxed";
    useLines: boolean;
    useBorders: boolean;
    fontFamily: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

const rgbToHex = (r: number, g: number, b: number) => 
  `rgb(${r}, ${g}, ${b})`;

export const LayoutPreview = ({ layout, isSelected, onClick }: LayoutPreviewProps) => {
  const primaryColor = rgbToHex(...layout.primaryColor);
  const secondaryColor = rgbToHex(...layout.secondaryColor);
  const accentColor = rgbToHex(...layout.accentColor);

  return (
    <div 
      className={cn(
        "cursor-pointer transition-all duration-200 rounded-lg border-2 p-1 hover:scale-105",
        isSelected 
          ? "border-primary ring-2 ring-primary/20 shadow-lg" 
          : "border-muted hover:border-primary/50"
      )}
      onClick={onClick}
    >
      {/* Mini PDF Preview */}
      <div className="w-24 h-32 bg-white rounded shadow-sm overflow-hidden relative">
        {/* Header Section */}
        {layout.headerStyle === "boxed" ? (
          <div 
            className="h-6 flex items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="w-12 h-1 bg-white/80 rounded" />
          </div>
        ) : layout.headerStyle === "centered" ? (
          <div className="pt-2 flex flex-col items-center gap-1">
            {layout.useBorders && (
              <div 
                className="absolute top-1 left-1 right-1 h-8 border rounded-sm"
                style={{ borderColor: primaryColor }}
              />
            )}
            <div 
              className="w-14 h-1.5 rounded" 
              style={{ backgroundColor: primaryColor }}
            />
            <div 
              className="w-10 h-1 rounded" 
              style={{ backgroundColor: accentColor }}
            />
          </div>
        ) : (
          <div className="pt-2 pl-2 flex flex-col gap-1">
            <div 
              className="w-12 h-1.5 rounded" 
              style={{ backgroundColor: primaryColor }}
            />
            <div 
              className="w-8 h-1 rounded" 
              style={{ backgroundColor: accentColor }}
            />
          </div>
        )}

        {/* Separator */}
        {layout.useLines && (
          <div 
            className="mx-2 mt-2 h-px" 
            style={{ backgroundColor: primaryColor, opacity: 0.3 }}
          />
        )}

        {/* Content Section */}
        <div className="p-2 space-y-1.5">
          {/* Details block */}
          {layout.useBorders && layout.id !== "minimal" && layout.id !== "legal" && layout.id !== "formal" && (
            <div 
              className="border rounded-sm p-1 space-y-0.5"
              style={{ borderColor: accentColor, opacity: 0.5 }}
            >
              <div className="w-full h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.4 }} />
              <div className="w-3/4 h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.4 }} />
            </div>
          )}

          {/* Content lines */}
          <div className="space-y-1">
            <div 
              className="w-10 h-1 rounded" 
              style={{ backgroundColor: primaryColor }}
            />
            <div className="space-y-0.5">
              <div className="w-full h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
              <div className="w-5/6 h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
              <div className="w-4/6 h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
            </div>
          </div>

          {/* Agenda item block */}
          {layout.useBorders ? (
            <div className="border border-muted/50 rounded-sm p-1 space-y-0.5">
              <div 
                className="w-8 h-0.5 rounded" 
                style={{ backgroundColor: primaryColor }}
              />
              <div className="w-full h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
              <div className="w-3/4 h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
            </div>
          ) : (
            <div className="space-y-0.5">
              <div 
                className="w-8 h-0.5 rounded" 
                style={{ backgroundColor: primaryColor }}
              />
              <div className="w-full h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
              <div className="w-3/4 h-0.5 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
            </div>
          )}
        </div>

        {/* Footer lines */}
        {layout.useLines && (
          <div className="absolute bottom-2 left-2 right-2">
            <div 
              className="h-px mb-1" 
              style={{ backgroundColor: primaryColor, opacity: 0.3 }}
            />
            <div className="flex justify-between px-1">
              <div className="w-4 h-px" style={{ backgroundColor: secondaryColor }} />
              <div className="w-4 h-px" style={{ backgroundColor: secondaryColor }} />
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="mt-1.5 text-center">
        <p className="text-[10px] font-medium text-foreground leading-tight truncate">
          {layout.name}
        </p>
      </div>
    </div>
  );
};

export default LayoutPreview;

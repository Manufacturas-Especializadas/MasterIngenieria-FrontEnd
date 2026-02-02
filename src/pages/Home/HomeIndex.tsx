import { useState } from "react";
import MasterFilters from "../../components/Ui/Features/Master/MasterFilters";
import MasterTable from "../../components/Ui/Features/Master/MasterTable";
import PartDetailPanel from "../../components/Ui/Features/Master/PartDetailPanel";

export const HomeIndex = () => {
  const [selectedPart, setSelectedPart] = useState<any | null>(null);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8 space-y-6 max-w-400 mx-auto">
        <header>
          <h1 className="text-2xl font-black text-slate-800">
            Engineering Master Dashboard
          </h1>
          <p className="text-slate-500">
            Visualización de datos técnicos de planta
          </p>
        </header>

        <MasterFilters />

        <MasterTable onSelectPart={setSelectedPart} />
      </div>

      <PartDetailPanel
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
      />
    </div>
  );
};

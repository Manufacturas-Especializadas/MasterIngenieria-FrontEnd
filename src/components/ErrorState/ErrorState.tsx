import { AlertCircle } from "lucide-react";

export const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="p-4 bg-red-50 rounded-full mb-4">
        <AlertCircle className="text-red-600" size={48} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        Error de conexión
      </h2>
      <p className="text-slate-500 mb-6 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all shadow-md"
      >
        Reintentar cargar datos
      </button>
    </div>
  );
};

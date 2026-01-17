
import React, { useState, useMemo } from 'react';
import Autocomplete from './components/Autocomplete';
import ReportView from './components/ReportView';
import { generateVehicleReport } from './services/geminiService';
import { POPULAR_BRANDS, BRAND_MODELS, YEARS } from './constants';
import { VehicleData, VehicleReport } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<VehicleData>({
    brand: '',
    model: '',
    year: '',
    chassisNumber: '',
    engineNumber: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<VehicleReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDebugger, setShowDebugger] = useState(false);

  const handleGenerate = async () => {
    if (!data.brand || !data.model || !data.year) {
      setError("Required fields: Brand, Model, and Manufacturing Year.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateVehicleReport(data);
      setReport(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const availableModels = useMemo(() => BRAND_MODELS[data.brand] || [], [data.brand]);

  return (
    <div className="min-h-screen flex flex-col bg-sliGray">
      {/* Brand Header */}
      <header className="bg-white border-b-4 border-sliYellow shadow-md sticky top-0 z-50 no-print">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sliBlue rounded-lg flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-black text-sliBlue leading-none tracking-tight">SLI VALUER</h1>
              <span className="text-[9px] font-bold text-sliBlue/60 uppercase tracking-[0.2em]">General Insurance Ltd</span>
            </div>
          </div>
          <button 
            onClick={() => setShowDebugger(!showDebugger)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
              showDebugger ? 'bg-sliBlue text-white border-sliBlue shadow-inner' : 'text-sliBlue border-sliBlue/10 hover:border-sliBlue/40'
            }`}
          >
            <i className={`fas ${showDebugger ? 'fa-terminal' : 'fa-bug'} mr-2`}></i> 
            {showDebugger ? 'Hide Debug' : 'Identify / Debug'}
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
        {showDebugger && (
          <div className="mb-8 p-5 bg-slate-900 rounded-2xl border-l-4 border-sliYellow shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h3 className="text-sliYellow text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                System Diagnostics
              </h3>
              <span className="text-white/30 text-[9px] font-mono uppercase">Internal Use Only</span>
            </div>
            <pre className="text-emerald-400 font-mono text-[10px] overflow-x-auto p-3 bg-black/40 rounded-xl leading-relaxed">
              {JSON.stringify({
                session_status: isLoading ? 'BUSY' : 'READY',
                input_valid: !!(data.brand && data.model && data.year),
                payload_snapshot: data,
                environment: window.location.hostname,
                api_config: process.env.API_KEY ? 'CONFIGURED' : 'MISSING_KEY'
              }, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-sliBlue/5 border border-white relative overflow-hidden">
          {/* Subtle branding watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
            <i className="fas fa-shield-alt text-[200px] text-sliBlue"></i>
          </div>

          <div className="mb-12 text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-sliBlue/5 text-sliBlue text-[10px] font-black uppercase tracking-widest mb-4">
              Market Intelligence v2.1
            </div>
            <h2 className="text-3xl font-black text-sliBlue mb-2 tracking-tight">Professional Valuation</h2>
            <p className="text-slate-400 text-sm font-medium">Precision asset assessment for general insurance underwriting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
            <Autocomplete 
              label="Make" value={data.brand} 
              onChange={(v) => setData(p => ({...p, brand: v, model: ''}))}
              options={POPULAR_BRANDS} placeholder="Select Brand" icon="fa-tag"
            />
            <Autocomplete 
              label="Model" value={data.model} 
              onChange={(v) => setData(p => ({...p, model: v}))}
              options={availableModels} placeholder="Select Model" icon="fa-car"
            />
            <Autocomplete 
              label="Manufacturing Year" value={data.year} 
              onChange={(v) => setData(p => ({...p, year: v}))}
              options={YEARS} placeholder="Select Year" icon="fa-calendar-alt"
            />
          </div>

          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-100 flex-grow"></div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Identity Markings</span>
            <div className="h-px bg-slate-100 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-sliBlue/50 uppercase ml-1 tracking-widest">Chassis Number</label>
              <div className="relative">
                <i className="fas fa-fingerprint absolute left-4 top-1/2 -translate-y-1/2 text-sliBlue/20"></i>
                <input 
                  type="text" value={data.chassisNumber}
                  onChange={(e) => setData(p => ({...p, chassisNumber: e.target.value}))}
                  className="w-full bg-sliGray/50 border-2 border-transparent rounded-2xl pl-11 pr-4 py-4 font-bold text-sliBlue placeholder-slate-300 focus:bg-white focus:border-sliBlue/20 focus:ring-4 focus:ring-sliBlue/5 transition-all outline-none"
                  placeholder="Ex: NHP10-..."
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-sliBlue/50 uppercase ml-1 tracking-widest">Engine Number</label>
              <div className="relative">
                <i className="fas fa-microchip absolute left-4 top-1/2 -translate-y-1/2 text-sliBlue/20"></i>
                <input 
                  type="text" value={data.engineNumber}
                  onChange={(e) => setData(p => ({...p, engineNumber: e.target.value}))}
                  className="w-full bg-sliGray/50 border-2 border-transparent rounded-2xl pl-11 pr-4 py-4 font-bold text-sliBlue placeholder-slate-300 focus:bg-white focus:border-sliBlue/20 focus:ring-4 focus:ring-sliBlue/5 transition-all outline-none"
                  placeholder="Ex: 1NZ-..."
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl animate-shake">
              <div className="flex items-center gap-3">
                <i className="fas fa-exclamation-triangle text-red-500"></i>
                <span className="text-xs font-black text-red-700 uppercase tracking-tight">{error}</span>
              </div>
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl relative overflow-hidden group ${
              isLoading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-sliBlue text-white hover:bg-sliDeepBlue hover:shadow-sliBlue/30 hover:-translate-y-1 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <i className="fas fa-circle-notch fa-spin"></i>
                Consulting Market Database...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                Generate Secure Valuation
                <i className="fas fa-arrow-right text-sliYellow group-hover:translate-x-1 transition-transform"></i>
              </span>
            )}
          </button>
        </div>
      </main>

      {report && <ReportView report={report} onClose={() => setReport(null)} />}
      
      <footer className="bg-white border-t border-slate-200 py-10 text-center no-print">
        <div className="flex justify-center items-center gap-6 mb-4 opacity-20 grayscale">
          <i className="fas fa-landmark text-2xl"></i>
          <i className="fas fa-shield-check text-2xl"></i>
          <i className="fas fa-file-signature text-2xl"></i>
        </div>
        <p className="text-[10px] font-black text-sliBlue uppercase tracking-[0.4em] mb-2">Sri Lanka Insurance General LTD</p>
        <p className="text-[9px] text-slate-400 font-bold">Authorized Assessment Portal &bull; © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;

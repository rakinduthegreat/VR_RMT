
import React from 'react';
import { VehicleReport } from '../types';

interface ReportViewProps {
  report: VehicleReport;
  onClose: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, onClose }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-sliBlue/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border-4 border-white">
        {/* Header */}
        <div className="bg-sliBlue p-6 flex justify-between items-center text-white shrink-0 border-b-4 border-sliYellow">
          <div className="flex items-center gap-4">
            <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shadow-inner">
               <i className="fas fa-file-invoice-dollar text-sliBlue"></i>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Valuation Report</h2>
              <p className="text-[10px] font-bold text-sliYellow uppercase tracking-widest">Professional General Insurance Estimate</p>
            </div>
          </div>
          <div className="flex gap-3 no-print">
            <button 
              onClick={handlePrint}
              className="bg-sliYellow text-sliBlue font-black py-2 px-5 rounded-lg hover:bg-white transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-lg"
            >
              <i className="fas fa-print"></i> Print
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto flex-grow bg-white" id="printable-report">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vehicle Basics */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-sliYellow rounded-full"></div>
                <h3 className="text-sm font-black text-sliBlue uppercase tracking-widest">Vehicle Information</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Make & Model</span>
                  <span className="font-black text-sliBlue uppercase">{report.brand} {report.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Year</span>
                  <span className="font-black text-sliBlue">{report.year}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Fuel Modality</span>
                  <span className="bg-sliBlue text-sliYellow px-3 py-1 rounded text-[10px] font-black">{report.fuelType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Engine</span>
                  <span className="font-black text-sliBlue uppercase">{report.engineCapacity}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 py-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Seating</span>
                  <span className="font-black text-sliBlue">{report.seatingCapacity} Passengers</span>
                </div>
              </div>
            </div>

            {/* Market Values as Ranges */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-sliBlue rounded-full"></div>
                <h3 className="text-sm font-black text-sliBlue uppercase tracking-widest">Market Value Matrix</h3>
              </div>
              <div className="space-y-4">
                {report.marketRanges.map((range, idx) => (
                  <div key={idx} className="bg-sliGray/50 p-4 rounded-xl border border-slate-100 group hover:border-sliBlue/30 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-white bg-sliBlue px-3 py-1 rounded-full uppercase tracking-widest">{range.condition}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Market Value</span>
                        <div className="text-xs font-black text-sliBlue">
                          {formatCurrency(range.minValue)} - {formatCurrency(range.maxValue)}
                        </div>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Sum Insured (85%)</span>
                        <div className="text-xs font-black text-emerald-600">
                          {formatCurrency(range.minSumInsured)} - {formatCurrency(range.maxSumInsured)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fittings Section */}
          <div className="mt-12 bg-sliBlue/5 p-8 rounded-2xl border border-sliBlue/10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-6 bg-sliYellow rounded-full"></div>
              <h3 className="text-sm font-black text-sliBlue uppercase tracking-widest">Standard Fittings Checklist</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
              {report.fittings.map((fitting, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${fitting.available ? "bg-sliBlue text-sliYellow shadow-md" : "bg-slate-200 text-slate-400"}`}>
                    <i className={`fas ${fitting.available ? 'fa-check text-[8px]' : 'fa-times text-[8px]'}`}></i>
                  </div>
                  <span className={`text-[11px] font-bold ${fitting.available ? "text-sliBlue" : "text-slate-400"}`}>{fitting.name}</span>
                </div>
              ))}
            </div>
            
            {report.otherFittings && report.otherFittings.length > 0 && (
              <div className="mt-8 pt-6 border-t border-sliBlue/10">
                <h4 className="text-[10px] font-black text-sliBlue uppercase tracking-widest mb-3">Additional Observations:</h4>
                <div className="flex flex-wrap gap-2">
                  {report.otherFittings.map((f, i) => (
                    <span key={i} className="bg-white px-4 py-1.5 rounded-lg text-[10px] font-black border border-sliBlue/5 shadow-sm text-sliBlue uppercase">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-12 p-6 bg-slate-50 rounded-xl">
            <p className="text-[9px] text-slate-400 leading-relaxed italic text-center uppercase tracking-tight font-medium">
              <i className="fas fa-info-circle mr-1 text-sliBlue"></i>
              {report.disclaimer || "This is a computer-generated estimation for informational purposes only. Values are based on current market availability and subject to physical inspection by authorized SLI general insurance assessors."}
            </p>
          </div>
        </div>

        {/* Action Bar Footer */}
        <div className="bg-sliGray p-4 flex justify-center border-t border-slate-100 no-print">
          <p className="text-[9px] font-black text-sliBlue/30 uppercase tracking-[0.5em]">Internal Assessment Document</p>
        </div>
      </div>
    </div>
  );
};

export default ReportView;

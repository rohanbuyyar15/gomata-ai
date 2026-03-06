import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Droplets, 
  IndianRupee, 
  ShieldCheck, 
  BarChart3, 
  Info,
  Download,
  RefreshCw
} from 'lucide-react';
import { BreedInfo } from '@/src/data/breeds';
import { cn } from '@/src/lib/utils';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ResultCardProps {
  breedInfo: BreedInfo;
  confidence: number;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ breedInfo, confidence, onReset }) => {
  const downloadPDF = async () => {
    const element = document.getElementById('result-dashboard');
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${breedInfo.breed.replace(/\s+/g, '_')}_Report.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div id="result-dashboard" className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 overflow-hidden border border-emerald-50">
        {/* Header Section */}
        <div className="bg-emerald-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-500/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-400/30">
                  AI Prediction
                </span>
                <span className="text-emerald-100 text-sm font-medium">
                  {Math.round(confidence * 100)}% Confidence
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{breedInfo.breed}</h2>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={downloadPDF}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/20"
              >
                <Download size={18} />
                Download Report
              </button>
              <button 
                onClick={onReset}
                className="p-2.5 bg-emerald-700/50 text-white rounded-2xl hover:bg-emerald-700 transition-colors border border-emerald-500/30"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <StatCard 
              icon={<Droplets className="text-blue-500" />} 
              label="Avg. Milk Yield" 
              value={breedInfo.milk_yield} 
              color="blue"
            />
            <StatCard 
              icon={<IndianRupee className="text-emerald-500" />} 
              label="Market Value" 
              value={breedInfo.market_value} 
              color="emerald"
            />
            <StatCard 
              icon={<TrendingUp className="text-orange-500" />} 
              label="Daily Income" 
              value={breedInfo.daily_income} 
              color="orange"
            />
            <StatCard 
              icon={<BarChart3 className="text-purple-500" />} 
              label="Market Demand" 
              value={breedInfo.market_demand} 
              color="purple"
            />
            <StatCard 
              icon={<ShieldCheck className="text-rose-500" />} 
              label="Health Status" 
              value="Excellent" 
              color="rose"
            />
            <StatCard 
              icon={<Info className="text-stone-500" />} 
              label="Origin" 
              value="India" 
              color="stone"
            />
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                About this Breed
              </h3>
              <p className="text-stone-600 leading-relaxed text-lg italic font-serif">
                "{breedInfo.description}"
              </p>
            </section>

            <section className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Maintenance & Care Tips
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {breedInfo.maintenance_tips}
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("p-2 rounded-xl bg-opacity-10", `bg-${color}-500`)}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold text-stone-800">{value}</div>
    </div>
  );
};

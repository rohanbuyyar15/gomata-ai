import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  History, 
  LayoutDashboard, 
  ShieldCheck, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ResultCard } from './components/ResultCard';
import { CATTLE_BREEDS, BreedInfo } from './data/breeds';

interface PredictionResult {
  breed: string;
  confidence: number;
  is_cattle_or_buffalo: boolean;
}

export default function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<(PredictionResult & { date: string })[]>([]);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image. Please try again.');
      }

      const data: PredictionResult = await response.json();
      
      if (!data.is_cattle_or_buffalo) {
        setError("The uploaded image doesn't appear to be a cow or buffalo. Please try a different photo.");
        setIsUploading(false);
        return;
      }

      setResult(data);
      setHistory(prev => [{ ...data, date: new Date().toLocaleString() }, ...prev.slice(0, 4)]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsUploading(false);
    }
  };

  const breedInfo = result ? CATTLE_BREEDS[result.breed] || {
    breed: result.breed,
    milk_yield: "Data not available",
    market_value: "Contact local market",
    daily_income: "N/A",
    maintenance_tips: "Standard cattle care required.",
    market_demand: "Variable",
    description: "A breed identified by our AI system."
  } : null;

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
              <Sprout size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-800 hidden sm:block">
              Cattle<span className="text-emerald-600">AI</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">Dashboard</button>
            <button className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">Marketplace</button>
            <button className="px-5 py-2.5 bg-stone-900 text-white rounded-2xl text-sm font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100"
                  >
                    <ShieldCheck size={16} />
                    Verified Breed Recognition
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 leading-[1.1]">
                    Identify Your Cattle with <span className="text-emerald-600">Precision.</span>
                  </h1>
                  <p className="text-xl text-stone-500 leading-relaxed">
                    Upload a photo of your cow or buffalo to get instant breed identification, 
                    milk yield estimates, and market valuation.
                  </p>
                </div>

                {/* Upload Section */}
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] -z-10 rounded-full" />
                  <ImageUpload onUpload={handleUpload} isUploading={isUploading} />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl mx-auto p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700"
                  >
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                  <FeatureCard 
                    icon={<LayoutDashboard className="text-emerald-600" />}
                    title="Deep Insights"
                    description="Get detailed data on milk production, market demand, and maintenance costs."
                  />
                  <FeatureCard 
                    icon={<History className="text-emerald-600" />}
                    title="History Tracking"
                    description="Keep a record of all your identified breeds and their historical valuations."
                  />
                  <FeatureCard 
                    icon={<Sprout className="text-emerald-600" />}
                    title="Smart Farming"
                    description="AI-driven suggestions for fodder and health management based on breed."
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                  <button 
                    onClick={() => setResult(null)}
                    className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 font-semibold transition-colors"
                  >
                    <ChevronRight className="rotate-180" size={20} />
                    Back to Upload
                  </button>
                  <div className="text-sm font-medium text-stone-400">
                    Analysis completed in 1.4s
                  </div>
                </div>
                
                <ResultCard 
                  breedInfo={breedInfo!} 
                  confidence={result.confidence} 
                  onReset={() => setResult(null)} 
                />

                {/* History Mini-List */}
                {history.length > 1 && (
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-lg font-bold text-stone-800 mb-4">Recent Predictions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {history.slice(1).map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-stone-800">{item.breed}</div>
                            <div className="text-xs text-stone-400">{item.date}</div>
                          </div>
                          <div className="text-emerald-600 font-bold">{Math.round(item.confidence * 100)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center text-stone-500">
              <Sprout size={18} />
            </div>
            <span className="font-bold text-stone-400">CattleAI © 2026</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-stone-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-stone-800 mb-3">{title}</h3>
      <p className="text-stone-500 leading-relaxed">{description}</p>
    </div>
  );
}

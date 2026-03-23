import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Share2, RotateCcw, TrendingUp, Eye, Target } from 'lucide-react';
// import Confetti from 'react-confetti'; // Chỉ cần uncomment nếu bạn dùng thư viện này

// Component đếm số animation chạy mượt mà
const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Hàm Easing (easeOutCuirc) giúp animation tuột mượt ở đoạn cuối
      const easeOut = percentage === 1 ? 1 : Math.sqrt(1 - Math.pow(percentage - 1, 2));
      
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const ResultScreen = ({ 
  views = 16000, 
  correct = 16, 
  total = 16, 
  title = "Bậc thầy Social Selling", 
  onRestart = () => console.log('Restart clicked'), 
  onShare = () => console.log('Share clicked') 
}) => {
  const isPerfect = correct === total;
  const isGood = correct >= 11;
  const isTopPercent = isPerfect ? "1%" : isGood ? "5%" : null;
  
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Subtle Grid (Dot effect) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Decorative Neon Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      {/* Main Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg bg-gray-900/60 backdrop-blur-2xl border border-gray-700/50 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-cyan-900/10"
      >
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 px-5 py-2 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <Trophy className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs">
              Nhiệm Vụ Hoàn Thành
            </span>
          </motion.div>
        </div>

        {/* Title Award */}
        <div className="text-center mb-10">
          <p className="text-gray-400 font-medium mb-3 uppercase tracking-wider text-sm">Danh hiệu Creator</p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] pb-2 ${
              isPerfect ? 'from-amber-300 via-yellow-400 to-orange-500' : 'from-cyan-400 via-blue-500 to-purple-500'
            }`}
          >
            {title}
          </motion.h1>
          
          {/* Insights (Hiển thị nếu người chơi đạt kết quả top) */}
          {isTopPercent && (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="text-pink-400 font-semibold mt-4 flex items-center justify-center gap-2 bg-pink-500/10 inline-flex px-4 py-1.5 rounded-lg border border-pink-500/20"
            >
              <TrendingUp className="w-4 h-4" /> Tuyệt vời! Bạn thuộc Top {isTopPercent} cự phách!
            </motion.p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {/* Card 1: Views */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/40 rounded-3xl p-6 border border-gray-700/50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Eye className="w-6 h-6 text-cyan-500 mb-3" />
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-1">Tổng Views</p>
            <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <CountUp end={views} />
            </h2>
          </motion.div>

          {/* Card 2: Accuracy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-800/40 rounded-3xl p-6 border border-gray-700/50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-pink-500/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Target className="w-6 h-6 text-pink-500 mb-3" />
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-1">Trúng Đích</p>
            <h2 className="text-4xl font-black text-white tracking-tight flex items-baseline">
              <CountUp end={correct} />
              <span className="text-gray-500 text-2xl font-bold ml-1">/{total}</span>
            </h2>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(244,63,94,0.3)] border border-pink-400/50 transition-all hover:shadow-[0_4px_25px_rgba(244,63,94,0.5)]"
          >
            <RotateCcw className="w-5 h-5" /> CHƠI LẠI TỪ ĐẦU
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(31, 41, 55, 1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onShare}
            className="w-full bg-gray-800/80 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 border border-gray-700 transition-all hover:text-cyan-400"
          >
            <Share2 className="w-5 h-5" /> KHOE THÀNH TÍCH
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultScreen;

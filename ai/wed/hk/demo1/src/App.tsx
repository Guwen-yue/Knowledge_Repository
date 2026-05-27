import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Cake, 
  Download, 
  Share2, 
  Maximize2, 
  PartyPopper, 
  Gift, 
  UserCircle,
  Palette,
  Stars,
  Heart,
  Wand2,
  ChevronRight,
  Plus
} from "lucide-react";

type CardStyle = "Vibrant" | "Minimalist";

interface CardData {
  name: string;
  age: string;
  hobbies: string;
  style: CardStyle;
  greeting: string;
}

export default function App() {
  const [data, setData] = useState<CardData>({
    name: "李华",
    age: "25",
    hobbies: "生活、艺术、旅行",
    style: "Vibrant",
    greeting: "愿你的这一年，像你热爱的工作一样，充满惊喜与色彩。祝愿所有的美好都能如期而至。"
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-greeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          hobbies: data.hobbies,
          style: data.style
        }),
      });
      const result = await response.json();
      if (result.greeting) {
        setData(prev => ({ ...prev, greeting: result.greeting }));
      }
    } catch (error) {
      console.error("Error generating greeting:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-dark-bg text-text-primary">
      {/* Top Navbar */}
      <nav className="bg-dark-surface border-b border-white/5 px-10 py-5 flex justify-between items-center z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-accent-gold rounded-sm flex items-center justify-center rotate-45">
              <div className="-rotate-45 font-serif text-dark-bg font-bold text-lg">B</div>
            </div>
            <span className="text-xl font-serif tracking-[0.2em] text-white uppercase">Aethera</span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold">
            <NavItem label="灵感库" />
            <NavItem label="我的设计" active />
            <NavItem label="模板" />
            <NavItem label="贴纸" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-4 opacity-60">
            <IconButton icon={<PartyPopper size={18} />} />
            <IconButton icon={<Gift size={18} />} />
            <IconButton icon={<UserCircle size={18} />} />
          </div>
          <button className="bg-accent-gold text-dark-bg px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)]">
            开始制作
          </button>
        </div>
      </nav>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[360px] bg-dark-surface border-r border-white/5 p-10 flex flex-col gap-10 overflow-y-auto z-40">
          <div>
            <h1 className="text-2xl font-serif italic text-accent-gold mb-3">制作中心</h1>
            <p className="text-xs text-text-dim uppercase tracking-[0.1em] font-medium font-body">填写基础信息，生成专属惊喜</p>
          </div>

          <div className="flex flex-col gap-8">
            <InputField 
              label="姓名" 
              placeholder="输入寿星姓名" 
              value={data.name} 
              onChange={(v: string) => setData(p => ({ ...p, name: v }))} 
            />
            <InputField 
              label="年龄" 
              placeholder="输入年龄" 
              type="number" 
              suffix="岁" 
              value={data.age} 
              onChange={(v: string) => setData(p => ({ ...p, age: v }))} 
            />
            <div className="flex flex-col gap-3 group">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-text-dim group-focus-within:text-accent-gold transition-colors">兴趣爱好</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:border-accent-gold transition-all outline-none resize-none min-h-[120px] text-sm"
                placeholder="例如：篮球、摄影、旅行..."
                value={data.hobbies}
                onChange={(e) => setData(p => ({ ...p, hobbies: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-text-dim">卡片风格</label>
              <div className="flex gap-4">
                <StyleButton 
                  active={data.style === "Vibrant"} 
                  onClick={() => setData(p => ({ ...p, style: "Vibrant" }))}
                  icon={<Sparkles size={16} />}
                  label="缤纷庆典"
                />
                <StyleButton 
                  active={data.style === "Minimalist"} 
                  onClick={() => setData(p => ({ ...p, style: "Minimalist" }))}
                  icon={<Palette size={16} />}
                  label="极简风"
                />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-white/5">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-white text-dark-bg py-4 font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-accent-gold transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-dark-bg border-t-transparent" />
              ) : (
                <Wand2 size={16} />
              )}
              {isGenerating ? "Processing..." : "Generate Magic"}
            </button>
          </div>
        </aside>

        {/* Workspace */}
        <section className="flex-1 bg-dark-bg relative flex items-center justify-center p-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#C5A059]/5 pointer-events-none" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent-gold/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full" />
          
          <CardDisplay data={data} isGenerating={isGenerating} />

          <div className="absolute bottom-10 flex gap-6">
            <ControlBtn icon={<Download size={20} />} />
            <ControlBtn icon={<Share2 size={20} />} />
            <ControlBtn icon={<Maximize2 size={20} />} />
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <a href="#" className={`transition-all hover:text-white ${active ? "text-accent-gold" : "text-text-dim"}`}>
      {label}
    </a>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 transition-all hover:text-white">
      {icon}
    </button>
  );
}

function InputField({ label, placeholder, type = "text", suffix, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-3 group">
      <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-text-dim group-focus-within:text-accent-gold transition-colors">{label}</label>
      <div className="relative">
        <input 
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:border-accent-gold transition-all outline-none font-medium text-sm"
        />
        {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim text-[10px] uppercase font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

function StyleButton({ active, label, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 py-3 px-4 border transition-all flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest ${
        active 
          ? "border-accent-gold bg-accent-gold/5 text-accent-gold shadow-[0_0_20px_rgba(197,160,89,0.1)]" 
          : "border-white/10 text-text-dim hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ControlBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="bg-white/5 backdrop-blur-md p-5 rounded-full border border-white/10 text-white/40 hover:text-accent-gold hover:border-accent-gold hover:scale-110 active:scale-95 transition-all">
      {icon}
    </button>
  );
}

function CardDisplay({ data, isGenerating }: { data: CardData, isGenerating: boolean }) {
  return (
    <div className="card-perspective w-full max-w-xl h-[680px]">
      <motion.div 
        initial={{ rotateY: -5, rotateX: 2 }}
        whileHover={{ rotateY: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
        className="glass-panel w-full h-full rounded-none relative overflow-hidden flex flex-col items-center p-16 text-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10"
      >
        {/* Background Image / Decoration */}
        <div className="absolute inset-0 z-0 opacity-[0.08] grayscale pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=1200" 
            className="w-full h-full object-cover"
            alt="Artistic Background"
          />
        </div>

        {/* Card Border Accents */}
        <div className="absolute inset-8 border border-white/5 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-20 h-[1px] bg-accent-gold/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full w-full">
          <motion.div 
            animate={isGenerating ? { opacity: [0.4, 1, 0.4] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-16 h-16 border border-accent-gold/30 rounded-none flex items-center justify-center rotate-45 mb-14 mt-6"
          >
            <div className="-rotate-45">
              <Cake size={24} className="text-accent-gold" />
            </div>
          </motion.div>

          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold block mb-4">Celebration of Life</span>
            <h2 className="text-5xl font-serif italic text-white leading-tight">
              <span className="block opacity-60">祝{data.name}</span>
              <span className="block mt-2">生日快乐</span>
            </h2>
            <div className="h-[1px] w-12 bg-accent-gold/50 mx-auto mt-8" />
          </div>

          <div className="mt-14 flex-1 flex flex-col justify-center max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={data.greeting}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <p className="text-2xl text-white font-serif italic leading-relaxed opacity-90">
                  "愿你的这一年，像你热爱的<span className="text-accent-gold italic underline decoration-accent-gold/30 underline-offset-8 px-1">{data.hobbies.split('、')[0] || "艺术"}</span>一样，充满质感与深意。"
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-dim font-bold">
                  Anno <span className="text-accent-gold">Aetatis</span> {data.age}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex gap-8">
            <Badge icon={<Heart size={12} />} text="愿望成真" />
            <Badge icon={<Stars size={12} />} text="恒久闪耀" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Badge({ icon, text }: any) {
  return (
    <div className="text-[10px] uppercase tracking-[0.15em] text-text-dim font-bold flex items-center gap-3">
      <span className="text-accent-gold">{icon}</span>
      {text}
    </div>
  );
}

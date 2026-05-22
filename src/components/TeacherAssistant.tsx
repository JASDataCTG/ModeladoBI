import React, { useState } from 'react';
import { Sparkles, HelpCircle, Lightbulb, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeacherAssistantProps {
  message: string;
  mood?: 'happy' | 'neutral' | 'idea' | 'warning' | 'success';
  title?: string;
}

export function TeacherAssistant({ message, mood = 'neutral', title = 'MSc. Jairo Acosta Solano' }: TeacherAssistantProps) {
  const [showTip, setShowTip] = useState(false);
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const tipsList = [
    {
      title: "🔑 Claves Subrogadas (Surrogate Keys)",
      content: "¡Hola de nuevo! En Inteligencia de Negocios siempre es buena práctica usar Claves Subrogadas (IDs autoincrementales sin significado de negocio). Esto aísla el Data Warehouse de cambios en los sistemas transaccionales y mejora el rendimiento."
    },
    {
      title: "🌊 Diferencia Clave: Redundancia",
      content: "El Modelo en Estrella tolera la redundancia (desnormalización) para maximizar la velocidad de lectura. El Modelo Copo de Nieve elimina la redundancia normalizando las dimensiones, reduciendo espacio pero complicando los JOINS."
    },
    {
      title: "📊 Tabla de Hechos (Fact Table)",
      content: "¡Ojo con esto! La tabla de hechos representa transacciones o eventos medibles. Debe contener claves foráneas (FKs) apuntando a las dimensiones, y valores numéricos agregables como montos, unidades o conteos de tiempo."
    },
    {
      title: "📐 ¿Cuándo usar Snowflake?",
      content: "El copo de nieve o nube de dimensiones es ideal cuando tus dimensiones son gigantescas y tienen jerarquías muy marcadas (como países -> provincias -> ciudades) y quieres ahorrar espacio o usar herramientas OLAP estrictas."
    }
  ];

  // Map mood to teacher avatar visual status
  const getAvatarStyle = () => {
    switch (mood) {
      case 'happy':
        return {
          bg: 'bg-emerald-50',
          borderColor: 'border-[#141414]',
          textColor: 'text-emerald-950',
          emoji: '👨‍🏫✨',
          bubbleBg: 'bg-emerald-50 border-2 border-[#141414] text-[#141414]',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-800" />
        };
      case 'success':
        return {
          bg: 'bg-lime-50',
          borderColor: 'border-[#141414]',
          textColor: 'text-lime-950',
          emoji: '🎓🏆',
          bubbleBg: 'bg-lime-50 border-2 border-[#141414] text-[#141414]',
          icon: <CheckCircle2 className="w-5 h-5 text-lime-800 animate-bounce" />
        };
      case 'idea':
        return {
          bg: 'bg-amber-50',
          borderColor: 'border-[#141414]',
          textColor: 'text-amber-950',
          emoji: '👨‍🏫💡',
          bubbleBg: 'bg-amber-50 border-2 border-[#141414] text-[#141414]',
          icon: <Lightbulb className="w-5 h-5 text-amber-700 animate-pulse" />
        };
      case 'warning':
        return {
          bg: 'bg-rose-50',
          borderColor: 'border-[#141414]',
          textColor: 'text-rose-950',
          emoji: '👨‍🏫🧐',
          bubbleBg: 'bg-rose-50 border-2 border-[#141414] text-[#141414]',
          icon: <AlertCircle className="w-5 h-5 text-rose-800" />
        };
      default:
        return {
          bg: 'bg-white',
          borderColor: 'border-[#141414]',
          textColor: 'text-[#141414]',
          emoji: '👨‍🏫📚',
          bubbleBg: 'bg-white border-2 border-[#141414] text-[#141414]',
          icon: <Sparkles className="w-5 h-5 text-[#141414]" />
        };
    }
  };

  const style = getAvatarStyle();

  const handleNextTip = () => {
    setActiveTipIndex((prev) => (prev + 1) % tipsList.length);
  };

  return (
    <div className={`p-4 rounded-none border-4 transition-all duration-300 ${style.bg} ${style.borderColor} shadow-hard`}>
      <div className="flex items-start gap-4">
        {/* Teacher Avatar Section */}
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ 
              scale: mood === 'success' ? [1, 1.1, 1] : 1,
              rotate: mood === 'idea' ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-none bg-amber-400 flex items-center justify-center text-4xl shadow-hard-sm border-2 border-[#141414] relative cursor-pointer hover:rotate-6 transition-transform"
            title="¡Pica para saludar al Profe!"
          >
            {style.emoji}
            <span className="absolute -bottom-1 -right-1 bg-white p-1 rounded-none shadow-hard-sm border border-[#141414]">
              {style.icon}
            </span>
          </motion.div>
          <span className="text-xs font-bold font-mono mt-2 text-[#141414] whitespace-nowrap bg-white px-2 py-0.5 rounded-none border border-[#141414] shadow-hard-sm">
            {title}
          </span>
        </div>

        {/* Speech Bubble */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            {/* Speech bubble client wrapper with flat borders */}
            <div className={`p-3.5 rounded-none text-sm leading-relaxed relative z-10 font-sans ${style.bubbleBg}`}>
              <div className="font-bold font-display mb-1 text-[#141414] flex items-center gap-1.5 border-b border-dashed border-[#141414] pb-1">
                <span>{mood === 'happy' || mood === 'success' ? '🏆 ¡Excelente análisis!' : mood === 'idea' ? '💡 ¡Atención a esta pista!' : '👨‍🏫 Consejo Académico:'}</span>
              </div>
              <p className="text-slate-800 font-medium whitespace-pre-line">{message}</p>
            </div>
          </div>

          {/* Quick helpful interactions */}
          <div className="mt-3 flex flex-wrap items-center gap-2 z-10 relative">
            <button
              id="btn-teach-tips"
              onClick={() => {
                setShowTip(!showTip);
                if (!showTip) setActiveTipIndex(Math.floor(Math.random() * tipsList.length));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fefce8] hover:bg-yellow-100 text-xs font-mono font-bold text-[#141414] rounded-none border-2 border-[#141414] transition-all cursor-pointer shadow-hard-sm"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              {showTip ? 'CERRAR PIZARRÓN DE CONSEJOS' : '¿UN CONSEJO RÁPIDO DEL PROFE?'}
            </button>
            
            {showTip && (
              <button
                id="btn-teach-next-tip"
                onClick={handleNextTip}
                className="p-1.5 bg-white hover:bg-slate-100 text-[#141414] border-2 border-[#141414] rounded-none shadow-hard-sm transition-colors cursor-pointer"
                title="Cambiar de Consejo"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Quick Interactive Board */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-3"
          >
            <div className="bg-[#fafaf9] text-[#141414] p-4 rounded-none border-2 border-[#141414] text-xs shadow-inner font-mono relative mt-1">
              <div className="absolute top-3 right-3 text-slate-500 font-bold tracking-widest text-[9px] uppercase border-b border-[#141414]">
                Pizarrón BI #{activeTipIndex + 1}
              </div>
              <div className="text-brand-700 font-black mb-2 font-display text-sm">
                {tipsList[activeTipIndex].title}
              </div>
              <p className="text-slate-700 leading-relaxed font-sans text-xs">
                {tipsList[activeTipIndex].content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

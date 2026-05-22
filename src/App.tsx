import React, { useState } from 'react';
import { 
  GraduationCap, 
  Map, 
  Database, 
  Star, 
  Wind, 
  Award, 
  Trophy, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Sliders,
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { TheorySection } from './components/TheorySection';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ExerciseOne } from './components/ExerciseOne';
import { ExerciseTwo } from './components/ExerciseTwo';
import { QuizSection } from './components/QuizSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<'THEORY' | 'SANDBOX' | 'LAB1' | 'LAB2' | 'QUIZ'>('THEORY');
  
  // Overall tracking milestones
  const [solvedMilestones, setSolvedMilestones] = useState({
    theory: true, // starts checked
    sandbox: false,
    lab1: false,
    lab2: false,
    quiz: false
  });

  const [studentName, setStudentName] = useState<string>('');
  const [isNameSaved, setIsNameSaved] = useState<boolean>(false);

  const toggleMilestone = (key: keyof typeof solvedMilestones) => {
    setSolvedMilestones(prev => ({
      ...prev,
      [key]: true
    }));
  };

  // Compute calculated statistics
  const countCompleted = Object.values(solvedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((countCompleted / 5) * 100);

  const getStudentRank = () => {
    if (countCompleted <= 1) return 'Iniciado en BI';
    if (countCompleted <= 3) return 'Modelador Junior';
    if (countCompleted <= 4) return 'Asistente de Datos';
    return 'Consultor BI Senior 🏆';
  };

  return (
    <div className="min-h-screen bg-dot-pattern text-[#141414] font-sans antialiased pb-12">
      {/* Top Academic Navbar */}
      <header className="bg-white text-[#141414] border-b-4 border-[#141414] shadow-hard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4.5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-none bg-[#141414] flex items-center justify-center text-white border-2 border-[#141414] font-mono font-black text-xl tracking-tight shadow-hard-sm">
              BI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg font-display tracking-tight text-[#141414]">
                  Simulador de Modelado Dimensional
                </h1>
                <span className="bg-[#fefce8] text-[#141414] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border-2 border-[#141414]">
                  Especialización de Analítica de Datos
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans font-medium">
                Aprende el diseño de base de datos OLAP: Modelo en Estrella y Copo de Nieve (Snowflake)
              </p>
            </div>
          </div>

          {/* Student Profile & Progress card */}
          <div className="flex items-center gap-4 bg-[#fafaf9] p-3 rounded-none border-2 border-[#141414] shadow-hard w-full md:w-auto">
            
            {/* Student Name Handler */}
            {!isNameSaved ? (
              <div className="flex items-center gap-2">
                <input
                  id="input-student-name"
                  type="text"
                  placeholder="Tu nombre..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="bg-white text-[#141414] text-xs px-3 py-1.5 rounded-none border-2 border-[#141414] focus:outline-hidden focus:bg-[#fefce8] placeholder-slate-400 w-36 font-mono font-bold"
                />
                <button
                  id="btn-save-name"
                  onClick={() => {
                    if (studentName.trim()) setIsNameSaved(true);
                  }}
                  className="bg-[#141414] hover:bg-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-none border-2 border-[#141414] shadow-hard-sm transition-all cursor-pointer"
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="text-left">
                <p className="text-xs font-bold text-[#141414] flex items-center gap-1.5">
                  <span>🎓 Alumno:</span>
                  <span className="text-brand-700 font-display font-bold underline decoration-2">{studentName}</span>
                </p>
                <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                  Rango: <span className="font-bold text-amber-700 bg-amber-100 px-1 border border-amber-400">{getStudentRank()}</span>
                </p>
              </div>
            )}

            <div className="h-8 w-px bg-slate-300 hidden sm:block" />

            {/* Overall progress bar */}
            <div className="hidden sm:block text-right min-w-[124px]">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-700 mb-1">
                <span>AVANCE PROG</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-28 h-3.5 bg-white rounded-none border-2 border-[#141414] overflow-hidden">
                <div 
                  className="h-full bg-lime-400 transition-all duration-550 border-r border-[#141414]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Main Workspace Frame container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Interactive Classroom Banner with Objectives Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          <div className="lg:col-span-8 bg-white text-[#141414] p-6 rounded-none border-4 border-[#141414] shadow-hard-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-[150px] font-black tracking-tighter select-none font-display">
              BI
            </div>

            <div className="z-10">
              <span className="inline-block bg-[#fafaf9] text-[#141414] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none mb-3.5 border-2 border-[#141414] shadow-hard-sm">
                🏫 Especialización de Analítica de Datos
              </span>
              <h2 className="text-2xl font-bold font-display text-[#141414] tracking-tight leading-snug">
                ¡Bienvenido a tu Laboratorio de Modelado de Datos!
              </h2>
              <p className="text-slate-700 text-sm mt-2 max-w-xl font-sans leading-relaxed">
                El docente <strong>MSc. Jairo Acosta Solano</strong> te guiará para evaluar dos casos reales del mercado: un gran supermercado utilizando el <strong className="text-[#141414] font-bold underline bg-amber-100 px-1">Modelo en Estrella</strong>, y una concesionaria automotriz escalando a un <strong className="text-[#141414] font-bold underline bg-indigo-100 px-1">Modelo Copo de Nieve (Snowflake)</strong>.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3.5 z-10 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-100 px-3 py-1 rounded-none border-2 border-emerald-800 font-sans font-bold shadow-hard-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                No requiere API paga
              </span>
              <span className="flex items-center gap-1.5 text-teal-800 bg-teal-100 px-3 py-1 rounded-none border-2 border-teal-800 font-mono font-bold shadow-hard-sm">
                ✔ 100% Compatible con Vercel
              </span>
            </div>
          </div>

          {/* Quick interactive Syllabus tracker checklist (Right) */}
          <div className="lg:col-span-4 bg-white rounded-none border-4 border-[#141414] p-5 shadow-hard-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                OBJETIVOS DEL PROGRAMA :
              </h3>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 bg-[#fafaf9] hover:bg-yellow-50 rounded-none border-2 border-[#141414] shadow-hard-sm cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={solvedMilestones.theory}
                    readOnly
                    className="accent-lime-600 rounded-none border-2 border-[#141414] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-bold text-[#141414]">La teoría dimensional</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-[#fafaf9] hover:bg-yellow-50 rounded-none border-2 border-[#141414] shadow-hard-sm cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={solvedMilestones.sandbox}
                    onChange={() => toggleMilestone('sandbox')}
                    className="accent-lime-600 rounded-none border-2 border-[#141414] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-bold text-[#141414]">Caja de Arena (Sandbox)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-[#fafaf9] hover:bg-yellow-50 rounded-none border-2 border-[#141414] shadow-hard-sm cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={solvedMilestones.lab1}
                    onChange={() => toggleMilestone('lab1')}
                    className="accent-lime-600 rounded-none border-2 border-[#141414] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-bold text-[#141414]">Lab 1: Estrella Retail</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-[#fafaf9] hover:bg-yellow-50 rounded-none border-2 border-[#141414] shadow-hard-sm cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={solvedMilestones.lab2}
                    onChange={() => toggleMilestone('lab2')}
                    className="accent-lime-600 rounded-none border-2 border-[#141414] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-bold text-[#141414]">Lab 2: Snowflake Autos</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-[#fafaf9] hover:bg-yellow-50 rounded-none border-2 border-[#141414] shadow-hard-sm cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={solvedMilestones.quiz}
                    onChange={() => toggleMilestone('quiz')}
                    className="accent-lime-600 rounded-none border-2 border-[#141414] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-bold text-[#141414]">Examen de Aptitud</span>
                </label>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 mt-3 font-mono text-center">
              Pica en los checkbox o avanza los laboratorios para ver progresar tu rango.
            </p>
          </div>

        </div>

        {/* Navigation Tabs (Single Screen layout boundaries) */}
        <div id="navigation-tabs" className="flex flex-wrap items-center bg-white border-4 border-[#141414] p-2 rounded-none gap-2 justify-around md:justify-start shadow-hard mb-6">
          <button
            id="tab-theory"
            onClick={() => setActiveTab('THEORY')}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'THEORY'
                ? 'bg-[#141414] text-white border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-100 hover:border-[#141414]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            1. Libro Teórico
          </button>

          <button
            id="tab-sandbox"
            onClick={() => {
              setActiveTab('SANDBOX');
              toggleMilestone('sandbox');
            }}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'SANDBOX'
                ? 'bg-[#141414] text-white border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-100 hover:border-[#141414]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            2. Caja de Arena (Sandbox)
          </button>

          <button
            id="tab-lab1"
            onClick={() => {
              setActiveTab('LAB1');
              toggleMilestone('lab1');
            }}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'LAB1'
                ? 'bg-amber-400 text-black border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-100 hover:border-[#141414]'
            }`}
          >
            <Star className="w-4 h-4 fill-current text-slate-800" />
            3. Lab 1: Estrella Retail
          </button>

          <button
            id="tab-lab2"
            onClick={() => {
              setActiveTab('LAB2');
              toggleMilestone('lab2');
            }}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'LAB2'
                ? 'bg-[#141414] text-white border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-100 hover:border-[#141414]'
            }`}
          >
            <Wind className="w-4 h-4" />
            4. Lab 2: Snowflake Autos
          </button>

          <button
            id="tab-quiz"
            onClick={() => {
              setActiveTab('QUIZ');
              toggleMilestone('quiz');
            }}
            className={`flex items-center gap-2 px-4.5 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              activeTab === 'QUIZ'
                ? 'bg-[#141414] text-white border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-100 hover:border-[#141414]'
            }`}
          >
            <Award className="w-4 h-4" />
            5. Examen de Aptitud
          </button>
        </div>

        {/* Rendering Content area with fade-in style */}
        <div id="workspace-viewport" className="min-h-[500px]">
          {activeTab === 'THEORY' && (
            <div className="animate-fade-in">
              <TheorySection />
            </div>
          )}

          {activeTab === 'SANDBOX' && (
            <div className="animate-fade-in">
              <InteractiveSandbox />
            </div>
          )}

          {activeTab === 'LAB1' && (
            <div className="animate-fade-in">
              <ExerciseOne />
            </div>
          )}

          {activeTab === 'LAB2' && (
            <div className="animate-fade-in">
              <ExerciseTwo />
            </div>
          )}

          {activeTab === 'QUIZ' && (
            <div className="animate-fade-in">
              <QuizSection />
            </div>
          )}
        </div>

      </main>

      {/* Corporate disclaimer & footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-250 text-center text-xs text-slate-400 font-sans">
        <p>© {new Date().getFullYear()} Especialización de Analítica de Datos.</p>
        <p className="mt-1">
          Simulador interactivo optimizado para despliegues estáticos rápidos en servidores de nivel básico como Vercel o Netlify.
        </p>
      </footer>
    </div>
  );
}

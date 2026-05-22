import React, { useState } from 'react';
import { BookOpen, HelpCircle, Check, Star, Wind, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export function TheorySection() {
  const [activeTab, setActiveTab] = useState<'ESTRELLA' | 'COPO'>('ESTRELLA');

  return (
    <div className="bg-[#fafaf9] rounded-none border-4 border-[#141414] p-6 shadow-hard">
      
      {/* Overview Block */}
      <div className="bg-white rounded-none p-5 border-2 border-[#141414] shadow-hard-sm mb-6">
        <div className="flex gap-4 items-start">
          <span className="p-3 bg-[#131212] text-white rounded-none border-2 border-black shadow-hard-sm self-start">
            <GraduationCap className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-lg font-black font-mono text-[#141414] mb-1 uppercase tracking-tight">
              ¿Por qué es crucial el Modelado Dimensional en BI?
            </h3>
            <p className="text-slate-800 text-sm font-sans leading-relaxed font-semibold">
              A diferencia de las bases de datos transaccionales tradicionales (OLTP) diseñadas para escribir rápido y evitar la redundancia, 
              las bases de datos de Inteligencia de Negocios (OLAP/Data Warehouses) se diseñan para realizar <strong className="underline">lecturas rápidas, agregaciones masivas y análisis intuitivos</strong>. 
              Los dos enfoques más preponderantes de modelado son el <strong className="bg-amber-100 px-1 py-0.5 border border-amber-300">Modelo en Estrella</strong> y el <strong className="bg-lime-100 px-1 py-0.5 border border-lime-300">Modelo Copo de Nieve (Snowflake)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs with interactive details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2.5">
          
          <button
            id="theory-tab-estrella"
            onClick={() => setActiveTab('ESTRELLA')}
            className={`w-full p-4 rounded-none text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
              activeTab === 'ESTRELLA'
                ? 'bg-amber-300 border-[#141414] shadow-hard-sm ring-2 ring-amber-100 font-bold'
                : 'bg-white border-slate-200 hover:border-[#141414] hover:bg-slate-100 text-[#141414]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded-none border border-black ${activeTab === 'ESTRELLA' ? 'bg-amber-400 text-black' : 'bg-[#fafaf9] text-slate-800'}`}>
                <Star className="w-5 h-5 fill-current" />
              </span>
              <div>
                <p className="font-bold font-mono text-[10px] text-slate-500 uppercase tracking-widest">MODELO #1</p>
                <p className="font-bold font-mono text-[#141414] text-sm">Estrella (Desnormalizada)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#141414]" />
          </button>

          <button
            id="theory-tab-copo"
            onClick={() => setActiveTab('COPO')}
            className={`w-full p-4 rounded-none text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
              activeTab === 'COPO'
                ? 'bg-lime-300 border-[#141414] shadow-hard-sm ring-2 ring-lime-100 font-bold'
                : 'bg-white border-slate-200 hover:border-[#141414] hover:bg-slate-100 text-[#141414]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded-none border border-black ${activeTab === 'COPO' ? 'bg-lime-400 text-black' : 'bg-[#fafaf9] text-slate-800'}`}>
                <Wind className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold font-mono text-[10px] text-slate-500 uppercase tracking-widest">MODELO #2</p>
                <p className="font-bold font-mono text-[#141414] text-sm">Copo de Nieve (Normalizada)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#141414]" />
          </button>

          {/* Quick core metrics */}
          <div className="p-4 bg-[#141414] text-[#fafaf9] rounded-none border-2 border-black shadow-hard text-xs font-mono">
            <h4 className="text-amber-300 font-bold mb-2 font-mono text-xs uppercase tracking-wider border-b border-white/20 pb-1">Machete del Modelador :</h4>
            <ul className="space-y-2 text-slate-300 font-sans font-medium">
              <li className="flex items-start gap-1">
                <span className="text-lime-400 font-mono font-bold">✔</span>
                <span><strong>Hechos (Facts):</strong> Respuestas cuantitativas numéricas (¿Cuánto se vendió?).</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-lime-400 font-mono font-bold">✔</span>
                <span><strong>Dimensiones:</strong> Filtros contextuales categóricos (¿Quién compró?).</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-lime-400 font-mono font-bold">✔</span>
                <span><strong>Relación PK-FK:</strong> Vínculo relacional que conecta el catálogo al hecho.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informative Body Content (Right) */}
        <div className="lg:col-span-8">
          {activeTab === 'ESTRELLA' ? (
            <div className="bg-white rounded-none p-6 border-2 border-[#141414] shadow-hard-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-600">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                <h4 className="text-lg font-bold font-mono text-[#141414] uppercase tracking-wider">
                  Concepto del Modelo en Estrella
                </h4>
              </div>

              <p className="text-slate-800 text-sm leading-relaxed font-sans font-medium">
                Consiste en una <strong className="text-slate-900 u">tabla de hechos central</strong> rodeada de forma directa por 
                <strong className="text-slate-900"> tablas de dimensiones</strong>. Las dimensiones se encuentran completamente 
                <strong className="text-amber-700 bg-amber-50 px-1">desnormalizadas</strong> (redundantes); esto significa que las categorías, provincias, marcas, etc., se guardan de forma escrita literal en las filas, sin ID de referencia externo.
              </p>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50 border-2 border-emerald-600 p-4 rounded-none shadow-hard-sm">
                  <h5 className="font-bold text-emerald-950 text-xs font-mono uppercase tracking-wider mb-2 border-b border-emerald-200">⭐ Ventajas Claves</h5>
                  <ul className="text-xs text-slate-800 space-y-1.5 font-sans font-medium">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>Velocidad Extrema:</strong> Menos JOINS para leer o consolidar reportes mensuales de ventas en caliente.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>Comprensión Intuitiva:</strong> Sencillo de entender para usuarios de negocio e implementar en herramientas analíticas directas.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-50 border-2 border-rose-600 p-4 rounded-none shadow-hard-sm">
                  <h5 className="font-bold text-rose-950 text-xs font-mono uppercase tracking-wider mb-2 border-b border-rose-200">❌ Desventajas / Retos</h5>
                  <ul className="text-xs text-slate-800 space-y-1.5 font-sans font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-700 font-bold text-xs">●</span>
                      <span><strong>Redundancia de Datos:</strong> Textos de países, categorías se escriben millones de veces, gastando más almacenamiento físico.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-700 font-bold text-xs">●</span>
                      <span><strong>Mantenimiento Difícil:</strong> Si cambia la categoría, debes actualizar miles de registros de productos repetidos.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Expert teacher quote */}
              <div className="bg-amber-100 p-3.5 rounded-none border-2 border-[#141414] text-xs text-slate-800 italic font-semibold shadow-hard-sm">
                💡 <strong>Consejo del Profe:</strong> "Si tienes miles de millones de filas en tu tabla de hechos y dimensiones pequeñas (como 50 clientes y 20 productos), el Modelo en Estrella es el campeón indiscutible por velocidad y diseño plano."
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-none p-6 border-2 border-[#141414] shadow-hard-sm space-y-4">
              <div className="flex items-center gap-2 text-indigo-600">
                <Wind className="w-6 h-6 text-indigo-600 font-bold animate-pulse" />
                <h4 className="text-lg font-bold font-mono text-[#141414] uppercase tracking-wider">
                  Concepto del Copo de Nieve (Snowflake)
                </h4>
              </div>

              <p className="text-slate-800 text-sm leading-relaxed font-sans font-medium">
                Es una variación del modelo en estrella donde las dimensiones principales se <strong className="text-indigo-700 underline">normalizan</strong>. 
                Las tablas de dimensiones se fragmentan para aislar atributos repetidos en jerarquías independientes (como Cuentas ➔ Bancos ➔ Países), 
                creando una estructura ramificada similar a una <strong className="text-indigo-900 font-black">nube o copo de nieve</strong>.
              </p>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50 border-2 border-emerald-600 p-4 rounded-none shadow-hard-sm">
                  <h5 className="font-bold text-emerald-950 text-xs font-mono uppercase tracking-wider mb-2 border-b border-emerald-200">⭐ Ventajas Claves</h5>
                  <ul className="text-xs text-slate-800 space-y-1.5 font-sans font-medium">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>Cero Redundancia:</strong> Almacena categorías, fabricantes o ubicaciones una sola vez. Ahorra espacio de disco óptimamente.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>Fácil Mantenimiento:</strong> Las actualizaciones jerárquicas ocurren en una única tabla pequeña y no en todo el catálogo de productos.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-50 border-2 border-rose-600 p-4 rounded-none shadow-hard-sm">
                  <h5 className="font-bold text-rose-950 text-xs font-mono uppercase tracking-wider mb-2 border-b border-rose-200">❌ Desventajas / Retos</h5>
                  <ul className="text-xs text-slate-800 space-y-1.5 font-sans font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-700 font-bold text-xs">●</span>
                      <span><strong>JOINS complejos:</strong> Para reportar datos de cliente, debes realizar JOIN Hechos ➔ Clientes ➔ Geografía. Esto reduce la velocidad con tablas gigantes.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-700 font-bold text-xs">●</span>
                      <span><strong>Comprensión Técnica:</strong> Dificulta el uso básico en software analítico si el analista no domina las llaves de unión relacionales.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Expert teacher quote */}
              <div className="bg-indigo-100 p-3.5 rounded-none border-2 border-[#141414] text-xs text-slate-800 italic font-semibold shadow-hard-sm">
                💡 <strong>Consejo del Profe:</strong> "Generalmente usamos copo de nieve cuando procesamos bases de datos relacionales tradicionales muy estructuradas, o cuando el almacenamiento es extremadamente costoso y preferimos una arquitectura en capas limpias."
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { HelpCircle, Wind, Sparkles, CheckCircle, RotateCw, Play, MapPin, Tag, Car, Workflow, GraduationCap, Layers } from 'lucide-react';
import { TeacherAssistant } from './TeacherAssistant';

interface SubDimConnection {
  subDimId: string;
  subDimName: string;
  sourceKeyName: string;
  description: string;
  correctParent: string; // The parent table it connects to
}

export function ExerciseTwo() {
  const [currentExercise, setCurrentExercise] = useState<number>(0);

  const exercises = [
    {
      id: 0,
      title: "EJERCICIO 1: CASO ECODRIVE AUTOS",
      subtitle: "Relaciona las sub-dimensiones jerárquicas con las dimensiones principales del concesionario.",
      objectiveText: "🔑 VALOR CLAVE: EVITAR REDUNDANCIA POR ACTUALIZACIÓN RECURRENTE",
      snowflakeConnections: [
        {
          subDimId: 'geo',
          subDimName: 'SUB_DIM_Geografia_Ubicaciones',
          sourceKeyName: 'geografia_id',
          description: 'Centraliza las ciudades, distritos y países de residencia de los compradores sin repetir cadenas de texto en el registro del cliente.',
          correctParent: 'dim_clientes'
        },
        {
          subDimId: 'cat',
          subDimName: 'SUB_DIM_Categorias_Fabricantes',
          sourceKeyName: 'categoria_id',
          description: 'Separa la información del tipo de vehículo (Híbridos, Eléctricos, Combustión) y detalles de la marca fabricante.',
          correctParent: 'dim_vehiculos'
        },
        {
          subDimId: 'sucursal',
          subDimName: 'SUB_DIM_Sucursal_Concesionario',
          sourceKeyName: 'concesionario_id',
          description: 'Configura las sucursales del país, uniendo cada vendedor en planta a un local físico específico de forma normalizada.',
          correctParent: 'dim_vendedores'
        }
      ],
      parents: [
        { value: "dim_clientes", label: "DIM_Clientes_Compradores", desc: "Recibe la llave de geografía para normalizar ciudades." },
        { value: "dim_vehiculos", label: "DIM_Vehiculos_Unidades", desc: "Recibe la llave de categorías de autos y marcas fabricantes." },
        { value: "dim_vendedores", label: "DIM_Vendedores", desc: "Identifica la nómina. Se conecta con el concesionario asignado." }
      ],
      defaultDistractor: "FACT_Ventas_Autos (Conexión Directa)"
    },
    {
      id: 1,
      title: "EJERCICIO 2: PLATAFORMA EDUCATIVA DATALEARN",
      subtitle: "Normaliza la facturación de membresías, catálogo temático de cursos e información institucional de docentes.",
      objectiveText: "🔑 VALOR CLAVE: INTEGRIDAD REFERENCIAL ACADÉMICA",
      snowflakeConnections: [
        {
          subDimId: 'planes',
          subDimName: 'SUB_DIM_Planes_Suscripcion',
          sourceKeyName: 'plan_id',
          description: 'Agrupa los tipos de membresías (Premium, Basic, Enterprise, Scholar) y sus tarifas en un copo independiente para el estudiante.',
          correctParent: 'dim_estudiantes'
        },
        {
          subDimId: 'temas',
          subDimName: 'SUB_DIM_Categorias_Temas',
          sourceKeyName: 'tema_id',
          description: 'Aísla las categorías y sub-categorías de aprendizaje (Data Analytics, Web Dev, Cloud Architecture) para el catálogo de asignaturas.',
          correctParent: 'dim_cursos'
        },
        {
          subDimId: 'facultades',
          subDimName: 'SUB_DIM_Facultades_Escuelas',
          sourceKeyName: 'facultad_id',
          description: 'Normaliza los departamentos académicos, decanos y presupuestos universitarios asociados al staff de instructores.',
          correctParent: 'dim_instructores'
        }
      ],
      parents: [
        { value: "dim_estudiantes", label: "DIM_Estudiantes_Matriculados", desc: "Contiene la cuenta del alumno. Recibe la FK del Plan de Suscripción." },
        { value: "dim_cursos", label: "DIM_Cursos_Catalogo", desc: "Índice de clases grabadas. Recibe la FK del Tema/Categoría." },
        { value: "dim_instructores", label: "DIM_Instructores_Staff", desc: "Nómina de profesores. Recibe la FK de Facultades." }
      ],
      defaultDistractor: "FACT_Visualizaciones_Clases (Conexión Directa)"
    }
  ];

  const [exerciseStates, setExerciseStates] = useState<Array<{
    parentSelections: { [subDimId: string]: string };
    normalizationDone: boolean | null;
    isEvaluated: boolean;
    teacherMessage: string;
    teacherMood: 'neutral' | 'happy' | 'idea' | 'warning' | 'success';
  }>>([
    {
      parentSelections: {
        geo: '',
        cat: '',
        sucursal: '',
      },
      normalizationDone: null,
      isEvaluated: false,
      teacherMessage: '¡Bienvenidos al Concesionario "EcoDrive"! En este caso, el catálogo de autos, vendedores y localidades experimenta una actualización diaria enorme, por lo cual diseñar en estrella genera demasiada redundancia. Debes normalizar el esquema llevándolo al formato Copo de Nieve (Snowflake).',
      teacherMood: 'neutral'
    },
    {
      parentSelections: {
        planes: '',
        temas: '',
        facultades: '',
      },
      normalizationDone: null,
      isEvaluated: false,
      teacherMessage: '¡Bienvenidos a la plataforma "DataLearn"! Aquí, los estudiantes inscritos, los cursos del catálogo y los instructores del cuerpo docente tienen un alto tráfico de metadatos históricos. Ayuda a normalizar la plataforma de streaming educativo en esquema Copo de Nieve (Snowflake) asociando cada copo relacional secundario.',
      teacherMood: 'neutral'
    }
  ]);

  const activeEx = exercises[currentExercise];
  const activeState = exerciseStates[currentExercise];
  const parentSelections = activeState.parentSelections;
  const isEvaluated = activeState.isEvaluated;
  const teacherMessage = activeState.teacherMessage;
  const teacherMood = activeState.teacherMood;

  const updateState = (updater: (prev: typeof exerciseStates[0]) => typeof exerciseStates[0]) => {
    setExerciseStates(prev => {
      const copy = [...prev];
      copy[currentExercise] = updater(copy[currentExercise]);
      return copy;
    });
  };

  const handleSelectParent = (subDimId: string, value: string) => {
    updateState(prev => {
      const updatedSelects = { ...prev.parentSelections, [subDimId]: value };
      let teacherMsg = prev.teacherMessage;
      let teacherMood = prev.teacherMood;

      if (value === activeEx.snowflakeConnections.find(c => c.subDimId === subDimId)?.correctParent) {
        teacherMood = 'happy';
        if (subDimId === 'cat' || subDimId === 'temas') {
          teacherMsg = '¡Buen ojo! Normalizar las categorías o temas de aprendizaje ayuda a aislar las descripciones textuales redundantes dentro del catálogo principal. ¡Gran trabajo relacional!';
        } else if (subDimId === 'geo' || subDimId === 'planes') {
          teacherMsg = '¡Exacto! Vincular sub-dimensiones secundarias estables directamente a la dimensión principal optimiza el espacio considerablemente.';
        } else {
          teacherMsg = '¡Resonancia perfecta! Has estructurado el enlace copo de nieve con éxito de forma limpia.';
        }
      }

      return {
        ...prev,
        parentSelections: updatedSelects,
        teacherMessage: teacherMsg,
        teacherMood
      };
    });
  };

  const handleEvaluate = () => {
    let hasError = false;
    let missing = false;

    activeEx.snowflakeConnections.forEach(link => {
      const selection = parentSelections[link.subDimId];
      if (!selection) {
        missing = true;
      } else if (selection !== link.correctParent) {
        hasError = true;
      }
    });

    updateState(prev => {
      let teacherMessage = prev.teacherMessage;
      let teacherMood = prev.teacherMood;
      let normalizationDone = prev.normalizationDone;

      if (missing) {
        teacherMood = 'warning';
        teacherMessage = '¡Pausa ahí! Falta conectar algunas sub-dimensiones secundarias. Completa todas las líneas de normalización en el tablero para poder compilar.';
        normalizationDone = false;
      } else if (hasError) {
        teacherMood = 'warning';
        teacherMessage = '¡Uy! Hay un cortocircuito en tus uniones relacionales. Conectar estos copos de nivel secundario en tablas directas o equivocadas romperá el árbol dimensional copo de nieve de tercer nivel. ¡Ajusta los selectores!';
        normalizationDone = false;
      } else {
        teacherMood = 'success';
        if (currentExercise === 0) {
          teacherMessage = '¡SENSACIONAL! ❄️ Esquema Copo de Nieve perfectamente balanceado. Las dimensiones principales (Clientes, Vehículos, Vendedores) ahora cargan ID foráneos que nos guían a tablas normalizadas. Esto reduce la ocupación en disco en un 60% en este distribuidor de autos.';
        } else {
          teacherMessage = '¡INCREÍBLE DESEMPEÑO! ❄️ El Copo de Nieve educativo de DataLearn está completo. Has vinculado los planes de suscripción a los estudiantes, el catálogo de temas a los cursos, y las facultades del campus a los instructores. Lograste una tercera forma normal (3NF) pulcra en tu DW analítico.';
        }
        normalizationDone = true;
      }

      return {
        ...prev,
        normalizationDone,
        teacherMessage,
        teacherMood,
        isEvaluated: true
      };
    });
  };

  const handleReset = () => {
    updateState(prev => {
      const resetSelects = { ...prev.parentSelections };
      Object.keys(resetSelects).forEach(k => { resetSelects[k] = ''; });
      return {
        parentSelections: resetSelects,
        normalizationDone: null,
        isEvaluated: false,
        teacherMood: 'neutral',
        teacherMessage: 'Casillero vaciado. ¡Comienza de nuevo y mapea cada jerarquía del copo de nieve!'
      };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Teacher Box */}
      <TeacherAssistant message={teacherMessage} mood={teacherMood} title="MSc. Jairo Acosta Solano (Docente)" />

      {/* Exercise selections */}
      <div className="flex bg-[#fafaf9] p-1.5 border-4 border-[#141414] shadow-hard justify-between sm:justify-start gap-2.5">
        <button
          onClick={() => setCurrentExercise(0)}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-mono font-bold border-2 cursor-pointer transition-all ${
            currentExercise === 0
              ? 'bg-amber-300 text-black border-black shadow-hard-sm'
              : 'bg-white text-slate-800 border-transparent hover:bg-slate-100 hover:border-black'
          }`}
        >
          EJERCICIO COPO #1 (ECODRIVE AUTOS)
        </button>
        <button
          onClick={() => setCurrentExercise(1)}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-mono font-bold border-2 cursor-pointer transition-all ${
            currentExercise === 1
              ? 'bg-amber-300 text-black border-black shadow-hard-sm'
              : 'bg-white text-slate-800 border-transparent hover:bg-slate-100 hover:border-black'
          }`}
        >
          EJERCICIO COPO #2 (DATALEARN STREAMING)
        </button>
      </div>

      <div className="bg-white rounded-none border-4 border-[#141414] p-6 shadow-hard-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-dashed border-[#141414] pb-5 mb-6">
          <div>
            <h4 className="text-base font-bold font-mono text-[#141414] flex items-center gap-2 uppercase tracking-wide">
              <Wind className="w-5 h-5 text-slate-800" />
              {activeEx.title}
            </h4>
            <p className="text-slate-600 text-xs font-sans font-medium mt-1">
              {activeEx.subtitle}
            </p>
          </div>

          <div className="bg-[#141414] text-white border-2 border-[#141414] rounded-none px-4 py-2 text-xs font-mono font-bold shadow-hard-sm">
            {activeEx.objectiveText}
          </div>
        </div>

        {/* Central visual connection mapping dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Level 2 Subdimensions (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            <h5 className="text-[11px] font-bold uppercase tracking-widest text-slate-800 font-mono flex items-center gap-1 border-b border-[#141414] pb-0.5">
              <Workflow className="w-4 h-4" />
              NIVEL 2: SUB-DIMENSIONES NORMALIZADAS (COPOS)
            </h5>

            {activeEx.snowflakeConnections.map((subDim) => {
              const currentChoice = parentSelections[subDim.subDimId];
              const isCorrectFlag = isEvaluated && currentChoice === subDim.correctParent;

              return (
                <div 
                  key={subDim.subDimId}
                  id={`ex2-card-${subDim.subDimId}`}
                  className={`p-4 rounded-none border-2 border-[#141414] transition-all shadow-hard-sm ${
                    isEvaluated 
                      ? isCorrectFlag 
                        ? 'bg-emerald-50 border-emerald-600' 
                        : 'bg-rose-50 border-rose-600'
                      : 'bg-[#fafaf9]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-dashed border-[#141414]">
                    <span className="font-mono text-xs font-bold text-slate-950 flex items-center gap-1">
                      {subDim.subDimId === 'geo' && <MapPin className="w-3.5 h-3.5 text-rose-600" />}
                      {subDim.subDimId === 'cat' && <Tag className="w-3.5 h-3.5 text-amber-600" />}
                      {subDim.subDimId === 'sucursal' && <Car className="w-3.5 h-3.5 text-blue-600" />}
                      {subDim.subDimId === 'planes' && <GraduationCap className="w-3.5 h-3.5 text-violet-600" />}
                      {subDim.subDimId === 'temas' && <Tag className="w-3.5 h-3.5 text-emerald-600" />}
                      {subDim.subDimId === 'facultades' && <Layers className="w-3.5 h-3.5 text-amber-600" />}
                      {subDim.subDimName}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-white px-2 py-0.5 text-slate-700 uppercase border border-black">
                      Llave: {subDim.sourceKeyName}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 font-semibold font-sans mb-3 leading-relaxed">
                    {subDim.description}
                  </p>

                  {/* Dropdown connection trigger */}
                  <div className="bg-white p-2.5 rounded-none border border-[#141414] flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-800 font-bold font-sans">🔗 VINCULAR HACIA:</span>
                    <select
                      id={`select-ex2-parent-${subDim.subDimId}`}
                      value={currentChoice || ''}
                      onChange={(e) => handleSelectParent(subDim.subDimId, e.target.value)}
                      className="bg-[#fafaf9] border-2 border-black rounded-none px-2 py-1.5 font-bold font-mono text-xs text-slate-900 cursor-pointer max-w-[210px] truncate"
                    >
                      <option value="">-- Elige Tabla Padre --</option>
                      {activeEx.parents.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                      <option value="non_related_distractor">{activeEx.defaultDistractor}</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual representations (Center Line) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4 bg-[#fafaf9] border-2 border-[#141414] rounded-none p-4 shadow-hard-sm">
            <div className="w-10 h-10 rounded-none bg-[#141414] text-white flex items-center justify-center font-bold mb-2 border-2 border-black">
              ➜
            </div>
            <p className="text-[10px] font-bold text-[#141414] uppercase tracking-widest font-mono">CLAVES DE UNIÓN</p>
            <p className="text-[9px] text-slate-700 font-sans font-semibold px-1 mt-1 leading-tight">
              Las FKs de las dimensiones de Nivel 1 apuntan a estas dependencias secundarias.
            </p>
          </div>

          {/* Target Dimensions Level 1 (Right Column) */}
          <div className="lg:col-span-4 space-y-4 col-span-1 border-l-0 lg:border-l border-dashed border-[#141414] lg:pl-6">
            <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#141414] font-mono flex items-center gap-1 border-b border-[#141414] pb-0.5">
              🏷️ NIVEL 1: DIMENSIONES PRINCIPALES (FILTROS)
            </h5>

            <div className="space-y-2.5">
              {activeEx.parents.map((p) => (
                <div key={p.value} className="p-3.5 bg-white text-[#141414] rounded-none border-2 border-[#141414] shadow-hard-sm">
                  <span className="text-[9px] font-bold font-mono text-indigo-800 block uppercase font-black">CONEXIÓN DIRECTA A HECHOS</span>
                  <span className="font-bold text-xs sm:text-sm font-mono text-slate-950 block truncate">{p.label}</span>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 font-sans font-semibold mt-0.5 leading-tight">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer controls for Evaluator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t-2 border-dashed border-[#141414] pt-5 mt-6">
          <p className="text-[11px] text-slate-750 max-w-md font-sans font-semibold">
            💡 <span className="font-bold text-[#141414] underline">¿Sabías qué?</span> Al normalizar en Copo de Nieve, conservas la máxima integridad y consistencia de datos, evitando inconsistencias catastróficas al actualizar los precios o nombres de agrupaciones jerárquicas.
          </p>

          <div className="flex items-center gap-2">
            <button
              id="btn-ex2-reset"
              onClick={handleReset}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold font-mono rounded-none border-2 border-[#141414] shadow-hard-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              REINICIAR LAB 2
            </button>

            <button
              id="btn-ex2-evaluate"
              onClick={handleEvaluate}
              className="px-6 py-2.5 bg-lime-400 hover:bg-lime-500 text-black text-xs font-bold font-mono rounded-none border-2 border-black shadow-hard transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Workflow className="w-3.5 h-3.5 fill-current" />
              COMPROBAR COPO DE NIEVE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

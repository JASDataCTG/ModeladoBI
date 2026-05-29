import React, { useState } from 'react';
import { HelpCircle, Star, Sparkles, CheckCircle2, RotateCw, AlertTriangle, Play, Shuffle } from 'lucide-react';
import { motion } from 'motion/react';
import { TeacherAssistant } from './TeacherAssistant';

interface CandidateTable {
  id: string;
  name: string;
  fields: string[];
  type: 'FACT' | 'DIMENSION' | 'DISTRACTOR';
  description: string;
  hint: string;
}

export function ExerciseOne() {
  const [currentExercise, setCurrentExercise] = useState<number>(0);

  const exercises = [
    {
      id: 0,
      title: "EJERCICIO 1: CASO SUPERMERCADO AHORRAMÁS",
      subtitle: "Organiza el Data Mart de Ventas para analizar la facturación diaria.",
      objectiveText: "🔑 VALOR CLAVE: IDENTIFICAR HECHOS Y DIMENSIONES DESNORMALIZADAS",
      candidateTables: [
        {
          id: 'ventas',
          name: 'Transacciones_Ventas_Caja',
          fields: ['ticket_id', 'fecha_id', 'producto_id', 'cliente_id', 'sucursal_id', 'unidades', 'total_pagado', 'descuento_usd'],
          type: 'FACT' as const,
          description: 'Guarda millones de tickets de cobros emitidos en caja registradora diariamente con montos financieros agrupados.',
          hint: 'Busca la tabla que posea campos de transacciones cuantitativas con montos de dinero para ubicarla en el centro.'
        },
        {
          id: 'productos',
          name: 'DIM_Productos_Consolidados',
          fields: ['producto_id', 'codigo_barra', 'nombre_articulo', 'categoria', 'subcategoria', 'marca_proveedor'],
          type: 'DIMENSION' as const,
          description: 'Inventario único de alimentos y artículos. Contiene información desnormalizada de categorías y marcas en un mismo nivel.',
          hint: 'Es una dimensión clásica que contiene descripciones textuales repetitivas de categorías y marcas.'
        },
        {
          id: 'clientes',
          name: 'DIM_Socios_Fidelidad',
          fields: ['cliente_id', 'cedula', 'nombre_apellido', 'edad_rango', 'genero', 'ciudad_residencia', 'provincia'],
          type: 'DIMENSION' as const,
          description: 'Clientes inscritos en el plan de puntos del supermercado, agrupando su edad y geografía de vivienda en una sola tabla.',
          hint: 'Es una dimensión de contexto para filtrar compras y segmentar demográficamente a los compradores.'
        },
        {
          id: 'locales',
          name: 'DIM_Locales_Sucursales',
          fields: ['sucursal_id', 'nombre_sucursal', 'direccion', 'zona_servidor', 'gerente_nombre', 'region_geografica'],
          type: 'DIMENSION' as const,
          description: 'Información general de las tiendas físicas operando a nivel nacional desnormalizadamente.',
          hint: 'Describe el contexto espacial de dónde ocurrió la compra.'
        },
        {
          id: 'tiempo',
          name: 'DIM_Tiempo_Calendario',
          fields: ['fecha_id', 'fecha_completa', 'nombre_dia', 'numero_semana', 'mes_nombre', 'trimestre_fiscal', 'anio'],
          type: 'DIMENSION' as const,
          description: 'Dimensionador temporal que segmenta trimestres financieros y días festivos para análisis ágiles.',
          hint: 'El tiempo es el eje principal de todo reporte de BI. Clasifícalo como una dimensión.'
        },
        {
          id: 'temp_auditoria',
          name: 'LOG_Auditoria_Sistema',
          fields: ['log_id', 'fecha_ejecucion', 'usuario_db', 'query_text', 'ip_origen', 'tiempo_respuesta_ms'],
          type: 'DISTRACTOR' as const,
          description: 'Tabla puramente técnica que registra acciones del personal de TI sobre el motor de base de datos SQL.',
          hint: 'Esta tabla sirve para depurar queries técnicos, no aporta valor analítico al negocio. Es un distractor comercial.'
        },
        {
          id: 'config_impuestos',
          name: 'SYS_Configuracion_IVA',
          fields: ['parametro_id', 'codigo_iva', 'porcentaje_tarifa', 'vigencia_fecha'],
          type: 'DISTRACTOR' as const,
          description: 'Tabla transaccional primaria que indica el porcentaje de IVA vigente para el cálculo de facturador.',
          hint: 'Esta tabla la usa el POS en caliente para calcular impuestos, pero no sirve directamente como un hecho analítico o dimensión descriptiva en la estrella.'
        }
      ],
      correctFks: {
        productos: 'producto_id',
        clientes: 'cliente_id',
        locales: 'sucursal_id',
        tiempo: 'fecha_id'
      },
      fksToMap: [
        { id: 'productos', label: 'Dim_Productos_Consolidados', pKey: 'producto_id' },
        { id: 'clientes', label: 'Dim_Socios_Fidelidad', pKey: 'cliente_id' },
        { id: 'locales', label: 'Dim_Locales_Sucursales', pKey: 'sucursal_id' },
        { id: 'tiempo', label: 'Dim_Tiempo_Calendario', pKey: 'fecha_id' }
      ]
    },
    {
      id: 1,
      title: "EJERCICIO 2: CASO CLÍNICA SALUDTOTAL",
      subtitle: "Organiza el Data Mart de consultas médicas para analizar el costo y duración.",
      objectiveText: "🔑 VALOR CLAVE: DETERMINAR HECHOS Y DIMENSIONES MÉDICAS",
      candidateTables: [
        {
          id: 'atenciones',
          name: 'Hechos_Consultas_Atenciones',
          fields: ['atencion_id', 'fecha_id', 'paciente_id', 'medico_id', 'diagnostico_id', 'costo_consulta', 'duracion_minutos', 'cobertura_seguro'],
          type: 'FACT' as const,
          description: 'Almacena registros continuos de visitas de pacientes, costos cobrados de consulta y tiempos de duración clínica.',
          hint: 'Es la tabla de hechos relacional que concentra las métricas numéricas agregables de las consultas.'
        },
        {
          id: 'pacientes',
          name: 'DIM_Pacientes_Expediente',
          fields: ['paciente_id', 'codigo_historia', 'nombre_paciente', 'edad', 'grupo_sanguineo', 'genero', 'tipo_seguro'],
          type: 'DIMENSION' as const,
          description: 'Contiene los expedientes descriptivos de los pacientes con datos de contacto y demografía básica consolidada en un solo nivel.',
          hint: 'Es un catálogo descriptivo clásico de pacientes para filtrar y segmentar los reportes.'
        },
        {
          id: 'medicos',
          name: 'DIM_Medicos_Staff',
          fields: ['medico_id', 'nombre_medico', 'especialidad', 'anos_clinica', 'departamento', 'universidad_origen'],
          type: 'DIMENSION' as const,
          description: 'Catálogo con los datos personales de todo el cuerpo médico con especialidades y departamentos consolidando datos.',
          hint: 'Es el filtro dimensional de profesionales clínicos.'
        },
        {
          id: 'diagnosticos',
          name: 'DIM_Diagnosticos_CIE10',
          fields: ['diagnostico_id', 'codigo_cie10', 'nombre_diagnostico', 'gravedad_nivel', 'subcategoria_omds'],
          type: 'DIMENSION' as const,
          description: 'Clasificador internacional de enfermedades de la OMS de forma desnormalizada para la clínica.',
          hint: 'Es la tabla que cataloga patologías y diagnósticos médicos descriptivos.'
        },
        {
          id: 'tiempo_clinica',
          name: 'DIM_Tiempo_Calendario',
          fields: ['fecha_id', 'fecha_completa', 'nombre_mes', 'trimestre_fiscal', 'anio_calendario'],
          type: 'DIMENSION' as const,
          description: 'Estructura temporal que permite segmentar el análisis de tendencias médicas de facturación trimestral o por meses.',
          hint: 'El tiempo es siempre el principal filtro para medir el comportamiento periódico.'
        },
        {
          id: 'temp_sesiones',
          name: 'LOG_Sesiones_Portal_Web',
          fields: ['session_id', 'usuario_paciente', 'hora_login', 'ip_clinica', 'navegador_utilizado'],
          type: 'DISTRACTOR' as const,
          description: 'Registro técnico de auditoría web para verificar la velocidad de carga de la app del portal de turnos.',
          hint: 'Esta tabla de log de TI sirve para auditar el servidor, no aporta métricas analíticas de negocio de salud.'
        },
        {
          id: 'config_monedas',
          name: 'SYS_Tipos_Monedas',
          fields: ['moneda_id', 'codigo_iso', 'simbolo_moneda', 'tasa_cambio_actual'],
          type: 'DISTRACTOR' as const,
          description: 'Tabla del sistema operacional para el flete de monedas secundarias de seguros internacionales.',
          hint: 'Es una tabla operacional de configuración puntual, no aporta valor de dimensiones analíticas directas.'
        }
      ],
      correctFks: {
        pacientes: 'paciente_id',
        medicos: 'medico_id',
        diagnosticos: 'diagnostico_id',
        tiempo_clinica: 'fecha_id'
      },
      fksToMap: [
        { id: 'pacientes', label: 'Dim_Pacientes_Expediente', pKey: 'paciente_id' },
        { id: 'medicos', label: 'Dim_Medicos_Staff', pKey: 'medico_id' },
        { id: 'diagnosticos', label: 'Dim_Diagnosticos_CIE10', pKey: 'diagnostico_id' },
        { id: 'tiempo_clinica', label: 'Dim_Tiempo_Calendario', pKey: 'fecha_id' }
      ]
    }
  ];

  const [exerciseStates, setExerciseStates] = useState<Array<{
    placedZones: { [tableId: string]: 'FACT' | 'DIMENSION' | 'DISTRACTOR' | null };
    fkMappings: { [dimId: string]: string };
    isEvaluated: boolean;
    teacherMessage: string;
    teacherMood: 'neutral' | 'happy' | 'idea' | 'warning' | 'success';
  }>>([
    {
      placedZones: {
        ventas: null,
        productos: null,
        clientes: null,
        locales: null,
        tiempo: null,
        temp_auditoria: null,
        config_impuestos: null,
      },
      fkMappings: {
        productos: '',
        clientes: '',
        locales: '',
        tiempo: '',
      },
      isEvaluated: false,
      teacherMessage: '¡Hola! El Supermercado "AhorraMás" necesita construir su primer Data Mart de ventas en Estrella. Tu tarea es analizar las 7 tablas del sistema y clasificarlas correctamente en Hechos, Dimensiones de un solo nivel, o descartar las de soporte técnico.',
      teacherMood: 'neutral',
    },
    {
      placedZones: {
        atenciones: null,
        pacientes: null,
        medicos: null,
        diagnosticos: null,
        tiempo_clinica: null,
        temp_sesiones: null,
        config_monedas: null,
      },
      fkMappings: {
        pacientes: '',
        medicos: '',
        diagnosticos: '',
        tiempo_clinica: '',
      },
      isEvaluated: false,
      teacherMessage: '¡Hola de nuevo! Ahora analizaremos el caso de la Clínica "SaludTotal". Quieren estructurar un Data Mart de atenciones médicas en Estrella. Clasifica las 7 tablas médicas en Hechos, Dimensiones de un solo nivel, o descarta las de soporte técnico.',
      teacherMood: 'neutral',
    }
  ]);

  const activeEx = exercises[currentExercise];
  const activeState = exerciseStates[currentExercise];
  const placedZones = activeState.placedZones;
  const fkMappings = activeState.fkMappings;
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

  const handleZoneSelect = (tableId: string, zone: 'FACT' | 'DIMENSION' | 'DISTRACTOR') => {
    updateState(prev => {
      const updatedZones = { ...prev.placedZones, [tableId]: zone };
      const table = activeEx.candidateTables.find(t => t.id === tableId);
      let teacherMessage = prev.teacherMessage;
      let teacherMood = prev.teacherMood;
      if (table) {
        teacherMood = 'idea';
        teacherMessage = `Has asignado temporalmente la tabla "${table.name}" a la categoría de ${zone === 'FACT' ? 'HECHOS CENTRALES' : zone === 'DIMENSION' ? 'DIMENSIONES' : 'DISTRACTOR / CONFIGURACIÓN'}. ¡Sigue evaluando los demás elementos!`;
      }
      return {
        ...prev,
        placedZones: updatedZones,
        teacherMood,
        teacherMessage
      };
    });
  };

  const handleFkChange = (dimId: string, value: string) => {
    updateState(prev => ({
      ...prev,
      fkMappings: {
        ...prev.fkMappings,
        [dimId]: value
      }
    }));
  };

  const handleEvaluate = () => {
    let hasZoneErrors = false;
    let errorsList: string[] = [];

    activeEx.candidateTables.forEach(table => {
      const selectedZone = placedZones[table.id];
      if (selectedZone !== table.type) {
        hasZoneErrors = true;
        if (!selectedZone) {
          errorsList.push(`Falta clasificar la tabla "${table.name}"`);
        } else {
          errorsList.push(`"${table.name}" no está clasificada correctamente`);
        }
      }
    });

    let hasFkErrors = false;
    const correctFks = activeEx.correctFks;

    if (!hasZoneErrors) {
      Object.keys(correctFks).forEach(dimId => {
        const userSelection = fkMappings[dimId];
        const correctValue = correctFks[dimId];
        if (userSelection !== correctValue) {
          hasFkErrors = true;
          errorsList.push(`La llave de conexión para ${dimId.toUpperCase()} es incorrecta o falta vincular.`);
        }
      });
    }

    updateState(prev => {
      let teacherMood = prev.teacherMood;
      let teacherMessage = prev.teacherMessage;

      if (!hasZoneErrors && !hasFkErrors) {
        teacherMood = 'success';
        if (currentExercise === 0) {
          teacherMessage = '¡MAGNÍFICO TRABAJO! 🎉 Has diseñado perfectamente el Modelo Estrella de "AhorraMás". Separaste correctamente las transacciones rápidas (FACT_Ventas) de los descriptores planos de Productos, Clientes, Locales y Tiempo Calendario, descartando el LOG de auditoría. ¡Estás listo para cargar de datos el Warehouse!';
        } else {
          teacherMessage = '¡ESPECTACULAR! 🎉 Has resuelto el ejercicio de la Clínica "SaludTotal". Lograste colocar en el centro la tabla de hechos con métricas clínicas (consultas médicas) y asociarle correctamente sus dimensiones desnormalizadas (Pacientes, Médicos, Diagnósticos y Tiempo), descartando logs web y monedas operacionales. ¡Excelente sentido analítico!';
        }
      } else {
        teacherMood = 'warning';
        const sampleError = errorsList[0] || 'Revisa la relación de llaves o tablas faltantes.';
        teacherMessage = `Aún tenemos retos académicos, estimado estudiante. 🧐\n\nDetalle: ${sampleError}.\n\nRevisa los tips de cada tabla para ajustar su clasificación.`;
      }

      return {
        ...prev,
        isEvaluated: true,
        teacherMood,
        teacherMessage
      };
    });
  };

  const handleReset = () => {
    updateState(prev => {
      const resetZones = { ...prev.placedZones };
      Object.keys(resetZones).forEach(k => { resetZones[k] = null; });
      const resetFks = { ...prev.fkMappings };
      Object.keys(resetFks).forEach(k => { resetFks[k] = ''; });
      return {
        placedZones: resetZones,
        fkMappings: resetFks,
        isEvaluated: false,
        teacherMood: 'neutral',
        teacherMessage: '¡Intento limpio! El pizarrón se restableció. Analiza cada tabla a detalle.'
      };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Simulation Teacher intro */}
      <TeacherAssistant message={teacherMessage} mood={teacherMood} title="MSc. Jairo Acosta Solano (Docente)" />

      {/* Sub Exercise Selector */}
      <div className="flex bg-[#fafaf9] p-1.5 border-4 border-[#141414] shadow-hard justify-between sm:justify-start gap-2.5">
        <button
          onClick={() => setCurrentExercise(0)}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-mono font-bold border-2 cursor-pointer transition-all ${
            currentExercise === 0
              ? 'bg-amber-300 text-black border-black shadow-hard-sm'
              : 'bg-white text-slate-800 border-transparent hover:bg-slate-100 hover:border-black'
          }`}
        >
          EJERCICIO ESTRELLA #1 (SUPERMERCADO)
        </button>
        <button
          onClick={() => setCurrentExercise(1)}
          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-mono font-bold border-2 cursor-pointer transition-all ${
            currentExercise === 1
              ? 'bg-amber-300 text-black border-black shadow-hard-sm'
              : 'bg-white text-slate-800 border-transparent hover:bg-slate-100 hover:border-black'
          }`}
        >
          EJERCICIO ESTRELLA #2 (CLÍNICA MÉDICA)
        </button>
      </div>

      <div className="bg-white rounded-none border-4 border-[#141414] p-5 shadow-hard-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-[#141414] pb-5 mb-6">
          <div>
            <h3 className="text-lg font-bold font-mono text-[#141414] uppercase tracking-wide">
              {activeEx.title}
            </h3>
            <p className="text-xs text-slate-600 font-sans font-medium mt-1">
              {activeEx.subtitle}
            </p>
          </div>
          <div className="bg-amber-300 text-black border-2 border-black rounded-none px-3 py-1.5 text-xs font-mono font-bold shadow-hard-sm">
            {activeEx.objectiveText}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Candidate tables source bank (Left column) */}
          <div className="xl:col-span-12 lg:xl:col-span-5 space-y-4">
            <div className="bg-[#fafaf9] text-[#141414] rounded-none p-4 border-2 border-[#141414] shadow-hard-sm">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#141414] mb-1 flex items-center gap-1.5 border-b border-[#141414] pb-1">
                <Shuffle className="w-4 h-4 text-slate-800" />
                TABLAS CANDIDATAS DEL SISTEMA
              </h4>
              <p className="text-slate-700 text-[11px] font-sans font-semibold mt-1">
                Haz clic en los botones de categoría ubicados dentro de cada tarjeta para ubicarlas en la caja de la estrella correspondiente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3.5 max-h-[600px] overflow-y-auto pr-1">
              {activeEx.candidateTables.map((table) => {
                const currentZone = placedZones[table.id];
                return (
                  <div 
                    key={table.id}
                    id={`ex1-table-${table.id}`} 
                    className={`bg-white rounded-none border-2 border-[#141414] p-4.5 transition-all shadow-hard-sm ${
                      currentZone === 'FACT' 
                        ? 'bg-amber-100/55' 
                        : currentZone === 'DIMENSION' 
                        ? 'bg-lime-100/55' 
                        : currentZone === 'DISTRACTOR'
                        ? 'bg-rose-100/55'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-dashed border-[#141414]">
                      <span className="font-mono text-[11px] font-bold text-slate-900 bg-[#fafaf9] px-2 py-0.5 border border-[#141414]">
                        {table.name}
                      </span>
                      
                      {/* Quick dynamic status check icons if evaluated */}
                      {isEvaluated && (
                        currentZone === table.type ? (
                          <span className="text-emerald-800 bg-emerald-100 border border-emerald-600 px-1.5 py-0.5 text-[10px] font-bold font-mono">✔ CORRECTO</span>
                        ) : (
                          <span className="text-rose-800 bg-rose-100 border border-rose-600 px-1.5 py-0.5 text-[10px] font-bold font-mono">❌ AJUSTAR</span>
                        )
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 font-semibold font-sans leading-relaxed mb-2.5">
                      {table.description}
                    </p>

                    <div className="bg-[#fafaf9] p-2 rounded-none border border-[#141414] mb-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Columnas clave:</p>
                      <p className="font-mono text-[10px] text-slate-800 truncate font-semibold">
                        {table.fields.join(' | ')}
                      </p>
                    </div>

                    {/* Toggle placement controllers */}
                    <div className="flex gap-1">
                      <button
                        id={`ex1-btn-fact-${table.id}`}
                        onClick={() => handleZoneSelect(table.id, 'FACT')}
                        className={`flex-1 py-1.5 rounded-none text-[10px] font-bold font-mono border transition-all cursor-pointer ${
                          currentZone === 'FACT'
                            ? 'bg-amber-400 text-black border-[#141414] shadow-hard-sm'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-[#141414] hover:bg-amber-50'
                        }`}
                      >
                        ★ HECHO
                      </button>
                      <button
                        id={`ex1-btn-dim-${table.id}`}
                        onClick={() => handleZoneSelect(table.id, 'DIMENSION')}
                        className={`flex-1 py-1.5 rounded-none text-[10px] font-bold font-mono border transition-all cursor-pointer ${
                          currentZone === 'DIMENSION'
                            ? 'bg-lime-400 text-black border-[#141414] shadow-hard-sm'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-[#141414] hover:bg-lime-50'
                        }`}
                      >
                        ✦ DIMENSIÓN
                      </button>
                      <button
                        id={`ex1-btn-skip-${table.id}`}
                        onClick={() => handleZoneSelect(table.id, 'DISTRACTOR')}
                        className={`flex-1 py-1.5 rounded-none text-[10px] font-bold font-mono border transition-all cursor-pointer ${
                          currentZone === 'DISTRACTOR'
                            ? 'bg-[#141414] text-white border-[#141414] shadow-hard-sm'
                            : 'bg-white text-slate-500 border-slate-300 hover:border-[#141414]'
                        }`}
                      >
                        ∅ RETIRAR
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic target zones grid (Right column) */}
          <div className="xl:col-span-12 lg:xl:col-span-7 space-y-6">
            <div className="bg-white rounded-none border-2 border-[#141414] p-5 space-y-5 shadow-hard-sm">
              <h4 className="text-base font-bold font-mono text-[#141414] flex items-center gap-1.5 border-b-2 border-dashed border-[#141414] pb-3 uppercase tracking-wider">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                TABLERO DE ESTRELLA EN CONSTRUCCIÓN
              </h4>

              {/* Grid schema areas */}
              <div className="space-y-4">
                {/* Fact Central Area container */}
                <div id="zone-ex1-fact" className="bg-[#fffbeb] border-2 border-[#141414] rounded-none p-4 min-h-[120px] transition-all shadow-hard-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 border-b border-[#141414] border-dashed pb-1">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-950 bg-amber-200 px-2.5 py-0.5 border border-[#141414]">
                      ▲ ZONA DE HECHOS (FACT TABLE)
                    </span>
                    <span className="text-[10px] text-slate-700 font-mono italic font-bold">Coloca la métrica central de transacciones</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {Object.entries(placedZones).filter(([_, zone]) => zone === 'FACT').map(([id]) => {
                      const tbl = activeEx.candidateTables.find(t => t.id === id);
                      return (
                        <span key={id} className="inline-flex items-center gap-1 text-xs font-bold font-mono px-3 py-1.5 bg-amber-400 text-black border-2 border-black shadow-hard-sm">
                          📊 {tbl?.name}
                        </span>
                      );
                    })}
                    {Object.values(placedZones).filter(z => z === 'FACT').length === 0 && (
                      <p className="text-slate-500 text-xs italic font-sans py-4 w-full text-center font-bold">No hay ninguna tabla clasificada como hecho para el reporte central.</p>
                    )}
                  </div>
                </div>

                {/* Dimensions Area Container */}
                <div id="zone-ex1-dim" className="bg-[#f0fdf4] border-2 border-[#141414] rounded-none p-4 min-h-[145px] transition-all shadow-hard-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 border-b border-[#141414] border-dashed pb-1">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-lime-950 bg-lime-300 px-2.5 py-0.5 border border-[#141414]">
                      ■ ZONA DE DIMENSIONES (PUNTAS ESTRELLA)
                    </span>
                    <span className="text-[10px] text-slate-700 font-mono italic font-bold">Catálogo o descriptores desnormalizados</span>
                  </div>

                  <div className="flex flex-wrap gap-2 py-1">
                    {Object.entries(placedZones).filter(([_, zone]) => zone === 'DIMENSION').map(([id]) => {
                      const tbl = activeEx.candidateTables.find(t => t.id === id);
                      return (
                        <span key={id} className="inline-flex items-center gap-1 text-xs font-bold font-mono px-3 py-1.5 bg-lime-400 text-black border-2 border-[#141414] shadow-hard-sm">
                          🏷️ {tbl?.name}
                        </span>
                      );
                    })}
                    {Object.values(placedZones).filter(z => z === 'DIMENSION').length === 0 && (
                      <p className="text-slate-500 text-xs italic font-sans py-6 w-full text-center font-bold">Agrega las puntas descriptivas para contextualizar la tabla de hechos.</p>
                    )}
                  </div>
                </div>

                {/* Discarded Support zone */}
                <div id="zone-ex1-discard" className="bg-[#fafaf9] border-2 border-[#141414] rounded-none p-3 shadow-hard-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-300 pb-0.5 font-mono">∅ TABLAS DESECHADAS (SOPORTE TÉCNICO O LOGS)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(placedZones).filter(([_, zone]) => zone === 'DISTRACTOR').map(([id]) => {
                      const tbl = activeEx.candidateTables.find(t => t.id === id);
                      return (
                        <span key={id} className="text-[10px] font-bold font-mono bg-rose-100 text-rose-950 px-2.5 py-1 border border-rose-400">
                          {tbl?.name}
                        </span>
                      );
                    })}
                    {Object.values(placedZones).filter(z => z === 'DISTRACTOR').length === 0 && (
                      <span className="text-slate-500 text-[10px] italic font-bold">Ninguna tabla descartada aún. No arrastres logs de auditorías de red.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Real link mapping sub-exercise inside Exercise 1 */}
              <div className="border-t-2 border-dashed border-[#141414] pt-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#141414] uppercase tracking-wide font-mono">
                  <Sparkles className="w-4 h-4 text-slate-800" />
                  VINCULAR LLAVES FORÁNEAS (FK) A LA DE HECHOS
                </div>
                <p className="text-slate-700 text-xs font-sans font-semibold leading-relaxed">
                  Para que la consulta reporte datos, selecciona cuál es el campo correcto de la tabla de hechos que actúa como Llave Foránea para unirse con la llave primaria (PK) de cada Dimensión:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeEx.fksToMap.map((item) => (
                    <div key={item.id} className="bg-[#fafaf9] p-3 rounded-none border-2 border-[#141414] text-xs shadow-hard-sm">
                      <p className="font-bold text-slate-900 mb-1.5 pr-1 truncate font-mono">
                        🔑 {item.label} <span className="text-slate-500">({item.pKey})</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-bold">➔ se une con:</span>
                        <select
                          id={`select-ex1-fk-${item.id}`}
                          value={fkMappings[item.id] || ''}
                          onChange={(e) => handleFkChange(item.id, e.target.value)}
                          className="bg-white border-2 border-black rounded-none px-2 py-1 text-xs text-slate-800 font-mono font-bold focus:outline-hidden focus:bg-[#fefce8] cursor-pointer flex-1"
                        >
                          <option value="">-- Seleccionar --</option>
                          {currentExercise === 0 ? (
                            <>
                              <option value="ticket_id">ticket_id</option>
                              <option value="fecha_id">fecha_id</option>
                              <option value="producto_id">producto_id</option>
                              <option value="cliente_id">cliente_id</option>
                              <option value="sucursal_id">sucursal_id</option>
                              <option value="unidades">unidades</option>
                            </>
                          ) : (
                            <>
                              <option value="atencion_id">atencion_id</option>
                              <option value="fecha_id">fecha_id</option>
                              <option value="paciente_id">paciente_id</option>
                              <option value="medico_id">medico_id</option>
                              <option value="diagnostico_id">diagnostico_id</option>
                              <option value="duracion_minutos">duracion_minutos</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluator trigger bottom buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t-2 border-dashed border-[#141414]">
                <button
                  id="btn-ex1-reset"
                  onClick={handleReset}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold font-mono rounded-none border-2 border-[#141414] shadow-hard-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  REINICIAR EJERCICIO
                </button>

                <button
                  id="btn-ex1-evaluate"
                  onClick={handleEvaluate}
                  className="px-6 py-2.5 bg-lime-400 hover:bg-lime-500 text-black text-xs font-bold font-mono rounded-none border-2 border-[#141414] shadow-hard transition-all cursor-pointer flex items-center gap-1.5"
                  title="Clasificar y Probar Modelo"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  CALIFICAR ESQUEMA ESTRELLA
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

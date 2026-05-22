import React, { useState } from 'react';
import { HelpCircle, Check, X, RotateCw, Trophy, Award, BookOpen } from 'lucide-react';
import { QuizQuestion } from '../types';
import { TeacherAssistant } from './TeacherAssistant';

export function QuizSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [score, setScore] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [teacherMsg, setTeacherMsg] = useState<string>(
    '¡Llegó la hora de la verdad, colega! 👨‍🏫 Aquí evaluamos tu sentido analítico para el modelado en la vida real. Responde estas 4 preguntas clave!'
  );
  const [teacherMood, setTeacherMood] = useState<'neutral' | 'happy' | 'idea' | 'warning' | 'success'>('neutral');

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: '¿Cuál es la principal característica y ventaja del Modelo en Estrella?',
      options: [
        'Organiza las dimensiones de forma altamente normalizada en tercera forma normal (3NF) para optimizar el almacenamiento.',
        'Posee una tabla de hechos central y dimensiones desnormalizadas, reduciendo los JOINs en consultas de lectura masiva.',
        'No permite el uso de claves subrogadas, forzando claves naturales de negocio únicamente.',
        'Elimina por completo la necesidad de contar con tablas de hechos.'
      ],
      correctAnswer: 1,
      explanation: 'El beneficio core de la estrella es la DESNORMALIZACIÓN en dimensiones de primer nivel. Esto reduce el número de JOINs requeridos a uno solo por filtro, aumentando drásticamente la agilidad de los reportes.'
    },
    {
      id: 2,
      question: 'En un modelo Copo de Nieve (Snowflake), ¿qué sucede con las dimensiones de segundo nivel?',
      options: [
        'Se fusionan directamente con la tabla de hechos duplicando registros numéricos.',
        'Se eliminan de la base de datos por considerarse redundantes.',
        'Se normalizan y aíslan en tablas independientes reduciendo la redundancia de datos repetidos.',
        'Se conectan exclusivamente mediante disparadores automáticos (Triggers).'
      ],
      correctAnswer: 2,
      explanation: 'En el copo de nieve, las dimensiones se normalizan subdividiéndose en cascada (como "Clientes" que apunta a "Geografía"). Esto ahorra espacio y optimiza la integridad referencial directiva.'
    },
    {
      id: 3,
      question: '¿Qué tipo de información se debe guardar prioritariamente dentro de una Tabla de Hechos (Fact Table)?',
      options: [
        'Descripciones extendidas del cliente como teléfono, dirección y tipo de sangre.',
        'Parámetros generales de configuración y logs de auditoría de red.',
        'Métricas cuantitativas del negocio (Monto venta, Unidades, Tiempos transcurridos) y claves foráneas a las dimensiones.',
        'Nombres sistemáticos de las sucursales del concesionario.'
      ],
      correctAnswer: 2,
      explanation: 'Las tablas de hechos almacenan transacciones y mediciones de valor acumulativo (Monto Ventas, Cantidad, Factura total) que se ligan a las dimensiones mediante llaves FK.'
    },
    {
      id: 4,
      question: '¿Cuándo un docente experto recomendaría un diseño estrella por sobre un copo de nieve?',
      options: [
        'Cuando el motor de Base de Datos es sumamente lento gestionando JOINS y los analistas demandan consultas sumamente fáciles.',
        'Cuando queremos forzar redundancia de datos de forma destructiva y maliciosa.',
        'Únicamente cuando se cuenta con bases de datos en hojas de cálculo planas.',
        'Cuando no nos importa el orden administrativo de las claves PK/FK en absoluto.'
      ],
      correctAnswer: 0,
      explanation: 'El diseño Estrella se recomienda cuando se busca máxima simplicidad para redactar queries y rapidez del motor de procesamiento al resolver Joins rápidos.'
    }
  ];

  const handleSelectOption = (qId: number, oIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: oIdx
    }));
  };

  const handleEvaluateQuiz = () => {
    let correctCount = 0;
    let completedAll = true;

    questions.forEach(q => {
      const selection = selectedAnswers[q.id];
      if (selection === undefined) {
        completedAll = false;
      } else if (selection === q.correctAnswer) {
        correctCount++;
      }
    });

    if (!completedAll) {
      setTeacherMood('warning');
      setTeacherMsg('¡Alto ahí! Debes contestar las 4 preguntas de la cátedra para promediar tu calificación.');
      return;
    }

    setScore(correctCount);
    setShowFeedback(true);

    if (correctCount === 4) {
      setTeacherMood('success');
      setTeacherMsg('¡100% SOBRESALIENTE! 🎓 Eres oficialmente un profesional en Inteligencia de Negocios. Has asimilado la diferencia entre redundancia controlada y normalización formal.');
    } else if (correctCount >= 2) {
      setTeacherMood('happy');
      setTeacherMsg(`¡Muy bien! Lograste un puntaje de ${correctCount}/4 en tu evaluación. Repasa las explicaciones de las preguntas fallidas en el pizarrón de abajo para perfeccionar el ojo analítico.`);
    } else {
      setTeacherMood('warning');
      setTeacherMsg(`Obtuviste ${correctCount}/4 de respuestas correctas. ¡No te desanimes! El modelado requiere práctica constante. Restablece el simulador para una segunda ronda.`);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setShowFeedback(false);
    setTeacherMood('neutral');
    setTeacherMsg('Banco de preguntas desocupado. ¡Léelas pacientemente para asegurar el éxito escolar!');
  };

  return (
    <div className="space-y-6">
      
      {/* Teacher Assistant inside Quiz */}
      <TeacherAssistant message={teacherMsg} mood={teacherMood} title="MSc. Jairo Acosta Solano (Docente)" />

      <div className="bg-[#fafaf9] rounded-none border-4 border-[#141414] p-6 shadow-hard mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-[#141414] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#141414] text-white rounded-none border border-black">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold font-mono uppercase text-[#141414]">
              Evaluación Teórica BI
            </h3>
          </div>

          {score !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-300 border-2 border-black text-black rounded-none text-xs font-bold font-mono shadow-hard-sm">
              <Trophy className="w-4 h-4 text-black" />
              PROMOCIÓN: {score} / 4 ({Math.round((score / 4) * 100)}%)
            </div>
          )}
        </div>

        {/* List of quiz questions */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userSelection = selectedAnswers[q.id];
            
            return (
              <div 
                key={q.id} 
                id={`quiz-question-${q.id}`}
                className="p-5 rounded-none border-2 border-[#141414] bg-white space-y-3 shadow-hard-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-none bg-black text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-950 text-sm font-mono leading-relaxed">
                    {q.question}
                  </h4>
                </div>

                {/* Option grid */}
                <div className="grid grid-cols-1 gap-2.5 pl-0 md:pl-9">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userSelection === oIdx;
                    const isCorrect = q.correctAnswer === oIdx;
                    
                    let bgClass = 'bg-white border-2 border-black text-slate-900 shadow-hard-xs hover:bg-[#fafaf9]';
                    let textClass = 'text-[#141414] font-semibold';

                    if (isSelected) {
                      bgClass = 'bg-indigo-300 border-2 border-black text-black font-bold shadow-hard-xs';
                      textClass = 'text-black font-bold';
                    }

                    if (showFeedback) {
                      if (isCorrect) {
                        bgClass = 'bg-emerald-300 border-2 border-black text-black font-black shadow-hard-sm';
                        textClass = 'text-slate-900 font-black';
                      } else if (isSelected && !isCorrect) {
                        bgClass = 'bg-rose-300 border-2 border-black text-black font-bold shadow-hard-sm';
                        textClass = 'text-rose-950';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        id={`btn-quiz-opt-${q.id}-${oIdx}`}
                        disabled={showFeedback}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`p-3 rounded-none border-2 text-left text-xs transition-all flex items-center gap-2.5 cursor-pointer ${bgClass}`}
                      >
                        {showFeedback ? (
                          isCorrect ? (
                            <Check className="w-4 h-4 text-emerald-950 stroke-[3px] shrink-0" />
                          ) : isSelected ? (
                            <X className="w-4 h-4 text-rose-950 stroke-[3px] shrink-0" />
                          ) : (
                            <span className="w-2 h-2 bg-slate-400 rounded-none border border-black shrink-0"></span>
                          )
                        ) : (
                          <div className={`w-5 h-5 rounded-none border-2 flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'bg-indigo-200 border-black font-mono font-bold text-black' : 'border-black bg-white'
                          }`}>
                            {oIdx + 1}
                          </div>
                        )}
                        <span className={textClass}>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question explanation feedback panel */}
                {showFeedback && (
                  <div className="pl-0 md:pl-9 pt-1 animate-fade-in">
                    <div className="bg-indigo-100 p-3 rounded-none border-2 border-black text-xs text-slate-800 font-sans leading-relaxed font-semibold shadow-hard-sm">
                      💡 <strong className="text-indigo-950 font-mono">Justificación Docente:</strong> {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer quiz controllers */}
        <div className="flex justify-end gap-3 border-t-2 border-dashed border-[#141414] pt-5 mt-6">
          <button
            id="btn-quiz-reset"
            onClick={handleResetQuiz}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold font-mono rounded-none border-2 border-[#141414] shadow-hard-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            REINICIAR EXAMEN
          </button>

          <button
            id="btn-quiz-evaluate"
            onClick={handleEvaluateQuiz}
            className="px-6 py-2.5 bg-lime-400 hover:bg-lime-500 text-black text-xs font-bold font-mono rounded-none border-2 border-black shadow-hard transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            ENVIAR RESPUESTAS
          </button>
        </div>
      </div>
    </div>
  );
}

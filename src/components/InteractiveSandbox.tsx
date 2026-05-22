import React, { useState } from 'react';
import { Database, ArrowRight, Table, Hash, HelpCircle, Layers, ZoomIn } from 'lucide-react';
import { motion } from 'motion/react';
import { Column, Table as TableType } from '../types';

export function InteractiveSandbox() {
  const [schema, setSchema] = useState<'STAR' | 'SNOWFLAKE'>('STAR');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Define tables in STAR layout
  const starTables: TableType[] = [
    {
      id: 'h_ventas',
      name: 'FACT_Ventas_Retail',
      type: 'FACT',
      description: 'Métrica central que almacena cada ticket de compra. Es agregable y rápida para consultas directas.',
      columns: [
        { name: 'venta_id', type: 'INT (PK)', isKey: true, description: 'Clave primaria del registro de venta.' },
        { name: 'fecha_key', type: 'INT (FK)', isForeignKey: true, references: 'd_tiempo', description: 'Atributo de fecha (FK).' },
        { name: 'producto_key', type: 'INT (FK)', isForeignKey: true, references: 'd_producto', description: 'Referencia de producto (FK).' },
        { name: 'cliente_key', type: 'INT (FK)', isForeignKey: true, references: 'd_cliente', description: 'Referencia de cliente (FK).' },
        { name: 'sucursal_key', type: 'INT (FK)', isForeignKey: true, references: 'd_sucursal', description: 'Referencia de sucursal (FK).' },
        { name: 'cantidad', type: 'INT', description: 'Unidades vendidas de un producto en la transacción.' },
        { name: 'monto_bruto', type: 'DECIMAL', description: 'Total de venta sin impuestos.' },
        { name: 'monto_descuento', type: 'DECIMAL', description: 'Descuento total aplicado.' }
      ]
    },
    {
      id: 'd_producto',
      name: 'DIM_Producto',
      type: 'DIMENSION',
      description: 'Tabla denormalizada que agrupa la información del artículo, su categoría y marca en un solo nivel para evitar JOINS.',
      columns: [
        { name: 'producto_key', type: 'INT (PK)', isKey: true, description: 'Clave subrogada única del producto.' },
        { name: 'sku', type: 'VARCHAR', description: 'Código único de inventario comercial.' },
        { name: 'nombre_producto', type: 'VARCHAR', description: 'Nombre descriptivo comercial.' },
        { name: 'marca', type: 'VARCHAR', description: 'Marca fabricante.' },
        { name: 'categoria', type: 'VARCHAR', description: 'Categoría principal (E.g. Electrónica) - ¡Denormalizado aquí!' },
        { name: 'proveedor', type: 'VARCHAR', description: 'Nombre del proveedor directo - ¡Denormalizado aquí!' }
      ]
    },
    {
      id: 'd_cliente',
      name: 'DIM_Cliente',
      type: 'DIMENSION',
      description: 'Detalles consolidados del cliente. Sus datos demográficos y geográficos están desnormalizados para maximizar velocidad.',
      columns: [
        { name: 'cliente_key', type: 'INT (PK)', isKey: true, description: 'Clave subrogada única del cliente.' },
        { name: 'cedula_ruc', type: 'VARCHAR', description: 'Identificación fiscal natural de la persona.' },
        { name: 'nombre_completo', type: 'VARCHAR', description: 'Nombres y apellidos completos.' },
        { name: 'genero', type: 'VARCHAR', description: 'Género biológico o de registro.' },
        { name: 'ciudad', type: 'VARCHAR', description: 'Ciudad residencial (E.g. Quito) - ¡Denormalizado aquí!' },
        { name: 'provincia_estado', type: 'VARCHAR', description: 'Provincia/Estado (E.g. Pichincha) - ¡Denormalizado aquí!' },
        { name: 'pais', type: 'VARCHAR', description: 'País del cliente (E.g. Ecuador) - ¡Denormalizado aquí!' }
      ]
    },
    {
      id: 'd_sucursal',
      name: 'DIM_Sucursal',
      type: 'DIMENSION',
      description: 'Datos de los locales comerciales. No requiere unirse a tablas relacionales de geografía bajo el modelo de estrella.',
      columns: [
        { name: 'sucursal_key', type: 'INT (PK)', isKey: true, description: 'Clave única del establecimiento comercial.' },
        { name: 'nombre_sucursal', type: 'VARCHAR', description: 'Nombre comercial de la tienda.' },
        { name: 'direccion', type: 'VARCHAR', description: 'Dirección física.' },
        { name: 'region', type: 'VARCHAR', description: 'Región corporativa asignada (E.g. Costa, Sierra).' }
      ]
    },
    {
      id: 'd_tiempo',
      name: 'DIM_Tiempo',
      type: 'DIMENSION',
      description: 'Dimensión clásica del Data Warehouse. Separa las jerarquías de fechas estándar para realizar consultas por períodos ágiles.',
      columns: [
        { name: 'fecha_key', type: 'INT (PK)', isKey: true, description: 'ID entero con formato AAAAMMDD.' },
        { name: 'fecha_completa', type: 'DATE', description: 'Fecha estándar completa.' },
        { name: 'dia_semana', type: 'VARCHAR', description: 'Nombre de día (E.g. Lunes).' },
        { name: 'mes_nombre', type: 'VARCHAR', description: 'Mes calendario (E.g. Mayo).' },
        { name: 'anio', type: 'INT', description: 'Año natural de 4 dígitos.' },
        { name: 'es_feriado', type: 'BOOLEAN', description: 'Bandera indicadora si es festivo.' }
      ]
    }
  ];

  // Define tables in SNOWFLAKE layout (with secondary, normalized dimensions)
  const snowflakeTables: TableType[] = [
    {
      id: 'h_ventas',
      name: 'FACT_Ventas_Retail',
      type: 'FACT',
      description: 'Métrica central que almacena de forma numérica y minimalista cada venta. No varía entre estrella y snowflake.',
      columns: [
        { name: 'venta_id', type: 'INT (PK)', isKey: true, description: 'Clave primaria del registro de venta.' },
        { name: 'fecha_key', type: 'INT (FK)', isForeignKey: true, references: 'd_tiempo', description: 'Atributo de fecha (FK).' },
        { name: 'producto_key', type: 'INT (FK)', isForeignKey: true, references: 'd_producto', description: 'Referencia directa del producto.' },
        { name: 'cliente_key', type: 'INT (FK)', isForeignKey: true, references: 'd_cliente', description: 'Referencia directa del cliente.' },
        { name: 'sucursal_key', type: 'INT (FK)', isForeignKey: true, references: 'd_sucursal', description: 'Referencia directa de sucursal.' },
        { name: 'cantidad', type: 'INT', description: 'Unidades vendidas de un producto.' },
        { name: 'monto_bruto', type: 'DECIMAL', description: 'Total de venta sin impuestos.' },
        { name: 'monto_descuento', type: 'DECIMAL', description: 'Descuento total aplicado.' }
      ]
    },
    {
      id: 'd_producto',
      name: 'DIM_Producto',
      type: 'DIMENSION',
      description: 'Ahora está NORMALIZADA. Ya no guarda texto duplicado de categorías ni proveedores; los enlaza por ID.',
      columns: [
        { name: 'producto_key', type: 'INT (PK)', isKey: true, description: 'Clave subrogada única.' },
        { name: 'sku', type: 'VARCHAR', description: 'Código único de inventario.' },
        { name: 'nombre_producto', type: 'VARCHAR', description: 'Nombre descriptivo.' },
        { name: 'marca', type: 'VARCHAR', description: 'Marca fabricante.' },
        { name: 'categoria_id', type: 'INT (FK)', isForeignKey: true, references: 'd_categoria', description: 'Conecta con DIM_Categoria para evitar repeticiones.' },
        { name: 'proveedor_id', type: 'INT (FK)', isForeignKey: true, references: 'd_proveedor', description: 'Conecta con la dimensión normalizada de Proveedores.' }
      ]
    },
    {
      id: 'd_cliente',
      name: 'DIM_Cliente',
      type: 'DIMENSION',
      description: 'Normalizada. Reemplaza los textos de Ciudad, Provincia y País por un identificador de Geografía estándar.',
      columns: [
        { name: 'cliente_key', type: 'INT (PK)', isKey: true, description: 'Clave subrogada única.' },
        { name: 'cedula_ruc', type: 'VARCHAR', description: 'Identificación fiscal.' },
        { name: 'nombre_completo', type: 'VARCHAR', description: 'Nombres y apellidos completos.' },
        { name: 'genero', type: 'VARCHAR', description: 'Género biológico.' },
        { name: 'geografia_id', type: 'INT (FK)', isForeignKey: true, references: 'd_geografia', description: 'Apunta a la dimensión normalizada de geografía.' }
      ]
    },
    {
      id: 'd_sucursal',
      name: 'DIM_Sucursal',
      type: 'DIMENSION',
      description: 'Forma abreviada ligada directamente a la dimensión de Geografía o Región.',
      columns: [
        { name: 'sucursal_key', type: 'INT (PK)', isKey: true, description: 'Clave única del establecimiento.' },
        { name: 'nombre_sucursal', type: 'VARCHAR', description: 'Nombre comercial de la tienda.' },
        { name: 'direccion', type: 'VARCHAR', description: 'Dirección física.' },
        { name: 'geografia_id', type: 'INT (FK)', isForeignKey: true, references: 'd_geografia', description: 'Usa una clave de geografía compartida.' }
      ]
    },
    {
      id: 'd_tiempo',
      name: 'DIM_Tiempo',
      type: 'DIMENSION',
      description: 'Permanece de un solo nivel dado que sus columnas no presentan un volumen de redundancia costoso.',
      columns: [
        { name: 'fecha_key', type: 'INT (PK)', isKey: true, description: 'ID entero con formato AAAAMMDD.' },
        { name: 'fecha_completa', type: 'DATE', description: 'Fecha completa.' },
        { name: 'dia_semana', type: 'VARCHAR', description: 'Día de la semana.' },
        { name: 'mes_nombre', type: 'VARCHAR', description: 'Nombre del mes.' },
        { name: 'anio', type: 'INT', description: 'Año calendario.' }
      ]
    },
    /* Secondary normalizer tables - Sub Dimensions */
    {
      id: 'd_categoria',
      name: 'DIM_Categoria',
      type: 'SUB_DIMENSION',
      description: 'Sub-Dimensión copo de nieve. Normaliza y cataloga las familias de productos para aislar datos textuales repetitivos.',
      columns: [
        { name: 'categoria_id', type: 'INT (PK)', isKey: true, description: 'ID único de categoría.' },
        { name: 'nombre_categoria', type: 'VARCHAR', description: 'Nombre descriptivo (E.g. Hogar, Línea Blanca).' },
        { name: 'linea_negocio', type: 'VARCHAR', description: 'Gran agrupación corporativa.' }
      ]
    },
    {
      id: 'd_proveedor',
      name: 'DIM_Proveedor',
      type: 'SUB_DIMENSION',
      description: 'Sub-Dimensión copo de nieve. Centraliza la información del fabricante, nit, y país del proveedor desligando al producto de cargar con estos datos.',
      columns: [
        { name: 'proveedor_id', type: 'INT (PK)', isKey: true, description: 'ID de proveedor.' },
        { name: 'razon_social', type: 'VARCHAR', description: 'Nombre legal de la proveedora.' },
        { name: 'nit_registro', type: 'VARCHAR', description: 'Registro mercantil de facturación.' }
      ]
    },
    {
      id: 'd_geografia',
      name: 'DIM_Geografia',
      type: 'SUB_DIMENSION',
      description: 'Sub-Dimensión copo de nieve muy clásica. Normaliza las jerarquías espaciales, evitando duplicación innecesaria en clientes y sucursales.',
      columns: [
        { name: 'geografia_id', type: 'INT (PK)', isKey: true, description: 'ID geográfico único.' },
        { name: 'ciudad', type: 'VARCHAR', description: 'Nombre formal de la urbe.' },
        { name: 'provincia', type: 'VARCHAR', description: 'Estado o provincia circunvecina.' },
        { name: 'pais', type: 'VARCHAR', description: 'País soberano.' }
      ]
    }
  ];

  const currentTables = schema === 'STAR' ? starTables : snowflakeTables;

  return (
    <div className="bg-white rounded-none border-4 border-[#141414] p-6 shadow-hard mb-6">
      {/* Simulation Header / Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b-2 border-dashed border-[#141414] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-[#141414] text-white rounded-none border border-[#141414] shadow-hard-sm">
              <Database className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold font-display text-[#141414]">
              Banco de Datos de Ventas: Caja de Arena (Sandbox)
            </h3>
          </div>
          <p className="text-slate-700 text-sm font-sans max-w-xl font-medium">
            Haz clic en los selectores para transformar el modelo completo. Observa de forma visual cómo
            se ramifican las tablas de dimensiones en el modelado copo de nieve para normalizar categorías o geografía.
          </p>
        </div>

        {/* Real Toggler Toggle */}
        <div id="sandbox-selector" className="flex items-center bg-[#fafaf9] p-1.5 rounded-none border-2 border-[#141414] shadow-hard-sm">
          <button
            id="sand-toggle-star"
            onClick={() => {
              setSchema('STAR');
              setSelectedTable(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              schema === 'STAR'
                ? 'bg-[#141414] text-white border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-200 hover:border-[#141414]'
            }`}
          >
            <Layers className="w-4 h-4" />
            Estrella (Star)
          </button>
          
          <button
            id="sand-toggle-snowflake"
            onClick={() => {
              setSchema('SNOWFLAKE');
              setSelectedTable(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
              schema === 'SNOWFLAKE'
                ? 'bg-amber-400 text-black border-[#141414] shadow-hard-sm'
                : 'text-slate-800 bg-transparent border-transparent hover:bg-slate-200 hover:border-[#141414]'
            }`}
          >
            <Database className="w-4 h-4" />
            Copo de Nieve (Snowflake)
          </button>
        </div>
      </div>

      {/* Main Sandbox Interactive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schema Diagram viewport (Left/Center) */}
        <div className="lg:col-span-2 bg-[#fbfbfa] rounded-none border-2 border-[#141414] p-6 min-h-[460px] flex flex-col justify-between relative overflow-hidden shadow-hard">
          
          {/* Legend */}
          <div className="flex flex-wrap gap-2.5 mb-2 z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-none text-[10px] font-mono font-bold border-2 border-[#141414] shadow-hard-sm">
              <span className="w-2.5 h-2.5 bg-amber-400 border border-[#141414] inline-block"></span> HECHOS (FACTS)
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-lime-100 text-lime-900 rounded-none text-[10px] font-mono font-bold border-2 border-[#141414] shadow-hard-sm">
              <span className="w-2.5 h-2.5 bg-lime-400 border border-[#141414] inline-block"></span> DIMENSIÓN
            </span>
            {schema === 'SNOWFLAKE' && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 text-purple-900 rounded-none text-[10px] font-mono font-bold border-2 border-[#141414] shadow-hard-sm">
                <span className="w-2.5 h-2.5 bg-purple-400 border border-[#141414] inline-block"></span> SUBDIMENSIÓN COPONUBE
              </span>
            )}
          </div>

          {/* Quick Informative Banner of Current state */}
          <div className="bg-white text-[#141414] p-4 rounded-none border-2 border-[#141414] shadow-hard-sm text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 z-10">
            <div>
              <p className="font-bold text-[#141414] uppercase tracking-wider text-[11px] font-mono">
                MODELO ACTUAL: <span className={schema === 'STAR' ? 'text-amber-700 font-black' : 'text-purple-700 font-black'}>
                  {schema === 'STAR' ? 'ESTRELLA (DESNORMALIZADA)' : 'COPO DE NIEVE (SNOWFLAKE NORMALIZADA)'}
                </span>
              </p>
              <p className="text-slate-600 text-[11px] mt-0.5 font-medium">
                {schema === 'STAR' 
                  ? 'Consultas súper rápidas con un único nivel de JOINs. Mayor duplicidad física de textos.' 
                  : 'Tablas esbeltas relacionales sin repeticiones de texto, pero requiere JOINs sucesivos.'}
              </p>
            </div>
            <div className="font-mono text-[10px] font-bold text-[#141414] bg-[#fafaf9] px-2.5 py-1 border-2 border-[#141414]">
              TABLAS: {currentTables.length}
            </div>
          </div>

          {/* Visual Interactive Schema Board */}
          <div className="relative flex-1 flex flex-col items-center justify-center py-6">
            
            {/* Center: Fact Table */}
            <div className="mb-8 z-10">
              {currentTables.filter(t => t.type === 'FACT').map(table => (
                <button
                  key={table.id}
                  id={`sandbox-table-${table.id}`}
                  onClick={() => setSelectedTable(table.id)}
                  className={`p-4 rounded-none text-left border-2 flex flex-col cursor-pointer transition-all ${
                    selectedTable === table.id 
                      ? 'border-[#141414] bg-amber-200 ring-4 ring-amber-100 shadow-hard scale-102' 
                      : 'border-[#141414] bg-white hover:border-[#141414] hover:bg-amber-50 shadow-hard-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[#141414] mb-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider bg-amber-300 text-slate-950 px-2 py-0.5 border border-black">HECHOS / FACT</span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">FK CLIENTES / PRODS</span>
                  </div>
                  <h4 className="font-black text-slate-950 text-sm font-mono">{table.name}</h4>
                  <div className="text-[11px] text-slate-700 font-mono mt-1 flex items-center gap-1 font-bold">
                    <Table className="w-3.5 h-3.5" />
                    <span>{table.columns.length} columnas agregables</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Around: Dimensions & Connections */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full z-10">
              
              {/* Primary Dimensions in STAR and SNOWFLAKE */}
              {currentTables.filter(t => t.type === 'DIMENSION').map(table => {
                const isSelected = selectedTable === table.id;
                
                // Find if this primary dim normalizes into a sub-dimension in snowflake
                const usesSubDim = schema === 'SNOWFLAKE' && (
                  table.id === 'd_producto' || table.id === 'd_cliente' || table.id === 'd_sucursal'
                );

                return (
                  <div key={table.id} className="flex flex-col items-center">
                    <button
                      id={`sandbox-table-${table.id}`}
                      onClick={() => setSelectedTable(table.id)}
                      className={`p-3 rounded-none border-2 text-left w-full transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#141414] bg-lime-200 ring-4 ring-lime-100 shadow-hard'
                          : 'border-[#141414] bg-white hover:border-[#141414] hover:bg-lime-50 shadow-hard-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[#141414] mb-1">
                        <span className="text-[9px] font-bold font-mono tracking-wider bg-lime-300 px-1.5 py-0.5 border border-[#141414]">DIMENSIÓN</span>
                        <Table className="w-3 h-3 text-slate-600" />
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs truncate font-mono">{table.name}</h5>
                      <span className="text-[10px] text-slate-600 font-mono mt-1 block">Atributos: {table.columns.length}</span>
                      
                      {/* Sub-dimension indicator dots */}
                      {usesSubDim && (
                        <div className="mt-1.5 pt-1.5 border-t border-[#141414] border-dashed flex items-center justify-between text-[9px] font-bold text-purple-800 uppercase font-mono">
                          <span>Jerarquía</span>
                          <span className="inline-block w-2.5 h-2.5 bg-purple-500 border border-black animate-pulse"></span>
                        </div>
                      )}
                    </button>

                    {/* Arrow pointing to secondary dimension if Snowflake */}
                    {usesSubDim && (
                      <div className="flex flex-col items-center mt-2">
                        <div className="h-3 w-0.5 border-r border-[#141414]"></div>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-800 rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Third Tier: Sub Dimensions (Only visible in snowflake schema) */}
            {schema === 'SNOWFLAKE' && (
              <div className="w-full mt-4 grid grid-cols-3 gap-2.5 z-10 border-t-2 border-dashed border-[#141414] pt-5">
                {currentTables.filter(t => t.type === 'SUB_DIMENSION').map(table => {
                  const isSelected = selectedTable === table.id;
                  let colorClass = isSelected 
                    ? 'border-[#141414] bg-purple-200 ring-4 ring-purple-100 shadow-hard' 
                    : 'border-[#141414] bg-white hover:border-[#141414] hover:bg-purple-50 shadow-hard-sm';
                  
                  return (
                    <button
                      key={table.id}
                      id={`sandbox-table-${table.id}`}
                      onClick={() => setSelectedTable(table.id)}
                      className={`p-3 rounded-none border-2 text-left transition-all cursor-pointer ${colorClass}`}
                    >
                      <div className="flex items-center justify-between text-purple-800 mb-0.5">
                        <span className="text-[8px] font-bold font-mono tracking-wider bg-purple-300 px-1 py-0.5 border border-purple-800">COPO_SUBDIM</span>
                        <Table className="w-3 h-3 text-purple-800" />
                      </div>
                      <h6 className="font-bold text-slate-900 text-xs truncate font-mono">{table.name}</h6>
                      <p className="text-[9px] text-slate-600 font-mono mt-1 font-medium">Enlaza con: {
                        table.id === 'd_categoria' ? 'DIM_Producto' : 
                        table.id === 'd_proveedor' ? 'DIM_Producto' : 'DIM_Cliente / Sucursales'
                      }</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Table details (Right Panel) */}
        <div className="bg-[#fafaf9] text-[#141414] border-2 border-[#141414] rounded-none p-5 flex flex-col justify-between shadow-hard">
          {selectedTable ? (
            (() => {
              const table = currentTables.find(t => t.id === selectedTable);
              if (!table) return null;
              
              return (
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 border border-[#141414] rounded-none font-mono text-[10px] font-bold ${
                        table.type === 'FACT' 
                          ? 'bg-amber-300 text-slate-950' 
                          : table.type === 'DIMENSION' 
                          ? 'bg-lime-300 text-slate-950' 
                          : 'bg-purple-300 text-slate-950'
                      }`}>
                        {table.type}
                      </span>
                      <span className="text-slate-600 font-mono text-xs font-bold">META_TABLA</span>
                    </div>

                    <h4 className="text-lg font-bold font-mono text-[#141414] border-b-2 border-[#141414] pb-2 flex items-center gap-1.5">
                      <Table className="w-4 h-4 text-slate-800" />
                      {table.name}
                    </h4>

                    {/* Table description */}
                    <p className="text-xs text-slate-700 font-sans mt-3 leading-relaxed font-medium">
                      {table.description}
                    </p>

                    {/* Columns Checklist */}
                    <div className="mt-5">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-2 flex items-center gap-1 border-b border-[#141414] pb-1">
                        <Layers className="w-3.5 h-3.5" />
                        COLUMNAS ({table.columns.length})
                      </h5>
                      <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                        {table.columns.map((column, idx) => (
                          <div 
                            key={idx} 
                            className={`p-2 rounded-none text-xs flex justify-between items-start gap-2 border-2 ${
                              column.isKey 
                                ? 'bg-amber-100/80 border-amber-500 text-amber-950 font-bold' 
                                : column.isForeignKey 
                                ? 'bg-lime-105 bg-lime-100 border-lime-600 text-lime-950 font-bold' 
                                : 'bg-white border-[#141414]'
                            }`}
                          >
                            <div>
                              <p className="font-mono text-xs font-bold text-[#141414] flex items-center gap-1">
                                {column.isKey && <span className="text-amber-600">🔑</span>}
                                {column.isForeignKey && <span className="text-lime-700">🔗</span>}
                                {column.name}
                              </p>
                              <p className="text-[10px] text-slate-700 mt-0.5 leading-tight font-sans font-medium">
                                {column.description}
                              </p>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-none bg-[#141414] text-white whitespace-nowrap">
                              {column.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Help tip in bottom */}
                  <div className="mt-4 pt-3 border-t-2 border-dashed border-[#141414] text-[11px] text-slate-800 font-sans leading-relaxed font-bold">
                    💡 <span className="font-bold underline">Nota del Profe:</span> {
                      table.type === 'FACT' 
                        ? 'La velocidad radica en evitar JOINS pesados. Las claves FK nos llevan directamente a los descriptores.' 
                        : 'En el diseño estrella, no normalizamos este contenido para favorecer al motor SQL.'
                    }
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-16 h-16 rounded-none bg-[#141414] text-white flex items-center justify-center mb-4 shadow-hard-sm border-2 border-black">
                <ZoomIn className="w-7 h-7" />
              </div>
              <p className="font-bold text-[#141414] font-mono mb-1 text-base uppercase">Inspeccionar Tabla</p>
              <p className="text-xs text-slate-700 max-w-xs leading-relaxed font-sans font-medium">
                Haz clic en cualquier tabla representada en el pizarrón de la izquierda para analizar sus columnas, claves subrogadas, foráneas y su respectiva descripción académica.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

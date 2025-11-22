import React, { useState } from 'react';
// Importação dos ícones solicitados (MUI)
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Interface para as props dos Cards
interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendColor?: 'text-green-400' | 'text-red-400';
  icon?: React.ReactNode;
  className?: string;
}

// Componente Reutilizável para os Cards Pequenos (Topo e Canto Inferior Direito)
const StatCard: React.FC<DashboardCardProps> = ({ title, value, subtitle, trend, trendColor, icon, className }) => (
  <div className={`bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      {icon && <div className="p-2 bg-slate-800 rounded-lg text-blue-400">{icon}</div>}
    </div>
    <div className="mt-4 flex items-center text-xs">
      {trend && <span className={`${trendColor} font-bold mr-2`}>{trend}</span>}
      <span className="text-gray-500">{subtitle}</span>
    </div>
  </div>
);

export default function DashboardPage() {
  // Estado para controlar os filtros (Dia, Mês, Ano)
  const [activeFilter, setActiveFilter] = useState<'dia' | 'mes' | 'ano' | 'pontuacao'>('dia');

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100 overflow-hidden">
      
      {/* ============================================================
          SIDEBAR (Caixa Azul/Ciano)
          ============================================================ */}
      <aside className="w-full md:w-64 bg-cyan-100 flex flex-col justify-between p-4 shadow-xl z-10 relative">
        
        {/* Topo da Sidebar */}
        <div className="space-y-8">
          
          {/* LOGO (Caixa Rosa) */}
          <div className="w-full h-24 bg-white rounded-xl border-4 border-pink-400 flex items-center justify-center shadow-sm">
            {/* Substitua este src pela imagem importada do seu projeto */}
            <img 
              src="/path-to-your-logo.png" 
              alt="To Do List Logo" 
              className="h-16 object-contain" // Ajuste conforme sua imagem
            /> 
            {/* Fallback visual se não tiver imagem ainda */}
            <span className="text-pink-500 font-bold text-xs absolute bottom-2">TO DO LIST</span>
          </div>

          {/* BOTÕES DE FILTRO (Caixas Vermelhas - Topo) */}
          <nav className="space-y-3">
            <p className="text-cyan-800 font-semibold text-sm uppercase ml-2 mb-2">Filtros</p>
            
            <FilterButton 
              label="Dia" 
              icon={<WbSunnyOutlinedIcon />} 
              isActive={activeFilter === 'dia'} 
              onClick={() => setActiveFilter('dia')}
            />
            <FilterButton 
              label="Mês" 
              icon={<CalendarViewMonthIcon />} 
              isActive={activeFilter === 'mes'} 
              onClick={() => setActiveFilter('mes')}
            />
            <FilterButton 
              label="Ano" 
              icon={<CalendarTodayIcon />} 
              isActive={activeFilter === 'ano'} 
              onClick={() => setActiveFilter('ano')}
            />
            <FilterButton 
              label="Pontuação" 
              icon={<StarBorderIcon />} 
              isActive={activeFilter === 'pontuacao'} 
              onClick={() => setActiveFilter('pontuacao')}
            />
          </nav>
        </div>

        {/* BOTÃO VOLTAR (Caixa Vermelha - Baixo) */}
        <div className="mt-auto pt-6">
          <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow-md transition-all font-bold">
            <ArrowBackIcon />
            <span>Voltar</span>
          </button>
        </div>
      </aside>


      {/* ============================================================
          CONTEÚDO PRINCIPAL (Área dos Dashboards - Verde)
          ============================================================ */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* LINHA 1: 3 Cards de Estatísticas (Users, Conversions, Event Count) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Atividades Finalizadas (Users na img) */}
            <StatCard 
              title="Atividades Finalizadas" 
              value="14k" 
              subtitle="Últimos 30 dias" 
              trend="+25%" 
              trendColor="text-green-400"
              icon={<GroupIcon />}
            />
            
            {/* Card 2: Atividades que Faltam (Conversions na img) */}
            <StatCard 
              title="Atividades Pendentes" 
              value="325" 
              subtitle="Últimos 30 dias" 
              trend="-25%" 
              trendColor="text-red-400"
              icon={<AssignmentTurnedInIcon />}
            />

            {/* Card 3: Pontuações em XP (Event Count na img) */}
            <StatCard 
              title="Pontuação XP" 
              value="200k" 
              subtitle="Últimos 30 dias" 
              trend="+5%" 
              trendColor="text-green-400"
              icon={<StarBorderIcon />}
            />
          </div>


          {/* LINHA 2: Gráficos Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Gráfico de Linha (Esquerda - Ocupa 2 espaços) - XP Infinito */}
            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl shadow-lg min-h-[300px] flex flex-col">
              <h3 className="text-white font-bold mb-1">Evolução de XP</h3>
              <p className="text-gray-400 text-xs mb-4">Conclusões de 0 a XP infinito</p>
              
              {/* Placeholder do Gráfico (Onde você colocará o Recharts ou ChartJS) */}
              <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 border-b border-l border-gray-700 relative">
                 {/* Simulação visual de um gráfico de linhas com CSS puro para o esqueleto */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    <TrendingUpIcon style={{ fontSize: 60, opacity: 0.2 }} />
                    <span className="ml-2 text-sm">Área do Gráfico de Linha</span>
                 </div>
                 <div className="w-full h-full bg-gradient-to-t from-blue-900/20 to-transparent rounded"></div>
              </div>
            </div>

            {/* Gráfico de Barras (Direita - Ocupa 1 espaço) - Subtotal Meses */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg min-h-[300px] flex flex-col">
              <h3 className="text-white font-bold mb-1">Visão Mensal</h3>
              <p className="text-gray-400 text-xs mb-4">Page views e downloads</p>
              
              {/* Placeholder do Gráfico de Barras */}
              <div className="flex-1 flex items-end justify-around gap-2 border-b border-gray-700 pb-2">
                  {[40, 60, 30, 80, 50, 70].map((h, i) => (
                    <div key={i} className="w-8 bg-blue-500 rounded-t hover:bg-blue-400 transition-all" style={{ height: `${h}%` }}></div>
                  ))}
              </div>
            </div>
          </div>


          {/* LINHA 3: Tabela e Card de Subtotal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tabela (Esquerda - Ocupa 2 espaços) - Histórico */}
            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl shadow-lg overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold">Histórico de Atividades</h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300">Ver tudo</button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-gray-400 text-sm">
                    <thead className="text-xs uppercase text-gray-500 bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 rounded-l-lg">Name</th>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-r-lg">Dep.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {/* Linhas Mockadas */}
                      {[1, 2, 3].map((item) => (
                        <tr key={item} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3 text-white font-medium">Atividade Exemplo {item}</td>
                          <td className="px-4 py-3">15/07/2025</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs ${item === 2 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                              {item === 2 ? 'Pendente' : 'Concluído'}
                            </span>
                          </td>
                          <td className="px-4 py-3">Dev</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>

            {/* Card Pequeno (Direita - Ocupa 1 espaço) - Subtotal/Saldo */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg flex flex-col justify-center">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                   <AttachMoneyIcon className="text-blue-400" />
                </div>
                <h3 className="text-gray-400 text-sm">Saldo Total (Sub-total)</h3>
                <p className="text-4xl font-bold text-white mt-2">$3,024.00</p>
                <p className="text-gray-500 text-xs mt-1">Sem filtro de data</p>
                
                <button className="mt-6 w-full py-2 border border-slate-700 text-blue-400 rounded-lg hover:bg-slate-800 transition-all text-sm font-semibold">
                  Ver Detalhes
                </button>
            </div>

          </div>
          
        </div>
      </main>
    </div>
  );
}

// Componente Auxiliar para os Botões da Sidebar
const FilterButton = ({ label, icon, isActive, onClick }: { label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
      ${isActive 
        ? 'bg-orange-500 text-white shadow-md translate-x-1' // Estado Ativo (Vermelho/Laranja da img)
        : 'bg-white/50 text-gray-600 hover:bg-white hover:shadow-sm' // Estado Inativo
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);
import React, { useState, useEffect } from 'react';
// Import da Logo
import logoImg from "../assets/logo.png"; 

// Ícones do Material UI
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

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

// Componente Reutilizável para os Cards Pequenos
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
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'dia' | 'mes' | 'ano' | 'pontuacao'>('dia');
  
  // Estado Inicial ZERADO (Para indicar que não há conexão com o banco ainda)
  const [stats] = useState({
    finalizadas: "0",
    pendentes: "0",
    xp: "0"
  });

  // --- LÓGICA DOS FILTROS E CONEXÃO ---
  // Este useEffect roda toda vez que 'activeFilter' muda (quando você clica no botão)
  useEffect(() => {
    console.log("Filtro alterado para:", activeFilter);

    // 1. SIMULAÇÃO LOCAL (COMENTADA PARA MANTER ZERADO)
    // Descomente este bloco se quiser ver valores fictícios mudando para teste.
    /*
    switch(activeFilter) {
      case 'dia':
        setStats({ finalizadas: "14k", pendentes: "325", xp: "200k" });
        break;
      case 'mes':
        setStats({ finalizadas: "450k", pendentes: "1.2k", xp: "5M" }); 
        break;
      case 'ano':
        setStats({ finalizadas: "5.2M", pendentes: "15k", xp: "60M" }); 
        break;
      case 'pontuacao':
        setStats({ finalizadas: "Rank #1", pendentes: "0", xp: "TOP 1" });
        break;
    }
    */

    // 2. CONEXÃO REAL COM O BANCO (COMENTADO)
    // Quando tiver o backend, use este código:
    /*
    async function fetchData() {
       try {
         // Passamos o filtro na URL. Ex: api.com/stats?periodo=mes
         const response = await fetch(`http://sua-api.com/dashboard-stats?periodo=${activeFilter}`);
         
         if (!response.ok) throw new Error('Falha ao buscar');

         const data = await response.json();
         
         // Atualiza a tela com os dados reais do banco
         setStats({
            finalizadas: data.totalCompleted, 
            pendentes: data.totalPending,     
            xp: data.totalXp                  
         });
       } catch (error) {
         console.error("Erro na conexão:", error);
       }
    }
    fetchData();
    */
    
  }, [activeFilter]); // <-- O segredo: esse array diz "Rode de novo se activeFilter mudar"

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100 overflow-hidden">
      
      {/* SIDEBAR (Esquerda) */}
      <aside className="w-full md:w-64 bg-cyan-100 flex flex-col justify-between p-4 shadow-xl z-10 relative">
        
        <div className="space-y-8">
          {/* LOGO (Atualizada - Maior e sem borda) */}
          <div className="w-full h-32 bg-white rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden p-2">
             <img 
               src={logoImg} 
               alt="Logo To Do List" 
               className="h-full w-auto object-contain"
             />
          </div>

          {/* FILTROS */}
          <nav className="space-y-3">
            <p className="text-cyan-800 font-semibold text-sm uppercase ml-2 mb-2">Filtros</p>
            
            <FilterButton label="Dia" icon={<WbSunnyOutlinedIcon />} isActive={activeFilter === 'dia'} onClick={() => setActiveFilter('dia')} />
            <FilterButton label="Mês" icon={<CalendarViewMonthIcon />} isActive={activeFilter === 'mes'} onClick={() => setActiveFilter('mes')} />
            <FilterButton label="Ano" icon={<CalendarTodayIcon />} isActive={activeFilter === 'ano'} onClick={() => setActiveFilter('ano')} />
            <FilterButton label="Pontuação" icon={<StarBorderIcon />} isActive={activeFilter === 'pontuacao'} onClick={() => setActiveFilter('pontuacao')} />
          </nav>
        </div>

        {/* BOTÃO VOLTAR */}
        <div className="mt-auto pt-6">
          <button 
            onClick={() => navigate("/tarefa")}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow-md transition-all font-bold">
              <ArrowBackIcon />
              <span>Voltar</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL (Direita) */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* LINHA 1: Cards (Dinâmicos) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Atividades Finalizadas" 
              value={stats.finalizadas} 
              subtitle={`Filtro: ${activeFilter}`} // Mostra qual filtro está ativo
              trend="+25%" 
              trendColor="text-green-400"
              icon={<GroupIcon />}
            />
            <StatCard 
              title="Atividades Pendentes" 
              value={stats.pendentes} 
              subtitle={`Filtro: ${activeFilter}`}
              trend="-25%" 
              trendColor="text-red-400"
              icon={<AssignmentTurnedInIcon />}
            />
            <StatCard 
              title="Pontuação XP" 
              value={stats.xp} 
              subtitle={`Filtro: ${activeFilter}`} 
              trend="+5%" 
              trendColor="text-green-400"
              icon={<StarBorderIcon />}
            />
          </div>

          {/* LINHA 2: Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico Grande */}
            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl shadow-lg min-h-[300px] flex flex-col">
              <h3 className="text-white font-bold mb-1">Evolução de XP</h3>
              <p className="text-gray-400 text-xs mb-4">Conclusões de 0 a XP infinito</p>
              <div className="flex-1 flex items-end justify-center border-b border-l border-gray-700 relative">
                 <div className="flex items-center text-gray-600">
                    <TrendingUpIcon style={{ fontSize: 60, opacity: 0.2 }} />
                    <span className="ml-2 text-sm">Gráfico Carregando...</span>
                 </div>
              </div>
            </div>

            {/* Gráfico Pequeno */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg min-h-[300px] flex flex-col">
              <h3 className="text-white font-bold mb-1">Visão Mensal</h3>
              <p className="text-gray-400 text-xs mb-4">Page views e downloads</p>
              <div className="flex-1 flex items-end justify-around gap-2 border-b border-gray-700 pb-2">
                  {[40, 60, 30, 80, 50, 70].map((h, i) => (
                    <div key={i} className="w-8 bg-blue-500 rounded-t" style={{ height: `${h}%` }}></div>
                  ))}
              </div>
            </div>
          </div>

          {/* LINHA 3: Tabela e Saldo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl shadow-lg overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold">Histórico de Atividades</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-gray-400 text-sm">
                    <thead className="text-xs uppercase text-gray-500 bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Dep.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[1, 2, 3].map((item) => (
                        <tr key={item} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3 text-white">Atividade {item}</td>
                          <td className="px-4 py-3">15/07/2025</td>
                          <td className="px-4 py-3">Concluído</td>
                          <td className="px-4 py-3">Dev</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl shadow-lg flex flex-col justify-center">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                   <AttachMoneyIcon className="text-blue-400" />
                </div>
                <h3 className="text-gray-400 text-sm">Saldo Total</h3>
                <p className="text-4xl font-bold text-white mt-2">$3,024.00</p>
                <button className="mt-6 w-full py-2 border border-slate-700 text-blue-400 rounded-lg">Ver Detalhes</button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

// Botão Auxiliar
const FilterButton = ({ label, icon, isActive, onClick }: { label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${isActive ? 'bg-orange-500 text-white shadow-md translate-x-1' : 'bg-white/50 text-gray-600 hover:bg-white'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
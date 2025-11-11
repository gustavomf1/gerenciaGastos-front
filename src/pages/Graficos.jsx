import React, { useEffect, useState } from "react";
import { getResumoPorCategoriaApi } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function GraficosPage() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    getResumoPorCategoriaApi().then((response) => {
        console.log("📌 DADOS DA API:", response);
      setDados(response);
    });
  }, []);

  const COLORS = ["#845EC2", "#FF6F91", "#F9F871", "#00C9A7", "#FF8066", "#4D8076"];

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1f1f2e, #12121c)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 0",
      fontFamily: "'Poppins', sans-serif",
    }}
  >
    <div
      style={{
        width: "65%",
        padding: "30px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(14px)",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => window.history.back()}
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          color: "#fff",
          fontSize: "14px",
          marginBottom: "15px",
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.target.style.background = "rgba(255,255,255,0.22)")}
        onMouseOut={(e) => (e.target.style.background = "rgba(255,255,255,0.12)")}
      >
        ← Voltar ao Dashboard
      </button>

      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: 25 }}>
        Gastos por Categoria
      </h2>

      <div style={{ width: "100%", height: 380 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dados}
              dataKey="totalAbsoluto"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ payload }) =>
                `${payload.categoria}: ${formatCurrency(payload.total)}`
              }
            >
              {dados.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#2a2a3d",
                borderRadius: "10px",
                border: "1px solid #444",
                color: "#fff",
              }}
              formatter={(value, name, props) =>
                formatCurrency(props.payload.total)
              }
            />

            <Legend
              wrapperStyle={{ color: "#fff", fontSize: "14px", marginTop: 10 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
}

export default GraficosPage;

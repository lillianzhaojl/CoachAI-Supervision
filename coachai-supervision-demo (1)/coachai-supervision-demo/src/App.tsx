import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export default function App() {
  // State must be declared before useEffect to avoid TDZ
  const [showReport, setShowReport] = useState(false);
  const [uploadedText, setUploadedText] = useState("");

  // Demo Data (ICF 8 competencies, equal weight conceptually)
  const radarData = [
    { competency: "展现职业道德操守", score: 8 },
    { competency: "体现教练思维", score: 7 },
    { competency: "创建及维护合约", score: 6 },
    { competency: "建立信任与安全感", score: 9 },
    { competency: "保持教练临在", score: 8 },
    { competency: "积极倾听", score: 8 },
    { competency: "引发觉察", score: 6 },
    { competency: "促进客户成长(设计行动)", score: 7 },
  ];

  const progressData = [
    { session: "S1", being: 5.5, doing: 6.0 },
    { session: "S2", being: 6.2, doing: 6.5 },
    { session: "S3", being: 6.8, doing: 7.0 },
    { session: "S4", being: 7.4, doing: 7.5 },
    { session: "S5", being: 8.0, doing: 8.0 },
  ];

  // Smoke tests (console-only)
  useEffect(() => {
    console.assert(Array.isArray(radarData) && radarData.length === 8, "[SmokeTest] 雷达图应包含 8 项 ICF 能力");
    const hasReport = !!document.getElementById("report");
    console.assert((!hasReport && !showReport) || (hasReport && showReport), "[SmokeTest] report 节点与状态不一致");
    const progress = document.getElementById("progress");
    console.assert(!!progress, "[SmokeTest] 进度区块应存在");
  }, [showReport]);

  return (
    <div className=\"min-h-screen bg-gray-50\">
      {/* Header */}
      <header className=\"p-6 bg-indigo-600 text-white flex justify-between items-center\">
        <h1 className=\"text-2xl font-bold\">CoachAI Supervisor</h1>
        <nav className=\"space-x-4\">
          <a
            href=\"#report\"
            className=\"hover:underline\"
            onClick={(e) => {
              e.preventDefault();
              setShowReport(true);
              setTimeout(() => {
                document.getElementById(\"report\")?.scrollIntoView({ behavior: \"smooth\" });
              }, 0);
            }}
          >
            示例报告
          </a>
          <a href=\"#competencies\" className=\"hover:underline\">能力细分</a>
          <a href=\"#practice\" className=\"hover:underline\">反思与练习</a>
          <a href=\"#progress\" className=\"hover:underline\">成长追踪</a>
          <a href=\"#contact\" className=\"hover:underline\">联系我们</a>
        </nav>
      </header>

      {/* Hero */}
      <section className=\"text-center py-16 bg-white\">
        <h2 className=\"text-4xl font-extrabold mb-4\">AI 驱动的 MCC 级别督导反馈</h2>
        <p className=\"text-lg text-gray-600 mb-6\">帮助教练精准对标 ICF MCC 标准，持续成长</p>
        <div className=\"max-w-xl mx-auto space-y-4\">
          <textarea
            className=\"w-full border rounded-lg p-3\"
            rows={5}
            placeholder=\"在这里粘贴逐字稿...（留空将展示演示数据）\"
            value={uploadedText}
            onChange={(e) => setUploadedText(e.target.value)}
          />
          <div className=\"text-sm text-gray-500\">
            当前为：{uploadedText ? \"根据您的逐字稿生成\" : \"演示模式（Demo 内容）\"}
          </div>
          <button className=\"px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition \" onClick={() => setShowReport(true)}>生成督导报告</button>
        </div>
      </section>

      {/* Report */}
      {showReport && (
        <section id=\"report\" className=\"px-6 py-12\" data-testid=\"section-report\">
          <h3 className=\"text-2xl font-bold mb-6\">📋 示例督导报告</h3>
          <div className=\"flex justify-end mb-4\">
            <button className=\"px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition \" onClick={() => window.print()}>导出 PDF</button>
          </div>
          <div className=\"grid md:grid-cols-2 gap-6\">
            <div className=\"rounded-2xl bg-white shadow-sm border border-gray-200\">
              <div className=\"p-4\">
                <h4 className=\"font-semibold mb-2\">整体反馈</h4>
                <p>✅ 优势：建立信任、保持临在<br/>⚡ 改进点：共创合约更充分；提问更开放，深化觉察</p>
              </div>
            </div>
            <div className=\"rounded-2xl bg-white shadow-sm border border-gray-200\">
              <div className=\"p-4\">
                <h4 className=\"font-semibold mb-2\">核心能力雷达图</h4>
                <div style={{width:'100%', height:260}}>
                  <ResponsiveContainer width=\"100%\" height={260}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey=\"competency\" />
                      <PolarRadiusAxis />
                      <Radar name=\"评分\" dataKey=\"score\" stroke=\"#4f46e5\" fill=\"#6366f1\" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Competencies */}
      {showReport && (
        <section id=\"competencies\" className=\"px-6 pb-12\" data-testid=\"section-competencies\">
          <h3 className=\"text-2xl font-bold mb-6\">🧩 ICF 核心能力逐项反馈</h3>
          <div className=\"grid md:grid-cols-2 gap-6\">
            {[
              { key: \"展现职业道德操守\", feedback: \"建议开场显性声明伦理、保密与边界，增强安全感与清晰度。\" },
              { key: \"体现教练思维\", feedback: \"减少给建议，示范好奇与不确定，邀请共同探索。\" },
              { key: \"创建及维护合约\", feedback: \"由客户定义成功样貌/边界/责任，并复述确认以确保对齐。\" },
              { key: \"建立信任与安全感\", feedback: \"使用情绪镜像、许可性问题，支持更深层表达。\" },
              { key: \"保持教练临在\", feedback: \"练习 5 秒沉默与呼吸，保持开放与不评判。\" },
              { key: \"积极倾听\", feedback: \"映射关键词与价值，追问‘为何重要’，深化意义层倾听。\" },
              { key: \"引发觉察\", feedback: \"探询价值观/信念的来源与影响，检视其当下有效性。\" },
              { key: \"促进客户成长(设计行动)\", feedback: \"让行动服务于新觉察；定义可观察成功指标与支持机制。\" },
            ].map((c) => (
              <div key={c.key} data-comp-card className=\"rounded-2xl bg-white shadow-sm border border-gray-200\">
                <div className=\"p-4 space-y-2\">
                  <h4 className=\"font-semibold\">{c.key}</h4>
                  <p>{c.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reflection + Practice */}
      {showReport && (
        <section id=\"practice\" className=\"px-6 pb-12\" data-testid=\"section-practice\">
          <h3 className=\"text-2xl font-bold mb-6\">🧠 反思问题 & 练习</h3>
          <div className=\"grid md:grid-cols-2 gap-6\">
            <div className=\"rounded-2xl bg-white shadow-sm border border-gray-200\">
              <div className=\"p-4 space-y-2\">
                <h4 className=\"font-semibold\">反思问题（Being/Doing）</h4>
                <ol className=\"list-decimal list-inside space-y-1\">
                  <li>当客户提到情绪时，我的内在冲动是什么？这如何影响了我？</li>
                  <li>若先共创成功标准，我的提问会有什么不同？</li>
                  <li>本次会谈中最具转化力的一次沉默在何处？</li>
                  <li>下次我将练习的 2 个觉察型问题是？</li>
                </ol>
              </div>
            </div>
            <div className=\"rounded-2xl bg-white shadow-sm border border-gray-200\">
              <div className=\"p-4 space-y-2\">
                <h4 className=\"font-semibold\">本周刻意练习（Practice Plan）</h4>
                <ul className=\"list-disc list-inside space-y-1\">
                  <li>协议共创脚本：目标/成功标准/边界/责任；客户复述确认。</li>
                  <li>记录 1 个“新看见”，并链接到下一步行动。</li>
                  <li>复盘录音，标注 3 个可替换为开放问题的点。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Progress (independent section) */}
      <section id=\"progress\" className=\"px-6 pb-12 bg-gray-100\" data-testid=\"section-progress\">
        <h3 className=\"text-2xl font-bold mb-6\">📈 成长追踪（Being vs Doing）</h3>
        <div style={{width:'100%', height:320}}>
          <ResponsiveContainer width=\"100%\" height={320}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray=\"3 3\" />
              <XAxis dataKey=\"session\" />
              <YAxis domain={[5, 9]} />
              <Tooltip />
              <Legend />
              <Line type=\"monotone\" dataKey=\"being\" name=\"Being\" stroke=\"#4f46e5\" strokeWidth={3} />
              <Line type=\"monotone\" dataKey=\"doing\" name=\"Doing\" stroke=\"#10b981\" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Contact */}
      <section id=\"contact\" className=\"text-center py-12 bg-indigo-50\" data-testid=\"section-contact\">
        <h3 className=\"text-2xl font-bold mb-4\">联系我们</h3>
        <p className=\"mb-4\">想成为早期体验用户？留下您的邮箱！</p>
        <input type=\"email\" placeholder=\"输入您的邮箱\" className=\"border rounded-lg p-2 mr-2\" aria-label=\"email\" />
        <button className=\"px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition \">
          提交
        </button>
      </section>

      <footer className=\"text-center py-6 text-gray-500 text-sm\">
        © 2025 CoachAI Supervisor. All rights reserved.
      </footer>
    </div>
  );
}

import React, { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import ResumeHTML from './ResumeHTML'
import resumeData from '@/data/resume.json'
import { AiOutlineDownload, AiOutlineEye, AiOutlineEyeInvisible, AiOutlinePrinter } from 'react-icons/ai'

export default function ResumeViewer() {
  const [showPDF, setShowPDF] = useState(false)
  const resumeRef = useRef()

  // Configuração para impressão/PDF
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `Curriculo-${resumeData.basics.name}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        .resume-html {
          font-size: 12px;
          line-height: 1.4;
        }
        .resume-header {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        .resume-section-title {
          border-bottom: 2px solid #2563eb !important;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        .resume-skill-tag {
          background: #dbeafe !important;
          color: #1e40af !important;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  })

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      {/* Header com controles */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Currículo Profissional</h1>
            <p className="text-blue-200">Visualização interativa e download em PDF</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Botão de visualização */}
            <button
              onClick={() => setShowPDF(!showPDF)}
              className="bg-white/20 hover:bg-white/30 border border-white/30 rounded px-4 py-2 flex items-center gap-2 transition-colors"
            >
              {showPDF ? <AiOutlineEyeInvisible className="w-4 h-4" /> : <AiOutlineEye className="w-4 h-4" />}
              {showPDF ? 'Ocultar Currículo' : 'Ver Currículo'}
            </button>

            {/* Botão de download/impressão */}
            <button
              onClick={handlePrint}
              className="bg-white/20 hover:bg-white/30 border border-white/30 rounded px-4 py-2 flex items-center gap-2 transition-colors"
            >
              <AiOutlinePrinter className="w-4 h-4" />
              Baixar PDF
            </button>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-sm text-blue-200">
            💡 <strong>Dica:</strong> Use "Ver Currículo" para visualizar o currículo completo, 
            ou "Baixar PDF" para salvar/imprimir uma cópia em PDF.
          </p>
        </div>
      </div>

      {/* Área de conteúdo */}
      <div className="relative">
        {showPDF ? (
          <div className="p-8 bg-gray-50 dark:bg-gray-800">
            <div ref={resumeRef} className="resume-container">
              <ResumeHTML />
            </div>
          </div>
        ) : (
          <div className="p-8">
            {/* Preview do currículo */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Preview do Currículo
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Clique em "Ver Currículo" para visualizar o currículo completo ou "Baixar PDF" para salvar uma cópia.
              </p>
              
              {/* Informações básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Informações Pessoais
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Nome:</strong> {resumeData.basics.name}</p>
                    <p><strong>Profissão:</strong> {resumeData.basics.label}</p>
                    <p><strong>Email:</strong> {resumeData.basics.email}</p>
                    <p><strong>Localização:</strong> {resumeData.basics.location.city}, {resumeData.basics.location.countryCode}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Principais Habilidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.slice(0, 6).map((skill) => 
                      skill.keywords.slice(0, 2).map((keyword, index) => (
                        <span
                          key={`${skill.name}-${index}`}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {resumeData.work.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Experiências Profissionais
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {resumeData.skills.reduce((acc, skill) => acc + skill.keywords.length, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Habilidades Técnicas
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {resumeData.languages.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Idiomas
                </div>
              </div>
            </div>

            {/* Instruções */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Como usar este currículo
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• <strong>Visualizar:</strong> Clique em "Ver Currículo" para ver o currículo completo</li>
                <li>• <strong>Baixar:</strong> Use "Baixar PDF" para salvar uma cópia local</li>
                <li>• <strong>Compartilhar:</strong> O PDF pode ser enviado por email ou impresso</li>
                <li>• <strong>Atualizar:</strong> O currículo é gerado automaticamente com os dados mais recentes</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
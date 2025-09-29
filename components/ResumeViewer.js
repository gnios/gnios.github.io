import React, { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import ResumeHTML from './ResumeHTML'
import resumeData from '@/data/resume.json'
import {
  AiOutlineDownload,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePrinter,
} from 'react-icons/ai'

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
    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
      {/* Header com controles */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Currículo Profissional</h1>
            <p className="text-blue-200">Visualização interativa e download em PDF</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Botão de visualização */}
            <button
              onClick={() => setShowPDF(!showPDF)}
              className="flex items-center gap-2 rounded border border-white/30 bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
            >
              {showPDF ? (
                <AiOutlineEyeInvisible className="h-4 w-4" />
              ) : (
                <AiOutlineEye className="h-4 w-4" />
              )}
              {showPDF ? 'Ocultar Currículo' : 'Ver Currículo'}
            </button>

            {/* Botão de download/impressão */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded border border-white/30 bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
            >
              <AiOutlinePrinter className="h-4 w-4" />
              Baixar PDF
            </button>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 rounded-lg bg-white/10 p-3">
          <p className="text-sm text-blue-200">
            💡 <strong>Dica:</strong> Use "Ver Currículo" para visualizar o currículo completo, ou
            "Baixar PDF" para salvar/imprimir uma cópia em PDF.
          </p>
        </div>
      </div>

      {/* Área de conteúdo */}
      <div className="relative">
        {showPDF ? (
          <div className="bg-gray-50 p-8 dark:bg-gray-800">
            <div ref={resumeRef} className="resume-container">
              <ResumeHTML />
            </div>
          </div>
        ) : (
          <div className="p-8">
            {/* Preview do currículo */}
            <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Preview do Currículo
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Clique em "Ver Currículo" para visualizar o currículo completo ou "Baixar PDF" para
                salvar uma cópia.
              </p>

              {/* Informações básicas */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Informações Pessoais
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Nome:</strong> {resumeData.basics.name}
                    </p>
                    <p>
                      <strong>Profissão:</strong> {resumeData.basics.label}
                    </p>
                    <p>
                      <strong>Email:</strong> {resumeData.basics.email}
                    </p>
                    <p>
                      <strong>Localização:</strong> {resumeData.basics.location.city},{' '}
                      {resumeData.basics.location.countryCode}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Principais Habilidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.slice(0, 6).map((skill) =>
                      skill.keywords.slice(0, 2).map((keyword, index) => (
                        <span
                          key={`${skill.name}-${index}`}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {resumeData.work.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Experiências Profissionais
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {resumeData.skills.reduce((acc, skill) => acc + skill.keywords.length, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Habilidades Técnicas</div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {resumeData.languages.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Idiomas</div>
              </div>
            </div>

            {/* Instruções */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
                Como usar este currículo
              </h3>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>
                  • <strong>Visualizar:</strong> Clique em "Ver Currículo" para ver o currículo
                  completo
                </li>
                <li>
                  • <strong>Baixar:</strong> Use "Baixar PDF" para salvar uma cópia local
                </li>
                <li>
                  • <strong>Compartilhar:</strong> O PDF pode ser enviado por email ou impresso
                </li>
                <li>
                  • <strong>Atualizar:</strong> O currículo é gerado automaticamente com os dados
                  mais recentes
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

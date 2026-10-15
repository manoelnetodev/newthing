import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Copy, Download, MessageCircle, RotateCcw } from 'lucide-react'
import { Button, ErrorMessage, Field, Modal } from './ui'
import { createBlueprint, createWhatsAppLink, formatBlueprint } from '../lib/projectBlueprint'
import './BriefModal.css'
export function BriefModal({
  onClose,
  initialStage = 'Tenho uma ideia',
  initialProject = '',
}: {
  onClose: () => void
  initialStage?: string
  initialProject?: string
}) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    stage: initialStage,
    project: initialProject,
  })
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState('')
  const summaryHeading = useRef<HTMLHeadingElement>(null)
  const plan = createBlueprint(values)
  const summary = formatBlueprint(values)
  const whatsappLink = createWhatsAppLink(import.meta.env.VITE_WHATSAPP_NUMBER, summary)
  useEffect(() => {
    if (ready) {
      summaryHeading.current?.focus()
      summaryHeading.current?.closest('dialog')?.scrollTo(0, 0)
    }
  }, [ready])
  function submit(event: FormEvent) {
    event.preventDefault()
    if (values.name.trim().length < 2 || values.project.trim().length < 15) {
      setError('Informe seu nome e descreva a ideia com pelo menos 15 caracteres.')
      return
    }
    setError(null)
    setReady(true)
  }
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'briefing-newthing.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyStatus('Resumo copiado!')
    } catch {
      setCopyStatus('A cópia não foi permitida neste navegador. Use a opção de baixar o resumo.')
    }
  }
  return (
    <Modal
      title={ready ? 'Seu plano inicial de projeto.' : 'Vamos conhecer a sua ideia.'}
      description={
        ready
          ? 'Revise a direção inicial e leve seu objetivo para uma conversa com a Newthing.'
          : 'Conte o que deseja realizar. Vamos organizar um ponto de partida para o seu projeto.'
      }
      onClose={onClose}
    >
      {ready ? (
        <div className="brief-success">
          <div className="brief-summary">
            <span>PLANO PRELIMINAR · SUJEITO À VALIDAÇÃO</span>
            <h3 ref={summaryHeading} tabIndex={-1}>
              {plan.title}
            </h3>
            <p>{values.project.trim()}</p>
            <small>
              {values.name.trim()} · {values.email.trim()}
            </small>
          </div>
          <div className="blueprint-section">
            <span className="blueprint-label">01 / ARQUITETURA A AVALIAR</span>
            <p>{plan.architecture}</p>
          </div>
          <div className="blueprint-section">
            <span className="blueprint-label">02 / PRIORIDADES PARA A PRIMEIRA VERSÃO</span>
            <ol className="blueprint-priorities">
              {plan.priorities.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="blueprint-team">
            <div>
              <span>NEGÓCIO & PRIORIDADES</span>
              <strong>Yuri + Maksuel</strong>
              <p>Contexto da empresa, operação e objetivos.</p>
            </div>
            <div>
              <span>ENGENHARIA & CONSTRUÇÃO</span>
              <strong>Manoel + Ronan</strong>
              <p>Viabilidade técnica e estrutura da solução.</p>
            </div>
          </div>
          <div className="blueprint-question">
            <strong>Vamos alinhar na conversa</strong>
            <p>{plan.question}</p>
          </div>
          <p className="local-note">
            Este plano é gerado pelas opções do briefing e ainda não foi analisado pela equipe.
            Escopo, tecnologia, prazo e investimento serão definidos com você.
          </p>
          <div className="blueprint-actions">
            {whatsappLink && (
              <a
                className="button button-primary blueprint-whatsapp"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Conversar no WhatsApp
                <ArrowRight size={16} />
              </a>
            )}
            <p className="blueprint-share-note">
              {whatsappLink
                ? 'Abre o WhatsApp com este resumo preenchido. Você revisa e toca em Enviar.'
                : 'Você pode copiar ou baixar o resumo para compartilhar com a equipe.'}{' '}
              Nada é enviado automaticamente.
            </p>
            <div className="blueprint-secondary-actions">
              <Button variant="secondary" onClick={copy}>
                <Copy size={15} />
                Copiar resumo
              </Button>
              <Button variant="secondary" onClick={download}>
                <Download size={15} />
                Baixar .txt
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setReady(false)
                  setCopyStatus('')
                }}
              >
                <RotateCcw size={15} />
                Editar
              </Button>
            </div>
            <p className="blueprint-copy-status" role="status">
              {copyStatus}
            </p>
          </div>
        </div>
      ) : (
        <form className="form-stack" onSubmit={submit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Field label="Seu nome" id="brief-name">
            <input
              id="brief-name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              value={values.name}
              onChange={(event) => setValues({ ...values, name: event.target.value })}
              placeholder="Como podemos chamar você?"
            />
          </Field>
          <Field label="Seu e-mail" id="brief-email">
            <input
              id="brief-email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={values.email}
              onChange={(event) => setValues({ ...values, email: event.target.value })}
              placeholder="voce@example.com"
            />
          </Field>
          <Field label="Em que momento está seu projeto?" id="brief-stage">
            <select
              id="brief-stage"
              value={values.stage}
              onChange={(event) => setValues({ ...values, stage: event.target.value })}
            >
              <option>Tenho uma ideia</option>
              <option>Preciso de um site ou landing page</option>
              <option>Quero construir um sistema</option>
              <option>Quero automatizar processos</option>
              <option>Quero evoluir um produto</option>
            </select>
          </Field>
          <Field label="Conte um pouco sobre a sua ideia" id="brief-project">
            <textarea
              id="brief-project"
              required
              minLength={15}
              maxLength={2000}
              rows={4}
              value={values.project}
              onChange={(event) => setValues({ ...values, project: event.target.value })}
              placeholder="Qual problema você quer resolver? O que gostaria de construir?"
            />
          </Field>
          <p className="local-note">
            Você revisa o plano inicial antes de copiar, baixar ou compartilhar no WhatsApp. Nada é
            enviado ao preencher.
          </p>
          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Gerar meu plano inicial <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}

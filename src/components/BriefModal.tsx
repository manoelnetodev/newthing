import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Download, RotateCcw } from 'lucide-react'
import { Button, ErrorMessage, Field, Modal } from './ui'
export function BriefModal({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    stage: 'Tenho uma ideia',
    project: '',
  })
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    const text = `BRIEFING DO PROJETO — NEWTHING\n\nNome: ${values.name.trim()}\nE-mail: ${values.email.trim()}\nMomento: ${values.stage}\n\nA IDEIA\n${values.project.trim()}\n\nPRÓXIMOS PASSOS\n1. Definir o público e o problema principal.\n2. Escolher até três funções essenciais.\n3. Desenhar a jornada da primeira versão.\n4. Definir escopo, prioridades e critérios de entrega.\n\nEste briefing foi criado localmente. Nenhum dado foi enviado.\n`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'briefing-newthing.txt'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <Modal
      title={ready ? 'Sua ideia já tem um começo.' : 'Vamos conhecer a sua ideia.'}
      description={
        ready
          ? 'Seu briefing está pronto para baixar e compartilhar quando quiser.'
          : 'Organize o seu projeto em um briefing simples. Leva só um momento.'
      }
      onClose={onClose}
    >
      {ready ? (
        <div className="brief-success">
          <span className="success-icon">
            <CheckCircle2 size={32} />
          </span>
          <div className="brief-summary">
            <span>SEU PONTO DE PARTIDA</span>
            <h3>{values.stage}</h3>
            <p>{values.project.trim()}</p>
            <small>
              {values.name.trim()} · {values.email.trim()}
            </small>
          </div>
          <p className="local-note">
            Nenhum dado foi enviado. O arquivo é gerado no seu navegador.
          </p>
          <div className="modal-footer">
            <Button variant="secondary" onClick={() => setReady(false)}>
              <RotateCcw size={15} />
              Editar
            </Button>
            <Button onClick={download}>
              <Download size={16} />
              Baixar briefing
            </Button>
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
            Nesta demonstração, suas informações ficam apenas nesta janela. Você poderá baixar um
            arquivo com o briefing.
          </p>
          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Preparar meu briefing <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}

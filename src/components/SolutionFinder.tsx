import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Globe,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { Button, Modal } from './ui'
import './SolutionFinder.css'

const goals = [
  {
    id: 'site',
    title: 'Apresentar meu negócio na internet',
    text: 'Ter um site profissional, apresentar serviços e facilitar o contato.',
    icon: Globe,
  },
  {
    id: 'system',
    title: 'Organizar a operação da minha empresa',
    text: 'Conectar clientes, pedidos, informações e a rotina da equipe.',
    icon: Code2,
  },
  {
    id: 'automation',
    title: 'Automatizar tarefas e atendimento',
    text: 'Integrar ferramentas e reduzir repasses manuais entre as pessoas.',
    icon: Workflow,
  },
  {
    id: 'idea',
    title: 'Dar forma a uma ideia',
    text: 'Entender possibilidades e definir o que faz sentido construir primeiro.',
    icon: Lightbulb,
  },
] as const

const moments = [
  {
    id: 'start',
    title: 'Quero começar um novo projeto',
    text: 'Tenho um objetivo e preciso de ajuda para construir a solução.',
  },
  {
    id: 'evolve',
    title: 'Já tenho algo e quero melhorar',
    text: 'Quero revisar uma solução existente e planejar sua evolução.',
  },
  {
    id: 'plan',
    title: 'Ainda preciso definir o caminho',
    text: 'Quero organizar as necessidades antes de decidir o que desenvolver.',
  },
] as const

type Goal = (typeof goals)[number]['id']
type Moment = (typeof moments)[number]['id']

const directions = {
  site: {
    label: 'Site e presença digital',
    title: 'Uma presença digital à altura do seu negócio.',
    evolution: 'Um próximo passo para a sua presença digital.',
    plan: 'Um plano claro para apresentar sua marca.',
    text: 'Um site ou landing page que apresente seus serviços e conduza o visitante até uma conversa com você.',
    steps: [
      'Entender o público e a mensagem da sua marca',
      'Organizar serviços e o caminho até o contato',
      'Validar a experiência no computador e no celular',
    ],
    exampleIndex: 1,
  },
  system: {
    label: 'Sistema de gestão',
    title: 'Um sistema feito para a sua operação.',
    evolution: 'Seu sistema preparado para novas necessidades.',
    plan: 'Mapear a rotina antes de construir o sistema.',
    text: 'Uma solução sob medida para conectar processos e dar mais clareza às informações que sua equipe usa todos os dias.',
    steps: [
      'Escutar quem vive a rotina da empresa',
      'Mapear processos e informações essenciais',
      'Priorizar os módulos da primeira entrega',
    ],
    exampleIndex: 0,
  },
  automation: {
    label: 'Automação de processos',
    title: 'Uma rotina mais conectada, com pessoas no centro.',
    evolution: 'Evoluir os fluxos que sua equipe já utiliza.',
    plan: 'Encontrar o processo certo para automatizar.',
    text: 'Automações para organizar solicitações, integrar ferramentas e apoiar o atendimento, com revisão humana nos pontos necessários.',
    steps: [
      'Identificar tarefas repetitivas e os gargalos',
      'Definir regras, integrações e pontos de revisão',
      'Testar o fluxo e acompanhar sua entrada em uso',
    ],
    exampleIndex: 2,
  },
  idea: {
    label: 'Planejamento de projeto',
    title: 'Um plano para dar forma à sua ideia.',
    evolution: 'Um diagnóstico para orientar o próximo passo.',
    plan: 'Seu objetivo primeiro. A tecnologia depois.',
    text: 'Começamos pela escuta para transformar sua visão em prioridades, um escopo possível e uma primeira versão para validar.',
    steps: [
      'Entender o objetivo e quem vai usar a solução',
      'Definir o que precisa funcionar primeiro',
      'Desenhar e validar o caminho com você',
    ],
    exampleIndex: 0,
  },
} as const

export function SolutionFinder({
  onClose,
  onViewExample,
  onStartProject,
}: {
  onClose: () => void
  onViewExample: (exampleIndex: number, phase: number) => void
  onStartProject: (goal: string, stage: string) => void
}) {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<Goal | null>(null)
  const [moment, setMoment] = useState<Moment | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  const goalInfo = goals.find((item) => item.id === goal)
  const momentInfo = moments.find((item) => item.id === moment)
  const direction = goal ? directions[goal] : null
  const title = direction
    ? moment === 'evolve'
      ? direction.evolution
      : moment === 'plan'
        ? direction.plan
        : direction.title
    : ''
  const phase = goal === 'idea' || moment === 'plan' ? 0 : moment === 'evolve' ? 2 : 1
  const briefStage =
    moment === 'evolve'
      ? 'Quero evoluir um produto'
      : goal === 'idea' || moment === 'plan'
        ? 'Tenho uma ideia'
        : goal === 'site'
          ? 'Preciso de um site ou landing page'
          : 'Quero construir um sistema'

  useEffect(() => {
    panel.current?.focus()
  }, [step])

  return (
    <Modal
      onClose={onClose}
      title={
        step === 0
          ? 'O que você quer transformar?'
          : step === 1
            ? 'Em que momento você está?'
            : 'Um caminho para o seu objetivo.'
      }
      description={
        step === 0
          ? 'Duas perguntas para encontrar um ponto de partida. Sem cadastro.'
          : step === 1
            ? 'Sua resposta ajuda a diferenciar planejamento, construção e evolução.'
            : 'Uma orientação inicial. O escopo é definido em uma conversa com você.'
      }
    >
      <div className="finder-progress">
        <span>{step < 2 ? `PERGUNTA 0${step + 1} DE 02` : 'SEU PONTO DE PARTIDA'}</span>
        <div
          role="progressbar"
          aria-label="Progresso da orientação"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={step}
        >
          <i className={step >= 1 ? 'complete' : ''} />
          <i className={step >= 2 ? 'complete' : ''} />
        </div>
      </div>
      <div className="finder-panel" ref={panel} tabIndex={-1}>
        {step === 0 && (
          <fieldset className="finder-options">
            <legend>Escolha seu principal objetivo</legend>
            {goals.map(({ id, title: label, text, icon: Icon }) => (
              <label className={`finder-option ${goal === id ? 'selected' : ''}`} key={id}>
                <input
                  type="radio"
                  name="finder-goal"
                  value={id}
                  checked={goal === id}
                  onChange={() => setGoal(id)}
                />
                <Icon size={20} aria-hidden="true" />
                <span>
                  <strong>{label}</strong>
                  <small>{text}</small>
                </span>
                <span className="finder-radio" aria-hidden="true">
                  {goal === id && <Check size={12} />}
                </span>
              </label>
            ))}
          </fieldset>
        )}
        {step === 1 && (
          <>
            <p className="finder-selection">
              <Compass size={14} />
              Seu objetivo: <strong>{goalInfo?.title}</strong>
            </p>
            <fieldset className="finder-options">
              <legend>Escolha o momento do seu projeto</legend>
              {moments.map(({ id, title: label, text }) => (
                <label
                  className={`finder-option moment ${moment === id ? 'selected' : ''}`}
                  key={id}
                >
                  <input
                    type="radio"
                    name="finder-moment"
                    value={id}
                    checked={moment === id}
                    onChange={() => setMoment(id)}
                  />
                  <span>
                    <strong>{label}</strong>
                    <small>{text}</small>
                  </span>
                  <span className="finder-radio" aria-hidden="true">
                    {moment === id && <Check size={12} />}
                  </span>
                </label>
              ))}
            </fieldset>
          </>
        )}
        {step === 2 && direction && goalInfo && momentInfo && (
          <div className="finder-result">
            <div className="finder-result-heading">
              <span>
                <Sparkles size={14} />
                {direction.label}
              </span>
              <h3>{title}</h3>
              <p>
                {moment === 'evolve'
                  ? 'Partimos do que você já tem, entendemos os desafios atuais e priorizamos melhorias com você. '
                  : ''}
                {direction.text}
              </p>
            </div>
            <dl className="finder-answers">
              <div>
                <dt>SEU OBJETIVO</dt>
                <dd>{goalInfo.title}</dd>
              </div>
              <div>
                <dt>SEU MOMENTO</dt>
                <dd>{momentInfo.title}</dd>
              </div>
            </dl>
            <div className="finder-next">
              <h4>Como começamos com você</h4>
              <ol>
                {direction.steps.map((item, index) => (
                  <li key={item}>
                    <span>0{index + 1}</span>
                    {moment === 'evolve' && index === 0
                      ? 'Revisar a solução existente e escutar sua equipe'
                      : item}
                  </li>
                ))}
              </ol>
            </div>
            <p className="finder-care">
              <ShieldCheck size={15} />
              Essa indicação inicia a conversa. Suas necessidades orientam as decisões.
            </p>
            <div className="finder-result-actions">
              <Button onClick={() => onViewExample(direction.exampleIndex, phase)}>
                Ver um exemplo desse caminho
                <ArrowRight size={15} />
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  onStartProject(
                    `${goalInfo.title}.\nMomento: ${momentInfo.title}.\nCaminho para explorar: ${direction.label}.`,
                    briefStage,
                  )
                }
              >
                Levar esse objetivo para o briefing
                <ArrowUpRight size={15} />
              </Button>
            </div>
            <button className="finder-edit" type="button" onClick={() => setStep(0)}>
              <RefreshCw size={12} />
              Rever minhas respostas
            </button>
          </div>
        )}
      </div>
      {step < 2 && (
        <div className="finder-footer">
          <Button variant="ghost" onClick={step === 0 ? onClose : () => setStep(0)}>
            {step === 0 ? (
              'Agora não'
            ) : (
              <>
                <ArrowLeft size={14} />
                Voltar
              </>
            )}
          </Button>
          <Button disabled={step === 0 ? !goal : !moment} onClick={() => setStep(step + 1)}>
            {step === 0 ? 'Próximo passo' : 'Ver meu caminho'}
            <ArrowRight size={15} />
          </Button>
        </div>
      )}
    </Modal>
  )
}

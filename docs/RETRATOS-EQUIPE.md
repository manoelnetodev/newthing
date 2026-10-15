# Retratos da equipe

## Versão atual

Os quatro retratos atuais usam recortes com transparência real sobre o mesmo fundo preto neutro `#101010`, definido no CSS. Não há gradientes ou filtros de cor sobre as pessoas. Os arquivos, o tratamento e o conjunto de prompts estão em [RETRATOS-PADRONIZADOS.md](RETRATOS-PADRONIZADOS.md).

## Versões anteriores preservadas

- `public/team/manoel-neto-profissional.png`: edição da fotografia de Manoel Neto produzida com a ferramenta integrada ImageGen. A edição melhora definição, iluminação e fundo, preservando a referência de identidade, o traje e a expressão.
- `public/team/manoel-neto.png`: cópia da fotografia original fornecida pelo usuário, mantida para referência.
- `public/team/ronan-profissional.png`: edição da fotografia de Ronan Severo fornecida pelo usuário. Produzida com a ferramenta integrada ImageGen, mantendo a referência de identidade e alterando fundo, vestuário e iluminação para uma apresentação profissional.
- `public/team/yuri-gabriel-profissional.png`: retrato de Yuri Gabriel editado no ImageGen a partir da primeira fotografia enviada nesta etapa. Removidos o microfone, o fundo do evento e os elementos de galeria do print; preservados os óculos, a roupa e a referência de identidade.
- `public/team/macsuel-silva-profissional.png`: retrato de Macsuel Silva editado no ImageGen a partir da segunda fotografia enviada nesta etapa. Removidos os elementos de print e aplicado fundo de estúdio, preservando a camisa escura e a referência de identidade.

Os arquivos originais enviados pelo usuário permanecem nos locais de origem. Nomes e funções seguem as informações fornecidas: Manoel Neto e Ronan Severo na área de desenvolvimento; Yuri Gabriel e Macsuel Silva como contadores e analistas financeiros na área de parcerias e visão de negócio. Não foram acrescentados registros profissionais, certificações, tempo de experiência ou links sociais.

As descrições de Yuri e Macsuel são breves. O texto da área conecta contabilidade e análise financeira às parcerias, negociações e ao planejamento de sites e sistemas para empresas, sem apresentá-los como desenvolvedores.

## Prompt utilizado no ImageGen

### Yuri Gabriel — retrato profissional

```text
Use case: identity-preserve, professional portrait editing. Edit target is the attached photograph of Yuri Gabriel, the man with rectangular dark glasses holding a microphone. Create a refined photographic head-and-torso portrait for the team page of a software and business solutions company. Preserve his exact facial identity, distinctive rectangular glasses, face proportions, hairstyle, beard, skin tone and natural texture, age, body build and calm approachable expression. Retain his dark suit jacket and white open-collar shirt. Replace the bright event backdrop with a seamless dark charcoal studio background and soft controlled portrait lighting. Remove all screenshot elements: the bottom photo-gallery strip, thumbnails, image count, lettering and background logos. Remove the handheld microphone; compose with hands below the frame or naturally relaxed, with no added props. Keep the slight natural three-quarter head direction from the reference, eye-level perspective, head and entire hairstyle fully visible with comfortable headroom. Framing from head through upper torso to waist, portrait 4:5, consistent with premium serious corporate photography. Natural detailed skin and realistic fabric. Do not beautify, slim, change ethnicity, invent a different face, or remove the glasses. No text, watermark or logos.
```

### Macsuel Silva — retrato profissional

```text
Use case: identity-preserve, professional portrait editing. Edit target is the attached photograph of Macsuel Silva, the bearded man in a dark navy button-up shirt. Create a clean professional photographic portrait for the team section of a software and business solutions company. Preserve this exact man's identity: same face shape, eyebrows, eyes, nose, mouth, full beard, hairline, hairstyle, skin tone, apparent age, stocky strong build and serious natural expression. Preserve the dark navy buttoned shirt. Remove the screenshot's black border, bottom clipped gallery interface and the 3/3 count badge. Replace the light grey event background with a seamless dark charcoal studio backdrop. Use soft studio key light with subtle fill, realistic skin texture, sharp eyes and natural fabric detail. Retain a natural slight three-quarter face angle, with a relaxed neutral posture and hands out of the frame, no gestures or microphones. Eye-level head-and-torso framing approximately to the waist, portrait 4:5, entire head visible and comfortable headroom, tasteful and serious like an editorial corporate portrait. Do not reshape, slim or beautify the face or body, and do not create a generic model. One person only. No text, no logos, no watermarks, no props.
```

### Manoel Neto — restauração do retrato

```text
Use case: identity-preserve / photographic restoration. Edit target: the attached existing portrait of Manoel Neto. This image looks like a low-resolution screenshot; restore it into a crisp, high-quality professional studio photograph for a software development company's team page. Preserve this exact man's identity with very high fidelity: same face shape and proportions, eyes, eyebrows, nose, lips, ears, jawline, beard, hairline and hairstyle, skin tone, expression, gaze and apparent age. Preserve his black tailored blazer, black buttoned waistcoat and white open-collar shirt. Do not substitute a different face, beautify, slim, reshape or over-smooth him. Restore believable fine photographic detail: natural skin texture, beard strands, hair, fabric weave and clean clothing edges. Remove screenshot-like dark edge strips, compression blocks, pixelation, blur and uneven banding. Use a clean seamless charcoal studio backdrop, subtle background separation and soft professional lighting, with natural facial shadows and a refined serious editorial look. Compose as an eye-level frontal portrait from head through torso, approximately to the waist, in a 4:5 vertical frame with comfortable headroom; the hair and the entire head must remain visible. Sharply focus the eyes while retaining realistic, non-plastic skin. The result must look like a real premium photograph of the same man, not an AI glamour rendering, illustration, screenshot or over-sharpened image. No logos, no typography, no watermark, no new people or props.
```

### Ronan — retrato profissional

```text
Use case: identity-preserve. Edit target: the attached photograph of Ronan, a real person. Create a professional photographic portrait for the team section of a serious software development company's dark website. Preserve this exact man's identity extremely faithfully: same distinctive face, eyes, nose, lips, jaw shape, skin tone and natural texture, hairstyle and facial hair. Do not replace him with a generic handsome model; do not beautify or reshape his features. Change only the casual setting, attire, photographic lighting and crop/presentation. Replace the stone wall/TV background with a seamless dark charcoal studio background, softly lit. Replace the red polo with a well-tailored dark charcoal blazer and a simple white open-collar shirt, no tie, no logos. Natural, approachable and composed neutral expression. Eye-level lens, frontal shoulders and face, professional head-and-torso framing to approximately the waist, with comfortable space above the head; realistic body proportions. Soft restrained studio key light with subtle fill, natural skin texture and shadows, premium understated editorial business portrait. Portrait orientation approximately 4:5. Single person only, no text, no watermark, no additional props. The real identity must be retained; this is photographic editing, not creation of a different person.
```

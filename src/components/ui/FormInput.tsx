import {type InputHTMLAttributes, type TextareaHTMLAttributes} from 'react'

type FormInputBase = {
  label: string
  id: string
  placeholder: string
}

type AsInput = FormInputBase & InputHTMLAttributes<HTMLInputElement> & { as?: 'input' }
type AsTextarea = FormInputBase &
    TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea'; rows?: number }

type FormInputProps = AsInput | AsTextarea

const INPUT_CLASSES =
  'w-full px-4 py-3 rounded-xl bg-carbon/50 border border-slate/30 font-body text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/20 transition-all'

export default function FormInput(props: FormInputProps) {
  const { label, id, placeholder, as, ...rest } = props

  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-text-secondary mb-2">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          className={`${INPUT_CLASSES} resize-none`}
          placeholder={placeholder}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          type="text"
          className={INPUT_CLASSES}
          placeholder={placeholder}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  )
}

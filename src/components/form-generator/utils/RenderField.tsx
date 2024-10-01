import GenerateTextField from '../fields/text'
import type { RenderFieldOptions } from '../types/AllFields'

function RenderField({ type, props }: Pick<RenderFieldOptions, 'type' | 'props'>) {
  switch (type) {
    case 'text':
      return <GenerateTextField {...props} />
  }
}

export default RenderField

export abstract class TextFieldControl {
  controlName: string
  host: HTMLElement

  abstract hasValue(): boolean

  abstract disabled: boolean
  abstract error: boolean
}

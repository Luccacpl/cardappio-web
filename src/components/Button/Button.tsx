import CustomButtom from './style'

interface IButton {
  width?: string
  height?: string
  margin?: string
  content?: string
  style?: Object
  clicked?: any
  fontWeight?: string
  padding?: string
  marginTop?: string
  heightResponsive?: string
  isNotForm?: boolean
  color?: string
  BgColor?: string
}

const Button = (props: IButton) => {
  return (
    props.isNotForm
      ?
      <CustomButtom
        {...props}
        onClick={props.clicked}
      >
        {props.content}
      </CustomButtom>
      :
      <CustomButtom
        {...props}
        onClick={props.clicked}
        type="submit"
      >
        {props.content}
      </CustomButtom>
  )
}


export default Button;
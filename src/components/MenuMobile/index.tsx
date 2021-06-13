import { Menu } from './style'
import { ArrowBackCircleOutline } from 'react-ionicons'
import { P } from 'components/Text/text'

interface IMenuMobile {
  clicked?: any
}

const MenuMobile = (props: IMenuMobile) => {
  return (
    <Menu>
      <div style={{
        width: "80%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "20px"
      }}>
        <P color="#FC8533" fontWeight="Bold" fontSize="18px">Cardappio</P>
      </div>
      <div style={{
        width: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: "20px"
      }}>
        <ArrowBackCircleOutline
          color="#B2DA5A"
          width="30px" height="30px"
          style={{ cursor: "pointer" }}
          onClick={props.clicked}
        />
      </div>
    </Menu>

  )
}

export default MenuMobile
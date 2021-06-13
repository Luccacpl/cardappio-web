import { OverlayModal, MiddleContainer, HeaderClose, WarningDiv, FooterDiv } from './style'

import { CloseOutline, WarningOutline } from 'react-ionicons';
import { P } from 'components/Text/text';
import Button from 'components/Button/Button'

interface IDeleteModal {
  clicked?: any
  text?: string
  closeClicked?: any
  content?: string 
}

const DeleteModal = (props: IDeleteModal) => {
  return (
    <OverlayModal>
      <MiddleContainer>
        <HeaderClose>
          <CloseOutline
            height="32px"
            width="32px"
            color="white"
            style={{ cursor: "pointer", marginRight: "11px" }}
            onClick={props.closeClicked}
          />
        </HeaderClose>

        <WarningDiv>
          <WarningOutline height="82px" width="82px" color="red" />
          <P color="white" marginTop="14px" >{props.text}</P>
        </WarningDiv>

        <FooterDiv>
          <Button isNotForm content={props.content || "Excluir"} width="200px" BgColor="#AE1111" clicked={props.clicked} />
        </FooterDiv>

      </MiddleContainer>
    </OverlayModal>
  )
}

export default DeleteModal
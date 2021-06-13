import { CloseCircleOutline, RestaurantOutline, CheckmarkCircleOutline } from 'react-ionicons'

import { DivCard, DivPicture, DivMenu, DivDetail, TitleCard, DescriptionCard, PriceCard } from './style'

interface ICards {
  gridStart?: string
  display?: string
  width?: string
  marginLeft?: string
  margin?: string
  name?: string
  desc?: string
  price?: string
  src?: string
  cancelClicked?: any
  preparationClicked?: any
  readyClicked?: any

  checkColor: string
  preparationColor: string
  closeColor: string
}

function CommandCards(props: ICards) {
  return (
    <DivCard
      display={props.display}
      width={props.width}
      marginLeft={props.marginLeft}
      margin={props.margin}
    >
      <DivPicture imgUrl={props.src}>
        <DivMenu>
          <CheckmarkCircleOutline
            color={props.checkColor}
            width="3rem"
            height="1.5rem"
            style={{ margin: "10% 0px", cursor: "pointer" }}
            onClick={props.readyClicked}
          />
          <RestaurantOutline
            color={props.preparationColor}
            width="3rem"
            height="1.5rem"
            style={{ margin: "10% 0px", cursor: "pointer" }}
            onClick={props.preparationClicked}
          />
          <CloseCircleOutline
            color={props.closeColor}
            width="3rem"
            height="1.5rem"
            style={{ margin: "10% 0px", cursor: "pointer" }}
            onClick={props.cancelClicked}
          />
        </DivMenu>
      </DivPicture>
      <DivDetail>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <TitleCard color="white">{props.name}</TitleCard>
          <PriceCard>{props.price}</PriceCard>
        </div>
        <DescriptionCard>
          {props.desc}
        </DescriptionCard>
      </DivDetail>
    </DivCard>
  );
}

export default CommandCards;